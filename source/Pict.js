/**
* @author <steven@velozo.com>
*/
const libFable = require('fable');

class Pict extends libFable
{
	constructor(pSettings)
	{
		super(pSettings);

		this.isBrowser = new Function("try {return (this===window);} catch(pError) {return false;}");

		// The templateProvider provides a basic key->template mapping with default fallback capabilities
		this.addAndInstantiateServiceType('TemplateProvider', require('./Pict-Template-Provider.js'));
		this.addAndInstantiateServiceType('EntityProvider',  require('./Pict-Meadow-EntityProvider.js'));
		this.addAndInstantiateServiceType('DataProvider',  require('./Pict-DataProvider.js'));
		this.addAndInstantiateServiceType('ContentAssignment',  require('./Pict-Content-Assignment.js'));
		this.addAndInstantiateServiceType('CSSMap', require('./Pict-CSS.js'));

		this.instantiateServiceProvider('MetaTemplate');
		this.instantiateServiceProvider('DataGeneration');

		this.manifest = this.instantiateServiceProvider('Manifest');

		this.AppData = {};
		this.Bundle = {};

		// Log noisness goes from 0 - 5, where 5 is show me everything.
		this.LogNoisiness = 0;
		// Although we have log noisiness, sometimes we need control flow without all the other noise for hard to diagnose interpreters.
		this.LogControlFlow = false;
		// And an easy way to be introspective about data at various locations
		this.LogControlFlowWatchAddressList = [];

		// Load manifest sets
		if (this.settings.Manifests)
		{
			this.loadManifestSet(this.settings.Manifests);
		}

		this._DefaultPictTemplatesInitialized = false;
		this.initializePictTemplateEngine();

		this.addServiceType('PictView',  require('pict-view'));
		this.addServiceType('PictApplication',  require('pict-application'));

		// Expose the named views directly, through a convenience accessor
		this.views = this.servicesMap.PictView;
	}

	// Load manifests in as Hashed services
	loadManifestSet (pManifestSet)
	{
		if (typeof(pManifestSet) != 'object')
		{
			this.log.warn(`PICT [${this.UUID}] could not load Manifest Set; pManifestSet was not an object.`);
			return false;
		}
		let tmpManifestKeys = Object.keys(pManifestSet);
		if (tmpManifestKeys.length > 0)
		{
			for (let i = 0; i < tmpManifestKeys.length; i++ )
			{
				// Load each manifest
				let tmpManifestKey = tmpManifestKeys[i];
				this.instantiateServiceProvider('Manifest', pManifestSet[tmpManifestKey], tmpManifestKey);
			}
		}
	}

	// Just passing an options will construct one for us.
	// Passing a hash will set the hash.
	// Passing a prototype will use that!
	addView(pViewHash, pOptions, pViewPrototype)
	{
		let tmpOptions = (typeof(pOptions) == 'object') ? pOptions : {};
		let tmpViewHash = (typeof(pViewHash) == 'string') ? pViewHash : this.fable.getUUID();

		if (this.LogControlFlow)
		{
			if (this.LogNoisiness > 1)
			{
				this.log.info(`PICT-ControlFlow addView [${tmpViewHash}]:`, {Options:tmpOptions});
			}
			else
			{
				this.log.info(`PICT-ControlFlow addView [${tmpViewHash}]`)
			}
		}

		if (typeof(pViewPrototype) != 'undefined')
		{
			// If the prototype has a default_configuration, it will be merged with options.
			if (pViewPrototype.hasOwnProperty('default_configuration'))
			{
				tmpOptions = this.fable.Utility.extend({}, pViewPrototype.default_configuration, tmpOptions);
			}
			return this.instantiateServiceProviderFromPrototype('PictView', tmpOptions, tmpViewHash, pViewPrototype);
		}
		else
		{
			return this.instantiateServiceProvider('PictView', tmpOptions, tmpViewHash);
		}
	}

	// Just passing an options will construct one for us.
	// Passing a hash will set the hash.
	// Passing a prototype will use that!
	addApplication(pApplicationHash, pOptions, pApplicationPrototype)
	{
		let tmpOptions = (typeof(pOptions) == 'object') ? pOptions : {};
		let tmpApplicationHash = (typeof(pApplicationHash) == 'string') ? pApplicationHash : this.fable.getUUID();

		if (this.LogControlFlow)
		{
			if (this.LogNoisiness > 1)
			{
				this.log.info(`PICT-ControlFlow addApplication [${tmpApplicationHash}]:`, {Options:tmpOptions});
			}
			else
			{
				this.log.info(`PICT-ControlFlow addApplication [${tmpApplicationHash}]`)
			}
		}

		if (typeof(pApplicationPrototype) != 'undefined')
		{
			// If the prototype has a default_configuration, it will be merged with options.
			if (pApplicationPrototype.hasOwnProperty('default_configuration'))
			{
				tmpOptions = this.fable.Utility.extend({}, pApplicationPrototype.default_configuration, tmpOptions);
			}

			return this.instantiateServiceProviderFromPrototype('PictApplication', tmpOptions, tmpApplicationHash, pApplicationPrototype);
		}
		else
		{
			return this.instantiateServiceProvider('PictApplication', tmpOptions, tmpApplicationHash);
		}
	}

