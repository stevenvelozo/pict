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
//const _RetoldTestPort = 60086;
const _RetoldTestPort = 8086;

const _BasicConfigurationView = require('./configurations/Pict-View-BasicConfigurationOnly.json');

const _MockSettings = (
{
	Product: 'MockPict',
	ProductVersion: '1.0.0',

	PictDefaultURLPrefix: `http://localhost:${_RetoldTestPort}/1.0/`
});

suite
(
	'Pict View Tests',
	function()
	{
		setup
		(
			function()
			{
			}
		);

		suite
		(
			'Simple Views',
			function()
			{
				test
				(
					'Basic view with a list.',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);

						let tmpEnvironment = new libPict.EnvironmentLog(testPict, {});

                        let tmpView = testPict.serviceManager.instantiateServiceProvider('PictView', _BasicConfigurationView, 'ExampleView');

                        testPict.AppData.ExampleData = [ { Name: 'One' }, { Name: 'Two' }, { Name: 'Three' } ];

                        tmpView.render();

						return fDone();
					}
				);
			}
		);
	}
);