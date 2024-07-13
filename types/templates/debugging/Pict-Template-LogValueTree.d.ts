export = PictTemplateProviderLogValueTree;
declare class PictTemplateProviderLogValueTree {
    /**
     * @param {Object} pFable - The Fable Framework instance
     * @param {Object} pOptions - The options for the service
     * @param {String} pServiceHash - The hash of the service
     */
    constructor(pFable: any, pOptions: any, pServiceHash: string);
    render(pTemplateHash: any, pRecord: any, pContextArray: any): string;
    logValueTreeObjectSet: (pObject: any, pBaseAddress: any, pRootObject: any, pCurrentDepth: any, pMaxDepth: any) => string;
}
//# sourceMappingURL=Pict-Template-LogValueTree.d.ts.map