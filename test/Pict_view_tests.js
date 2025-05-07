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

suite(
	'Pict View Tests',
	function()
	{
		setup(
			function()
			{
			}
		);

		suite(
			'Simple Views',
			function()
			{
				test(
					'Basic view with a list.',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);

						let tmpEnvironment = new libPict.EnvironmentLog(testPict, {});

                        let tmpView = testPict.instantiateServiceProvider('PictView', _BasicConfigurationView, 'ExampleView');

                        testPict.AppData.ExampleData = [ { Name: 'One' }, { Name: 'Two' }, { Name: 'Three' } ];

                        tmpView.render();

						return fDone();
					}
				);
				test(
					'Basic view rendering to a virtual destination.',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);

						let tmpEnvironment = new libPict.EnvironmentLog(testPict, {});

                        let tmpView = testPict.addView('ExampleView', _BasicConfigurationView);

                        testPict.AppData.ExampleData = [ { Name: 'One' }, { Name: 'Two' }, { Name: 'Three' } ];

						const testOutput = testPict.parseTemplate('{~View:ExampleView~}');

						Expect(testOutput).to.equal("<div><h1>Example!</h1<ul>One</ul><ul>Two</ul><ul>Three</ul></div>");

						return fDone();
					}
				);
				test(
					'Basic async view rendering to a virtual destination.',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);

						let tmpEnvironment = new libPict.EnvironmentLog(testPict, {});

                        let tmpView = testPict.addView('ExampleView', _BasicConfigurationView);

                        testPict.AppData.ExampleData = [ { Name: 'One' }, { Name: 'Two' }, { Name: 'Three' } ];

						testPict.parseTemplate('{~View:ExampleView~}', {},
							(pError, pResult) =>
							{
								if (pError)
								{
									return fDone(pError);
								}

								Expect(pResult).to.equal("<div><h1>Example!</h1<ul>One</ul><ul>Two</ul><ul>Three</ul></div>");

								return fDone();
							}
						);
					}
				);
			}
		);
	}
);
