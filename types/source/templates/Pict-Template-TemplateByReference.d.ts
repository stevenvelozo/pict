export = PictTemplateProviderTemplate;
declare class PictTemplateProviderTemplate extends libPictTemplate {
    /**
     * @param {Object} pFable - The Fable Framework instance
     * @param {Object} pOptions - The options for the service
     * @param {String} pServiceHash - The hash of the service
     */
    constructor(pFable: any, pOptions: any, pServiceHash: string);
    /** @type {any} */
    log: any;
    render(pTemplateHash: any, pRecord: any, pContextArray: any): string;
    renderAsync(pTemplateHash: any, pRecord: any, fCallback: any, pContextArray: any): string;
}
import libPictTemplate = require("pict-template");
//# sourceMappingURL=Pict-Template-TemplateByReference.d.ts.map