export = PictTemplateProviderLogValueTree;
declare class PictTemplateProviderLogValueTree extends libPictTemplate {
    /**
     * @param {Object} pFable - The Fable Framework instance
     * @param {Object} pOptions - The options for the service
     * @param {String} pServiceHash - The hash of the service
     */
    constructor(pFable: any, pOptions: any, pServiceHash: string);
    /** @type {any} */
    log: any;
    logValueTreeObjectSet: (pObject: any, pBaseAddress: any, pRootObject: any, pCurrentDepth: any, pMaxDepth: any) => string;
}
import libPictTemplate = require("pict-template");
//# sourceMappingURL=Pict-Template-LogValueTree.d.ts.map