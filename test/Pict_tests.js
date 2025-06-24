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

const _MockSettings = (
{
	Product: 'MockPict',
	ProductVersion: '1.0.0',

	PictDefaultURLPrefix: `http://localhost:${_RetoldTestPort}/1.0/`
});

suite(
	'Pict',
	function()
	{
		setup(
			function()
			{
			}
		);

		suite(
			'Object Sanity',
			function()
			{
				test(
					'The class should initialize itself into a happy little object.',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);
						Expect(testPict).to.be.an('object', 'Pict should initialize as an object directly from the require statement.');

						// Test package anthropology
						Expect(testPict._PackageFableServiceProvider).to.be.an('object', 'Fable should have a _PackageFableServiceProvider object.');
						Expect(testPict._PackageFableServiceProvider.name).equal('fable-serviceproviderbase', 'Fable _PackageFableServiceProvider.package.name should be set.');
						Expect(testPict._PackageFable).to.be.an('object', 'Pict should have a _PackageFable object.');
						Expect(testPict._PackageFable.name).to.equal('fable', 'Pict _PackageFable.package.name should be set.');
						Expect(testPict._Package).to.be.an('object', 'Pict should have a _Package object.');
						Expect(testPict._Package.name).to.equal('pict', 'Pict _Package.package.name should be set.');

						const testPictNoConfig = new libPict();
						Expect(testPictNoConfig.settings).to.be.an('object', 'Pict should initialize properly without settings passed in.');

						fDone();
					}
				);
				test(
					'The class should initialize itself into a happy little object with a default AppData.',
					function(fDone)
					{
						let tmpSettings = JSON.parse(JSON.stringify(_MockSettings));
						tmpSettings.DefaultAppData = { Value:'Jimbo',ObjectValue:{Count:10,DisasterType:'Very Disasterous'}}
						var testPict = new libPict(tmpSettings);
						Expect(testPict).to.be.an('object', 'Pict should initialize as an object directly from the require statement.');
						Expect(testPict.AppData.Value).to.equal('Jimbo');
						Expect(testPict.AppData.ObjectValue.Count).to.equal(10);
						fDone();
					}
				);
				test(
					'How about a little template for the road...',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);
						testPict.AppData.TestValue = 'Test';

						let tmpTemplateOutput = testPict.parseTemplate('This is a test of the {~Data:AppData.TestValue~} template system.');
						Expect(tmpTemplateOutput).to.equal('This is a test of the Test template system.', 'The template system should parse a simple template.');
						fDone();
					}
				);
				test(
					'How about a different template test for the road...',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);
						testPict.AppData.TestValue = 'Test';

						let tmpTemplateOutput = testPict.parseTemplate('This is a test of the {~Data:AppData.TestValue~} template system: Dollars {~Dollars:Record.Values[0]~} or Digits {~Digits:Record.Values[0]~}.', {Values: [35.5, 42]});
						Expect(tmpTemplateOutput).to.equal('This is a test of the Test template system: Dollars $35.50 or Digits 35.50.', 'The template system should parse a simple template.');
						fDone();
					}
				);

				test(
					'Simple Single Record GET REST Request',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);

						testPict.EntityProvider.getEntity('Author', 1,
							(pError, pRecord) =>
							{
								Expect(pRecord.Name).to.equal('John Green', 'The REST request should return the correct author name.');
								testPict.log.info('Rest response: ', pRecord);
								return fDone();
							});
					}
				);

				test(
					'Multi-Record GET REST Request',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);

						testPict.EntityProvider.getEntitySet('BookAuthorJoin', `FBL~IDAuthor~INN~${[1,2,3,4,5,6,7,8,9,10].join(",")}`,
							(pError, pRecord) =>
							{
								Expect(pRecord.length).to.equal(84, 'There should be 84 records returned.');
								testPict.log.info('Rest response: ', pRecord);
								return fDone();
							});
					}
				);

				test(
					'Math test',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);


						Expect(testPict.Math.parsePrecise(1)).to.equal('1');
						// 3.3333333333333333333333333333333 in the current node.js implementation collapses to 3.3333333333333335
						Expect(testPict.Math.parsePrecise('4.33333333333333333333333332133333333')).to.equal('4.33333333333333333333333332133333333');
						Expect(testPict.Math.parsePrecise(undefined)).to.equal('0.0');

						return fDone();
					}
				);
			}
		);
	}
);
