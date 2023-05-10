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

const _QuantityTemplate = `
<td>{~Data:Record.worktype_String~}</td>
<td align="center">{~Data:Record.itemnumber~}</td>
<td width="45%">{~Data:Record.description~}</td>
<td align="left">{~Data:Record.units~}</td>
<td align="right">{~Dollars:Record.costperunit~}</td>
<td align="right">{~Digits:Record.quantity~}</td>
<td align="right">{~Dollars:Record.amount~}</td>
`;

const _QuantityRecord = require('./data/SampleRecord-Quantity.json');

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
						fDone();
					}
				);
				test
				(
					'Use the template manager a bit...',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);
						testPict.initializeTemplateMethods();

						testPict.defaultServices.TemplateProvider.addTemplate('Quantity', _QuantityTemplate);

						let tmpTemplateOutput = testPict.parseTemplateByHash('Quantity', _QuantityRecord);
						Expect(tmpTemplateOutput).to.equal(`
<td>0099 Horizontal Carrier Conduit Directional Drill</td>
<td align="center">OU-001-19819</td>
<td width="45%">Directional Bore Conduit</td>
<td align="left">LNFT</td>
<td align="right">$852.00</td>
<td align="right">867.53</td>
<td align="right">--</td>
`, 'The template system should parse a simple template from a hash.');

						Expect(testPict.parseTemplateByHash('ThisTemplateDoesNotExist', _QuantityRecord)).to.equal('', 'The template system should return an empty string if the template does not exist.');

						return fDone();
					}
				);
				test
				(
					'Try some defaults for the template manager...',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);
						testPict.initializeTemplateMethods();

						testPict.defaultServices.TemplateProvider.addDefaultTemplate('-ListTitle', '<h1>List of {~Data:AppData.EntityName~}s</h1>');
						testPict.defaultServices.TemplateProvider.addDefaultTemplate('-ListRow', '<p>{~Data:Record.Name~}</p>');

						testPict.appData.EntityName = 'Band';

						Expect(testPict.defaultServices.TemplateProvider.templates.hasOwnProperty('Quantity-ListTitle')).to.equal(false, 'No template should exist before it is either set explicitly or accessed from a default.');
						Expect(testPict.parseTemplateByHash('Quantity-ListTitle', _QuantityRecord)).to.equal('<h1>List of Bands</h1>', 'The template system should parse a simple default template from a hash.');

						// The second path should have the template set!
						Expect(testPict.defaultServices.TemplateProvider.templates.hasOwnProperty('Quantity-ListTitle')).to.equal(true, 'The template system should have a default template set for Quantity-ListTitle after accessing it once.');
						Expect(testPict.parseTemplateByHash('Quantity-ListTitle', _QuantityRecord)).to.equal('<h1>List of Bands</h1>', 'The template system should parse a simple default template from a hash.');

						return fDone();
					}
				);
			}
		);
	}
);