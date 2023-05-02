const libFableServiceBase = require('fable').ServiceProviderBase;

class PictTemplateProvider extends libFableServiceBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
        super(pFable, pOptions, pServiceHash);

        this.serviceType = 'PictTemplateProvider';

        this.templates = {};

        // Default templates are stored by prefix.
        // The longest prefix match is used.
        // Case sensitive.
        this.defaultTemplates = {};
        // Sorted list of default templates by length.
        // Since this is a sorted list of case sensitive keys by length, it shouldn't be possible to have collisions.
        this.defaultTemplateHashes = [];

        // This function can be overloaded to load templates from a database, in a page or other source.
        this.loadTemplateFunction = (pTemplateHash) => { return false; };
	}

    addTemplate(pTemplateHash, pTemplate)
    {
        this.templates[pTemplateHash] = pTemplate;
    }

    addDefaultTemplate(pTemplateHash, pTemplate)
    {
        if (typeof(pTemplate) != 'string')
        {
            this.log.error('PictTemplateProvider.addDefaultTemplate: pTemplate is not a string.');
        }
        this.defaultTemplates[pTemplateHash] = pTemplate;
        this.defaultTemplateHashes = Object.keys(this.defaultTemplates).sort((a, b) => b.length - a.length);
    }

    checkDefaultTemplateHash(pTemplateHash)
    {
        /*
         * Default templates are managed by postfix.  The use case is things like titles, headers, list wrappers, rows, etc.
         *
         * So we might have a default template for a list wrapper and it should expect "-ListWrap" as the postfix.
         * And we might have a default template for a list row and it should expect "-ListRow" as the postfix.
         * The list might have a "-ListTitle", or we might have shared titles and it would just be "-Title".
         * 
         * The idea is to allow fallbacks on defaults.
         */
        let tmpTemplateHashLength = pTemplateHash.length;

        for (let i = 0; i < this.defaultTemplateHashes.length; i++)
        {
            // TODO: This is a bad way to check for a postfix.
            // TODO: Is it a good idea to set the template so next time we don't have to check the defaults?
            //       * Pros: Faster.
            //       * Cons: If we later add another default template with a closer match, it won't get looked up.
            //       Faster wins for now.
            if (pTemplateHash.indexOf(this.defaultTemplateHashes[i]) == tmpTemplateHashLength - this.defaultTemplateHashes[i].length)
            {
                this.templates[pTemplateHash] = this.defaultTemplates[this.defaultTemplateHashes[i]];
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
            this.templates[pTemplateHash] = tmpTemplate;
        }

        return tmpTemplate;
    }
}

module.exports = PictTemplateProvider;