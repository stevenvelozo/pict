export = PictMeadowEntityProvider;
declare class PictMeadowEntityProvider {
    constructor(pFable: any, pOptions: any, pServiceHash: any);
    /** @type {any} */
    options: any;
    /** @type {import('pict') & { settings: any }} */
    fable: import("pict") & {
        settings: any;
    };
    serviceType: string;
    restClient: any;
    cache: {};
    prepareRequestOptions: (pOptions: any) => any;
    initializeCache(pEntity: any): void;
    getEntity(pEntity: any, pIDRecord: any, fCallback: any): void;
    getEntitySetPage(pEntity: any, pMeadowFilterExpression: any, pRecordStartCursor: any, pRecordCount: any, fCallback: any): any;
    getEntitySetRecordCount(pEntity: any, pMeadowFilterExpression: any, fCallback: any): any;
    getEntitySet(pEntity: any, pMeadowFilterExpression: any, fCallback: any): void;
}
//# sourceMappingURL=Pict-Meadow-EntityProvider.d.ts.map