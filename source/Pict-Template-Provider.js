const libFableServiceBase = require('fable').ServiceProviderBase;

class PictTemplateProvider extends libFableServiceBase
{
	/**
	 * @param {Object} pFable - The Fable Framework instance
	 * @param {Object} pOptions - The options for the service
	 * @param {String} pServiceHash - The hash of the service
	 */
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		this.serviceType = 'PictTemplateProvider';

		this.templates = {};
		this.templateSources = {};

		// Default templates are stored by prefix.
		// The longest prefix match is used.
		// Case sensitive.
		this.defaultTemplates = [];

		/**
		 * @property {Function} loadTemplateFunction - The function to load a template
		 */
		this.loadTemplateFunction = () => { return false; };
	}

	/**
	 * Add a template to the provider.
	 *
	 * @param {String} pTemplateHash - The hash of the template
	 * @param {String} pTemplate - The template
	 * @param {String} [pTemplateSource] - (optional) The source of the template
	 */
	addTemplate(pTemplateHash, pTemplate, pTemplateSource)
	{
		this.templates[pTemplateHash] = pTemplate;

		if (typeof(pTemplateSource) == 'string')
		{
			this.templateSources[pTemplateHash] = pTemplateSource;
		}
		else
		{
			this.templateSources[pTemplateHash] = `Direct addTemplate('${pTemplateHash}') function load into PictTemplateProvider [${this.UUID}]::[${this.Hash}]`;
		}
	}

	/**
	 * Add a default template to the provider.
	 *
	 * @param {String} pPrefix - The prefix of the template identifier.
	 * @param {String} pPostfix - The postfix of the template identifier.
	 * @param {String} pTemplate - The template
	 * @param {String} [pSource] - (optional) The source of the template
	 */
	addDefaultTemplate(pPrefix, pPostfix, pTemplate, pSource)
	{
		let tmpSource = (typeof(pSource) == 'string') ? pSource : `Direct addDefaultTemplate('${pPrefix}','${pPostfix}',..) function load into PictTemplateProvider [${this.UUID}]::[${this.Hash}]`
		let tmpDefaultTemplate = {
			prefix: pPrefix,
			postfix: pPostfix,
			template: pTemplate,
			source: tmpSource
		};
		if (typeof(pTemplate) != 'string')
		{
			this.log.error('PictTemplateProvider.addDefaultTemplate: pTemplate is not a string.');
		}
		this.defaultTemplates.push(tmpDefaultTemplate);
	}

	/**
	 * Attempt to populate a template to a default template if it matches a given hash.
	 *
	 * Default templates are managed by postfix and prefix.  The use case is things like titles, headers, list
	 * wrappers, rows, etc.
	 *
	 * So we might have a default template for a list wrapper and it should expect "-ListWrap" as the postfix.
	 * And we might have a default template for a list row and it should expect "-ListRow" as the postfix.
	 * The list might have a "-ListTitle", or we might have shared titles and it would just be "-Title".
	 *
	 * The idea is to allow fallbacks on defaults.
	 *
	 * @param {String} pTemplateHash - The hash of the template
	 * @return {string} - The template, or false if not found
	 */
	checkDefaultTemplateHash(pTemplateHash)
	{
		for (let i = 0; i < this.defaultTemplates.length; i++)
		{
			if ((pTemplateHash.indexOf(this.defaultTemplates[i].postfix) == pTemplateHash.length - this.defaultTemplates[i].postfix.length)
				&& (pTemplateHash.indexOf(this.defaultTemplates[i].prefix) == 0))
			{
				this.templates[pTemplateHash] = this.defaultTemplates[i].template;
				this.templateSources[pTemplateHash] = `Auto created in checkDefaultTemplateHash('${pTemplateHash}') function by PictTemplateProvider [${this.UUID}]::[${this.Hash}] from [${this.defaultTemplates[i].prefix}]...[${this.defaultTemplates[i].postfix}]`;
				return this.templates[pTemplateHash];
			}
		}
		return false;
	}

	/**
	 * Get a template by hash.
	 *
	 * @param {String} pTemplateHash - The hash of the template
	 * @return {String} - The template, or false if not found
	 */
	getTemplate(pTemplateHash)
	{
		// TODO: Optimize this.
		// If the template doesn't exist, try to load it with the loading function
		if (!(pTemplateHash in this.templates))
		{
			this.loadTemplate(pTemplateHash);
		}
		// If the loading function fails, try to load it from the default templates
		if (!(pTemplateHash in this.templates))
		{
			this.checkDefaultTemplateHash(pTemplateHash);
		}
		if ((pTemplateHash in this.templates))
		{
			return this.templates[pTemplateHash];
		}
		else
		{
			return false;
		}
	}

	/**
	 * Load a template by hash.
	 *
	 * @param {String} pTemplateHash - The hash of the template
	 */
	loadTemplate(pTemplateHash)
	{
		let tmpTemplate = this.loadTemplateFunction(pTemplateHash);

		if (tmpTemplate)
		{
			this.templates[pTemplateHash] = tmpTemplate.template;
			this.templateSources[pTemplateHash] = `Loaded in loadTemplate('${pTemplateHash}') function by PictTemplateProvider [${this.UUID}]::[${this.Hash}] from [${tmpTemplate.source}]`;

		}

		return tmpTemplate;
	}
}

module.exports = PictTemplateProvider;
