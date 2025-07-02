export = PictTemplateProviderDataValueTree;
declare class PictTemplateProviderDataValueTree extends libPictTemplate {
    /**
     * @param {Object} pFable - The Fable Framework instance
     * @param {Object} pOptions - The options for the service
     * @param {String} pServiceHash - The hash of the service
     */
    constructor(pFable: any, pOptions: any, pServiceHash: string);
    /** @type {any} */
    log: any;
    /**
     * Render a template expression, returning a string with the resulting content.
     *
     * @param {Object} pObject - The object to be rendered as a value tree
     * @param {Object} pRootObject - The root object for the value tree, used to provide context
     * @param {number} pCurrentDepth - The current depth in the value tree
     * @param {number} pMaxDepth - The maximum depth to render in the value tree
     * @param {Array<any>} pContextArray - An array of context objects accessible from the template; safe to leave empty
     * @param {any} [pScope] - A sticky scope that can be used to carry state and simplify template
     *
     * @return {string} The rendered template
     */
    dataValueTreeObjectSet(pObject: any, pRootObject: any, pCurrentDepth: number, pMaxDepth: number, pContextArray: Array<any>, pScope?: any): string;
}
import libPictTemplate = require("pict-template");
//# sourceMappingURL=Pict-Template-DataValueTree.d.ts.map