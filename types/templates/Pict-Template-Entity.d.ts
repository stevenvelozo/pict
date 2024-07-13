export = PictTemplateProviderEntity;
declare class PictTemplateProviderEntity {
    /**
     * @param {Object} pFable - The Fable Framework instance
     * @param {Object} pOptions - The options for the service
     * @param {String} pServiceHash - The hash of the service
     */
    constructor(pFable: any, pOptions: any, pServiceHash: string);
    render(pTemplateHash: any, pRecord: any, pContextArray: any): string;
    renderAsync(pTemplateHash: any, pRecord: any, fCallback: any, pContextArray: any): any;
}
//# sourceMappingURL=Pict-Template-Entity.d.ts.map