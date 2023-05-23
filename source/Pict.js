/**
* @author <steven@velozo.com>
*/
const libFable = require('fable');

const libMouseTrap = require('mousetrap');

const defaultPictSettings = (
	{
		// The main "viewport" is the view that is used to launch the entire application
		MainViewportTemplateHash: 'Default-Viewport',

		// The Element ID of where to stuff the main Viewport
		ScreenDestinationElementID: 'PICTViewport',

		// Whether or not we should automatically render the main viewport when appropriate
		AutoRenderMainViewport: true,

		// The prefix to prepend on all template destination hashes
		TemplateDestinationPrefix: 'PICT-'
	});

class Pict extends libFable
{
	constructor(pSettings)
	{
		super(pSettings);

		// The templateProvider provides a basic key->template mapping with default fallback capabilities
		this.serviceManager.addAndInstantiateServiceType('TemplateProvider', require('./Pict-Template-Provider.js'));
		this.serviceManager.addAndInstantiateServiceType('EntityProvider',  require('./Pict-Meadow-EntityProvider.js'));

		this._DefaultTemplateMethodsInitialized = false;
		this.serviceManager.instantiateServiceProvider('MetaTemplate');

		this.manifest = this.serviceManager.instantiateServiceProvider('Manifest');

		this.appData = {};
	}

	get Template()
	{
		return this.defaultServices.TemplateProvider;
	}

	get Entity()
	{
		return this.defaultServices.EntityProvider;
	}

	initializeTemplateMethods(fExtraTemplateMethods)
	{
		/*
		 *
		 * To stave off madness, these are inefficient for now.  The wkhtmltopdf renderer leaves much to be desired
		 * in the way of feedback with regards to javascript compatibility.
		 *
		 */
		if (!this._DefaultTemplateMethodsInitialized)
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
						tmpEntityID = this.manifest.getValueAtAddress({AppData: this.appData, Record: pData}, tmpEntityID);
					}

					// No Entity or EntityID
					if (!tmpEntity || !tmpEntityID)
					{
						this.fable.log.warn(`Pict: Entity Render: Entity or entity ID not resolved for [${tmpHash}]`);
						return fCallback(Error(`Pict: Entity Render: Entity or entity ID not resolved for [${tmpHash}]`), '');
					}

					// Now try to get the entity
					this.fable.Entity.getEntity(tmpEntity, tmpEntityID,
						(pError, pRecord) =>
						{
							if (pError)
							{
								this.fable.log.error(`Pict: Entity Render: Error getting entity [${tmpEntity}] with ID [${tmpEntityID}] for [${tmpHash}]: ${pError}`, pError);
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

			let fData = (pHash, pData)=>
				{
					let tmpHash = pHash.trim();
					let tmpValue = this.manifest.getValueAtAddress({AppData: this.appData, Record: pData}, tmpHash);

					if ((tmpValue == null) || (tmpValue == 'undefined') || (typeof(tmpValue) == 'undefined'))
					{
						return '';
					}
					return tmpValue;
				};
			this.defaultServices.MetaTemplate.addPattern('{~D:', '~}', fData);
			this.defaultServices.MetaTemplate.addPattern('{~Data:', '~}', fData);

			this.defaultServices.MetaTemplate.addPattern('{~Dollars:', '~}',
				(pHash, pData)=>
				{
					let tmpHash = pHash.trim();
					let tmpColumnData = this.manifest.getValueAtAddress({AppData: this.appData, Record: pData}, tmpHash);

					let tmpValue = this.defaultServices.DataFormat.formatterDollars(tmpColumnData);

					return tmpValue;
				});

			this.defaultServices.MetaTemplate.addPattern('{~Digits:', '~}',
				(pHash, pData)=>
				{
					let tmpHash = pHash.trim();
					let tmpColumnData = this.manifest.getValueAtAddress({AppData: this.appData, Record: pData}, tmpHash);

					let tmpValue = this.defaultServices.DataFormat.formatterAddCommasToNumber(this.defaultServices.DataFormat.formatterRoundNumber(tmpColumnData, 2));

					return tmpValue;
				});

			this.defaultServices.MetaTemplate.addPattern('{~NotEmpty:', '~}',
				(pHash, pData)=>
				{
					let tmpHash = pHash.trim();
					// Should switch this to indexOf so it allows pipes in the content.
					let tmpHashParts = tmpHash.split('|');

					if (tmpHashParts.length != 2)
					{
						return '';
					}

					let tmpTruthiness = this.manifest.getValueAtAddress({AppData: this.appData, Record: pData}, tmpHashParts[0]);

					let tmpValue = '';

					// For now just check truthiness
					if (tmpTruthiness)
					{
						tmpValue = tmpHashParts[1];
					}

					return tmpValue;
				});

			let fTemplateRender = (pHash, pData)=>
				{
					let tmpHash = pHash.trim();
					let tmpColumnData = this.manifest.getValueAtAddress({AppData: this.appData, Record: pData}, tmpHash);

					let tmpValue = this.defaultServices.DataFormat.formatterAddCommasToNumber(this.defaultServices.DataFormat.formatterRoundNumber(tmpColumnData, 2));

					return tmpValue;
				};
			this.defaultServices.MetaTemplate.addPattern('{~T:', '~~}', fTemplateRender);

			this._DefaultTemplateMethodsInitialized = true;
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
};

module.exports = Pict;