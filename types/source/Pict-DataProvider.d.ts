export = PictDataProvider;
declare class PictDataProvider {
    constructor(pFable: any, pOptions: any, pServiceHash: any);
    /** @type {import('fable') & import('pict')} */
    fable: import("fable") & import("pict");
    serviceType: string;
    /**
     * @param {string} pAddress - The address of the data to retrieve
     * @param {object} [pData] - (optional) The record to provide to the address resolver
     */
    getDataByAddress(pAddress: string, pData?: object): any;
}
//# sourceMappingURL=Pict-DataProvider.d.ts.map