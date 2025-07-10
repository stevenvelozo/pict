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
	'Pict Data Broker Tests',
	function()
	{
		setup(
			function()
			{
			}
		);

		suite(
			'Simple Marhsalling',
			function()
			{
				test(
					'Default marshalling to AppData',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);

						let tmpEnvironment = new libPict.EnvironmentLog(testPict, {});

						testPict.AppData.ExistingKey = 'ExistingValue';
						testPict.providers.DataBroker.setValue('TestKey', 'TestValue');
						const existingValue = testPict.providers.DataBroker.getValue('ExistingKey');

						Expect(testPict.AppData).to.have.property('TestKey');
						Expect(testPict.AppData.TestKey).to.equal('TestValue');
						Expect(existingValue).to.equal('ExistingValue');

						return fDone();
					}
				);
				test(
					'Custom marshal destination',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);

						let tmpEnvironment = new libPict.EnvironmentLog(testPict, {});

						testPict.Bundle.CoolData = { ExistingKey: 'ExistingValue' };
						testPict.providers.DataBroker.marshalDestination = 'Bundle.CoolData';

						testPict.providers.DataBroker.setValue('TestKey', 'TestValue');
						const existingValue = testPict.providers.DataBroker.getValue('ExistingKey');

						Expect(testPict.Bundle.CoolData).to.have.property('TestKey');
						Expect(testPict.Bundle.CoolData.TestKey).to.equal('TestValue');
						Expect(existingValue).to.equal('ExistingValue');

						return fDone();
					}
				);
			}
		);
	}
);
