/**
* @author <steven@velozo.com>
*/
const libFable = require('fable');
const PictTemplateProvider = require('./Pict-Template-Provider.js');
const PictContentAssignment = require('./Pict-Content-Assignment.js');
const PictDataProvider = require('./Pict-DataProvider.js');
const PictCSS = require('./Pict-CSS.js');
const PictMeadowEntityProvider = require('./Pict-Meadow-EntityProvider.js');

/**
 * Pict management object.
 */
class Pict extends libFable
{
	/**
	 * @param {Object} pSettings - The settings for the Pict instance.
	 */
	constructor(pSettings)
	{
		super(pSettings);

		this.isBrowser = new Function("try {return (this===window);} catch(pError) {return false;}");

		/**
		 * The templateProvider provides a basic key->template mapping with default fallback capabilities
		 *
		 * @type {PictTemplateProvider}
		 */
		this.TemplateProvider = null;
		this.addAndInstantiateServiceType('TemplateProvider', PictTemplateProvider);
		/**
		 * The meadow entity provider.
		 *
		 * @type {PictMeadowEntityProvider}
		 */
		this.EntityProvider = null;
		this.addAndInstantiateServiceType('EntityProvider', PictMeadowEntityProvider);
		/**
		 * The data provider.
		 *
		 * @type {PictDataProvider}
		 */
		this.DataProvider = null;
		this.addAndInstantiateServiceType('DataProvider', PictDataProvider);
		/**
		 * The content assignment module.
		 *
		 * @type {PictContentAssignment}
		 */
		this.ContentAssignment = null;
		this.addAndInstantiateServiceType('ContentAssignment', PictContentAssignment);
		/**
		 * The CSS module.
		 *
		 * @type {PictCSS}
		 * @public
		 */
		this.CSSMap = null;
		this.addAndInstantiateServiceType('CSSMap', PictCSS);

		this.addServiceType('PictTemplate', require('./Pict-Template.js'));
		this.instantiateServiceProvider('MetaTemplate');
		this.instantiateServiceProvider('DataGeneration');

		this.manifest = this.instantiateServiceProvider('Manifest');

		this.AppData = {};
		if (this.fable.settings.hasOwnProperty('DefaultAppData'))
		{
			this.AppData = this.fable.settings.DefaultAppData;
		}

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

		this.addServiceType('PictView', require('pict-view'));
		this.addServiceType('PictProvider', require('pict-provider'));
		this.addServiceType('PictApplication', require('pict-application'));

		// Expose the named views directly, through a convenience accessor
		this.providers = this.servicesMap.PictProvider;
		this.views = this.servicesMap.PictView;
	}

	/**
	 * Load manifests in as Hashed services
	 *
	 * @param {Object} pManifestSet - The manifest set to load.
	 */
	loadManifestSet(pManifestSet)
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

	/**
	 * Add a template expression to the template engine from the PictTemplate service.
	 *
	 * @param {Object} pTemplatePrototype - The prototype class for the template expression
	 */
	addTemplate(pTemplatePrototype)
	{
		if (typeof(pTemplatePrototype) != 'function')
		{
			this.log.warn(`PICT [${this.UUID}] could not add Template; pTemplatePrototype was not a class it was ${typeof(pTemplatePrototype)}.`);
			return false;
		}

		let tmpTemplateHash = pTemplatePrototype.template_hash;

		if (this.LogNoisiness > 1)
		{
			this.log.info(`PICT-ControlFlow addTemplate [${tmpTemplateHash}]`)
		}

		return this.instantiateServiceProviderFromPrototype('PictTemplate', {}, tmpTemplateHash, pTemplatePrototype);
	}

	/**
	 * Just passing an options will construct one for us.
	 * Passing a hash will set the hash.
	 * Passing a prototype will use that!
	 *
	 * @param {String} pViewHash - The hash of the view.
	 * @param {Object} pOptions - The options for the view.
	 * @param {Object} pViewPrototype - The prototype for the view.
	 */
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
				tmpOptions = this.fable.Utility.extend({}, JSON.parse(JSON.stringify(pViewPrototype.default_configuration)), tmpOptions);
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
	addProvider(pProviderHash, pOptions, pProviderPrototype)
	{
		let tmpOptions = (typeof(pOptions) == 'object') ? pOptions : {};
		let tmpProviderHash = (typeof(pProviderHash) == 'string') ? pProviderHash : this.fable.getUUID();

		if (this.LogControlFlow)
		{
			if (this.LogNoisiness > 1)
			{
				this.log.info(`PICT-ControlFlow addProvider [${tmpProviderHash}]:`, {Options:tmpOptions});
			}
			else
			{
				this.log.info(`PICT-ControlFlow addProvider [${tmpProviderHash}]`)
			}
		}

		if (typeof(pProviderPrototype) != 'undefined')
		{
			// If the prototype has a default_configuration, it will be merged with options.
			if (pProviderPrototype.hasOwnProperty('default_configuration'))
			{
				tmpOptions = this.fable.Utility.extend({}, pProviderPrototype.default_configuration, tmpOptions);
			}
			return this.instantiateServiceProviderFromPrototype('PictProvider', tmpOptions, tmpProviderHash, pProviderPrototype);
		}
		else
		{
			return this.instantiateServiceProvider('PictProvider', tmpOptions, tmpProviderHash);
		}
	}

