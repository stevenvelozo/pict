export = PictTemplateProvider;
declare class PictTemplateProvider {
    /**
     * @param {Object} pFable - The Fable Framework instance
     * @param {Object} pOptions - The options for the service
     * @param {String} pServiceHash - The hash of the service
     */
    constructor(pFable: any, pOptions: any, pServiceHash: string);
    serviceType: string;
    templates: {};
    templateSources: {};
    defaultTemplates: any[];
    /**
     * @property {Function} loadTemplateFunction - The function to load a template
     */
    loadTemplateFunction: () => boolean;
    /**
     * Add a template to the provider.
     *
     * @param {String} pTemplateHash - The hash of the template
     * @param {String} pTemplate - The template
     * @param {String} [pTemplateSource] - (optional) The source of the template
     */
    addTemplate(pTemplateHash: string, pTemplate: string, pTemplateSource?: string): void;
    /**
     * Add a default template to the provider.
     *
     * @param {String} pPrefix - The prefix of the template identifier.
     * @param {String} pPostfix - The postfix of the template identifier.
     * @param {String} pTemplate - The template
     * @param {String} [pSource] - (optional) The source of the template
     */
    addDefaultTemplate(pPrefix: string, pPostfix: string, pTemplate: string, pSource?: string): void;
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
    checkDefaultTemplateHash(pTemplateHash: string): string;
    /**
     * Get a template by hash.
     *
     * @param {String} pTemplateHash - The hash of the template
     * @return {String} - The template, or false if not found
     */
    getTemplate(pTemplateHash: string): string;
    /**
     * Load a template by hash.
     *
     * @param {String} pTemplateHash - The hash of the template
     */
    loadTemplate(pTemplateHash: string): boolean;
}
//# sourceMappingURL=Pict-Template-Provider.d.ts.map