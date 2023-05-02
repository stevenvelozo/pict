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

const _MockSettings = (
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
						var testPict = new libPict(_MockSettings);
						Expect(testPict).to.be.an('object', 'Pict should initialize as an object directly from the require statement.');
						fDone();
					}
				);
				test
				(
					'How about a little template for the road...',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);
						testPict.initializeTemplateMethods();
						testPict.appData.TestValue = 'Test';

						let tmpTemplateOutput = testPict.parseTemplate('This is a test of the {~Data:AppData.TestValue~} template system.');
						Expect(tmpTemplateOutput).to.equal('This is a test of the Test template system.', 'The template system should parse a simple template.');
						fDone();
					}
				);
				test
				(
					'How about a different template test for the road...',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);
						testPict.initializeTemplateMethods();
						testPict.appData.TestValue = 'Test';

						let tmpTemplateOutput = testPict.parseTemplate('This is a test of the {~Data:AppData.TestValue~} template system: Dollars {~Dollars:Record.Values[0]~} or Digits {~Digits:Record.Values[0]~}.', {Values: [35.5, 42]});
						Expect(tmpTemplateOutput).to.equal('This is a test of the Test template system: Dollars $35.50 or Digits 35.50.', 'The template system should parse a simple template.');
						let tmpTemplateOutput2 = testPict.parseTemplate(`
<td>{~Data:Record.worktype_String~}</td>
<td align="center">{~Data:Record.itemnumber~}</td>
<td width="45%">{~Data:Record.description~}</td>
<td align="left">{~Data:Record.units~}</td>
<td align="right">{~Dollars:Record.costperunit~}</td>
<td align="right">{~Digits:Record.quantity~}</td>
<td align="right">{~Dollars:Record.amount~}</td>
`, {
    "addressprefix": "MaterialsOnHand.UUID1",
    "idrecord": 1,
    "description": "Stockpile Qty Obs - January 25",
    "quantity": 2593.78,
    "units": "LNFT",
    "costperunit": "0.0",
    "worktype": 310381,
    "worktype_String": "0032 Horizontal Directional Drill (Carrier Conduit)",
    "worktype_StringAbbreviated": "0032",
    "worktype_PayItems": "TS-728-37007",
    "itemnumber": "TS-728-37007"
});
//						Expect(tmpTemplateOutput2).to.equal('This is a test of the Test template system: Dollars $35.50 or Digits 35.50.', 'The template system should parse a simple template.');
						fDone();
					}
				);
			}
		);
	}
);