	/**
	 * Just passing an options will construct one for us.
	 * Passing a hash will set the hash.
	 * Passing a prototype will use that!
	 *
	 * @param {String} pApplicationHash - The hash of the application.
	 * @param {Object} pOptions - The options for the application.
	 * @param {Object} pApplicationPrototype - The prototype for the application.
	 */
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

	/**
	 * Attach the default template engine renderers.
	 *
	 * @private
	 */
	initializePictTemplateEngine()
	{
		//{~Data:AppData.Some.Value.to.Render~}
		this.addTemplate(require(`./templates/Pict-Template-Data.js`));

		if (!this._DefaultPictTemplatesInitialized)
		{
			// Expects one of the following:
			// 		{~E:Book^AppData.Some.Address.IDBook^Render-Book-Template~}
			//          ...meaning GET BOOK with IDBook FROM AppData.Some.Address.IDBook and render it to Render-Book-Template
			let fEntityRender = (pHash, pData, fCallback, pContextArray) =>
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
						tmpEntityID = this.resolveStateFromAddress(tmpEntityID, tmpData, pContextArray);
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
								return this.parseTemplateByHash(tmpEntityTemplate, pRecord, tmpCallback, pContextArray);
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
			let fTemplateRender = (pHash, pData, pContextArray)=>
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
						return this.parseTemplateByHash(tmpTemplateHash, pData, null, pContextArray);
					}
					else
					{
						return this.parseTemplateByHash(tmpTemplateHash, this.resolveStateFromAddress(tmpAddressOfData, tmpData, pContextArray), null, pContextArray);
					}
				};
			let fTemplateRenderAsync = (pHash, pData, fCallback, pContextArray)=>
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
							}, pContextArray);
					}
					else
					{
						return this.parseTemplateByHash(tmpTemplateHash, this.resolveStateFromAddress(tmpAddressOfData, tmpData, pContextArray),
							(pError, pValue) =>
							{
								if (pError)
								{
									return tmpCallback(pError, '');
								}
								return tmpCallback(null, pValue);
							}, pContextArray);
					}
				};
			this.MetaTemplate.addPatternBoth('{~T:', '~}', fTemplateRender, fTemplateRenderAsync);
			this.MetaTemplate.addPatternBoth('{~Template:', '~}', fTemplateRender, fTemplateRenderAsync);

			// {~TS:Template:AddressOfDataSet~}
			let fTemplateSetRender = (pHash, pData, pContextArray)=>
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
						return this.parseTemplateSetByHash(tmpTemplateHash, pData, pContextArray);
					}
					else
					{
						return this.parseTemplateSetByHash(tmpTemplateHash, this.resolveStateFromAddress(tmpAddressOfData, tmpData, pContextArray), pContextArray);
					}
				};
			let fTemplateSetRenderAsync = (pHash, pData, fCallback, pContextArray)=>
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
					tmpData = this.resolveStateFromAddress(tmpAddressOfData, tmpData, pContextArray);

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
							}, pContextArray);
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
							}, pContextArray);
					}
				};
			this.MetaTemplate.addPatternBoth('{~TS:', '~}', fTemplateSetRender, fTemplateSetRenderAsync);
			this.MetaTemplate.addPatternBoth('{~TemplateSet:', '~}', fTemplateSetRender, fTemplateSetRenderAsync);

			// {~TemplateIfAbsolute:Template:AddressOfData:AppData.Some.Address.IDBook^OPERATOR^Absolute_Value~}
			// {~TIfAbs:Template:AddressOfData:AppData.Some.Address.IDBook^OPERATOR^Absolute_Value~}
			let compareValues = (pValueLeft, pOperator, pValueRight)=>
			{
				switch(pOperator)
				{
					case 'TRUE':
						return (pValueLeft === true);
					case 'FALSE':
						return (pValueLeft === false);
					case 'LNGT':
					case 'LENGTH_GREATER_THAN':
						switch(typeof(pValueLeft))
						{
							case 'string':
								return (pValueLeft.length > pValueRight);
							case 'object':
								return (pValueLeft.length > pValueRight);
							default:
								return false;
						}
					case 'LNLT':
					case 'LENGTH_LESS_THAN':
						switch(typeof(pValueLeft))
						{
							case 'string':
								return (pValueLeft.length < pValueRight);
							case 'object':
								return (pValueLeft.length < pValueRight);
							default:
								return false;
						}
					case '!=':
						return (pValueLeft != pValueRight);
					case '<':
						return (pValueLeft < pValueRight);
					case '>':
						return (pValueLeft > pValueRight);
					case '<=':
						return (pValueLeft <= pValueRight);
					case '>=':
						return (pValueLeft >= pValueRight);
					case '===':
						return (pValueLeft === pValueRight);
					case '==':
						return (pValueLeft == pValueRight);
					default:
						return false;
				}
			}
			let fTemplateIfAbsoluteValueRender = (pHash, pData, pContextArray)=>
				{
					let tmpHash = pHash.trim();
					let tmpData = (typeof(pData) === 'object') ? pData : {};

					if (this.LogNoisiness > 4)
					{
						this.log.trace(`PICT Template [fTemplateIfAbsoluteValueRender]::[${tmpHash}] with tmpData:`, tmpData);
					}
					else if (this.LogNoisiness > 0)
					{
						this.log.trace(`PICT Template [fTemplateIfAbsoluteValueRender]::[${tmpHash}]`);
					}

					let tmpTemplateHash = false;
					let tmpAddressOfData = false;
					let tmpComparisonOperation = false;

					let tmpHashParts = tmpHash.split(':');

					if (tmpHashParts.length < 3)
					{
						this.log.warn(`Pict: Template If Absolute Value Render: TemplateHash not complete for [${tmpHash}]`);
						return `Pict: Template If Absolute Value Render: TemplateHash not complete for [${tmpHash}]`;
					}

					tmpTemplateHash = tmpHashParts[0];
					tmpAddressOfData = tmpHashParts[1];
					tmpComparisonOperation = tmpHashParts[2];

					// No template hash
					if (!tmpTemplateHash)
					{
						this.log.warn(`Pict: Template Render: TemplateHash not resolved for [${tmpHash}]`);
						return `Pict: Template Render: TemplateHash not resolved for [${tmpHash}]`;
					}
					// No comparison operation
					if (!tmpComparisonOperation)
					{
						this.log.warn(`Pict: Template Render: Comparison Operation not resolved for [${tmpHash}]`);
						return `Pict: Template Render: Comparison Operation not resolved for [${tmpHash}]`;
					}

					// Now try to break the comparison into three parts...
					let tmpComparisonParts = tmpComparisonOperation.split('^');
					if (tmpComparisonParts.length < 3)
					{
						this.log.warn(`Pict: Template Render: Comparison Operation not complete (three parts expected) for [${tmpHash}]`);
						return `Pict: Template Render: Comparison Operation not complete (three parts expected) for [${tmpHash}]`;
					}

					// Now look up the data at the comparison location
					try
					{
						let tmpComparisonResult = compareValues(this.resolveStateFromAddress(tmpComparisonParts[0], tmpData, pContextArray), tmpComparisonParts[1], tmpComparisonParts[2]);
						if (!tmpComparisonResult)
						{
							return '';
						}
						else
						{
							if (!tmpAddressOfData)
							{
								// No address was provided, just render the template with what this template has.
								return this.parseTemplateByHash(tmpTemplateHash, pData, null, pContextArray);
							}
							else
							{
								return this.parseTemplateByHash(tmpTemplateHash, this.resolveStateFromAddress(tmpAddressOfData, tmpData, pContextArray), null, pContextArray);
							}
						}
					}
					catch (pError)
					{
						this.log.error(`Pict: Template Render: Error looking up comparison data for [${tmpHash}]: ${pError}`, pError);
						return `Pict: Template Render: Error looking up comparison data for [${tmpHash}]: ${pError}`;
					}
				};
			let fTemplateIfAbsoluteValueRenderAsync = (pHash, pData, fCallback, pContextArray)=>
				{
					let tmpHash = pHash.trim();
					let tmpData = (typeof(pData) === 'object') ? pData : {};
					let tmpCallback = (typeof(fCallback) === 'function') ? fCallback : () => { return ''; };

					if (this.LogNoisiness > 4)
					{
						this.log.trace(`PICT Template [fTemplateIfAbsoluteValueRender]::[${tmpHash}] with tmpData:`, tmpData);
					}
					else if (this.LogNoisiness > 0)
					{
						this.log.trace(`PICT Template [fTemplateIfAbsoluteValueRender]::[${tmpHash}]`);
					}

					let tmpTemplateHash = false;
					let tmpAddressOfData = false;
					let tmpComparisonOperation = false;

					let tmpHashParts = tmpHash.split(':');

					if (tmpHashParts.length < 3)
					{
						this.log.warn(`Pict: Template If Absolute Value Render: TemplateHash not complete for [${tmpHash}]`);
						return tmpCallback(new Error(`Pict: Template If Absolute Value Render: TemplateHash not complete for [${tmpHash}]`));
					}

					tmpTemplateHash = tmpHashParts[0];
					tmpAddressOfData = tmpHashParts[1];
					tmpComparisonOperation = tmpHashParts[2];

					// No template hash
					if (!tmpTemplateHash)
					{
						this.log.warn(`Pict: Template Render: TemplateHash not resolved for [${tmpHash}]`);
						return tmpCallback(new Error(`Pict: Template Render: TemplateHash not resolved for [${tmpHash}]`));
					}
					// No comparison operation
					if (!tmpComparisonOperation)
					{
						this.log.warn(`Pict: Template Render: Comparison Operation not resolved for [${tmpHash}]`);
						return tmpCallback(new Error(`Pict: Template Render: Comparison Operation not resolved for [${tmpHash}]`));
					}

					// Now try to break the comparison into three parts...
					let tmpComparisonParts = tmpComparisonOperation.split('^');
					if (tmpComparisonParts.length < 3)
					{
						this.log.warn(`Pict: Template Render: Comparison Operation not complete (three parts expected) for [${tmpHash}]`);
						return tmpCallback(new Error(`Pict: Template Render: Comparison Operation not complete (three parts expected) for [${tmpHash}]`));
					}

					// Now look up the data at the comparison location
					try
					{
						let tmpComparisonResult = compareValues(this.resolveStateFromAddress(tmpComparisonParts[0], tmpData, pContextArray), tmpComparisonParts[1], tmpComparisonParts[2]);
						if (!tmpComparisonResult)
						{
							return tmpCallback(null, '');
						}
						else
						{
							if (!tmpAddressOfData)
							{
								return this.parseTemplateByHash(tmpTemplateHash, pData,
									(pError, pValue) =>
									{
										if (pError)
										{
											return tmpCallback(pError, '');
										}
										return tmpCallback(null, pValue);
									}, pContextArray);
							}
							else
							{
								return this.parseTemplateByHash(tmpTemplateHash, this.resolveStateFromAddress(tmpAddressOfData, tmpData, pContextArray),
									(pError, pValue) =>
									{
										if (pError)
										{
											return tmpCallback(pError, '');
										}
										return tmpCallback(null, pValue);
									}, pContextArray);
							}
						}
					}
					catch (pError)
					{
						this.log.error(`Pict: Template Render: Error looking up comparison data for [${tmpHash}]: ${pError}`, pError);
						return tmpCallback(pError, '');
					}
				};
			// {~TemplateIfAbsolute:Template:AddressOfData:AppData.Some.Address.IDBook^OPERATOR^Absolute_Value~}
			// {~TIfAbs:Template:AddressOfData:AppData.Some.Address.IDBook^OPERATOR^Absolute_Value~}
			this.MetaTemplate.addPatternBoth('{~TemplateIfAbsolute:', '~}', fTemplateIfAbsoluteValueRender, fTemplateIfAbsoluteValueRenderAsync);
			this.MetaTemplate.addPatternBoth('{~TIfAbs:', '~}', fTemplateIfAbsoluteValueRender, fTemplateIfAbsoluteValueRenderAsync);

			let fTemplateIfRender = (pHash, pData, pContextArray)=>
				{
					let tmpHash = pHash.trim();
					let tmpData = (typeof(pData) === 'object') ? pData : {};

					if (this.LogNoisiness > 4)
					{
						this.log.trace(`PICT Template [fTemplateIfAbsoluteValueRender]::[${tmpHash}] with tmpData:`, tmpData);
					}
					else if (this.LogNoisiness > 0)
					{
						this.log.trace(`PICT Template [fTemplateIfAbsoluteValueRender]::[${tmpHash}]`);
					}

					let tmpTemplateHash = false;
					let tmpAddressOfData = false;
					let tmpComparisonOperation = false;

					let tmpHashParts = tmpHash.split(':');

					if (tmpHashParts.length < 3)
					{
						this.log.warn(`Pict: Template If Absolute Value Render: TemplateHash not complete for [${tmpHash}]`);
						return `Pict: Template If Absolute Value Render: TemplateHash not complete for [${tmpHash}]`;
					}

					tmpTemplateHash = tmpHashParts[0];
					tmpAddressOfData = tmpHashParts[1];
					tmpComparisonOperation = tmpHashParts[2];

					// No template hash
					if (!tmpTemplateHash)
					{
						this.log.warn(`Pict: Template Render: TemplateHash not resolved for [${tmpHash}]`);
						return `Pict: Template Render: TemplateHash not resolved for [${tmpHash}]`;
					}
					// No comparison operation
					if (!tmpComparisonOperation)
					{
						this.log.warn(`Pict: Template Render: Comparison Operation not resolved for [${tmpHash}]`);
						return `Pict: Template Render: Comparison Operation not resolved for [${tmpHash}]`;
					}

					// Now try to break the comparison into three parts...
					let tmpComparisonParts = tmpComparisonOperation.split('^');
					if (tmpComparisonParts.length < 3)
					{
						this.log.warn(`Pict: Template Render: Comparison Operation not complete (three parts expected) for [${tmpHash}]`);
						return `Pict: Template Render: Comparison Operation not complete (three parts expected) for [${tmpHash}]`;
					}

					// Now look up the data at the comparison location
					try
					{
						let tmpComparisonResult = compareValues(
								this.resolveStateFromAddress(tmpComparisonParts[0], tmpData, pContextArray),
								tmpComparisonParts[1],
								this.resolveStateFromAddress(tmpComparisonParts[2], tmpData, pContextArray));

						if (!tmpComparisonResult)
						{
							return '';
						}
						else
						{
							if (!tmpAddressOfData)
							{
								// No address was provided, just render the template with what this template has.
								return this.parseTemplateByHash(tmpTemplateHash, pData, null, pContextArray);
							}
							else
							{
								return this.parseTemplateByHash(tmpTemplateHash, this.resolveStateFromAddress(tmpAddressOfData, tmpData, pContextArray), null, pContextArray);
							}
						}
					}
					catch (pError)
					{
						this.log.error(`Pict: Template Render: Error looking up comparison data for [${tmpHash}]: ${pError}`, pError);
						return `Pict: Template Render: Error looking up comparison data for [${tmpHash}]: ${pError}`;
					}
				};
			let fTemplateIfRenderAsync = (pHash, pData, fCallback, pContextArray)=>
				{
					let tmpHash = pHash.trim();
					let tmpData = (typeof(pData) === 'object') ? pData : {};
					let tmpCallback = (typeof(fCallback) === 'function') ? fCallback : () => { return ''; };

					if (this.LogNoisiness > 4)
					{
						this.log.trace(`PICT Template [fTemplateIfAbsoluteValueRender]::[${tmpHash}] with tmpData:`, tmpData);
					}
					else if (this.LogNoisiness > 0)
					{
						this.log.trace(`PICT Template [fTemplateIfAbsoluteValueRender]::[${tmpHash}]`);
					}

					let tmpTemplateHash = false;
					let tmpAddressOfData = false;
					let tmpComparisonOperation = false;

					let tmpHashParts = tmpHash.split(':');

					if (tmpHashParts.length < 3)
					{
						this.log.warn(`Pict: Template If Absolute Value Render: TemplateHash not complete for [${tmpHash}]`);
						return tmpCallback(new Error(`Pict: Template If Absolute Value Render: TemplateHash not complete for [${tmpHash}]`));
					}

					tmpTemplateHash = tmpHashParts[0];
					tmpAddressOfData = tmpHashParts[1];
					tmpComparisonOperation = tmpHashParts[2];

					// No template hash
					if (!tmpTemplateHash)
					{
						this.log.warn(`Pict: Template Render: TemplateHash not resolved for [${tmpHash}]`);
						return tmpCallback(new Error(`Pict: Template Render: TemplateHash not resolved for [${tmpHash}]`));
					}
					// No comparison operation
					if (!tmpComparisonOperation)
					{
						this.log.warn(`Pict: Template Render: Comparison Operation not resolved for [${tmpHash}]`);
						return tmpCallback(new Error(`Pict: Template Render: Comparison Operation not resolved for [${tmpHash}]`));
					}

					// Now try to break the comparison into three parts...
					let tmpComparisonParts = tmpComparisonOperation.split('^');
					if (tmpComparisonParts.length < 3)
					{
						this.log.warn(`Pict: Template Render: Comparison Operation not complete (three parts expected) for [${tmpHash}]`);
						return tmpCallback(new Error(`Pict: Template Render: Comparison Operation not complete (three parts expected) for [${tmpHash}]`));
					}

					// Now look up the data at the comparison location
					try
					{
						// This is the only thing that's different from the absolute value function above.  Collapse these.
						let tmpComparisonResult = compareValues(
								this.resolveStateFromAddress(tmpComparisonParts[0], tmpData, pContextArray),
								tmpComparisonParts[1],
								this.resolveStateFromAddress(tmpComparisonParts[2], tmpData, pContextArray));

						if (!tmpComparisonResult)
						{
							return tmpCallback(null, '');
						}
						else
						{
							if (!tmpAddressOfData)
							{
								return this.parseTemplateByHash(tmpTemplateHash, pData,
									(pError, pValue) =>
									{
										if (pError)
										{
											return tmpCallback(pError, '');
										}
										return tmpCallback(null, pValue);
									}, pContextArray);
							}
							else
							{
								return this.parseTemplateByHash(tmpTemplateHash, this.resolveStateFromAddress(tmpAddressOfData, tmpData, pContextArray),
									(pError, pValue) =>
									{
										if (pError)
										{
											return tmpCallback(pError, '');
										}
										return tmpCallback(null, pValue);
									}, pContextArray);
							}
						}
					}
					catch (pError)
					{
						this.log.error(`Pict: Template Render: Error looking up comparison data for [${tmpHash}]: ${pError}`, pError);
						return tmpCallback(pError, '');
					}
				};
			// {~TemplateIf:Template:AddressOfData:AppData.Some.Address.IDBook^OPERATOR^AppData.Some.Address2.IDBook~}
			// {~TIf:Template:AddressOfData:AppData.Some.Address.IDBook^OPERATOR^AppData.Some.Address2.IDBook~}
			this.MetaTemplate.addPatternBoth('{~TemplateIf:', '~}', fTemplateIfRender, fTemplateIfRenderAsync);
			this.MetaTemplate.addPatternBoth('{~TIf:', '~}', fTemplateIfRender, fTemplateIfRenderAsync);

