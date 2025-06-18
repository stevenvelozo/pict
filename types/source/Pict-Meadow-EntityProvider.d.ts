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
    gatherEntitySetCount(pEntityInformation: any, pContext: any, fCallback: any): any;
    gatherEntitySet(pEntityInformation: any, pContext: any, fCallback: any): any;
    mapJoinSingleDestination(pDestinationEntity: any, pCustomRequestInformation: any, pContext: any): any[];
    mapJoin(pCustomRequestInformation: any, pContext: any): any;
    /**
     * ExampleConfig:
     * {
     *      "InputRecordsetAddress": "AppData.DocumentData.ReportData.Observations[]<<~?ObservationType,==,WalbecNDTRollerTests?~>>",
     *      "OutputRecordsetAddress": "AppData.DocumentData.ReportData.FormData.ADDTests",
     * 		"OutputRecordsetAddressMapping":
     *      {
     * 			"InputRecord.Tags[],AnyContains,HR": "AppData.DocumentData.ReportData.FormData.HRTests",
     * 			"InputRecord.Tags[],AnyContains,CR": "AppData.DocumentData.ReportData.FormData.CRTests",
     * 			"InputRecord.Tags[],AnyContains,IR": "AppData.DocumentData.ReportData.FormData.IRTests"
     *      },
     * 		"RecordPrototypeAddress": "OutputRecordSet[]<<~?IDObservation,==,{~D:InputRecord.IDObservation~}?~>>",
     * 		"RecordFieldMapping":
     *      {
     * 			"AppData.DocumentData.ReportData.FormData.HRTests":
     *          {
     *               "InputRecord.Details.WalbecNDTRollerTests[0].Datum.MaterialTemperature": "OutputRecord.Temp",
     *               "InputRecord.Details.WalbecNDTRollerTests[0].Datum.PercentDensity": "OutputRecord.Density",
     *               "InputRecord.Details.WalbecNDTRollerTests[0].Datum.Offset": "OutputRecord.Offset",
     *               "InputRecord.IDObservation": "OutputRecord.IDObservation"
     *          },
     * 			"AppData.DocumentData.ReportData.FormData.CRTests":
     *          {
     *               "InputRecord.Details.WalbecNDTRollerTests[0].Datum.MaterialTemperature": "OutputRecord.CRTemp",
     *               "InputRecord.Details.WalbecNDTRollerTests[0].Datum.PercentDensity": "OutputRecord.CRDensity",
     *               "InputRecord.Details.WalbecNDTRollerTests[0].Datum.Offset": "OutputRecord.CROffset",
     *               "InputRecord.IDObservation": "OutputRecord.IDObservation"
     *          },
     * 			"AppData.DocumentData.ReportData.FormData.IRTests":
     *          {
     *               "InputRecord.Details.WalbecNDTRollerTests[0].Datum.MaterialTemperature": "OutputRecord.IRTemp",
     *               "InputRecord.Details.WalbecNDTRollerTests[0].Datum.PercentDensity": "OutputRecord.IRDensity",
     *               "InputRecord.Details.WalbecNDTRollerTests[0].Datum.Offset": "OutputRecord.IROffset",
     *               "InputRecord.IDObservation": "OutputRecord.IDObservation"
     *          },
     *          "Default":
     *          {
     *               "InputRecord.Details.WalbecNDTRollerTests[0].Datum.MaterialTemperature": "OutputRecord.ADDTemp",
     *               "InputRecord.Details.WalbecNDTRollerTests[0].Datum.PercentDensity": "OutputRecord.ADDDensity",
     *               "InputRecord.Details.WalbecNDTRollerTests[0].Datum.Offset": "OutputRecord.ADDOffset",
     *               "InputRecord.IDObservation": "OutputRecord.IDObservation"
     *          }
     *      }
     * }
     */
    projectDataset(pConfiguration: any, pContext: any): void;
    _resolveOutputRecordsetAddressMapping(pConfiguration: any, pContext: any, pInputRecord: any): any;
    gatherCustomDataSet(pCustomRequestInformation: any, pContext: any, fCallback: any): any;
    /**
     * Local version of gatherDataFromServer that only support synchronous operations.
     *
     * @param {Array<Record<string, any>>} pEntitiesBundleDescription - The entity bundle description object.
     */
    processBundle(pEntitiesBundleDescription: Array<Record<string, any>>): void;
    /**
     * Gather data from the server returning a promise when it is complete.
     *
     * @param {Array<Record<string, any>>} pEntitiesBundleDescription - The entity bundle description object.
     * @param {(error?: Error) => void} fCallback - The callback function to call when the data gathering is complete.
     */
    gatherDataFromServer(pEntitiesBundleDescription: Array<Record<string, any>>, fCallback: (error?: Error) => void): void;
    /**
     * Creates a wrapper state object to allow referencing common global state in addition to flow-state.
     *
     * @param {Record<string, any>} pState - The state object to prepare.
     * @param {any} [pStepConfiguration] - (optional) The step configuration object provided in the config, if any.
     * @return {Record<string, any>} - The prepared state object.
     */
    prepareState(pState: Record<string, any>, pStepConfiguration?: any): Record<string, any>;
    getEntity(pEntity: any, pIDRecord: any, fCallback: any): void;
    getEntitySetPage(pEntity: any, pMeadowFilterExpression: any, pRecordStartCursor: any, pRecordCount: any, fCallback: any): any;
    getEntitySetRecordCount(pEntity: any, pMeadowFilterExpression: any, fCallback: any): any;
    getEntitySet(pEntity: any, pMeadowFilterExpression: any, fCallback: any): void;
}
//# sourceMappingURL=Pict-Meadow-EntityProvider.d.ts.map