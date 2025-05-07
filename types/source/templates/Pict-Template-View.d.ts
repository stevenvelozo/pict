export = PictTemplateProviderView;
declare class PictTemplateProviderView extends libPictTemplate {
    /**
     * @param {Object} pFable - The Fable Framework instance
     * @param {Object} pOptions - The options for the service
     * @param {String} pServiceHash - The hash of the service
     */
    constructor(pFable: any, pOptions: any, pServiceHash: string);
    /** @type {any} */
    log: any;
    renderAsync(pTemplateHash: any, pRecord: any, fCallback: any, pContextArray: any): any;
}
import libPictTemplate = require("pict-template");
//# sourceMappingURL=Pict-Template-View.d.ts.map