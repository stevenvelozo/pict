const libFableServiceProviderBase = require('fable-serviceproviderbase');

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

		/** @type {import('pict') & { addAndInstantiateSingletonService: (hash: string, options: any, prototype: any) => any }} */
		this.fable;
		/** @type {any} */
		this.log;
		/** @type {string} */
		this.UUID;

		this.transactionMap = {};
	}

	get transactions()
	{
		return this.transactionMap;
	}

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
	 * @return {Array<{Timestamp: number, Data: any}>}
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
	 * @return {Array<{Timestamp: number, Data: any}>}
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
