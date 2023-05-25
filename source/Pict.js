/**
* @author <steven@velozo.com>
*/
const libFable = require('fable');

const defaultPictSettings = (
	{
		// The main "viewport" is the view that is used to launch the entire application
		MainViewportTemplateHash: 'Default-Viewport',

		// The Element ID of where to stuff the main Viewport
		ScreenDestinationElementID: 'PICTViewport',

		// Whether or not we should automatically render the main viewport when appropriate
		AutoRenderMainViewport: false,

		// The prefix to prepend on all template destination hashes
		TemplateDestinationPrefix: 'PICT-'
	});

class Pict extends libFable
{
	constructor(pSettings)
	{
		super(pSettings);

		// Fill in any default Pict settings that are not in the settings object.
		this.settingsManager.fill(defaultPictSettings);

		// The templateProvider provides a basic key->template mapping with default fallback capabilities
		this.serviceManager.addAndInstantiateServiceType('TemplateProvider', require('./Pict-Template-Provider.js'));
		this.serviceManager.addAndInstantiateServiceType('EntityProvider',  require('./Pict-Meadow-EntityProvider.js'));
		this.serviceManager.addAndInstantiateServiceType('ContentAssignment',  require('./Pict-Content-Assignment.js'));
		this.serviceManager.addServiceType('PictView',  require('./Pict-View.js'));

		this.serviceManager.instantiateServiceProvider('MetaTemplate');

		this.manifest = this.serviceManager.instantiateServiceProvider('Manifest');

		this.AppData = {};

		this.Bundle = {};

		this._DefaultPictTemplatesInitialized = false;
		this.initializePictTemplates();
	}

	initializePictTemplates(fExtraTemplateMethods)
	{
		/*
		 *
		 * To stave off madness, these are inefficient for now.  The wkhtmltopdf renderer leaves much to be desired
		 * in the way of feedback with regards to javascript compatibility.
		 *
		 */
		if (!this._DefaultPictTemplatesInitialized)
		{
			// Expects one of the following:
			// 		{~Entity:Book:1~}
			//          ...meaning GET BOOK 1
			// 		{~Entity:Book:AppData.Some.Address.IDBook~}
			//          ...meaning GET BOOK with IDBook FROM AppData.Some.Address.IDBook
			// 		{~E:Book:AppData.Some.Address.IDBook:Render-Book-Template~}
			//          ...meaning GET BOOK with IDBook FROM AppData.Some.Address.IDBook and render it to Render-Book-Template
			let fEntityRender = (pHash, pData, fCallback) =>
				{
					let tmpHash = pHash.trim();

					let tmpEntity = false;
					let tmpEntityID = false;
					let tmpEntityTemplate = false;

					// This expression requires 2 parts -- a third is optional, and, if present, is the template to render to.
					let tmpHashSeparator = tmpHash.indexOf('|');

					if (tmpHashSeparator < 0)
					{
						// This is just a simple 2 part hash (the entity and the ID)
						let tmpHashEntitySeparator = tmpHash.indexOf(':');
						tmpEntity = tmpHash.substring(0, tmpHashEntitySeparator);
						tmpEntityID = tmpHash.substring(tmpHashEntitySeparator + 1);
					}
					else
					{
						// This is a 3 part hash (the entity, the ID, and the template)
						let tmpHashEntitySeparator = tmpHash.indexOf(':');
						tmpEntity = tmpHash.substring(0, tmpHashEntitySeparator);

						let tmpHashTemplateSeparator = tmpHash.indexOf('|');
						tmpEntityID = tmpHash.substring(tmpHashEntitySeparator + 1, tmpHashTemplateSeparator);

						tmpEntityTemplate = tmpHash.substring(tmpHashTemplateSeparator + 1);
					}

					if (!isNaN(tmpEntityID))
					{
						tmpEntityID = parseInt(tmpEntityID);
					}
					else
					{
						// This is an address, so we need to get the value at the address
						tmpEntityID = this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:pData}, tmpEntityID);
					}

					// No Entity or EntityID
					if (!tmpEntity || !tmpEntityID)
					{
						this.log.warn(`Pict: Entity Render: Entity or entity ID not resolved for [${tmpHash}]`);
						return fCallback(Error(`Pict: Entity Render: Entity or entity ID not resolved for [${tmpHash}]`), '');
					}

					// Now try to get the entity
					this.EntityProvider.getEntity(tmpEntity, tmpEntityID,
						(pError, pRecord) =>
						{
							if (pError)
							{
								this.log.error(`Pict: Entity Render: Error getting entity [${tmpEntity}] with ID [${tmpEntityID}] for [${tmpHash}]: ${pError}`, pError);
								return fCallback(pError, '');
							}

							// Now render the template
							if (tmpEntityTemplate)
							{
								return fCallback(null, this.parseTemplateByHash(tmpEntityTemplate, pRecord));
							}
							else
							{
								return fCallback(null, '');
							}
						});
				};
			this.defaultServices.MetaTemplate.addPatternAsync('{~E:', '~}', fEntityRender);
			this.defaultServices.MetaTemplate.addPatternAsync('{~Entity:', '~}', fEntityRender);