// Refactor: #### DRY PROBLEM Too much dry needing fixed at this point
			// {~TS:Template:AddressOfDataSet~}
			let fTemplateValueSetRender = (pHash, pData, pContextArray)=>
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

					tmpData = this.resolveStateFromAddress(tmpAddressOfData, tmpData, pContextArray);

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
						return this.parseTemplateSetByHash(tmpTemplateHash, pData, pContextArray);
					}
					else
					{
						return this.parseTemplateSetByHash(tmpTemplateHash, tmpData, pContextArray);
					}
				};
			let fTemplateValueSetRenderAsync = (pHash, pData, fCallback, pContextArray)=>
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
					tmpData = this.resolveStateFromAddress(tmpAddressOfData, tmpData, pContextArray);

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
							}, pContextArray);
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
							}, pContextArray);
					}
				};
			this.MetaTemplate.addPatternBoth('{~TVS:', '~}', fTemplateValueSetRender, fTemplateValueSetRenderAsync);
			this.MetaTemplate.addPatternBoth('{~TemplateValueSet:', '~}', fTemplateValueSetRender, fTemplateValueSetRenderAsync);

			// {~T:TemplateFromMap:AddressOfData~}
			let fTemplateFromMapRender = (pHash, pData, pContextArray)=>
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
					let tmpMap = this.resolveStateFromAddress(tmpAddressOfMap, tmpData, pContextArray);
					let tmpKey = this.resolveStateFromAddress(tmpAddressOfKey, tmpData, pContextArray);

					if (!tmpMap)
					{
						this.log.warn(`Pict: TemplateFromMap Render: Map not resolved for [${tmpHash}]`);
						return '';
					}

					tmpData = tmpMap[tmpKey];

					if (!tmpData)
					{
						// No address was provided, just render the TemplateFromMap with what this TemplateFromMap has.
						return this.parseTemplateByHash(tmpTemplateFromMapHash, pData, null, pContextArray);
					}
					else
					{
						return this.parseTemplateByHash(tmpTemplateFromMapHash, tmpData, null, pContextArray);
					}
				};
			let fTemplateFromMapRenderAsync = (pHash, pData, fCallback, pContextArray)=>
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
					let tmpMap = this.resolveStateFromAddress(tmpAddressOfMap, tmpData, pContextArray);
					let tmpKey = this.resolveStateFromAddress(tmpAddressOfKey, tmpData, pContextArray);

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
							}, pContextArray);
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
							}, pContextArray);
					}
				};
			this.MetaTemplate.addPatternBoth('{~TFM:', '~}', fTemplateFromMapRender, fTemplateFromMapRenderAsync);
			this.MetaTemplate.addPatternBoth('{~TemplateFromMap:', '~}', fTemplateFromMapRender, fTemplateFromMapRenderAsync);

			// {~TS:TemplateFromMap:AddressOfDataSet~}
			let fTemplateFromMapSetRender = (pHash, pData, pContextArray)=>
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
					let tmpMap = this.resolveStateFromAddress(tmpAddressOfMap, tmpData, pContextArray);
					let tmpKey = this.resolveStateFromAddress(tmpAddressOfKey, tmpData, pContextArray);

					if (!tmpMap)
					{
						this.log.warn(`Pict: TemplateFromMap Render: Map not resolved for [${tmpHash}]`);
						return '';
					}

					tmpData = tmpMap[tmpKey];

					if (!tmpData)
					{
						// No address was provided, just render the TemplateFromMap with what this TemplateFromMap has.
						return this.parseTemplateSetByHash(tmpTemplateFromMapHash, pData, pContextArray);
					}
					else
					{
						return this.parseTemplateSetByHash(tmpTemplateFromMapHash, tmpData, pContextArray);
					}
				};
			let fTemplateFromMapSetRenderAsync = (pHash, pData, fCallback, pContextArray)=>
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
					let tmpMap = this.resolveStateFromAddress(tmpAddressOfMap, tmpData, pContextArray);
					let tmpKey = this.resolveStateFromAddress(tmpAddressOfKey, tmpData, pContextArray);

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
							}, pContextArray);
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
							}, pContextArray);
					}
				};
			this.MetaTemplate.addPatternBoth('{~TSFM:', '~}', fTemplateFromMapSetRender, fTemplateFromMapSetRenderAsync);
			this.MetaTemplate.addPatternBoth('{~TemplateSetFromMap:', '~}', fTemplateFromMapSetRender, fTemplateFromMapSetRenderAsync);

			// {~DataTree:AppData.Some.Value.to.Render~}
			let fDataValueTree = (pHash, pData, pContextArray)=>
				{
					let tmpData = (typeof(pData) === 'object') ? pData : {};
					tmpData.TemplateHash = pHash.trim();

					tmpData.ValueTreeParameters = tmpData.TemplateHash.split('^');
					if (tmpData.ValueTreeParameters.length < 1)
					{
						return '';
					}
					tmpData.ResolvedValue = this.resolveStateFromAddress(tmpData.ValueTreeParameters[0], tmpData, pContextArray);
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
						tmpData.ObjectValueTree = fDataValueTreeObjectSet(tmpData.ResolvedValue, tmpData.ResolvedValue, 0, tmpData.TreeMaxDepth, pContextArray);
					}
					else
					{
						this.log.trace(`PICT Template Log Value Tree: [${tmpData.TemplateHash}] resolved data is not an object.`, tmpData.ResolvedValue);
						tmpData.ObjectValueTree = tmpData.ResolveValue;
					}

					return this.parseTemplate(tmpPictObjectWrapTemplate, tmpData, pContextArray);
				};
			let fDataValueTreeObjectSet = (pObject, pRootObject, pCurrentDepth, pMaxDepth, pContextArray)=>
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
									tmpBranchValue = fDataValueTreeObjectSet(pObject[tmpObjectValueKeys[i]], pRootObject, pCurrentDepth + 1, pMaxDepth, pContextArray);
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
						tmpTemplateResult += this.parseTemplate(tmpPictObjectBranchTemplate, tmpDataValue, pContextArray);
					}

					return tmpTemplateResult;
				};
			this.MetaTemplate.addPattern('{~DataTree:', '~}',fDataValueTree);
			this.MetaTemplate.addPattern('{~DT:', '~}',fDataValueTree);



			//<p>{~Join: - ^Record.d1^Record.d1~}</p>
			let fJoinDataRender = (pHash, pData, pContextArray)=>
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
						let tmpValueSet = this.resolveStateFromAddress(tmpDataAddresses[i], tmpData, pContextArray);
						if (tmpValueSet && Array.isArray(tmpValueSet))
						{
							for (let j = 0; j < tmpValueSet.length; j++)
							{
								tmpValueList.push(tmpValueSet[j]);
							}
						}
						else if (tmpValueSet)
						{
							tmpValueList.push(tmpValueSet);
						}					}

					return tmpValueList.join(tmpSeparator);
				};
			this.MetaTemplate.addPattern('{~J:', '~}', fJoinDataRender);
			this.MetaTemplate.addPattern('{~Join:', '~}', fJoinDataRender);
			//<p>{~JoinUnique: - ^Record.d1^Record.d1~}</p>
			let fJoinUniqueDataRender = (pHash, pData, pContextArray)=>
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
						let tmpValueSet = this.resolveStateFromAddress(tmpDataAddresses[i], tmpData, pContextArray);

						if (tmpValueSet && Array.isArray(tmpValueSet))
						{
							for (let j = 0; j < tmpValueSet.length; j++)
							{
								if (!tmpValueMap.hasOwnProperty(tmpValueSet[j]))
								{
									tmpValueMap[tmpValueSet[j]] = true;
									tmpValueList.push(tmpValueSet[j]);
								}
							}
						}
						else if (tmpValueSet)
						{
							if (!tmpValueMap.hasOwnProperty(tmpValueSet))
							{
								tmpValueMap[tmpValueSet] = true;
								tmpValueList.push(tmpValueSet);
							}
						}
					}

					return tmpValueList.join(tmpSeparator);
				};
			this.MetaTemplate.addPattern('{~JU:', '~}', fJoinUniqueDataRender);
			this.MetaTemplate.addPattern('{~JoinUnique:', '~}', fJoinUniqueDataRender);

			this.MetaTemplate.addPattern('{~Dollars:', '~}',
				(pHash, pData, pContextArray)=>
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

					let tmpColumnData = this.resolveStateFromAddress(tmpHash, tmpData, pContextArray);
					return this.DataFormat.formatterDollars(tmpColumnData);
				});
			this.MetaTemplate.addPattern('{~Digits:', '~}',
				(pHash, pData, pContextArray)=>
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

					let tmpColumnData = this.resolveStateFromAddress(tmpHash, tmpData, pContextArray);
					return this.DataFormat.formatterAddCommasToNumber(this.DataFormat.formatterRoundNumber(tmpColumnData, 2));
				});

			// Output the date as a YYYY-MM-DD string
			this.MetaTemplate.addPattern('{~DateYMD:', '~}',
				(pHash, pData, pContextArray)=>
				{
					let tmpHash = pHash.trim();
					let tmpData = (typeof(pData) === 'object') ? pData : {};
					let tmpDateValue = this.resolveStateFromAddress(tmpHash, tmpData, pContextArray);


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
								this.log.error(`Error guessing dayJS guess() function; dates may be formatted to GMT by default. (${pError.message || pError})`);
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
							this.log.error(`Error guessing dayJS guess() function; dates may be formatted to GMT by default. (${pError.message || pError})`);
						}
					}

					return tmpDayJS.format('YYYY-MM-DD');
				});

			// Output the date as a YYYY-MM-DD string
			// Takes in the format as the second parameter: {~DateYMD:AppData.Some.Date^YYYY-MM-DD~}
			this.MetaTemplate.addPattern('{~DateFormat:', '~}',
				(pHash, pData, pContextArray)=>
				{
					let tmpHash = pHash.trim();
					let tmpData = (typeof(pData) === 'object') ? pData : {};
					let tmpDateValueSet = tmpHash.split('^');

					if (tmpDateValueSet.length < 2)
					{
						this.log.error(`PICT Template [fDateFormat]::[${tmpHash}] did not have a valid format string and date.`);
						return '';
					}

					let tmpDateValue = this.resolveStateFromAddress(tmpDateValueSet[0], tmpData, pContextArray);

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
								this.log.error(`Error guessing dayJS guess() function; dates may be formatted to GMT by default. (${pError.message || pError})`);
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
							this.log.error(`Error guessing dayJS guess() function; dates may be formatted to GMT by default. (${pError.message || pError})`);
						}
					}

					return tmpDayJS.format(tmpDateValueSet[1]);
				});
			// {NE~Some.Address|If the left value is truthy, render this value.~}
			let fNotEmptyRender = (pHash, pData, pContextArray)=>
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
					if (this.resolveStateFromAddress(tmpHashParts[0], tmpData, pContextArray))
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

			let fRandomNumberString = (pHash)=>
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

			let fRandomNumber = (pHash)=>
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

			let fPascalCaseIdentifier = (pHash, pData, pContextArray)=>
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

					let tmpValue = this.resolveStateFromAddress(tmpHash, tmpData, pContextArray);
					if ((tmpValue == null) || (tmpValue == 'undefined') || (typeof(tmpValue) == 'undefined'))
					{
						return '';
					}
					return this.DataFormat.cleanNonAlphaCharacters(this.DataFormat.capitalizeEachWord(tmpValue));
				};
			this.MetaTemplate.addPattern('{~PascalCaseIdentifier:', '~}',fPascalCaseIdentifier);

			let fLogValue = (pHash, pData, pContextArray)=>
				{
					let tmpHash = pHash.trim();
					let tmpData = (typeof(pData) === 'object') ? pData : {};

					let tmpValue = this.resolveStateFromAddress(tmpHash, tmpData, pContextArray);
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


			let fLogValueTree = (pHash, pData, pContextArray)=>
				{
					let tmpData = (typeof(pData) === 'object') ? pData : {};
					tmpData.TemplateHash = pHash.trim();

					tmpData.ValueTreeParameters = tmpData.TemplateHash.split('^');
					if (tmpData.ValueTreeParameters.length < 1)
					{
						return '';
					}
					tmpData.ResolvedValue = this.resolveStateFromAddress(tmpData.ValueTreeParameters[0], tmpData, pContextArray);
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

			let fLogStatement = (pHash)=>
				{
					let tmpHash = pHash.trim();
					this.log.trace(`PICT Template Log Message: ${tmpHash}`);
					return '';
				};
			this.MetaTemplate.addPattern('{~LogStatement:', '~}',fLogStatement);
			this.MetaTemplate.addPattern('{~LS:', '~}',fLogStatement);

			let fBreakpoint = (pHash)=>
				{
					let tmpHash = pHash.trim();
					let tmpError = new Error(`PICT Template Breakpoint: ${tmpHash}`);
					this.log.trace(`PICT Template Breakpoint: ${tmpHash}`, tmpError.stack);
					debugger; // eslint-disable-line no-debugger
					return '';
				};
			this.MetaTemplate.addPattern('{~Breakpoint', '~}',fBreakpoint);

			this._DefaultPictTemplatesInitialized = true;
		}
	}

	/**
	 * Read a value from a nested object using a dot notation string.
	 *
	 * @param {string} pAddress - The address to resolve
	 * @param {object} pRecord - The record to resolve
	 * @param {Array<any>} pContextArray - The context array to resolve
	 *
	 * @returns {any} The value at the given address, or undefined
	 */
	resolveStateFromAddress(pAddress, pRecord, pContextArray)
	{
		let tmpContextArray = (Array.isArray(pContextArray)) ? pContextArray : [this];

		return this.manifest.getValueByHash({Pict:this, AppData:this.AppData, Bundle:this.Bundle, Context:tmpContextArray, Record:pRecord}, pAddress);
	}

	/**
	 * Parse a template.
	 *
	 * @param {String} pTemplateString - The template string to parse
	 * @param {Object} pData - The data to use in the template
	 * @param {Function} fCallback - The callback to call when the template is parsed
	 * @param {Array<any>} pContextArray - The context array to use in the template
	 */
	parseTemplate(pTemplateString, pData, fCallback, pContextArray)
	{
		let tmpData = (typeof(pData) === 'object') ? pData : {};
		let tmpContextArray = (Array.isArray(pContextArray)) ? pContextArray : [this];
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
					this.log.info(`PICT-ControlFlow parseTemplate ${tmpParseUUID} Watch Value: [${this.LogControlFlowWatchAddressList[i]}]=>[${this.resolveStateFromAddress(this.LogControlFlowWatchAddressList[i], tmpData)}]`);
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
				}, tmpContextArray);
		}
		else
		{
			let tmpResult = this.MetaTemplate.parseString(pTemplateString, tmpData, null, tmpContextArray);
			if (this.LogControlFlow && this.LogNoisiness > 1)
			{
					this.log.info(`PICT-ControlFlow parseTemplate ${tmpParseUUID} Template Return Value:\n${tmpResult}`);
			}
			return tmpResult;
		}
	}

	/**
	 * Parse a template by hash.
	 *
	 * @param {String} pTemplateHash - The hash of the template to parse
	 * @param {Object} pData - The data to use in the template
	 * @param {Function} fCallback - The callback to call when the template is parsed
	 * @param {Array<any>} pContextArray - The context array to use in the template
	 */
	parseTemplateByHash(pTemplateHash, pData, fCallback, pContextArray)
	{
		let tmpTemplateString = this.TemplateProvider.getTemplate(pTemplateHash);

		// TODO: Unsure if returning empty is always the right behavior -- if it isn't we will use config to set the behavior
		if (!tmpTemplateString)
		{
			tmpTemplateString = '';
		}
		return this.parseTemplate(tmpTemplateString, pData, fCallback, pContextArray);
	}

	/**
	 * Parse a template set.
	 *
	 * @param {String} pTemplateString - The template string to parse
	 * @param {Array|Object} pDataSet - The data set to use in the template
	 * @param {Function} fCallback - The callback to call when the template is parsed
	 * @param {Array<any>} pContextArray - The context array to use in the template
	 */
	parseTemplateSet(pTemplateString, pDataSet, fCallback, pContextArray)
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
						tmpValue += this.parseTemplate(pTemplateString, pDataSet[i], pContextArray);
					}
				}
				else
				{
					let tmpKeys = Object.keys(pDataSet);
					for (let i = 0; i < tmpKeys.length; i++)
					{
						tmpValue += this.parseTemplate(pTemplateString, pDataSet[tmpKeys[i]], pContextArray);
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

	/**
	 * Parse a template set by hash.
	 *
	 * @param {String} pTemplateHash - The hash of the template to parse
	 * @param {Array|Object} pDataSet - The data set to use in the template
	 * @param {Function} fCallback - The callback to call when the template is parsed
	 * @param {Array<any>} pContextArray - The context array to use in the template
	 */
	parseTemplateSetByHash(pTemplateHash, pDataSet, fCallback, pContextArray)
	{
		let tmpTemplateString = this.TemplateProvider.getTemplate(pTemplateHash);

		// TODO: Unsure if returning empty is always the right behavior -- if it isn't we will use config to set the behavior
		if (!tmpTemplateString)
		{
			tmpTemplateString = '';
		}
		return this.parseTemplateSet(tmpTemplateString, pDataSet, fCallback, pContextArray);
	}
};

module.exports = Pict;

module.exports.PictApplicationClass = require('pict-application');

module.exports.PictViewClass = require('pict-view');
module.exports.PictProviderClass = require('pict-provider');

module.exports.EnvironmentLog = require('./environments/Pict-Environment-Log.js');
module.exports.EnvironmentObject = require('./environments/Pict-Environment-Object.js');

// This is to help understand the type of enivironement we're executing in
module.exports.isBrowser = new Function("try {return (this===window);} catch(pError) {return false;}");

module.exports.safeOnDocumentReady = require(`./Pict-Browser-SafeOnDocumentReady.js`);
module.exports.safeLoadPictApplication = require(`./Pict-Browser-SafeLoad.js`);