	initializePictTemplateEngine()
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
			// 		{~E:Book^AppData.Some.Address.IDBook^Render-Book-Template~}
			//          ...meaning GET BOOK with IDBook FROM AppData.Some.Address.IDBook and render it to Render-Book-Template
			let fEntityRender = (pHash, pData, fCallback) =>
				{
					let tmpHash = pHash.trim();
					let tmpData = (typeof(pData) === 'object') ? pData : {};
					let tmpCallback = (typeof(fCallback) === 'function') ? fCallback : () => { return ''; };

					if (this.LogNoisiness > 4)
					{
						this.log.trace(`PICT Template [fEntityRender]::[${tmpHash}] with tmpData:`, tmpData);
					}
					else if (this.LogNoisiness > 0)
					{
						this.log.trace(`PICT Template [fEntityRender]::[${tmpHash}]`);
					}

					let tmpEntity = false;
					let tmpEntityID = false;
					let tmpEntityTemplate = false;

					// This expression requires 2 parts -- a third is optional, and, if present, is the template to render to.
					let tmpAddressParts = tmpHash.split('^');

					if (tmpAddressParts.length < 2)
					{
						this.log.warn(`Pict: Entity Render: Entity or entity ID not resolved for [${tmpHash}]`);
						return tmpCallback(Error(`Pict: Entity Render: Entity or entity ID not resolved for [${tmpHash}]`), '');
					}

					tmpEntity = tmpAddressParts[0].trim();
					tmpEntityID = tmpAddressParts[1].trim();
					tmpEntityTemplate = tmpAddressParts[2].trim();

					if (!isNaN(tmpEntityID))
					{
						try
						{
							tmpEntityID = parseInt(tmpEntityID);							
						}
						catch
						{
							this.log.warn(`Pict: Entity Render: Could not parse entity ID.`);
							tmpEntityID = 0;
						}
					}
					else
					{
						// This is an address, so we need to get the value at the address
						tmpEntityID = this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:tmpData}, tmpEntityID);
					}

					// No Entity or EntityID
					if (!tmpEntity || !tmpEntityID)
					{
						this.log.warn(`Pict: Entity Render: Entity or entity ID not resolved for [${tmpHash}]  Entity: ${tmpEntity} ID: ${tmpEntityID}`);
						return tmpCallback(Error(`Pict: Entity Render: Entity or entity ID not resolved for [${tmpHash}]  Entity: ${tmpEntity} ID: ${tmpEntityID}`), '');
					}

					if (this.LogNoisiness > 3)
					{
						this.log.trace(`Pict: Entity Render: Entity [${tmpEntity}] with ID [${tmpEntityID}] as template [${tmpEntityTemplate}] from [${tmpHash}]`);
					}

					// Now try to get the entity
					this.EntityProvider.getEntity(tmpEntity, tmpEntityID,
						function (pError, pRecord)
						{
							if (pError)
							{
								this.log.error(`Pict: Entity Render: Error getting entity [${tmpEntity}] with ID [${tmpEntityID}] for [${tmpHash}]: ${pError}`, pError);
								return tmpCallback(pError, '');
							}

							// Now render the template
							if (tmpEntityTemplate)
							{
								return this.parseTemplateByHash(tmpEntityTemplate, pRecord, tmpCallback);
							}
							else
							{
								return tmpCallback(null, '');
							}
						}.bind(this));
				};
			this.MetaTemplate.addPatternAsync('{~E:', '~}', fEntityRender);
			this.MetaTemplate.addPatternAsync('{~Entity:', '~}', fEntityRender);

			// {~T:Template:AddressOfData~}
			let fTemplateRender = (pHash, pData)=>
				{
					let tmpHash = pHash.trim();
					let tmpData = (typeof(pData) === 'object') ? pData : {};

					if (this.LogNoisiness > 4)
					{
						this.log.trace(`PICT Template [fTemplateRender]::[${tmpHash}] with tmpData:`, tmpData);
					}
					else if (this.LogNoisiness > 0)
					{
						this.log.trace(`PICT Template [fTemplateRender]::[${tmpHash}]`);
					}

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
						return this.parseTemplateByHash(tmpTemplateHash, this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:tmpData}, tmpAddressOfData));
					}
				};
			let fTemplateRenderAsync = (pHash, pData, fCallback)=>
				{
					let tmpHash = pHash.trim();
					let tmpData = (typeof(pData) === 'object') ? pData : {};
					let tmpCallback = (typeof(fCallback) === 'function') ? fCallback : () => { return ''; };

					if (this.LogNoisiness > 4)
					{
						this.log.trace(`PICT Template [fTemplateRenderAsync]::[${tmpHash}] with tmpData:`, tmpData);
					}
					else if (this.LogNoisiness > 0)
					{
						this.log.trace(`PICT Template [fTemplateRenderAsync]::[${tmpHash}]`);
					}

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
						this.log.warn(`Pict: Template Render Async: TemplateHash not resolved for [${tmpHash}]`);
						return `Pict: Template Render Async: TemplateHash not resolved for [${tmpHash}]`;
					}

					if (!tmpAddressOfData)
					{
						// No address was provided, just render the template with what this template has.
						// The async portion of this is a mind bender because of how entry can happen dynamically from templates
						return this.parseTemplateByHash(tmpTemplateHash, pData,
							(pError, pValue) =>
							{
								if (pError)
								{
									return tmpCallback(pError, '');
								}
								return tmpCallback(null, pValue);
							});
					}
					else
					{
						return this.parseTemplateByHash(tmpTemplateHash, this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:tmpData}, tmpAddressOfData),
							(pError, pValue) =>
							{
								if (pError)
								{
									return tmpCallback(pError, '');
								}
								return tmpCallback(null, pValue);
							});
					}
				};
			this.MetaTemplate.addPatternBoth('{~T:', '~}', fTemplateRender, fTemplateRenderAsync);
			this.MetaTemplate.addPatternBoth('{~Template:', '~}', fTemplateRender, fTemplateRenderAsync);

			// {~TS:Template:AddressOfDataSet~}
			let fTemplateSetRender = (pHash, pData)=>
				{
					let tmpHash = pHash.trim();
					let tmpData = (typeof(pData) === 'object') ? pData : {};

					if (this.LogNoisiness > 4)
					{
						this.log.trace(`PICT Template [fTemplateSetRender]::[${tmpHash}] with tmpData:`, tmpData);
					}
					else if (this.LogNoisiness > 0)
					{
						this.log.trace(`PICT Template [fTemplateSetRender]::[${tmpHash}]`);
					}

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
						return this.parseTemplateSetByHash(tmpTemplateHash, this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:tmpData}, tmpAddressOfData));
					}
				};
			let fTemplateSetRenderAsync = (pHash, pData, fCallback)=>
				{
					let tmpHash = pHash.trim();
					let tmpData = (typeof(pData) === 'object') ? pData : {};
					let tmpCallback = (typeof(fCallback) === 'function') ? fCallback : () => { return ''; };

					if (this.LogNoisiness > 4)
					{
						this.log.trace(`PICT Template [fTemplateSetRenderAsync]::[${tmpHash}] with tmpData:`, tmpData);
					}
					else if (this.LogNoisiness > 0)
					{
						this.log.trace(`PICT Template [fTemplateSetRenderAsync]::[${tmpHash}]`);
					}

					let tmpTemplateFromMapHash = false;
					let tmpAddressOfData = false;

					// This is a 3 part hash with the map address and the key address both
					let tmpTemplateHashPart = tmpHash.split(':');

					if (tmpTemplateHashPart.length < 2)
					{
						this.log.trace(`PICT TemplateFromMap [fTemplateRenderAsync]::[${tmpHash}] failed because there were not three stanzas in the expression [${pHash}]`);
						return fCallback(null, '');
					}

					tmpTemplateFromMapHash = tmpTemplateHashPart[0]
					tmpAddressOfData = tmpTemplateHashPart[1];

					// No TemplateFromMap hash
					if (!tmpTemplateFromMapHash)
					{
						this.log.warn(`Pict: TemplateFromMap Render Async: TemplateFromMapHash not resolved for [${tmpHash}]`);
						return fCallback(null, '');
					}

					// Now resolve the data
					tmpData = this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:tmpData}, tmpAddressOfData);

					if (!tmpData)
					{
						// No address was provided, just render the template with what this template has.
						// The async portion of this is a mind bender because of how entry can happen dynamically from templates
						return this.parseTemplateSetByHash(tmpTemplateFromMapHash, pData,
							(pError, pValue) =>
							{
								if (pError)
								{
									return tmpCallback(pError, '');
								}
								return tmpCallback(null, pValue);
							});
					}
					else
					{
						return this.parseTemplateSetByHash(tmpTemplateFromMapHash, tmpData,
							(pError, pValue) =>
							{
								if (pError)
								{
									return tmpCallback(pError, '');
								}
								return tmpCallback(null, pValue);
							});
					}
				};
			this.MetaTemplate.addPatternBoth('{~TS:', '~}', fTemplateSetRender, fTemplateSetRenderAsync);
			this.MetaTemplate.addPatternBoth('{~TemplateSet:', '~}', fTemplateSetRender, fTemplateSetRenderAsync);

