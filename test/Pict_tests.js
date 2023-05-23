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

						testPict.Template.addTemplate('Quantity', _QuantityTemplate);

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

						testPict.Template.addDefaultTemplate('','-List-Title', '<h1>List of {~Data:AppData.EntityName~}s</h1>');
						testPict.Template.addDefaultTemplate('','-List-Row', '<p>{~Data:Record.Name~}</p>');

						testPict.appData.EntityName = 'Band';

						Expect(testPict.Template.templates.hasOwnProperty('Quantity-List-Title')).to.equal(false, 'No template should exist before it is either set explicitly or accessed from a default.');
						Expect(testPict.parseTemplateByHash('Quantity-List-Title', _QuantityRecord)).to.equal('<h1>List of Bands</h1>', 'The template system should parse a simple default template from a hash.');

						// The second path should have the template set!
						Expect(testPict.Template.templates.hasOwnProperty('Quantity-List-Title')).to.equal(true, 'The template system should have a default template set for Quantity-List-Title after accessing it once.');
						Expect(testPict.parseTemplateByHash('Quantity-List-Title', _QuantityRecord)).to.equal('<h1>List of Bands</h1>', 'The template system should parse a simple default template from a hash.');

						return fDone();
					}
				);
				test
				(
					'Entity template rendering...',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);
						testPict.initializeTemplateMethods();

						testPict.Entity.options.urlPrefix  = 'http://localhost:8086/1.0/';

						testPict.Template.addTemplate('Book-Author-Title', '<h1>{~Data:Record.Title~}: {~Dollars:Record.IDBook~}</h1>');
						testPict.Template.addTemplate('Book-Author-Content', '<p>{~E:Book:1|Book-Author-Title~}</p>');
						testPict.Template.addTemplate('Book-Author-Load', '<p>{~E:Book:100~}{~D:Record.itemnumber~}</p>');

						testPict.parseTemplateByHash('Book-Author-Content', {IDBook: 100},
							(pError, pValue) =>
							{
								Expect(pValue).to.equal('<p><h1>The Hunger Games: $1.00</h1></p>');
								return fDone();
							});
					}
				);
				test
				(
					'Entity template rendering with Parameterized Location...',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);
						testPict.initializeTemplateMethods();

						testPict.Entity.options.urlPrefix  = 'http://localhost:8086/1.0/';

						testPict.Template.addTemplate('Book-Author-Title', '<h1>{~Data:Record.Title~}: {~Dollars:Record.IDBook~}</h1>');
						testPict.Template.addTemplate('Book-Author-Content', '<p>{~E:Book:Record.Header.IDBook|Book-Author-Title~}</p>');

						testPict.parseTemplateByHash('Book-Author-Content', {Header: {IDBook: 100}},
							(pError, pValue) =>
							{
								Expect(pValue).to.equal('<p><h1>The Poisonwood Bible: $100.00</h1></p>');
								return fDone();
							});
					}
				);
			}
		);

		test
		(
			'Simple Single Record GET REST Request',
			function(fDone)
			{
				var testPict = new libPict(_MockSettings);
				testPict.initializeTemplateMethods();

				testPict.Entity.options.urlPrefix  = 'http://localhost:8086/1.0/';

				testPict.Entity.getEntity('Author', 1,
					(pError, pRecord) =>
					{
						Expect(pRecord.Name).to.equal('Jane Austen', 'The REST request should return the correct author name.');
						testPict.log.info('Rest response: ', pRecord);
						return fDone();
					});
			}
		);

		test
		(
			'Multi-Record GET REST Request',
			function(fDone)
			{
				var testPict = new libPict(_MockSettings);
				testPict.initializeTemplateMethods();

				testPict.Entity.options.urlPrefix  = 'http://localhost:8086/1.0/';

				testPict.Entity.getEntitySet('BookAuthorJoin', 'Author', [1,2,3,4,5,6,7,8,9,10],
					(pError, pRecord) =>
					{
						Expect(pRecord.length).to.equal(84, 'There should be 84 records returned.');
						//testPict.log.info('Rest response: ', pRecord);
						return fDone();
					});
			}
		);
	}
);