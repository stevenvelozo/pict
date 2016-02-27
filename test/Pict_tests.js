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
					function()
					{
						var testScope = {};
						var testPict = require('../source/Pict.js').initialize(_MockSettings, testScope);
						Expect(testPict).to.be.an('object', 'Pict should initialize as an object directly from the require statement.');
						Expect(testScope)
							.to.have.a.property('pict')
							.that.is.a('object');
						Expect(testPict.settings)
							.to.be.a('object');
					}
				);
				test
				(
					'Try with a global scope...',
					function()
					{
						var testPict = require('../source/Pict.js').initialize(_MockSettings);
						Expect(testPict).to.be.an('object', 'Pict should initialize as an object directly from the require statement.');
						Expect(global)
							.to.have.a.property('pict')
							.that.is.a('object');
					}
				);
				test
				(
					'Explicitly set a "window" global to test browser workability',
					function()
					{
						var tmpWindow = {};
						global.window = tmpWindow;
						var testPict = require('../source/Pict.js').initialize(_MockSettings);
						Expect(testPict).to.be.an('object', 'Pict should initialize as an object directly from the require statement.');
						Expect(tmpWindow)
							.to.have.a.property('pict')
							.that.is.a('object');
					}
				);
			}
		);
	}
);