// Refactor: #### DRY PROBLEM Too much dry needing fixed at this point
			// {~TS:Template:AddressOfDataSet~}
			let fTemplateValueSetRender = (pHash, pData)=>
				{
					let tmpHash = pHash.trim();
					let tmpData = (typeof(pData) === 'object') ? pData : {};

					if (this.LogNoisiness > 4)
					{
						this.log.trace(`PICT Template [fTemplateValueSetRender]::[${tmpHash}] with tmpData:`, tmpData);
					}
					else if (this.LogNoisiness > 0)
					{
						this.log.trace(`PICT Template [fTemplateValueSetRender]::[${tmpHash}]`);
					}

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

					tmpData = this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:tmpData}, tmpAddressOfData);

					let tmpDataValueSet = [];
					if (Array.isArray(tmpData))
					{
						for (let i = 0; i < tmpData.length; i++)
						{
							tmpDataValueSet.push({ Value: tmpData[i]});
						}
					}
					else if (typeof(tmpData) === 'object')
					{
						let tmpValueKeys = Object.keys(tmpData);
						for (let i = 0; i < tmpValueKeys.length; i++)
						{
							tmpDataValueSet.push({ Value: tmpData[tmpValueKeys[i]]});
						}
					}
					else
					{
						tmpDataValueSet.push({ Value: tmpData});
					}
					tmpData = tmpDataValueSet;

					if (!tmpData)
					{
						// No address was provided, just render the template with what this template has.
						return this.parseTemplateSetByHash(tmpTemplateHash, pData);
					}
					else
					{
						return this.parseTemplateSetByHash(tmpTemplateHash, tmpData);
					}
				};
			let fTemplateValueSetRenderAsync = (pHash, pData, fCallback)=>
				{
					let tmpHash = pHash.trim();
					let tmpData = (typeof(pData) === 'object') ? pData : {};
					let tmpCallback = (typeof(fCallback) === 'function') ? fCallback : () => { return ''; };

					if (this.LogNoisiness > 4)
					{
						this.log.trace(`PICT Template [fTemplateValueSetRenderAsync]::[${tmpHash}] with tmpData:`, tmpData);
					}
					else if (this.LogNoisiness > 0)
					{
						this.log.trace(`PICT Template [fTemplateValueSetRenderAsync]::[${tmpHash}]`);
					}

					let tmpTemplateFromMapHash = false;
					let tmpAddressOfData = false;

					// This is a 3 part hash with the map address and the key address both
					let tmpTemplateHashPart = tmpHash.split(':');

					if (tmpTemplateHashPart.length < 2)
					{
						this.log.trace(`PICT TemplateFromMap [fTemplateRenderAsync]::[${tmpHash}] failed because there were not three stanzas in the expression [${pHash}]`);
						return fCallback(null, '');
					}

					tmpTemplateFromMapHash = tmpTemplateHashPart[0]
					tmpAddressOfData = tmpTemplateHashPart[1];

					// No TemplateFromMap hash
					if (!tmpTemplateFromMapHash)
					{
						this.log.warn(`Pict: TemplateFromMap Render Async: TemplateFromMapHash not resolved for [${tmpHash}]`);
						return fCallback(null, '');
					}

					// Now resolve the data
					tmpData = this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:tmpData}, tmpAddressOfData);

					let tmpDataValueSet = [];
					if (Array.isArray(tmpData))
					{
						for (let i = 0; i < tmpData.length; i++)
						{
							tmpDataValueSet.push({ Value: tmpData[i]});
						}
					}
					else if (typeof(tmpData) === 'object')
					{
						let tmpValueKeys = Object.keys(tmpData);
						for (let i = 0; i < tmpValueKeys.length; i++)
						{
							tmpDataValueSet.push({ Value: tmpData[tmpValueKeys[i]]});
						}
					}
					else
					{
						tmpDataValueSet.push({ Value: tmpData});
					}
					tmpData = tmpDataValueSet;

					if (!tmpData)
					{
						// No address was provided, just render the template with what this template has.
						// The async portion of this is a mind bender because of how entry can happen dynamically from templates
						return this.parseTemplateSetByHash(tmpTemplateFromMapHash, pData,
							(pError, pValue) =>
							{
								if (pError)
								{
									return tmpCallback(pError, '');
								}
								return tmpCallback(null, pValue);
							});
					}
					else
					{
						return this.parseTemplateSetByHash(tmpTemplateFromMapHash, tmpData,
							(pError, pValue) =>
							{
								if (pError)
								{
									return tmpCallback(pError, '');
								}
								return tmpCallback(null, pValue);
							});
					}
				};
			this.MetaTemplate.addPatternBoth('{~TVS:', '~}', fTemplateValueSetRender, fTemplateValueSetRenderAsync);
			this.MetaTemplate.addPatternBoth('{~TemplateValueSet:', '~}', fTemplateValueSetRender, fTemplateValueSetRenderAsync);

			// {~T:TemplateFromMap:AddressOfData~}
			let fTemplateFromMapRender = (pHash, pData)=>
				{
					let tmpHash = pHash.trim();
					let tmpData = (typeof(pData) === 'object') ? pData : {};

					if (this.LogNoisiness > 4)
					{
						this.log.trace(`PICT TemplateFromMap [fTemplateFromMapRender]::[${tmpHash}] with tmpData:`, tmpData);
					}
					else if (this.LogNoisiness > 0)
					{
						this.log.trace(`PICT TemplateFromMap [fTemplateFromMapRender]::[${tmpHash}]`);
					}

					let tmpTemplateFromMapHash = false;
					let tmpAddressOfMap = false;
					let tmpAddressOfKey = false;

					// This is a 3 part hash with the map address and the key address both
					let tmpTemplateHashPart = tmpHash.split(':');

					if (tmpTemplateHashPart.length < 3)
					{
						this.log.trace(`PICT TemplateFromMap [fTemplateFromMapRenderAsync]::[${tmpHash}] failed because there were not three stanzas in the expression [${pHash}]`);
						return ''
					}

					tmpTemplateFromMapHash = tmpTemplateHashPart[0];
					tmpAddressOfMap = tmpTemplateHashPart[1];
					tmpAddressOfKey = tmpTemplateHashPart[2];

					// No TemplateFromMap hash
					if (!tmpTemplateFromMapHash)
					{
						this.log.warn(`Pict: TemplateFromMap Render: TemplateFromMapHash not resolved for [${tmpHash}]`);
						return '';
					}

					// Now resolve the data
					let tmpMap = this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:tmpData}, tmpAddressOfMap);
					let tmpKey = this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:tmpData}, tmpAddressOfKey);

					if (!tmpMap)
					{
						this.log.warn(`Pict: TemplateFromMap Render: Map not resolved for [${tmpHash}]`);
						return '';
					}

					tmpData = tmpMap[tmpKey];

					if (!tmpData)
					{
						// No address was provided, just render the TemplateFromMap with what this TemplateFromMap has.
						return this.parseTemplateByHash(tmpTemplateFromMapHash, pData);
					}
					else
					{
						return this.parseTemplateByHash(tmpTemplateFromMapHash, tmpData);
					}
				};
			let fTemplateFromMapRenderAsync = (pHash, pData, fCallback)=>
				{
					let tmpHash = pHash.trim();
					let tmpData = (typeof(pData) === 'object') ? pData : {};
					let tmpCallback = (typeof(fCallback) === 'function') ? fCallback : () => { return ''; };

					if (this.LogNoisiness > 4)
					{
						this.log.trace(`PICT TemplateFromMap [fTemplateFromMapRenderAsync]::[${tmpHash}] with tmpData:`, tmpData);
					}
					else if (this.LogNoisiness > 0)
					{
						this.log.trace(`PICT TemplateFromMap [fTemplateFromMapRenderAsync]::[${tmpHash}]`);
					}

					let tmpTemplateFromMapHash = false;
					let tmpAddressOfMap = false;
					let tmpAddressOfKey = false;

					// This is a 3 part hash with the map address and the key address both
					let tmpTemplateHashPart = tmpHash.split(':');

					if (tmpTemplateHashPart.length < 3)
					{
						this.log.trace(`PICT TemplateFromMap [fTemplateFromMapRenderAsync]::[${tmpHash}] failed because there were not three stanzas in the expression [${pHash}]`);
						return fCallback(null, '');
					}

					tmpTemplateFromMapHash = tmpTemplateHashPart[0];
					tmpAddressOfMap = tmpTemplateHashPart[1];
					tmpAddressOfKey = tmpTemplateHashPart[2];

					// No TemplateFromMap hash
					if (!tmpTemplateFromMapHash)
					{
						this.log.warn(`Pict: TemplateFromMap Render Async: TemplateFromMapHash not resolved for [${tmpHash}]`);
						return fCallback(null, '');
					}

					// Now resolve the data
					let tmpMap = this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:tmpData}, tmpAddressOfMap);
					let tmpKey = this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:tmpData}, tmpAddressOfKey);

					if (!tmpMap)
					{
						this.log.warn(`Pict: TemplateFromMap Render: Map not resolved for [${tmpHash}]`);
						return fCallback(null, '');
					}

					tmpData = tmpMap[tmpKey];

					if (!tmpData)
					{
						// No address was provided, just render the TemplateFromMap with what this TemplateFromMap has.
						// The async portion of this is a mind bender because of how entry can happen dynamically from TemplateFromMaps
						return this.parseTemplateByHash(tmpTemplateFromMapHash, pData,
							(pError, pValue) =>
							{
								if (pError)
								{
									return tmpCallback(pError, '');
								}
								return tmpCallback(null, pValue);
							});
					}
					else
					{
						return this.parseTemplateByHash(tmpTemplateFromMapHash, tmpData,
							(pError, pValue) =>
							{
								if (pError)
								{
									return tmpCallback(pError, '');
								}
								return tmpCallback(null, pValue);
							});
					}
				};
			this.MetaTemplate.addPatternBoth('{~TFM:', '~}', fTemplateFromMapRender, fTemplateFromMapRenderAsync);
			this.MetaTemplate.addPatternBoth('{~TemplateFromMap:', '~}', fTemplateFromMapRender, fTemplateFromMapRenderAsync);

			// {~TS:TemplateFromMap:AddressOfDataSet~}
			let fTemplateFromMapSetRender = (pHash, pData)=>
				{
					let tmpHash = pHash.trim();
					let tmpData = (typeof(pData) === 'object') ? pData : {};

					if (this.LogNoisiness > 4)
					{
						this.log.trace(`PICT TemplateFromMap [fTemplateFromMapSetRender]::[${tmpHash}] with tmpData:`, tmpData);
					}
					else if (this.LogNoisiness > 0)
					{
						this.log.trace(`PICT TemplateFromMap [fTemplateFromMapSetRender]::[${tmpHash}]`);
					}

					let tmpTemplateFromMapHash = false;
					let tmpAddressOfMap = false;
					let tmpAddressOfKey = false;

					// This is a 3 part hash with the map address and the key address both
					let tmpTemplateHashPart = tmpHash.split(':');

					if (tmpTemplateHashPart.length < 3)
					{
						this.log.trace(`PICT TemplateFromMap [fTemplateFromMapRenderAsync]::[${tmpHash}] failed because there were not three stanzas in the expression [${pHash}]`);
						return '';
					}

					tmpTemplateFromMapHash = tmpTemplateHashPart[0];
					tmpAddressOfMap = tmpTemplateHashPart[1];
					tmpAddressOfKey = tmpTemplateHashPart[2];

					// No TemplateFromMap hash
					if (!tmpTemplateFromMapHash)
					{
						this.log.warn(`Pict: TemplateFromMap Render Async: TemplateFromMapHash not resolved for [${tmpHash}]`);
						return '';
					}

					// Now resolve the data
					let tmpMap = this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:tmpData}, tmpAddressOfMap);
					let tmpKey = this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:tmpData}, tmpAddressOfKey);

					if (!tmpMap)
					{
						this.log.warn(`Pict: TemplateFromMap Render: Map not resolved for [${tmpHash}]`);
						return '';
					}

					tmpData = tmpMap[tmpKey];

					if (!tmpData)
					{
						// No address was provided, just render the TemplateFromMap with what this TemplateFromMap has.
						return this.parseTemplateSetByHash(tmpTemplateFromMapHash, pData);
					}
					else
					{
						return this.parseTemplateSetByHash(tmpTemplateFromMapHash, tmpData);
					}
				};
			let fTemplateFromMapSetRenderAsync = (pHash, pData, fCallback)=>
				{
					let tmpHash = pHash.trim();
					let tmpData = (typeof(pData) === 'object') ? pData : {};
					let tmpCallback = (typeof(fCallback) === 'function') ? fCallback : () => { return ''; };

					if (this.LogNoisiness > 4)
					{
						this.log.trace(`PICT TemplateFromMap [fTemplateFromMapSetRenderAsync]::[${tmpHash}] with tmpData:`, tmpData);
					}
					else if (this.LogNoisiness > 0)
					{
						this.log.trace(`PICT TemplateFromMap [fTemplateFromMapSetRenderAsync]::[${tmpHash}]`);
					}

					let tmpTemplateFromMapHash = false;
					let tmpAddressOfMap = false;
					let tmpAddressOfKey = false;

					// This is a 3 part hash with the map address and the key address both
					let tmpTemplateHashPart = tmpHash.split(':');

					if (tmpTemplateHashPart.length < 3)
					{
						this.log.trace(`PICT TemplateFromMap [fTemplateFromMapRenderAsync]::[${tmpHash}] failed because there were not three stanzas in the expression [${pHash}]`);
						return fCallback(null, '');
					}

					tmpTemplateFromMapHash = tmpTemplateHashPart[0];
					tmpAddressOfMap = tmpTemplateHashPart[1];
					tmpAddressOfKey = tmpTemplateHashPart[2];

					// No TemplateFromMap hash
					if (!tmpTemplateFromMapHash)
					{
						this.log.warn(`Pict: TemplateFromMapSet Render Async: TemplateFromMapHash not resolved for [${tmpHash}]`);
						return fCallback(null, '');
					}

					// Now resolve the data
					let tmpMap = this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:tmpData}, tmpAddressOfMap);
					let tmpKey = this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:tmpData}, tmpAddressOfKey);

					if (!tmpMap)
					{
						this.log.warn(`Pict: TemplateFromMapSet Render: Map not resolved for [${tmpHash}]`);
						return fCallback(null, '');
					}

					tmpData = tmpMap[tmpKey];

					if (!tmpData)
					{
						// No address was provided, just render the TemplateFromMap with what this TemplateFromMap has.
						// The async portion of this is a mind bender because of how entry can happen dynamically from TemplateFromMaps
						return this.parseTemplateSetByHash(tmpTemplateFromMapHash, pData,
							(pError, pValue) =>
							{
								if (pError)
								{
									return tmpCallback(pError, '');
								}
								return tmpCallback(null, pValue);
							});
					}
					else
					{
						return this.parseTemplateSetByHash(tmpTemplateFromMapHash, tmpData,
							(pError, pValue) =>
							{
								if (pError)
								{
									return tmpCallback(pError, '');
								}
								return tmpCallback(null, pValue);
							});
					}
				};
			this.MetaTemplate.addPatternBoth('{~TSFM:', '~}', fTemplateFromMapSetRender, fTemplateFromMapSetRenderAsync);
			this.MetaTemplate.addPatternBoth('{~TemplateSetFromMap:', '~}', fTemplateFromMapSetRender, fTemplateFromMapSetRenderAsync);
