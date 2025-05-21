export = PictTemplateProviderTemplateSetWithPayload;
declare class PictTemplateProviderTemplateSetWithPayload extends libPictTemplate {
    /**
     * @param {Object} pFable - The Fable Framework instance
     * @param {Object} pOptions - The options for the service
     * @param {String} pServiceHash - The hash of the service
     */
    constructor(pFable: any, pOptions: any, pServiceHash: string);
    /** @type {any} */
    log: any;
    render(pTemplateHash: any, pRecord: any, pContextArray: any): any;
    renderAsync(pTemplateHash: any, pRecord: any, fCallback: any, pContextArray: any): any;
}
import libPictTemplate = require("pict-template");
//# sourceMappingURL=Pict-Template-TemplateSetWithPayload.d.ts.map