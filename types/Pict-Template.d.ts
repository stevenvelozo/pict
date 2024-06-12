export = PictTemplateProvider;
declare class PictTemplateProvider {
    /**
     * @param {Object} pFable - The Fable Framework instance
     * @param {Object} pOptions - The options for the service
     * @param {String} pServiceHash - The hash of the service
     */
    constructor(pFable: any, pOptions: any, pServiceHash: string);
    pict: any;
    serviceType: string;
    /**
     * Render a template expression, returning a string with the resulting content.
     *
     * @param {string} pTemplateHash - The hash contents of the template (what's between the template start and stop tags)
     * @param {object} pRecord - The json object to be used as the Record for the template render
     * @param {array} pContextArray - An array of context objects accessible from the template; safe to leave empty
     *
     * @return {string} The rendered template
     */
    render(pTemplateHash: string, pRecord: object, pContextArray: any[]): string;
    /**
     * Render a template expression, deliver a string with the resulting content to a callback function.
     *
     * @param {string} pTemplateHash - The hash contents of the template (what's between the template start and stop tags)
     * @param {object} pRecord - The json object to be used as the Record for the template render
     * @param {array} pContextArray - An array of context objects accessible from the template; safe to leave empty
     * @param {(error: Error?, content: String?) => void} fCallback - callback function invoked with the rendered template, or an error
     *
     * @return {void}
     */
    renderAsync(pTemplateHash: string, pRecord: object, fCallback: (error: Error | null, content: string | null) => void, pContextArray: any[]): void;
    /**
     * Provide a match criteria for a template expression.  Anything between these two values is returned as the template hash.
     *
     * @param {string} pMatchStart - The string pattern to start a match in the template trie
     * @param {string} pMatchEnd  - The string pattern to stop a match in the trie acyclic graph
     *
     * @return {void}
     */
    addPattern(pMatchStart: string, pMatchEnd: string): void;
    /**
     * Read a value from a nested object using a dot notation string.
     *
     * @param {string} pAddress - The address to resolve
     * @param {object} pRecord - The record to resolve
     * @param {Array<any>} pContextArray - The context array to resolve (optional)
     *
     * @return {any} The value at the given address, or undefined
     */
    resolveStateFromAddress(pAddress: string, pRecord: object, pContextArray: Array<any>): any;
}
declare namespace PictTemplateProvider {
    export { template_hash };
}
declare const template_hash: "Default";
//# sourceMappingURL=Pict-Template.d.ts.map