// Refactor: #### END OF DRY PROBLEM

			let fDataValueTree = (pHash, pData)=>
				{
					let tmpData = (typeof(pData) === 'object') ? pData : {};
					tmpData.TemplateHash = pHash.trim();

					tmpData.ValueTreeParameters = tmpData.TemplateHash.split('^');
					if (tmpData.ValueTreeParameters.length < 1)
					{
						return '';
					}
					tmpData.ResolvedValue = this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:tmpData}, tmpData.ValueTreeParameters[0]);
					tmpData.ResolvedValueType = typeof(tmpData.ResolvedValue);


					try
					{
						tmpData.TreeMaxDepth = (tmpData.ValueTreeParameters.length < 2) ? 1 : parseInt(tmpData.ValueTreeParameters[1]);
					}
					catch
					{
						tmpData.TreeMaxDepth = 1;
					}

					let tmpPictObjectWrapTemplate = this.TemplateProvider.getTemplate('PICT-Object-Wrap');
					if (!tmpPictObjectWrapTemplate)
					{
						// This template is here because it is a default template.  Users can override this template by providing their own as PICT-Object-Wrap
						tmpPictObjectWrapTemplate = `<div class="PICT PICTObjectSet">{~D:Record.ObjectValueTree~}</div>`;
					}

					if (tmpData.ResolvedValueType == 'object')
					{
						tmpData.ObjectValueTree = fDataValueTreeObjectSet(tmpData.ResolvedValue, tmpData.ResolvedValue, 0, tmpData.TreeMaxDepth);
					}
					else
					{
						this.log.trace(`PICT Template Log Value Tree: [${tmpData.TemplateHash}] resolved data is not an object.`, tmpData.ResolvedValue);
						tmpData.ObjectValueTree = tmpData.ResolveValue;
					}

					return this.parseTemplate(tmpPictObjectWrapTemplate, tmpData);
				};
			let fDataValueTreeObjectSet = (pObject, pRootObject, pCurrentDepth, pMaxDepth)=>
				{
					let tmpTemplateResult = '';

					if (typeof(pObject) !== 'object')
					{
						return tmpTemplateResult;
					}

					let tmpObjectValueKeys = Object.keys(pObject);

					let tmpPictObjectBranchTemplate = this.TemplateProvider.getTemplate('PICT-Object-Branch');
					if (!tmpPictObjectBranchTemplate)
					{
						// This template is here because it is a default template.  Users can override this template by providing their own as PICT-Object-Branch
						tmpPictObjectBranchTemplate = `
<div class="PICTObjectBranchDepth_{~D:Record.CurrentDepth~}"><div class="PICTObjectBranch">{~D:Record.BranchKey~}</div><div class="PICTObjectBranchValue">{~D:Record.BranchValue~}</div></div>
`
					}

					for (let i = 0; i < tmpObjectValueKeys.length; i++)
					{
						let tmpBranchType = typeof(pObject[tmpObjectValueKeys[i]]);

						let tmpBranchValue = '';

						switch(tmpBranchType)
						{
							case 'object':
								if (pCurrentDepth + 1 > pMaxDepth)
								{
									tmpBranchValue = '...';
								}
								else
								{
									tmpBranchValue = fDataValueTreeObjectSet(pObject[tmpObjectValueKeys[i]], pRootObject, pCurrentDepth + 1, pMaxDepth);
								}
								break;

							default:
								tmpBranchValue = pObject[tmpObjectValueKeys[i]];
								break;
						}

						let tmpDataValue = 
							{
								AppData:this.AppData,
								Bundle:this.Bundle,

								RootContainer:pRootObject,

								Container:pObject,
								BranchEntryCount:tmpObjectValueKeys.length,

								BranchIndex:i,
								BranchKey: tmpObjectValueKeys[i],
								BranchValue: tmpBranchValue,
								BranchDataType: tmpBranchType,

								CurrentDepth: pCurrentDepth,
								MaxDepth: pMaxDepth
							};
						tmpTemplateResult += this.parseTemplate(tmpPictObjectBranchTemplate, tmpDataValue);
					}

					return tmpTemplateResult;
				};
			this.MetaTemplate.addPattern('{~DataTree:', '~}',fDataValueTree);
			this.MetaTemplate.addPattern('{~DT:', '~}',fDataValueTree);

			//{~Data:AppData.Some.Value.to.Render~}
			let fDataRender = (pHash, pData)=>
				{
					let tmpHash = pHash.trim();
					let tmpData = (typeof(pData) === 'object') ? pData : {};

					if (this.LogNoisiness > 4)
					{
						this.log.trace(`PICT Template [fDataRender]::[${tmpHash}] with tmpData:`, tmpData);
					}
					else if (this.LogNoisiness > 3)
					{
						this.log.trace(`PICT Template [fDataRender]::[${tmpHash}]`);
					}

					let tmpValue = '';
					if (tmpHash != null)
					{
						tmpValue = this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:tmpData}, tmpHash);
					}
					if ((tmpValue == null) || (tmpValue == 'undefined') || (typeof(tmpValue) == 'undefined'))
					{
						return '';
					}
					return tmpValue;
				};
			this.MetaTemplate.addPattern('{~D:', '~}', fDataRender);
			this.MetaTemplate.addPattern('{~Data:', '~}', fDataRender);


			//<p>{~Join: - ^Record.d1^Record.d1~}</p>
			let fJoinDataRender = (pHash, pData)=>
				{
					let tmpHash = pHash;
					let tmpData = (typeof(pData) === 'object') ? pData : {};

					if (this.LogNoisiness > 4)
					{
						this.log.trace(`PICT Join [fDataRender]::[${tmpHash}] with tmpData:`, tmpData);
					}
					else if (this.LogNoisiness > 3)
					{
						this.log.trace(`PICT Join [fDataRender]::[${tmpHash}]`);
					}

					let tmpDataAddresses = tmpHash.split('^');
					if (tmpDataAddresses.length < 2)
					{
						return '';
					}

					// Get the separator string
					let tmpSeparator = tmpDataAddresses.shift();

					let tmpValueList = [];
					for (let i = 0; i < tmpDataAddresses.length; i++)
					{
						let tmpValue = this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:tmpData}, tmpDataAddresses[i]);
						if (tmpValue)
						{
							tmpValueList.push(tmpValue);
						}
					}

					return tmpValueList.join(tmpSeparator);
				};
			this.MetaTemplate.addPattern('{~J:', '~}', fJoinDataRender);
			this.MetaTemplate.addPattern('{~Join:', '~}', fJoinDataRender);

			//<p>{~JoinUnique: - ^Record.d1^Record.d1~}</p>
			let fJoinUniqueDataRender = (pHash, pData)=>
				{
					let tmpHash = pHash;
					let tmpData = (typeof(pData) === 'object') ? pData : {};

					if (this.LogNoisiness > 4)
					{
						this.log.trace(`PICT Join Unique [fDataRender]::[${tmpHash}] with tmpData:`, tmpData);
					}
					else if (this.LogNoisiness > 3)
					{
						this.log.trace(`PICT Join Unique [fDataRender]::[${tmpHash}]`);
					}

					let tmpDataAddresses = tmpHash.split('^');
					if (tmpDataAddresses.length < 2)
					{
						return '';
					}

					// Get the separator string
					let tmpSeparator = tmpDataAddresses.shift();

					let tmpValueList = [];
					let tmpValueMap = {};
					for (let i = 0; i < tmpDataAddresses.length; i++)
					{
						let tmpValue = this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:tmpData}, tmpDataAddresses[i]);
						if (tmpValue)
						{
							if (!tmpValueMap.hasOwnProperty(tmpValue))
							{
								tmpValueMap[tmpValue] = true;
								tmpValueList.push(tmpValue);
							}
						}
					}

					return tmpValueList.join(tmpSeparator);
				};
			this.MetaTemplate.addPattern('{~JU:', '~}', fJoinUniqueDataRender);
			this.MetaTemplate.addPattern('{~JoinUnique:', '~}', fJoinUniqueDataRender);

			this.MetaTemplate.addPattern('{~Dollars:', '~}',
				(pHash, pData)=>
				{
					let tmpHash = pHash.trim();
					let tmpData = (typeof(pData) === 'object') ? pData : {};

					if (this.LogNoisiness > 4)
					{
						this.log.trace(`PICT Template [fDollars]::[${tmpHash}] with tmpData:`, tmpData);
					}
					else if (this.LogNoisiness > 3)
					{
						this.log.trace(`PICT Template [fDollars]::[${tmpHash}]`);
					}

					let tmpColumnData = this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:tmpData}, tmpHash);
					return this.DataFormat.formatterDollars(tmpColumnData);
				});
			this.MetaTemplate.addPattern('{~Digits:', '~}',
				(pHash, pData)=>
				{
					let tmpHash = pHash.trim();
					let tmpData = (typeof(pData) === 'object') ? pData : {};

					if (this.LogNoisiness > 4)
					{
						this.log.trace(`PICT Template [fDigits]::[${tmpHash}] with tmpData:`, tmpData);
					}
					else if (this.LogNoisiness > 3)
					{
						this.log.trace(`PICT Template [fDigits]::[${tmpHash}]`);
					}

					let tmpColumnData = this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:tmpData}, tmpHash);
					return this.DataFormat.formatterAddCommasToNumber(this.DataFormat.formatterRoundNumber(tmpColumnData, 2));
				});
			
			// Output the date as a YYYY-MM-DD string
			this.MetaTemplate.addPattern('{~DateYMD:', '~}',
				(pHash, pData)=>
				{
					let tmpHash = pHash.trim();
					let tmpData = (typeof(pData) === 'object') ? pData : {};
					let tmpDateValue = this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:tmpData}, tmpHash);


					if (this.LogNoisiness > 4)
					{
						this.log.trace(`PICT Template [fDateFormat]::[${tmpHash}] with tmpData:`, tmpData);
					}
					else if (this.LogNoisiness > 3)
					{
						this.log.trace(`PICT Template [fDateFormat]::[${tmpHash}]`);
					}

					// TODO: Modularize this
					let tmpDayJS = this.fable.Dates.dayJS.utc(tmpDateValue);
					try
					{
						// Try to cast the day to be a specific timezone if one is set for the app
						if (this.options.Timezone)
						{
							tmpDayJS = tmpDayJS.tz(this.options.Timezone);
						}
						else
						{
							try
							{
								tmpDayJS = tmpDayJS.tz(this.fable.Dates.dayJS.tz.guess());
							}
							catch (pError)
							{
								this.log.error(`Error guessing dayJS guess() function; dates may be formatted to GMT by default.`);
							}
						}
					}
					catch
					{
						//this.log.error(`Error casting timezone using tz .. casting to the browser guess which is [${this.fable.Dates.dayJS.tz.guess()}].`);
						// Day.js will try to guess the user's timezone for us
						try
						{
							tmpDayJS = tmpDayJS.tz(this.fable.Dates.dayJS.tz.guess());
						}
						catch (pError)
						{
							this.log.error(`Error guessing dayJS guess() function; dates may be formatted to GMT by default.`);
						}
					}

					return tmpDayJS.format('YYYY-MM-DD');
				});

			
			// Output the date as a YYYY-MM-DD string
			// Takes in the format as the second parameter: {~DateYMD:AppData.Some.Date^YYYY-MM-DD~}
			this.MetaTemplate.addPattern('{~DateFormat:', '~}',
				(pHash, pData)=>
				{
					let tmpHash = pHash.trim();
					let tmpData = (typeof(pData) === 'object') ? pData : {};
					let tmpDateValueSet = tmpHash.split('^');

					if (tmpDateValueSet.length < 2)
					{
						this.log.error(`PICT Template [fDateFormat]::[${tmpHash}] did not have a valid format string and date.`);
						return '';
					}

					let tmpDateValue = this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:tmpData}, tmpDateValueSet[0]);

					if (this.LogNoisiness > 4)
					{
						this.log.trace(`PICT Template [fDateFormat]::[${tmpHash}] with tmpData:`, tmpData);
					}
					else if (this.LogNoisiness > 3)
					{
						this.log.trace(`PICT Template [fDateFormat]::[${tmpHash}]`);
					}

					// TODO: Modularize this
					let tmpDayJS = this.fable.Dates.dayJS.utc(tmpDateValue);
					try
					{
						// Try to cast the day to be a specific timezone if one is set for the app
						if (this.options.Timezone)
						{
							tmpDayJS = tmpDayJS.tz(this.options.Timezone);
						}
						else
						{
							try
							{
								tmpDayJS = tmpDayJS.tz(this.fable.Dates.dayJS.tz.guess());
							}
							catch (pError)
							{
								this.log.error(`Error guessing dayJS guess() function; dates may be formatted to GMT by default.`);
							}
						}
					}
					catch
					{
						//this.log.error(`Error casting date passed timezone using tz .. casting to the browser guess which is [${this.fable.Dates.dayJS.tz.guess()}].`);
						// Day.js will try to guess the user's timezone for us
						try
						{
							tmpDayJS = tmpDayJS.tz(this.fable.Dates.dayJS.tz.guess());
						}
						catch (pError)
						{
							this.log.error(`Error guessing dayJS guess() function; dates may be formatted to GMT by default.`);
						}
					}

					return tmpDayJS.format(tmpDateValueSet[1]);
				});
			// {NE~Some.Address|If the left value is truthy, render this value.~}
			let fNotEmptyRender = (pHash, pData)=>
				{
					let tmpHash = pHash.trim();
					let tmpData = (typeof(pData) === 'object') ? pData : {};

					if (this.LogNoisiness > 4)
					{
						this.log.trace(`PICT Template [fNotEmptyRender]::[${tmpHash}] with tmpData:`, tmpData);
					}
					else if (this.LogNoisiness > 2)
					{
						this.log.trace(`PICT Template [fNotEmptyRender]::[${tmpHash}]`);
					}

					// Should switch this to indexOf so pipes can be in the content.
					let tmpHashParts = tmpHash.split('|');

					// For now just check truthiness
					if (this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:tmpData}, tmpHashParts[0]))
					{
						return tmpHashParts[1];
					}
					else
					{
						return '';
					}
				};
			this.MetaTemplate.addPattern('{~NotEmpty:', '~}', fNotEmptyRender);
			this.MetaTemplate.addPattern('{~NE:', '~}', fNotEmptyRender);

			let fRandomNumberString = (pHash, pData)=>
				{
					let tmpHash = pHash.trim();

					if (this.LogNoisiness > 3)
					{
						this.log.trace(`PICT Template [fRandomNumberString]::[${tmpHash}]`);
					}

					let tmpStringLength = 4;
					let tmpMaxNumber = 9999;

					if (tmpHash.length > 0)
					{
						let tmpHashParts = tmpHash.split(',');
						if (tmpHashParts.length > 0)
						{
							try
							{
								tmpStringLength = parseInt(tmpHashParts[0]);								
							}
							catch
							{
								tmpStringLength = 4;
							}
						}
						if (tmpHashParts.length > 1)
						{
							try
							{
								tmpMaxNumber = parseInt(tmpHashParts[1]);
							}
							catch
							{
								tmpMaxNumber = 9999;
							}
						}
					}

					return this.DataGeneration.randomNumericString(tmpStringLength, tmpMaxNumber);
				};
			this.MetaTemplate.addPattern('{~RandomNumberString:', '~}',fRandomNumberString);
			this.MetaTemplate.addPattern('{~RNS:', '~}',fRandomNumberString);

			let fRandomNumber = (pHash, pData)=>
				{
					let tmpHash = pHash.trim();

					if (this.LogNoisiness > 3)
					{
						this.log.trace(`PICT Template [fRandomNumber]::[${tmpHash}]`);
					}

					let tmpMinimumNumber = 0;
					let tmpMaxNumber = 9999999;

					if (tmpHash.length > 0)
					{
						let tmpHashParts = tmpHash.split(',');
						if (tmpHashParts.length > 0)
						{
							try
							{
								tmpMinimumNumber = parseInt(tmpHashParts[0]);
							}
							catch
							{
								tmpMinimumNumber = 0;
							}
						}
						if (tmpHashParts.length > 1)
						{
							try
							{
								tmpMaxNumber = parseInt(tmpHashParts[1]);
							}
							catch
							{
								tmpMaxNumber = 9999999;
							}

						}
					}

					return this.DataGeneration.randomIntegerBetween(tmpMinimumNumber, tmpMaxNumber);
				};
			this.MetaTemplate.addPattern('{~RandomNumber:', '~}',fRandomNumber);
			this.MetaTemplate.addPattern('{~RN:', '~}',fRandomNumber);

			let fPascalCaseIdentifier = (pHash, pData)=>
				{
					let tmpHash = pHash.trim();
					let tmpData = (typeof(pData) === 'object') ? pData : {};

					if (this.LogNoisiness > 4)
					{
						this.log.trace(`PICT Template [fPascalCaseIdentifier]::[${tmpHash}] with tmpData:`, tmpData);
					}
					else if (this.LogNoisiness > 3)
					{
						this.log.trace(`PICT Template [fPascalCaseIdentifier]::[${tmpHash}]`);
					}

					let tmpValue = this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:tmpData}, tmpHash);
					if ((tmpValue == null) || (tmpValue == 'undefined') || (typeof(tmpValue) == 'undefined'))
					{
						return '';
					}
					return this.DataFormat.cleanNonAlphaCharacters(this.DataFormat.capitalizeEachWord(tmpValue));
				};
			this.MetaTemplate.addPattern('{~PascalCaseIdentifier:', '~}',fPascalCaseIdentifier);

			let fLogValue = (pHash, pData)=>
				{
					let tmpHash = pHash.trim();
					let tmpData = (typeof(pData) === 'object') ? pData : {};

					let tmpValue = this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:tmpData}, tmpHash);
					let tmpValueType = typeof(tmpValue);
					if ((tmpValue == null) || (tmpValueType == 'undefined'))
					{
						this.log.trace(`PICT Template Log Value: [${tmpHash}] is ${tmpValueType}.`);
					}
					else if (tmpValueType == 'object')
					{
						this.log.trace(`PICT Template Log Value: [${tmpHash}] is an object.`, tmpValue);
					}
					else
					{
						this.log.trace(`PICT Template Log Value: [${tmpHash}] is a ${tmpValueType} = [${tmpValue}]`);
					}
					return '';
				};
			this.MetaTemplate.addPattern('{~LogValue:', '~}',fLogValue);
			this.MetaTemplate.addPattern('{~LV:', '~}',fLogValue);


			let fLogValueTree = (pHash, pData)=>
				{
					let tmpData = (typeof(pData) === 'object') ? pData : {};
					tmpData.TemplateHash = pHash.trim();

					tmpData.ValueTreeParameters = tmpData.TemplateHash.split('^');
					if (tmpData.ValueTreeParameters.length < 1)
					{
						return '';
					}
					tmpData.ResolvedValue = this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:tmpData}, tmpData.ValueTreeParameters[0]);
					tmpData.ResolvedValueType = typeof(tmpData.ResolvedValue);


					try
					{
						tmpData.TreeMaxDepth = (tmpData.ValueTreeParameters.length < 2) ? 1 : parseInt(tmpData.ValueTreeParameters[1]);
					}
					catch
					{
						tmpData.TreeMaxDepth = 1;
					}

					if (tmpData.ResolvedValueType == 'object')
					{
						fLogValueTreeObjectSet(tmpData.ResolvedValue, tmpData.ValueTreeParameters[0], tmpData.ResolvedValue, 0, tmpData.TreeMaxDepth);
					}
					else
					{
						this.log.trace(`PICT Template Log Value Tree: [${tmpData.TemplateHash}] resolved data is not an object.`, tmpData.ResolvedValue);
					}

					return '';
				};
			let fLogValueTreeObjectSet = (pObject, pBaseAddress, pRootObject, pCurrentDepth, pMaxDepth)=>
				{
					let tmpTemplateResult = '';

					if (typeof(pObject) !== 'object')
					{
						return tmpTemplateResult;
					}

					let tmpObjectValueKeys = Object.keys(pObject);

					for (let i = 0; i < tmpObjectValueKeys.length; i++)
					{
						let tmpBranchType = typeof(pObject[tmpObjectValueKeys[i]]);
						let tmpBranchValue = '';

						switch(tmpBranchType)
						{
							case 'object':
								tmpBranchValue = '...';
								break;

							default:
								tmpBranchValue = pObject[tmpObjectValueKeys[i]];
								break;
						}
						this.log.trace(`[${pBaseAddress}.${tmpObjectValueKeys[i]}] (${tmpBranchType}):  ${tmpBranchValue}`);

						if (pCurrentDepth + 1 > pMaxDepth)
						{
							return '';
						}
						else if (tmpBranchType == 'object')
						{
							tmpBranchValue = fLogValueTreeObjectSet(pObject[tmpObjectValueKeys[i]], `${pBaseAddress}.${tmpObjectValueKeys[i]}`, pRootObject, pCurrentDepth + 1, pMaxDepth);
						}
					}

					return '';
				};
			this.MetaTemplate.addPattern('{~LogValueTree:', '~}',fLogValueTree);
			this.MetaTemplate.addPattern('{~LVT:', '~}',fLogValueTree);

			let fLogStatement = (pHash, pData)=>
				{
					let tmpHash = pHash.trim();
					this.log.trace(`PICT Template Log Message: ${tmpHash}`);
					return '';
				};
			this.MetaTemplate.addPattern('{~LogStatement:', '~}',fLogStatement);
			this.MetaTemplate.addPattern('{~LS:', '~}',fLogStatement);

			let fBreakpoint = (pHash, pData)=>
				{
					let tmpHash = pHash.trim();
					let tmpError = new Error(`PICT Template Breakpoint: ${tmpHash}`);
					this.log.trace(`PICT Template Breakpoint: ${tmpHash}`, tmpError.stack);
					debugger;
					return '';
				};
			this.MetaTemplate.addPattern('{~Breakpoint', '~}',fBreakpoint);

			this._DefaultPictTemplatesInitialized = true;
		}
	}

	parseTemplate (pTemplateString, pData, fCallback)
	{
		let tmpData = (typeof(pData) === 'object') ? pData : {};
		let tmpParseUUID;
		if (this.LogControlFlow)
		{
			tmpParseUUID = this.fable.getUUID();
			this.log.info(`PICT-ControlFlow parseTemplate ${tmpParseUUID} [${pTemplateString.substring(0, 50).replace('\n', '\\n')}...${pTemplateString.length}] (fCallback: ${typeof(fCallback)}) with data size [${JSON.stringify(tmpData).length}]`);
			if (this.LogNoisiness > 1)
			{
				this.log.info(`PICT-ControlFlow parseTemplate ${tmpParseUUID} template:\n${pTemplateString}`);
			}
			if (this.LogControlFlowWatchAddressList.length > 0)
			{
				for (let i = 0; i < this.LogControlFlowWatchAddressList.length; i++)
				{
					this.log.info(`PICT-ControlFlow parseTemplate ${tmpParseUUID} Watch Value: [${this.LogControlFlowWatchAddressList[i]}]=>[${this.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:tmpData}, this.LogControlFlowWatchAddressList[i])}]`);
				}
			}
		}

		if (typeof(fCallback) === 'function')
		{
			this.MetaTemplate.parseString(pTemplateString, tmpData,
				(pError, pParsedTemplate) =>
				{
					if (this.LogControlFlow && this.LogNoisiness > 1)
					{
						this.log.info(`PICT-ControlFlow parseTemplate ${tmpParseUUID} Template Async Return Value:\n${pParsedTemplate}`);
					}
					return fCallback(pError, pParsedTemplate);
				});			
		}
		else
		{
			let tmpResult = this.MetaTemplate.parseString(pTemplateString, tmpData);
			if (this.LogControlFlow && this.LogNoisiness > 1)
			{
					this.log.info(`PICT-ControlFlow parseTemplate ${tmpParseUUID} Template Return Value:\n${tmpResult}`);
			}
			return tmpResult;
		}
	}

	parseTemplateByHash (pTemplateHash, pData, fCallback)
	{
		let tmpTemplateString = this.TemplateProvider.getTemplate(pTemplateHash);

		// TODO: Unsure if returning empty is always the right behavior -- if it isn't we will use config to set the behavior
		if (!tmpTemplateString)
		{
			tmpTemplateString = '';
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
				this.Utility.eachLimit(pDataSet, 1,
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
		let tmpTemplateString = this.TemplateProvider.getTemplate(pTemplateHash);

		// TODO: Unsure if returning empty is always the right behavior -- if it isn't we will use config to set the behavior
		if (!tmpTemplateString)
		{
			tmpTemplateString = '';
		}
		return this.parseTemplateSet(tmpTemplateString, pDataSet, fCallback);
	}
};

module.exports = Pict;

module.exports.PictApplicationClass = require('pict-application');
module.exports.PictViewClass = require('pict-view');

module.exports.EnvironmentLog = require('./environments/Pict-Environment-Log.js');
module.exports.EnvironmentObject = require('./environments/Pict-Environment-Object.js');

// This is to help understand the type of enivironement we're executing in
module.exports.isBrowser = new Function("try {return (this===window);} catch(pError) {return false;}");