			// {NE~Some.Address|If the left value is truthy, render this value.~}
			let fNotEmptyRender = (pHash, pData)=>
				{
					let tmpHash = pHash.trim();
					// Should switch this to indexOf so pipes can be in the content.
					let tmpHashParts = tmpHash.split('|');

					// For now just check truthiness
					if (this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:pData}, tmpHashParts[0]))
					{
						return tmpHashParts[1];
					}
					else
					{
						return '';
					}
				};
			this.defaultServices.MetaTemplate.addPattern('{~NotEmpty:', '~}', fNotEmptyRender);
			this.defaultServices.MetaTemplate.addPattern('{~NE:', '~}', fNotEmptyRender);

			// {~T:Template:AddressOfData~}
			let fTemplateRender = (pHash, pData)=>
				{
					let tmpHash = pHash.trim();

					let tmpTemplateHash = false;
					let tmpAddressOfData = false;

					// This is just a simple 2 part hash (the entity and the ID)
					let tmpHashTemplateSeparator = tmpHash.indexOf(':');
					tmpTemplateHash = tmpHash.substring(0, tmpHashTemplateSeparator);
					if (tmpHashTemplateSeparator > -1)
					{
						tmpAddressOfData = tmpHash.substring(tmpHashTemplateSeparator + 1);
					}
					else
					{
						tmpTemplateHash = tmpHash;
					}

					// No template hash
					if (!tmpTemplateHash)
					{
						this.log.warn(`Pict: Template Render: TemplateHash not resolved for [${tmpHash}]`);
						return `Pict: Template Render: TemplateHash not resolved for [${tmpHash}]`;
					}

					if (!tmpAddressOfData)
					{
						// No address was provided, just render the template with what this template has.
						return this.parseTemplateByHash(tmpTemplateHash, pData);
					}
					else
					{
						return this.parseTemplateByHash(tmpTemplateHash, this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:pData}, tmpAddressOfData));
					}
				};
			this.defaultServices.MetaTemplate.addPattern('{~T:', '~}', fTemplateRender);
			this.defaultServices.MetaTemplate.addPattern('{~Template:', '~}', fTemplateRender);

			// {~TS:Template:AddressOfDataSet~}
			let fTemplateSetRender = (pHash, pData)=>
				{
					let tmpHash = pHash.trim();

					let tmpTemplateHash = false;
					let tmpAddressOfData = false;

					// This is just a simple 2 part hash (the entity and the ID)
					let tmpHashTemplateSeparator = tmpHash.indexOf(':');
					tmpTemplateHash = tmpHash.substring(0, tmpHashTemplateSeparator);
					if (tmpHashTemplateSeparator > -1)
					{
						tmpAddressOfData = tmpHash.substring(tmpHashTemplateSeparator + 1);
					}
					else
					{
						tmpTemplateHash = tmpHash;
					}

					// No template hash
					if (!tmpTemplateHash)
					{
						this.log.warn(`Pict: Template Render: TemplateHash not resolved for [${tmpHash}]`);
						return `Pict: Template Render: TemplateHash not resolved for [${tmpHash}]`;
					}

					if (!tmpAddressOfData)
					{
						// No address was provided, just render the template with what this template has.
						return this.parseTemplateSetByHash(tmpTemplateHash, pData);
					}
					else
					{
						return this.parseTemplateSetByHash(tmpTemplateHash, this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:pData}, tmpAddressOfData));
					}
				};
			this.defaultServices.MetaTemplate.addPattern('{~TS:', '~}', fTemplateSetRender);
			this.defaultServices.MetaTemplate.addPattern('{~TemplateSet:', '~}', fTemplateSetRender);

			//{~Data:AppData.Some.Value.to.Render~}
			let fDataRender = (pHash, pData)=>
				{
					let tmpHash = pHash.trim();
					let tmpValue = this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:pData}, tmpHash);
					if ((tmpValue == null) || (tmpValue == 'undefined') || (typeof(tmpValue) == 'undefined'))
					{
						return '';
					}
					return tmpValue;
				};
			this.defaultServices.MetaTemplate.addPattern('{~D:', '~}', fDataRender);
			this.defaultServices.MetaTemplate.addPattern('{~Data:', '~}', fDataRender);

			this.defaultServices.MetaTemplate.addPattern('{~Dollars:', '~}',
				(pHash, pData)=>
				{
					let tmpHash = pHash.trim();
					let tmpColumnData = this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:pData}, tmpHash);
					return this.defaultServices.DataFormat.formatterDollars(tmpColumnData);
				});

			this.defaultServices.MetaTemplate.addPattern('{~Digits:', '~}',
				(pHash, pData)=>
				{
					let tmpHash = pHash.trim();
					let tmpColumnData = this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:pData}, tmpHash);
					return this.defaultServices.DataFormat.formatterAddCommasToNumber(this.defaultServices.DataFormat.formatterRoundNumber(tmpColumnData, 2));
				});

			this._DefaultPictTemplatesInitialized = true;
		}
	}

	parseTemplate (pTemplateString, pData, fCallback)
	{
		return this.defaultServices.MetaTemplate.parseString(pTemplateString, pData, fCallback);
	}

	parseTemplateByHash (pTemplateHash, pData, fCallback)
	{
		let tmpTemplateString = this.defaultServices.TemplateProvider.getTemplate(pTemplateHash);

		// TODO: Unsure if returning empty is always the right behavior -- if it isn't we will use config to set the behavior
		if (!tmpTemplateString)
		{
			return '';
		}
		return this.parseTemplate(tmpTemplateString, pData, fCallback);
	}

	parseTemplateSet (pTemplateString, pDataSet, fCallback)
	{
		// TODO: This will need streaming -- for now janky old string append does the trick
		let tmpValue = '';
		if (typeof(fCallback) == 'function')
		{
			if (Array.isArray(pDataSet) || typeof(pDataSet) == 'object')
			{
				this.defaultServices.Utility.eachLimit(pDataSet, 1,
					(pRecord, fRecordTemplateCallback)=>
					{
						return this.parseTemplate(pTemplateString, pRecord,
							(pError, pTemplateResult)=>
							{
								tmpValue += pTemplateResult;
								return fRecordTemplateCallback();
							});
					},
					(pError)=>
					{
						return fCallback(pError, tmpValue);
					});
			}
			else
			{
				return fCallback(Error('Pict: Template Set: pDataSet is not an array or object.'), '');
			}
		}
		else
		{
			if (Array.isArray(pDataSet) || typeof(pDataSet) == 'object')
			{
				if (Array.isArray(pDataSet))
				{
					for (let i = 0; i < pDataSet.length; i++)
					{
						tmpValue += this.parseTemplate(pTemplateString, pDataSet[i]);
					}
				}
				else
				{
					let tmpKeys = Object.keys(pDataSet);
					for (let i = 0; i < tmpKeys.length; i++)
					{
						tmpValue += this.parseTemplate(pTemplateString, pDataSet[tmpKeys[i]]);
					}
				}

				return tmpValue;
			}
			else
			{
				return '';
			}			
		}
	}

	parseTemplateSetByHash (pTemplateHash, pDataSet, fCallback)
	{
		let tmpTemplateString = this.defaultServices.TemplateProvider.getTemplate(pTemplateHash);

		// TODO: Unsure if returning empty is always the right behavior -- if it isn't we will use config to set the behavior
		if (!tmpTemplateString)
		{
			return '';
		}
		return this.parseTemplateSet(tmpTemplateString, pDataSet, fCallback);
	}
};

module.exports = Pict;
