export = PictTemplateProviderDataValueTree;
declare class PictTemplateProviderDataValueTree {
    /**
     * @param {Object} pFable - The Fable Framework instance
     * @param {Object} pOptions - The options for the service
     * @param {String} pServiceHash - The hash of the service
     */
    constructor(pFable: any, pOptions: any, pServiceHash: string);
    render(pTemplateHash: any, pRecord: any, pContextArray: any): any;
    dataValueTreeObjectSet(pObject: any, pRootObject: any, pCurrentDepth: any, pMaxDepth: any, pContextArray: any): string;
}
//# sourceMappingURL=Pict-Template-DataValueTree.d.ts.map