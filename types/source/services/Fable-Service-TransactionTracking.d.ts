export = TransactionTracking;
declare class TransactionTracking {
    constructor(pFable: any, pOptions: any, pServiceHash: any);
    /** @type {import('../Pict') & { addAndInstantiateSingletonService: (hash: string, options: any, prototype: any) => any }} */
    fable: import("../Pict") & {
        addAndInstantiateSingletonService: (hash: string, options: any, prototype: any) => any;
    };
    /** @type {any} */
    log: any;
    /** @type {string} */
    UUID: string;
    transactionMap: {};
    get transactions(): {};
    logToTransaction(pKey: any, pMessage: any, pCategory: any): boolean;
    registerTransaction(pKey: any): any;
    /**
     * @param {string} pKey
     * @param {any} pData
     * @param {string} [pType='Entry']
     *
     * @return {number} the current queue size
     */
    pushToTransactionQueue(pKey: string, pData: any, pType?: string): number;
    /**
     * Returns the transaction queue with wrapping metadata.
     *
     * @param {string} pKey
     *
     * @return {Array<{Timestamp: number, Data: any}>}
     */
    checkTransactionQueue(pKey: string): Array<{
        Timestamp: number;
        Data: any;
    }>;
    /**
     * Returns an array of object registered in the transaction queue for a given transaction ID.
     *
     * @param {string} pKey
     *
     * @return {Array<any>}
     */
    getTransactionQueue(pKey: string): Array<any>;
    /**
     * @param {string} pKey
     *
     * @return {Array<{Timestamp: number, Data: any}>}
     */
    clearTransactionQueue(pKey: string): Array<{
        Timestamp: number;
        Data: any;
    }>;
    checkEvent(pKey: any, pEvent: any, pHash: any): boolean;
}
declare namespace TransactionTracking {
    let default_configuration: Record<string, any>;
}
//# sourceMappingURL=Fable-Service-TransactionTracking.d.ts.map