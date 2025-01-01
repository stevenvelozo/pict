export = PictTemplateProviderJoinUnique;
declare class PictTemplateProviderJoinUnique extends libPictTemplate {
    /**
     * @param {Object} pFable - The Fable Framework instance
     * @param {Object} pOptions - The options for the service
     * @param {String} pServiceHash - The hash of the service
     */
    constructor(pFable: any, pOptions: any, pServiceHash: string);
    /** @type {any} */
    options: any;
    /** @type {any} */
    log: any;
    render(pTemplateHash: any, pRecord: any, pContextArray: any): string;
}
import libPictTemplate = require("pict-template");
//# sourceMappingURL=Pict-Template-JoinUnique.d.ts.map