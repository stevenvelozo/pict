/**
* Unit tests for Pict
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*/

var Chai = require("chai");
var Expect = Chai.expect;
var Assert = Chai.assert;


var _MockSettings = (
{
	Product: 'MockPict',
	ProductVersion: '0.0.0'
});

suite
(
	'Pict',
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
			'Object Sanity',
			function()
			{
				test
				(
					'The class should initialize itself into a happy little object.',
					function(fDone)
					{
						var testScope = {};
						var testPict = require('../source/Pict.js').initialize(_MockSettings, testScope);
						Expect(testPict).to.be.an('object', 'Pict should initialize as an object directly from the require statement.');
						Expect(testScope)
							.to.have.a.property('pict')
							.that.is.a('object');
						Expect(testPict.settings)
							.to.be.a('object');
						fDone();
					}
				);
				test
				(
					'Try with a global scope...',
					function(fDone)
					{
						var testPict = require('../source/Pict.js').initialize(_MockSettings);
						Expect(testPict).to.be.an('object', 'Pict should initialize as an object directly from the require statement.');
						Expect(global)
							.to.have.a.property('pict')
							.that.is.a('object');
						fDone();
					}
				);
				test
				(
					'Explicitly set a "window" and "document" global to test browser workability (the virtual dom is slow to initialize)',
					function(fDone)
					{
						var libJSDom = require("jsdom");
						libJSDom.env('',
							function(pError, pWindow)
							{
								// Setup the jsdom simulator to load up our module in
								window = pWindow;
								document = pWindow.document;
								navigator = {platform:'node'};

								var testPict = require('../source/Pict-Browser-Shim.js');

								Expect(testPict).to.be.an('object', 'Pict should initialize as an object directly from the require statement.');
								Expect(pWindow)
									.to.have.a.property('pict')
									.that.is.a('object');

								fDone();
							});
					}
				);
			}
		);
		suite
		(
			'Logging Tests',
			function()
			{
				test
				(
					'Each log channel should work.',
					function(fDone)
					{
						var testScope = {};
						var testPict = require('../source/Pict.js').initialize(_MockSettings, testScope);

						var tmpTestStart = testPict.log.getTimeStamp();

						Expect(testScope)
							.to.have.a.property('pict')
							.that.is.a('object');
						Expect(testPict.log)
							.to.be.a('object');
						testPict.log.trace('Test 1');
						testPict.log.debug('Test 2');
						testPict.log.info('Test 3');
						testPict.log.warning('Test 4');
						testPict.log.error('Test 5');


						testPict.log.logTimeDelta(tmpTestStart);

						// Test time logging
						testPict.log.logTime();
						testPict.log.logTimeDelta(tmpTestStart);

						testPict.log.logTime('Custom Timestamp Message');
						testPict.log.logTimeDelta(tmpTestStart);

						// Exercise object logging
						testPict.log.debug('Settings: ', testPict.settings);

						testPict.log.logTimeDelta(tmpTestStart, 'Test Complete');

						fDone();
					}
				);
			}
		);
	}
);