export = PictMeadowEntityProvider;
declare class PictMeadowEntityProvider {
    constructor(pFable: any, pOptions: any, pServiceHash: any);
    /** @type {any} */
    options: any;
    /** @type {import('./Pict') & { settings: any } & { newAnticipate: any }} */
    fable: import("./Pict") & {
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
    entityColumnTranslations: {
        CreatingIDUser: string;
        UpdatingIDUser: string;
        DeletingIDUser: string;
    };
    /** @type {(pOptions: Record<string, any>) => Record<string, any>} */
    prepareRequestOptions: (pOptions: Record<string, any>) => Record<string, any>;
    /**
     * @param {string} pEntity - The name of the entity to initialize the cache for
     */
    initializeCache(pEntity: string): void;
    /**
     * @param {object} pEntityInformation - The entity information object.
     * @param {object} pContext - The context object to use when parsing the filter template and assigning the results to the destination.
     * @param {() => void} fCallback - The callback function to call when the operation is complete, which should take an optional error as its first parameter.
     */
    gatherEntitySetCount(pEntityInformation: object, pContext: object, fCallback: () => void): void;
    /**
     * @param {Record<string, any>} pEntityInformation - The entity information object.
     * @param {Record<string, any>} pContext - The context object to use when parsing the filter template and assigning the results to the destination.
     * @param {(pError?: Error) => void} fCallback - The callback function to call when the operation is complete, which should take an optional error as its first parameter and the record set or count as its second parameter.
     */
    gatherEntitySet(pEntityInformation: Record<string, any>, pContext: Record<string, any>, fCallback: (pError?: Error) => void): void;
    /**
     * @param {Record<string, any>} pDestinationEntity - The destination entity to map the join results to.
     * @param {Record<string, any>} pCustomRequestInformation - The custom request information object.
     * @param {Record<string, any>} pContext - The context object to use when parsing templates and resolving addresses.
     */
    mapJoinSingleDestination(pDestinationEntity: Record<string, any>, pCustomRequestInformation: Record<string, any>, pContext: Record<string, any>): Record<string, any>[];
    /**
     * @param {Record<string, any>} pCustomRequestInformation - The custom request information object.
     * @param {Record<string, any>} pContext - The context object to use when parsing templates and resolving addresses.
     */
    mapJoin(pCustomRequestInformation: Record<string, any>, pContext: Record<string, any>): any;
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
     *
     * @param {Record<string, any>} pConfiguration - The configuration object for the dataset projection.
     * @param {Record<string, any>} pContext - The context object to use when parsing the record prototype template and resolving the output recordset address mapping.
     */
    projectDataset(pConfiguration: Record<string, any>, pContext: Record<string, any>): void;
    /**
     * @param {Record<string, any>} pConfiguration - The configuration object for the dataset projection.
     * @param {Record<string, any>} pContext - The context object to use when resolving the output recordset address mapping.
     * @param {Record<string, any>} pInputRecord - The input record to use when resolving the output recordset address mapping.
     *
     * @return {string|null} - The resolved output recordset address, or null if no mapping was found.
     */
    _resolveOutputRecordsetAddressMapping(pConfiguration: Record<string, any>, pContext: Record<string, any>, pInputRecord: Record<string, any>): string | null;
    /**
     * @param {Record<string, any>} pCustomRequestInformation - The custom request information object.
     * @param {Record<string, any>} pContext - The context object to use when parsing templates and resolving addresses.
     * @param {(pError?: Error) => void} fCallback - The callback function to call when the operation is complete, which should take an optional error as its first parameter and the data set as its second parameter.
     */
    gatherCustomDataSet(pCustomRequestInformation: Record<string, any>, pContext: Record<string, any>, fCallback: (pError?: Error) => void): any;
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
    /**
     * @param {string} pEntity - The name of the entity to get.
     * @param {string|number} pIDRecord - The ID of the record to get.
     * @param {(pError?: Error, pRecord?: any) => void} fCallback - The callback function to call when the operation is complete.
     */
    getEntity(pEntity: string, pIDRecord: string | number, fCallback: (pError?: Error, pRecord?: any) => void): void;
    /**
     * For a given list of objects, cache connected entity records.
     *
     * @param {Array} pRecordSet - An array of objects to check cache on joined records for, and, get/cache the records as needed.
     * @param {Array} pIDListToCache - An array of property strings that are the ID fields to cache connected records for.
     * @param {Array} pEntityListToCache - An array of entity names, which can override the speculative entity name derived from the ID field name.
     * @param {boolean} pLiteRecords - If true, only cache lite records (ID and Name fields).
     *
     * @return {void}
     */
    cacheConnectedEntityRecords(pRecordSet: any[], pIDListToCache: any[], pEntityListToCache: any[], pLiteRecords: boolean, fCallback: any): void;
    /**
     * Cache an array of records, likely from a meadow endpoint
     *
     * @param {string} pEntity - The entity type to cache individual records for
     * @param {Array<Record<string, any>>} pRecordSet - An array of records to cache
     */
    cacheIndividualEntityRecords(pEntity: string, pRecordSet: Array<Record<string, any>>): void;
    /**
     * @param {string} pEntity - The name of the entity to get.
     * @param {string} pMeadowFilterExpression - The meadow filter expression to filter the entity set by.
     * @param {number} pRecordStartCursor - The starting cursor for record pagination.
     * @param {number} pRecordCount - The number of records to return for pagination.
     * @param {(pError?: Error, pEntitySet?: Array<Record<string, any>>) => void} fCallback - The callback function to call when the operation is complete.
     * @param {string} [postfix] - Optional, adds a postfix string to the url.
     */
    getEntitySetPage(pEntity: string, pMeadowFilterExpression: string, pRecordStartCursor: number, pRecordCount: number, fCallback: (pError?: Error, pEntitySet?: Array<Record<string, any>>) => void, postfix?: string): any;
    /**
     * @param {string} pEntity - The name of the entity to get the count of.
     * @param {string} pMeadowFilterExpression - The meadow filter expression to filter the entity set by.
     * @param {(pError?: Error, pRecordCount?: number) => void} fCallback - The callback function to call when the operation is complete.
     * @param {string} [postfix] - Optional, adds a postfix string to the count url
     */
    getEntitySetRecordCount(pEntity: string, pMeadowFilterExpression: string, fCallback: (pError?: Error, pRecordCount?: number) => void, postfix?: string): any;
    /**
     * @param {string} pEntity - The name of the entity to get.
     * @param {string} pMeadowFilterExpression - The meadow filter expression to filter the entity set by.
     * @param {(pError?: Error, pEntitySet?: Array<Record<string, any>>) => void} fCallback - The callback function to call when the operation is complete.
     */
    getEntitySetWithAutoCaching(pEntity: string, pMeadowFilterExpression: string, fCallback: (pError?: Error, pEntitySet?: Array<Record<string, any>>) => void): void;
    /**
     * @param {string} pEntity - The entity to get a set of.
     * @param {string} pMeadowFilterExpression - The meadow filter expression to filter the entity set by.
     * @param {(pError?: Error, pEntitySet?: Array) => void} fCallback - The callback to call when the request is complete.
     * @param {string} [postfix] - Optional, adds a postfix string to all calls made.
     *
     * @return {void}
     */
    getEntitySet(pEntity: string, pMeadowFilterExpression: string, fCallback: (pError?: Error, pEntitySet?: any[]) => void, postfix?: string): void;
    /**
     * @param {string} pEntityType - The type of the entity to format the URL for.
     *
     * @return {string} - The formatted URL for the given entity type.
     */
    formatUrl(pEntityType: string): string;
    /**
     * Create a new entity record.
     *
     * @param {string} pEntityType - The entity type to create.
     * @param {Record<string, any>} pRecord - The record to create.
     * @param {(pError?: Error, pResult?: Record<string, any>) => void} fCallback - The callback to call when the request is complete.
     *
     * @return {void}
     */
    createEntity(pEntityType: string, pRecord: Record<string, any>, fCallback: (pError?: Error, pResult?: Record<string, any>) => void): void;
    /**
     * Update an entity record.
     *
     * @param {string} pEntityType - The entity type to create.
     * @param {Record<string, any>} pRecord - The record to create.
     * @param {(pError?: Error, pResult?: Record<string, any>) => void} fCallback - The callback to call when the request is complete.
     *
     * @return {void}
     */
    updateEntity(pEntityType: string, pRecord: Record<string, any>, fCallback: (pError?: Error, pResult?: Record<string, any>) => void): void;
    /**
     * Upsert an entity record.
     *
     * @param {String} pEntityType - The entity type to be upserted.
     * @param {Object<String, any>} pRecord - The record to upsert.
     * @param {(pError?: Error, pResult?: any) => void} fCallback - The callback to call when the request is complete.
     *
     * @return {void}
     */
    upsertEntity(pEntityType: string, pRecord: any, fCallback: (pError?: Error, pResult?: any) => void): void;
    /**
     * Upsert a array of entity records.
     *
     * @param {string} pEntityType - The entity type to be upserted.
     * @param {Array<Record<string, any>>} pRecords - The records to upsert.
     * @param {(pError?: Error, pResults?: Array<any>) => void} fCallback - The callback to call when the request is complete.
     *
     * @return {void}
     */
    upsertEntities(pEntityType: string, pRecords: Array<Record<string, any>>, fCallback: (pError?: Error, pResults?: Array<any>) => void): void;
    /**
     * Delete an entity record.
     *
     * @param {string} pEntityType - The entity type to create.
     * @param {string | Number} pIDRecord - The ID of the record to delete.
     * @param {(pError?: Error, pResult?: Record<string, any>) => void} fCallback - The callback to call when the request is complete.
     *
     * @return {void}
     */
    deleteEntity(pEntityType: string, pIDRecord: string | number, fCallback: (pError?: Error, pResult?: Record<string, any>) => void): void;
}
//# sourceMappingURL=Pict-Meadow-EntityProvider.d.ts.map