const libFableServiceBase = require('fable').ServiceProviderBase;

class PictTemplateProvider extends libFableServiceBase
{
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

        // This function can be overloaded to load templates from a database, in a page or other source.
        this.loadTemplateFunction = (pTemplateHash) => { return false; };
	}

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

    checkDefaultTemplateHash(pTemplateHash)
    {
        /*
         * Default templates are managed by postfix and prefix.  The use case is things like titles, headers, list 
         * wrappers, rows, etc.
         *
         * So we might have a default template for a list wrapper and it should expect "-ListWrap" as the postfix.
         * And we might have a default template for a list row and it should expect "-ListRow" as the postfix.
         * The list might have a "-ListTitle", or we might have shared titles and it would just be "-Title".
         * 
         * The idea is to allow fallbacks on defaults.
         */
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

    getTemplate(pTemplateHash)
    {
        // TODO: Optimize this.
        // If the template doesn't exist, try to load it with the loading function
        if (!this.templates.hasOwnProperty(pTemplateHash))
        {
            this.loadTemplate(pTemplateHash);
        }
        // If the loading function fails, try to load it from the default templates
        if (!this.templates.hasOwnProperty(pTemplateHash))
        {
            this.checkDefaultTemplateHash(pTemplateHash);
        }
        if (this.templates.hasOwnProperty(pTemplateHash))
        {
            return this.templates[pTemplateHash];
        }
        else
        {
            return false;
        }
    }

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