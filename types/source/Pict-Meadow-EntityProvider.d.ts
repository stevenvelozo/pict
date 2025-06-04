export = PictMeadowEntityProvider;
declare class PictMeadowEntityProvider {
    constructor(pFable: any, pOptions: any, pServiceHash: any);
    /** @type {any} */
    options: any;
    /** @type {import('pict') & { settings: any } & { newAnticipate: any }} */
    fable: import("pict") & {
        settings: any;
    } & {
        newAnticipate: any;
    };
    /** @type {any} */
    log: any;
    serviceType: string;
    restClient: any;
    /** @type {Record<string, import('cachetrax')>} */
    recordCache: Record<string, any>;
    /** @type {Record<string, import('cachetrax')>} */
    recordSetCache: Record<string, any>;
    prepareRequestOptions: (pOptions: any) => any;
    initializeCache(pEntity: any): void;
    gatherEntitySet(pEntityInformation: any, pContext: any, fCallback: any): any;
    mapJoin(pCustomRequestInformation: any, pContext: any, fCallback: any): any;
    gatherCustomDataSet(pCustomRequestInformation: any, pContext: any, fCallback: any): any;
    /**
     * Gather data from the server returning a promise when it is complete.
     *
     * @param {Array<Record<string, any>>} pEntitiesBundleDescription - The entity bundle description object.
     * @param {(error?: Error) => void} fCallback - The callback function to call when the data gathering is complete.
     */
    gatherDataFromServer(pEntitiesBundleDescription: Array<Record<string, any>>, fCallback: (error?: Error) => void): void;
    prepareState(pState: any, pStepConfiguration: any): {
        State: any;
        AppData: any;
        Pict: import("pict") & {
            settings: any;
        } & {
            newAnticipate: any;
        };
        Fable: import("pict") & {
            settings: any;
        } & {
            newAnticipate: any;
        };
        StepConfiguration: any;
    };
    getEntity(pEntity: any, pIDRecord: any, fCallback: any): void;
    getEntitySetPage(pEntity: any, pMeadowFilterExpression: any, pRecordStartCursor: any, pRecordCount: any, fCallback: any): any;
    getEntitySetRecordCount(pEntity: any, pMeadowFilterExpression: any, fCallback: any): any;
    getEntitySet(pEntity: any, pMeadowFilterExpression: any, fCallback: any): void;
}
//# sourceMappingURL=Pict-Meadow-EntityProvider.d.ts.map