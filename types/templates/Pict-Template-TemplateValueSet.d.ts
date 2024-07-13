export = PictTemplateProviderTemplateValueSet;
declare class PictTemplateProviderTemplateValueSet {
    /**
     * @param {Object} pFable - The Fable Framework instance
     * @param {Object} pOptions - The options for the service
     * @param {String} pServiceHash - The hash of the service
     */
    constructor(pFable: any, pOptions: any, pServiceHash: string);
    render(pTemplateHash: any, pRecord: any, pContextArray: any): any;
    renderAsync(pTemplateHash: any, pRecord: any, fCallback: any, pContextArray: any): any;
}
//# sourceMappingURL=Pict-Template-TemplateValueSet.d.ts.map