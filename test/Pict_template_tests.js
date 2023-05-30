/**
* Unit tests for Pict Templating Pipeline
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*/

const Chai = require("chai");
const Expect = Chai.expect;

const libPict = require('../source/Pict.js');

const _SampleChocoData = require('./data/Data-Archive-org-Frankenberry.json');

// Outside and inside the docker container, the port is different.
//const _RetoldTestPort = 60086;
const _RetoldTestPort = 8086;

const _MockSettings = (
{
	Product: 'MockPict',
	ProductVersion: '1.0.0',

	PictDefaultURLPrefix: `http://localhost:${_RetoldTestPort}/1.0/`
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
	'Pict Templates',
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
			'Complex Processing',
			function()
			{
				test
				(
					'Templates should be able to run on sets.',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);
						let tmpTemplateOutput = testPict.parseTemplateSet('<p>{~Data:Record.size~}</p>', _SampleChocoData.files);
						Expect(tmpTemplateOutput).to.equal("<p>838</p><p>6843</p><p>8388</p><p>5993</p><p>4951</p><p>3383</p><p>3503</p><p>4093</p><p></p><p>1371</p><p>620</p><p>7481</p><p>101114</p><p>31625216</p><p>31141</p><p>2248166</p><p>2378677</p>");
						fDone();
					}
				);
				test
				(
					'Simple templates with generative data.',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);
						let tmpTemplateOutput = testPict.parseTemplate('<p>{~RandomNumberString:10~}</p>', {});
						Expect(tmpTemplateOutput.length).to.be.greaterThan(7);
						tmpTemplateOutput = testPict.parseTemplate('<p>{~RandomNumberString:~}</p>', {});
						Expect(tmpTemplateOutput.length).to.be.greaterThan(7);
						tmpTemplateOutput = testPict.parseTemplate('<p>{~RandomNumberString:17,100~}</p>', {});
						Expect(tmpTemplateOutput.length).to.be.greaterThan(7);
						tmpTemplateOutput = testPict.parseTemplate('<p>{~RandomNumberString:10,999999999~}</p>', {});
						Expect(tmpTemplateOutput.length).to.be.greaterThan(7);
						fDone();
					}
				);
				test
				(
					'Generate identifiers',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);
						let tmpTemplateOutput = testPict.parseTemplate('<p>{~PascalCaseIdentifier:Record.name~}</p>', {name:'meadow-endpoints'});
						Expect(tmpTemplateOutput).to.equal('<p>MeadowEndpoints</p>');
						fDone();
					}
				);
				test
				(
					'Templates should be able to run on sets asynchronously.',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);
						testPict.parseTemplateSet('<p>{~Data:Record.size~}</p>', _SampleChocoData.files,
							(pError, pValue) =>
							{
								Expect(pValue).to.equal("<p>838</p><p>6843</p><p>8388</p><p>5993</p><p>4951</p><p>3383</p><p>3503</p><p>4093</p><p></p><p>1371</p><p>620</p><p>7481</p><p>101114</p><p>31625216</p><p>31141</p><p>2248166</p><p>2378677</p>");
								return fDone();
							});
					}
				);
				test
				(
					'Templates should be able to run on sets what are objects.',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);
						var testCollectionObject = {};
						for (let i = 0; i < _SampleChocoData.files.length; i++)
						{
							testCollectionObject[_SampleChocoData.files[i].name] = _SampleChocoData.files[i];
						}
						let tmpTemplateOutput = testPict.parseTemplateSet('<p>{~Data:Record.size~}</p>', testCollectionObject);
						Expect(tmpTemplateOutput).to.equal("<p>838</p><p>6843</p><p>8388</p><p>5993</p><p>4951</p><p>3383</p><p>3503</p><p>4093</p><p></p><p>1371</p><p>620</p><p>7481</p><p>101114</p><p>31625216</p><p>31141</p><p>2248166</p><p>2378677</p>");
						fDone();
					}
				);
				test
				(
					'Use the template manager a bit...',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);

						testPict.TemplateProvider.addTemplate('Quantity', _QuantityTemplate);

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

						testPict.TemplateProvider.addDefaultTemplate('', '-List-Title', '<h1>List of {~Data:AppData.EntityName~}s</h1>');
						testPict.TemplateProvider.addDefaultTemplate('', '-List-Row', '<p>{~Data:Record.Name~}</p>');
						testPict.TemplateProvider.addDefaultTemplate('', '-Bad-End', false);

						testPict.TemplateProvider.loadTemplateFunction = (pTemplateHash) => 
						{
							if (pTemplateHash == 'Foo-List-Title')
							{
								return `This is the template for ${pTemplateHash}`;
							}
						};

						Expect(testPict.TemplateProvider.templates.hasOwnProperty('Foo-List-Title')).to.equal(false, 'No template should exist before it is either set explicitly or accessed from a default.');
						testPict.TemplateProvider.loadTemplate('Foo-List-Title');
						Expect(testPict.TemplateProvider.templates.hasOwnProperty('Foo-List-Title')).to.equal(true, 'The template system should have a default template set for Foo-List-Title after loading it.');

						testPict.AppData = { Dog: {Name: 'Wilco', Age: 14, Owner: 'Jack'} }

						testPict.TemplateProvider.addTemplate('DogNameStuff','If this dog has a name, breakdance! {~NE:AppData.Dog.Name|<br/>~}');

						Expect(testPict.parseTemplateByHash('DogNameStuff')).to.equal('If this dog has a name, breakdance! <br/>');

						delete testPict.AppData.Dog.Name;

						Expect(testPict.parseTemplateByHash('DogNameStuff')).to.equal('If this dog has a name, breakdance! ');

						testPict.AppData.EntityName = 'Band';

						Expect(testPict.TemplateProvider.templates.hasOwnProperty('Quantity-List-Title')).to.equal(false, 'No template should exist before it is either set explicitly or accessed from a default.');
						Expect(testPict.parseTemplateByHash('Quantity-List-Title', _QuantityRecord)).to.equal('<h1>List of Bands</h1>', 'The template system should parse a simple default template from a hash.');

						// The second path should have the template set!
						Expect(testPict.TemplateProvider.templates.hasOwnProperty('Quantity-List-Title')).to.equal(true, 'The template system should have a default template set for Quantity-List-Title after accessing it once.');
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

						testPict.TemplateProvider.addTemplate('Book-Author-Title', '<h1>{~Data:Record.Title~}: {~Dollars:Record.IDBook~}</h1>');
						testPict.TemplateProvider.addTemplate('Book-Author-Content', '<p>{~E:Book:1|Book-Author-Title~}</p>');
						testPict.TemplateProvider.addTemplate('Book-Author-Load', '<p>{~E:Book:100~}{~D:Record.itemnumber~}</p>');

						testPict.parseTemplateByHash('Book-Author-Content', {IDBook: 100},
							(pError, pValue) =>
							{
								Expect(pValue).to.equal('<p><h1>Angels & Demons: $1.00</h1></p>');
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

						testPict.TemplateProvider.addTemplate('Book-Author-Title', '<h1>{~Data:Record.Title~}: {~Dollars:Record.IDBook~}</h1>');
						testPict.TemplateProvider.addTemplate('Book-Author-Content', '<p>{~E:Book:Record.Header.IDBook|Book-Author-Title~}</p>');

						testPict.parseTemplateByHash('Book-Author-Content', {Header: {IDBook: 100}},
							(pError, pValue) =>
							{
								Expect(pValue).to.equal('<p><h1>The Poisonwood Bible: $100.00</h1></p>');
								return fDone();
							});
					}
				);
				test
				(
					'Template rendering process...',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);

						testPict.AppData.RecordSet = {IDAnimal: 1, Name: 'Fido', Type: 'Dog', Age: 3};

						testPict.TemplateProvider.addTemplate('Book-Author-Title', '<h1>{~Data:Record.Title~}: {~Dollars:Record.IDBook~}</h1>');
						testPict.TemplateProvider.addTemplate('Book-Author-Content', '{~T:Book-Author-Title~}<p>{~E:Book:777|Book-Author-Title~}</p>');

						testPict.TemplateProvider.addTemplate('Animal-View', '<p>{~Data:Record.Name~} is a {~Data:Record.Type~} that is {~Data:Record.Age~} years old.</p>');
						testPict.TemplateProvider.addTemplate('Animal-Screen', '<h1>{~D:AppData.RecordSet.Type~}</h1>{~T:Animal-View:AppData.RecordSet~}');

						let tmpTemplateOutput = testPict.parseTemplateByHash('Animal-Screen');

						Expect(tmpTemplateOutput).to.equal('<h1>Dog</h1><p>Fido is a Dog that is 3 years old.</p>', 'The template system should parse a simple template from a hash.');

						testPict.parseTemplateByHash('Book-Author-Content', {IDBook: 10000, Title:'I learn things.'},
							(pError, pValue) =>
							{
								Expect(pValue).to.equal('<h1>I learn things.: $10,000.00</h1><p><h1>Jemima J: $777.00</h1></p>');
								return fDone();
							});
					}
				);
				test
				(
					'Template sets in other templates...',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);

						testPict.AppData = {Records:_SampleChocoData, EntityName: 'Choco', Title: 'Choco Deluxe Records'};

						testPict.LogNoisiness = 4;

						testPict.TemplateProvider.addTemplate('Choco-Row', '<p>{~Data:Record.name~} is a file of {~Data:Record.size~} bytes big.</p>');
						testPict.TemplateProvider.addTemplate('Choco-Screen', '<h1>{~D:AppData.Title~}</h1>{~TS:Choco-Row:AppData.Records.files~}');

						let tmpTemplateOutput = testPict.parseTemplateByHash('Choco-Screen');

						Expect(tmpTemplateOutput).to.equal("<h1>Choco Deluxe Records</h1><p>FrankenberryCountChoculaTevevisionCommercial1971.thumbs/frankerberry_countchockula_1971.0001_000001.jpg is a file of 838 bytes big.</p><p>FrankenberryCountChoculaTevevisionCommercial1971.thumbs/frankerberry_countchockula_1971.0001_000004.jpg is a file of 6843 bytes big.</p><p>FrankenberryCountChoculaTevevisionCommercial1971.thumbs/frankerberry_countchockula_1971.0001_000009.jpg is a file of 8388 bytes big.</p><p>FrankenberryCountChoculaTevevisionCommercial1971.thumbs/frankerberry_countchockula_1971.0001_000014.jpg is a file of 5993 bytes big.</p><p>FrankenberryCountChoculaTevevisionCommercial1971.thumbs/frankerberry_countchockula_1971.0001_000019.jpg is a file of 4951 bytes big.</p><p>FrankenberryCountChoculaTevevisionCommercial1971.thumbs/frankerberry_countchockula_1971.0001_000024.jpg is a file of 3383 bytes big.</p><p>FrankenberryCountChoculaTevevisionCommercial1971.thumbs/frankerberry_countchockula_1971.0001_000029.jpg is a file of 3503 bytes big.</p><p>FrankenberryCountChoculaTevevisionCommercial1971_archive.torrent is a file of 4093 bytes big.</p><p>FrankenberryCountChoculaTevevisionCommercial1971_files.xml is a file of  bytes big.</p><p>FrankenberryCountChoculaTevevisionCommercial1971_meta.xml is a file of 1371 bytes big.</p><p>FrankenberryCountChoculaTevevisionCommercial1971_reviews.xml is a file of 620 bytes big.</p><p>__ia_thumb.jpg is a file of 7481 bytes big.</p><p>frankerberry_countchockula_1971.0001.gif is a file of 101114 bytes big.</p><p>frankerberry_countchockula_1971.0001.mpg is a file of 31625216 bytes big.</p><p>frankerberry_countchockula_1971.0001.mpg.idx is a file of 31141 bytes big.</p><p>frankerberry_countchockula_1971.0001.ogv is a file of 2248166 bytes big.</p><p>frankerberry_countchockula_1971.0001_512kb.mp4 is a file of 2378677 bytes big.</p>");
						return fDone();
					}
				);
			}
		);
	}
);