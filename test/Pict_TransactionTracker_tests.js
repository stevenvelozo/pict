/**
* Unit tests for Pict
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*/

const Chai = require("chai");
const Expect = Chai.expect;

const libPict = require('../source/Pict.js');

// Outside and inside the docker container, the port is different.
const _RetoldTestPort = 8086;

const _MockSettings = (
{
	Product: 'MockPict',
	ProductVersion: '1.0.0',

	PictDefaultURLPrefix: `http://localhost:${_RetoldTestPort}/1.0/`
});

suite(
	'Pict Transaction Tracker Tests',
	function()
	{
		setup(
			function()
			{
			}
		);

		suite(
			'Transaction Queue',
			function()
			{
				test(
					'clear returns the queue',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);

						let tmpEnvironment = new libPict.EnvironmentLog(testPict, {});

						const tmpTransactionTracker = testPict.newTransactionTracker();

						const tmpTransactionID = testPict.getUUID();
						tmpTransactionTracker.pushToTransactionQueue(tmpTransactionID, { Event: 1 });
						let tmpCount = tmpTransactionTracker.pushToTransactionQueue(tmpTransactionID, { Event: 2 });

						Expect(tmpCount).to.equal(2);

						const tmpTransactionQueue = tmpTransactionTracker.clearTransactionQueue(tmpTransactionID);

						Expect(tmpTransactionQueue).to.be.an('array');
						Expect(tmpTransactionQueue).to.have.lengthOf(2);
						Expect(tmpTransactionQueue[0].Data).to.have.property('Event', 1);
						Expect(tmpTransactionQueue[1].Data).to.have.property('Event', 2);

						return fDone();
					}
				);
			}
		);

		suite(
			'unregisterTransaction',
			function()
			{
				test(
					'returns false for an unknown key without side effects',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);
						let tmpEnvironment = new libPict.EnvironmentLog(testPict, {});
						const tmpTransactionTracker = testPict.newTransactionTracker();

						const tmpResult = tmpTransactionTracker.unregisterTransaction('never-existed');
						Expect(tmpResult).to.equal(false);
						Expect(tmpTransactionTracker.transactions).to.not.have.property('never-existed');

						return fDone();
					}
				);

				test(
					'removes a registered transaction with an empty queue and returns true',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);
						let tmpEnvironment = new libPict.EnvironmentLog(testPict, {});
						const tmpTransactionTracker = testPict.newTransactionTracker();

						const tmpTransactionID = testPict.getUUID();
						tmpTransactionTracker.registerTransaction(tmpTransactionID);
						Expect(tmpTransactionTracker.transactions).to.have.property(tmpTransactionID);

						const tmpResult = tmpTransactionTracker.unregisterTransaction(tmpTransactionID);
						Expect(tmpResult).to.equal(true);
						Expect(tmpTransactionTracker.transactions).to.not.have.property(tmpTransactionID);

						return fDone();
					}
				);

				test(
					'refuses to unregister a transaction with a non-empty queue by default',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);
						let tmpEnvironment = new libPict.EnvironmentLog(testPict, {});
						const tmpTransactionTracker = testPict.newTransactionTracker();

						const tmpTransactionID = testPict.getUUID();
						tmpTransactionTracker.pushToTransactionQueue(tmpTransactionID, { Event: 'still-pending' });

						const tmpResult = tmpTransactionTracker.unregisterTransaction(tmpTransactionID);
						Expect(tmpResult).to.equal(false, 'should refuse to delete while queue has items');
						Expect(tmpTransactionTracker.transactions).to.have.property(tmpTransactionID, tmpTransactionTracker.transactions[tmpTransactionID], 'transaction entry should still be present after refused unregister');
						Expect(tmpTransactionTracker.transactions[tmpTransactionID].TransactionQueue).to.have.lengthOf(1);

						return fDone();
					}
				);

				test(
					'force flag deletes a transaction even when the queue is non-empty',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);
						let tmpEnvironment = new libPict.EnvironmentLog(testPict, {});
						const tmpTransactionTracker = testPict.newTransactionTracker();

						const tmpTransactionID = testPict.getUUID();
						tmpTransactionTracker.pushToTransactionQueue(tmpTransactionID, { Event: 'abandon' });

						const tmpResult = tmpTransactionTracker.unregisterTransaction(tmpTransactionID, true);
						Expect(tmpResult).to.equal(true);
						Expect(tmpTransactionTracker.transactions).to.not.have.property(tmpTransactionID);

						return fDone();
					}
				);

				test(
					'is safe to call twice on the same key',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);
						let tmpEnvironment = new libPict.EnvironmentLog(testPict, {});
						const tmpTransactionTracker = testPict.newTransactionTracker();

						const tmpTransactionID = testPict.getUUID();
						tmpTransactionTracker.registerTransaction(tmpTransactionID);

						Expect(tmpTransactionTracker.unregisterTransaction(tmpTransactionID)).to.equal(true);
						Expect(tmpTransactionTracker.unregisterTransaction(tmpTransactionID)).to.equal(false);

						return fDone();
					}
				);
			}
		);
	}
);
