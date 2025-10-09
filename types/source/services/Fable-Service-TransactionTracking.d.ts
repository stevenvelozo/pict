export = TransactionTracking;
/** @typedef {{ TimeStamp: Date, Category: string, Message: string }} TransactionLogEntry */
/** @typedef {{ Timestamp: number, Data: any, Type: string }} TransactionQueueItem */
/** @typedef {{ TransactionKey: string, Events: Record<string, Record<string, boolean>>, Log: Array<TransactionLogEntry>, TransactionQueue: Array<TransactionQueueItem> }} TransactionInfo */
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
    /**
     * @type {Record<string, TransactionInfo>}
     */
    transactionMap: Record<string, TransactionInfo>;
    /**
     * @return {Record<string, TransactionInfo>}
     */
    get transactions(): Record<string, TransactionInfo>;
    /**
     * @param {string} pKey
     * @param {string} pMessage
     * @param {string} [pCategory='General']
     */
    logToTransaction(pKey: string, pMessage: string, pCategory?: string): boolean;
    /**
     * @param {string} pKey
     *
     * @return {TransactionInfo}
     */
    registerTransaction(pKey: string): TransactionInfo;
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
     * @return {Array<TransactionQueueItem>}
     */
    checkTransactionQueue(pKey: string): Array<TransactionQueueItem>;
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
     * @return {Array<TransactionQueueItem>}
     */
    clearTransactionQueue(pKey: string): Array<TransactionQueueItem>;
    /**
     * @param {string} pKey
     * @param {string} pEvent
     * @param {string} [pHash='']
     *
     * @return {boolean} true if the event is new, false if it has already been registered
     */
    checkEvent(pKey: string, pEvent: string, pHash?: string): boolean;
}
declare namespace TransactionTracking {
    export { default_configuration, TransactionLogEntry, TransactionQueueItem, TransactionInfo };
}
declare var default_configuration: Record<string, any>;
type TransactionLogEntry = {
    TimeStamp: Date;
    Category: string;
    Message: string;
};
type TransactionQueueItem = {
    Timestamp: number;
    Data: any;
    Type: string;
};
type TransactionInfo = {
    TransactionKey: string;
    Events: Record<string, Record<string, boolean>>;
    Log: Array<TransactionLogEntry>;
    TransactionQueue: Array<TransactionQueueItem>;
};
//# sourceMappingURL=Fable-Service-TransactionTracking.d.ts.map