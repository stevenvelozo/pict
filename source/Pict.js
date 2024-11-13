/**
* @author <steven@velozo.com>
*/
const libFable = require('fable');

const libPackage = require('../package.json');

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
	 * @param {Object<String, any>} pSettings - The settings for the Pict instance.
	 */
	constructor(pSettings)
	{
		super(pSettings);

		this.isBrowser = new Function("try {return (this===window);} catch(pError) {return false;}");

		/** @type {Object} */
		this._PackageFable = this._Package;
		this._Package = libPackage;

		this.browserAddress = 'window._Pict';
		if ('BrowserAddress' in this.settings)
		{
			this.browserAddress = this.settings.BrowserAddress;
		}
		this.children = [];

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

		this.addServiceType('PictTemplate', require('pict-template'));
		this.instantiateServiceProvider('MetaTemplate');
		this.instantiateServiceProvider('DataGeneration');

		this.manifest = this.instantiateServiceProvider('Manifest');

		this.AppData = {};
		if ('DefaultAppData' in this.fable.settings)
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
	 * @param {Object<String, String>} pManifestSet - The manifest set to load.
	 */
	loadManifestSet(pManifestSet)
	{
		if (typeof(pManifestSet) != 'object')
		{
			this.log.warn(`PICT [${this.UUID}] could not load Manifest Set; pManifestSet was not an object.`);
			return;
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
	 * @param {typeof any} pTemplatePrototype - The prototype class for the template expression
	 *
	 * @return {any} the service instance, or null if the prototype was invalid
	 */
	addTemplate(pTemplatePrototype)
	{
		if (typeof(pTemplatePrototype) != 'function')
		{
			this.log.warn(`PICT [${this.UUID}] could not add Template; pTemplatePrototype was not a class it was ${typeof(pTemplatePrototype)}.`);
			return null;
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
	 * @param {Object<String, any>} [pOptions] - The options for the view.
	 * @param {any} [pViewPrototype] - The prototype for the view.
	 *
	 * FIXME: refer to PictView here once it has a type definition
	 *
	 * @return {any} The view instance.
	 */
	addView(pViewHash, pOptions, pViewPrototype)
	{
		let tmpOptions = (typeof(pOptions) == 'object') ? pOptions : {};
		let tmpViewHash = (typeof(pViewHash) == 'string') ? pViewHash : this.fable.getUUID();
		let tmpViewPrototype = (typeof(pViewPrototype) == 'function') ? pViewPrototype : undefined;

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

		if (typeof(tmpViewPrototype) != 'undefined')
		{
			// If the prototype has a default_configuration, it will be merged with options.
			if ('default_configuration' in tmpViewPrototype)
			{
				tmpOptions = this.fable.Utility.extend({}, JSON.parse(JSON.stringify(tmpViewPrototype.default_configuration)), tmpOptions);
			}
			return this.instantiateServiceProviderFromPrototype('PictView', tmpOptions, tmpViewHash, tmpViewPrototype);
		}
		else
		{
			return this.instantiateServiceProvider('PictView', tmpOptions, tmpViewHash);
		}
	}

	/**
	 * Add a provider unless one already exists, then return that one.
	 * 
	 * Just passing an options will construct one for us.
	 * Passing a hash will set the hash.
	 * Passing a prototype will use that!
	 *
	 * @param {String} pProviderHash - The hash of the provider.
	 * @param {Object<String, any>} [pOptions] - The options for the provider.
	 * @param {any} [pProviderPrototype] - The prototype for the provider.
	 *
	 * FIXME: refer to PictProvider here once it has a type definition
	 *
	 * @return {any} The provider instance.
	 */
	addProviderSingleton(pProviderHash, pOptions, pProviderPrototype)
	{
		if (pProviderHash in this.providers)
		{
			return this.providers[pProviderHash];
		}
		return this.addProvider(pProviderHash, pOptions, pProviderPrototype);
	}

	/**
	 * Just passing an options will construct one for us.
	 * Passing a hash will set the hash.
	 * Passing a prototype will use that!
	 *
	 * @param {String} pProviderHash - The hash of the provider.
	 * @param {Object<String, any>} [pOptions] - The options for the provider.
	 * @param {any} [pProviderPrototype] - The prototype for the provider.
	 *
	 * FIXME: refer to PictProvider here once it has a type definition
	 *
	 * @return {any} The provider instance.
	 */
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
			if ('default_configuration' in pProviderPrototype)
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
	 * @param {Object} [pOptions] - The options for the application.
	 * @param {any} [pApplicationPrototype] - The prototype for the application.
	 *
	 * FIXME: refer to PictApplication here once it has a type definition
	 *
	 * @return {any} The application instance.
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
			if ('default_configuration' in pApplicationPrototype)
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
		if (!this._DefaultPictTemplatesInitialized)
		{
			// Just looking up data in the application state template expression
			//{~Data:AppData.Some.Value.to.Render~}
			//{~D:AppData.Some.Value.to.Render~}
			this.addTemplate(require(`./templates/Pict-Template-Data.js`));

			// Know the in-browser reference for Pict when appropriate
			this.addTemplate(require(`./templates/Pict-Template-Self.js`));

			// Look up an entity template expression
			// {~Entity:Book^AppData.Some.Address.IDBook^Render-Book-Template~}
			// {~E:Book^AppData.Some.Address.IDBook^Render-Book-Template~}
			// ...meaning GET BOOK with IDBook FROM AppData.Some.Address.IDBook and render it to Render-Book-Template
			this.addTemplate(require(`./templates/Pict-Template-Entity.js`));

			// Child Template Expressions
			// {~T:Template:AddressOfData~}
			this.addTemplate(require(`./templates/Pict-Template-Template.js`));
			// {~TS:Template:AddressOfDataSet~}
			this.addTemplate(require(`./templates/Pict-Template-TemplateSet.js`));
			// {~TVS:Template:AddressOfDataSet~}
			this.addTemplate(require(`./templates/Pict-Template-TemplateValueSet.js`));
			this.addTemplate(require(`./templates/Pict-Template-TemplateFromMap.js`))
			this.addTemplate(require(`./templates/Pict-Template-TemplateSetFromMap.js`))

			// Logical Branching Template Expressions
			// {~TemplateIf:Template:AddressOfData:AppData.Some.Address.IDBook^OPERATOR^AppData.Some.Address2.IDBook~}
			// {~TIf:Template:AddressOfData:AppData.Some.Address.IDBook^OPERATOR^AppData.Some.Address2.IDBook~}
			this.addTemplate(require(`./templates/logic/Pict-Template-TemplateIf.js`));
			// {~TemplateIfAbsolute:Template:AddressOfData:AppData.Some.Address.IDBook^OPERATOR^Absolute_Value~}
			// {~TIfAbs:Template:AddressOfData:AppData.Some.Address.IDBook^OPERATOR^Absolute_Value~}
			this.addTemplate(require(`./templates/logic/Pict-Template-TemplateIfAbsolute.js`));
			// {~NotEmpty:AppData.Some.Address^Absolute Value~}
			this.addTemplate(require(`./templates/logic/Pict-Template-NotEmpty.js`));

			// Data Manipulation Templates
			this.addTemplate(require(`./templates/data/Pict-Template-DataJson.js`));
			this.addTemplate(require(`./templates/data/Pict-Template-PascalCaseIdentifier.js`));
			this.addTemplate(require(`./templates/data/Pict-Template-DateFormat.js`));
			this.addTemplate(require(`./templates/data/Pict-Template-DateYMD.js`));
			this.addTemplate(require(`./templates/data/Pict-Template-Digits.js`));
			this.addTemplate(require(`./templates/data/Pict-Template-Dollars.js`));

			this.addTemplate(require(`./templates/data/Pict-Template-Join.js`));
			this.addTemplate(require(`./templates/data/Pict-Template-JoinUnique.js`));

			// Data Generation Templates
			this.addTemplate(require(`./templates/data-generation/Pict-Template-RandomNumber.js`));
			this.addTemplate(require(`./templates/data-generation/Pict-Template-RandomNumberString.js`));

			// Debugging Templates
			this.addTemplate(require(`./templates/debugging/Pict-Template-Breakpoint.js`));
			this.addTemplate(require(`./templates/debugging/Pict-Template-LogStatement.js`));
			this.addTemplate(require(`./templates/debugging/Pict-Template-LogValue.js`));
			this.addTemplate(require(`./templates/debugging/Pict-Template-LogValueTree.js`));
			this.addTemplate(require(`./templates/debugging/Pict-Template-DataValueTree.js`));

			this._DefaultPictTemplatesInitialized = true;
		}
	}

	/**
	 * Read a value from a nested object using a dot notation string.
	 *
	 * @param {string} pAddress - The address to resolve
	 * @param {any} pRecord - The record to resolve
	 * @param {Array<any>} [pContextArray] - The context array to resolve
	 *
	 * @return {any} The value at the given address, or undefined
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
	 * @param {Function} [fCallback] - The callback to call when the template is parsed
	 * @param {Array<any>} [pContextArray] - The context array to use in the template
	 *
	 * @return {String?} The parsed template string, or undefined if a callback was provided
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
	 * @param {Function} [fCallback] - The callback to call when the template is parsed
	 * @param {Array<any>} [pContextArray] - The context array to use in the template
	 *
	 * @return {String?} The parsed template string, or undefined if a callback was provided
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
	 * @param {Array<any>|Object} pDataSet - The data set to use in the template
	 * @param {Function} [fCallback] - The callback to call when the template set is parsed
	 * @param {Array<any>} [pContextArray] - The context array to use in the template
	 *
	 * @return {String?} The parsed template string, or undefined if a callback was provided
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
						tmpValue += this.parseTemplate(pTemplateString, pDataSet[i], null, pContextArray);
					}
				}
				else
				{
					let tmpKeys = Object.keys(pDataSet);
					for (let i = 0; i < tmpKeys.length; i++)
					{
						tmpValue += this.parseTemplate(pTemplateString, pDataSet[tmpKeys[i]], null, pContextArray);
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
	 * @param {Array<any>|Object} pDataSet - The data set to use in the template
	 * @param {Function} [fCallback] - The callback to call when the template is parsed
	 * @param {Array<any>} [pContextArray] - The context array to use in the template
	 *
	 * @return {String?} The parsed template string, or undefined if a callback was provided
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
module.exports.PictTemplateClass = require('pict-template');

module.exports.EnvironmentLog = require('./environments/Pict-Environment-Log.js');
module.exports.EnvironmentObject = require('./environments/Pict-Environment-Object.js');

// This is to help understand the type of enivironement we're executing in
module.exports.isBrowser = new Function("try {return (this===window);} catch(pError) {return false;}");

module.exports.safeOnDocumentReady = require(`./Pict-Browser-SafeOnDocumentReady.js`);
module.exports.safeLoadPictApplication = require(`./Pict-Browser-SafeLoad.js`);
