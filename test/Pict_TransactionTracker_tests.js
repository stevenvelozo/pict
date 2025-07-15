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
	}
);
