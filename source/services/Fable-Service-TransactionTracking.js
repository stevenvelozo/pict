const libFableServiceProviderBase = require('fable-serviceproviderbase');

/** @typedef {{ TimeStamp: Date, Category: string, Message: string }} TransactionLogEntry */
/** @typedef {{ Timestamp: number, Data: any, Type: string }} TransactionQueueItem */
/** @typedef {{ TransactionKey: string, Events: Record<string, Record<string, boolean>>, Log: Array<TransactionLogEntry>, TransactionQueue: Array<TransactionQueueItem> }} TransactionInfo */

/*
 * Provides transaction tracking with keys and events, allowing us to block repeat attempts.
 * Once the shape is solidified, will move it back to the fable codebase
 */
class TransactionTracking extends libFableServiceProviderBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
		// Intersect default options, parent constructor, service information
		super(pFable, pOptions, pServiceHash);

		/** @type {import('../Pict') & { addAndInstantiateSingletonService: (hash: string, options: any, prototype: any) => any }} */
		this.fable;
		/** @type {any} */
		this.log;
		/** @type {string} */
		this.UUID;

		/**
		 * @type {Record<string, TransactionInfo>}
		 */
		this.transactionMap = {};
	}

	/**
	 * @return {Record<string, TransactionInfo>}
	 */
	get transactions()
	{
		return this.transactionMap;
	}

	/**
	 * @param {string} pKey
	 * @param {string} pMessage
	 * @param {string} [pCategory='General']
	 */
	logToTransaction(pKey, pMessage, pCategory)
	{
		let tmpTransaction = this.transactionMap[pKey];
		if (tmpTransaction == null)
		{
			this.log.warn(`TransactionTracking logToTransaction key [${pKey}] does not exist; auto creating...`);
			tmpTransaction = this.registerTransaction(pKey);
		}

		let tmpCategory = typeof(pCategory) === 'string' ? pCategory : 'General';

		this.transactionMap[pKey].Log.push({TimeStamp: new Date(), Category:tmpCategory, Message:pMessage});

		//this.log.trace(`TransactionTracking logToTransaction [${pKey}]: (${tmpCategory}) ${pMessage}`);

		return true;
	}

	/**
	 * @param {string} pKey
	 *
	 * @return {TransactionInfo}
	 */
	registerTransaction(pKey)
	{
		if (this.transactionMap[pKey] != null)
		{
			//this.log.warn(`TransactionTracking registerTransaction key [${pKey}] already exists... returning existing transaction.`);
			return this.transactionMap[pKey];
		}

		this.transactionMap[pKey] = (
			{
				TransactionKey: pKey,
				Events: {},
				Log: [],
				TransactionQueue: [],
			});
		return this.transactionMap[pKey];
	}

	/**
	 * Remove a transaction from the tracking map. Safe to call on a key that
	 * no longer exists (returns false without side effects).
	 *
	 * Guarded: logs a warning and refuses to delete if the transaction still
	 * has a non-empty queue - that would indicate the caller is unregistering
	 * prematurely with work still pending. Callers who have explicitly
	 * drained or discarded the queue can pass pForce=true to bypass the
	 * guard.
	 *
	 * Note that the existing `finalizeTransaction` /
	 * `eventTransactionAsyncOperationComplete` pathways in pict-section-form
	 * manage their own map cleanup directly on the `transactions` getter;
	 * this method is the canonical API for any other caller that needs to
	 * remove a transaction entry.
	 *
	 * @param {string} pKey - The transaction key to unregister.
	 * @param {boolean} [pForce] - If true, unregister even if the queue is
	 *     not empty. Use only when the caller has explicitly drained or
	 *     discarded the queue state.
	 *
	 * @return {boolean} true if an entry was removed, false otherwise.
	 */
	unregisterTransaction(pKey, pForce)
	{
		const tmpTransaction = this.transactionMap[pKey];
		if (tmpTransaction == null)
		{
			return false;
		}
		if (!pForce && tmpTransaction.TransactionQueue && tmpTransaction.TransactionQueue.length > 0)
		{
			this.log.warn(`TransactionTracking unregisterTransaction [${pKey}] refused: queue has ${tmpTransaction.TransactionQueue.length} item(s) still pending. Pass pForce=true if you explicitly want to discard them.`);
			return false;
		}
		delete this.transactionMap[pKey];
		return true;
	}

	/**
	 * @param {string} pKey
	 * @param {any} pData
	 * @param {string} [pType='Entry']
	 *
	 * @return {number} the current queue size
	 */
	pushToTransactionQueue(pKey, pData, pType = 'Entry')
	{
		let tmpTransaction = this.transactionMap[pKey];
		if (tmpTransaction == null)
		{
			this.log.warn(`TransactionTracking pushToTransactionQueue key [${pKey}] does not exist; auto creating...`);
			tmpTransaction = this.registerTransaction(pKey);
		}

		tmpTransaction.TransactionQueue.push({ Timestamp: Date.now(), Data: pData, Type: pType });
		this.logToTransaction(pKey, `Pushed data to transaction queue`, 'Queue');

		return tmpTransaction.TransactionQueue.length;
	}

	/**
	 * Returns the transaction queue with wrapping metadata.
	 *
	 * @param {string} pKey
	 *
	 * @return {Array<TransactionQueueItem>}
	 */
	checkTransactionQueue(pKey)
	{
		let tmpTransaction = this.transactionMap[pKey];
		if (tmpTransaction == null)
		{
			this.log.warn(`TransactionTracking checkTransactionQueue key [${pKey}] does not exist; auto creating...`);
			tmpTransaction = this.registerTransaction(pKey);
		}

		if (tmpTransaction.TransactionQueue == null)
		{
			tmpTransaction.TransactionQueue = [];
		}

		this.logToTransaction(pKey, `Checked transaction queue`, 'Queue');

		return tmpTransaction.TransactionQueue;
	}

	/**
	 * Returns an array of object registered in the transaction queue for a given transaction ID.
	 *
	 * @param {string} pKey
	 *
	 * @return {Array<any>}
	 */
	getTransactionQueue(pKey)
	{
		const tmpQueue = this.checkTransactionQueue(pKey);
		return tmpQueue.map((item) => item.Data);
	}

	/**
	 * @param {string} pKey
	 *
	 * @return {Array<TransactionQueueItem>}
	 */
	clearTransactionQueue(pKey)
	{
		let tmpTransaction = this.transactionMap[pKey];
		if (tmpTransaction == null)
		{
			this.log.warn(`TransactionTracking clearTransactionQueue key [${pKey}] does not exist; skipping...`);
			return;
		}

		const tmpQueue = tmpTransaction.TransactionQueue;
		tmpTransaction.TransactionQueue = [];
		this.logToTransaction(pKey, `Cleared transaction queue`, 'Queue');

		return tmpQueue;
	}

	/**
	 * @param {string} pKey
	 * @param {string} pEvent
	 * @param {string} [pHash='']
	 *
	 * @return {boolean} true if the event is new, false if it has already been registered
	 */
	checkEvent(pKey, pEvent, pHash)
	{
		let tmpHash = (typeof(pHash) === 'string') ? pHash : '';
		let tmpTransaction = this.transactionMap[pKey];
		if (tmpTransaction == null)
		{
			this.log.warn(`TransactionTracking checkTransactionEvent event [${pEvent}]->[${tmpHash}] key [${pKey}] does not exist; auto creating...`);
			tmpTransaction = this.registerTransaction(pKey);
		}

		if (tmpTransaction.Events[pEvent] == null)
		{
			tmpTransaction.Events[pEvent] = {};
		}
		if (tmpHash in tmpTransaction.Events[pEvent])
		{
			//this.log.warn(`TransactionTracking checkTransactionEvent event [${pEvent}]->[${tmpHash}] key [${pKey}] firing a second time...`);
			this.logToTransaction(pKey, `Event [${pEvent}]->[${tmpHash}] already exists in transaction [${pKey}]`, 'Event');
			return false;
		}
		else
		{
			//this.log.warn(`TransactionTracking checkTransactionEvent event [${pEvent}]->[${tmpHash}] key [${pKey}] firing a first time...`);
			this.logToTransaction(pKey, `Event [${pEvent}]->[${tmpHash}] registered in transaction [${pKey}]`, 'Event');
			tmpTransaction.Events[pEvent][tmpHash] = true;
			return true;
		}
	}
}

module.exports = TransactionTracking;

/** @type {Record<string, any>} */
TransactionTracking.default_configuration = { };
