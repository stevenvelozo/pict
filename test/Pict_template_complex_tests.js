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

suite
	(
		'Pict Templates: Complex operations',
		function ()
		{
			setup
				(
					function ()
					{
					}
				);

			suite
				(
					'Conditionals',
					function ()
					{
						test
							(
								'Templates are only processed based on conditions in data',
								function (fDone)
								{
									var testPict = new libPict(_MockSettings);

									testPict.AppData.ChocoData = _SampleChocoData;
									testPict.TemplateProvider.addTemplate('ChocoTemplate', '<p>{~D:Record.dir~}</p>');

									// This string equality should render the template
									let tmpTemplateOutput = testPict.parseTemplate(`<div>{~TemplateIfAbsolute:ChocoTemplate:AppData.ChocoData:AppData.ChocoData.d1^==^ia600202.us.archive.org~}</div>`);
									Expect(tmpTemplateOutput).to.equal("<div><p>/7/items/FrankenberryCountChoculaTevevisionCommercial1971</p></div>");

									// This string equality should not render the template
									let tmpTemplateOutput2 = testPict.parseTemplate(`<div>{~TemplateIfAbsolute:ChocoTemplate:AppData.ChocoData:AppData.ChocoData.d1^==^ia6002.us.archive.org~}</div>`);
									Expect(tmpTemplateOutput2).to.equal("<div></div>");

									// This number equality should render the template
									let tmpTemplateOutput3 = testPict.parseTemplate(`<div>{~TemplateIfAbsolute:ChocoTemplate:AppData.ChocoData:AppData.ChocoData.files[0].size^==^838~}</div>`);
									Expect(tmpTemplateOutput3).to.equal("<div><p>/7/items/FrankenberryCountChoculaTevevisionCommercial1971</p></div>");

									// This number equality should render the template (the numeric value is == 838)
									let tmpTemplateOutput4 = testPict.parseTemplate(`<div>{~TemplateIfAbsolute:ChocoTemplate:AppData.ChocoData:AppData.ChocoData.files[0].size^>^837~}</div>`);
									Expect(tmpTemplateOutput4).to.equal("<div><p>/7/items/FrankenberryCountChoculaTevevisionCommercial1971</p></div>");

									// This number equality should render the template (the numeric value is == 838)
									let tmpTemplateOutput5 = testPict.parseTemplate(`<div>{~TemplateIfAbsolute:ChocoTemplate:AppData.ChocoData:AppData.ChocoData.files[0].size^<^839~}</div>`);
									Expect(tmpTemplateOutput5).to.equal("<div><p>/7/items/FrankenberryCountChoculaTevevisionCommercial1971</p></div>");

									// This number equality should render the template (the numeric value is == 838)
									let tmpTemplateOutput6 = testPict.parseTemplate(`<div>{~TIfAbs:ChocoTemplate:AppData.ChocoData:AppData.ChocoData.files[0].size^<^838~}</div>`, {},
										(pError, pOutput) =>
										{
											Expect(pOutput).to.equal("<div></div>");
											fDone();
										});
								}
							);
						test
							(
								'Relative Addressing in Conditionals',
								function (fDone)
								{
									var testPict = new libPict(_MockSettings);

									testPict.AppData.ChocoData = _SampleChocoData;
									testPict.TemplateProvider.addTemplate('ChocoTemplate', '<p>{~D:Record.dir~}</p>');

									// This is a bad address
									let tmpTemplateOutput = testPict.parseTemplate(`<div>{~TemplateIf:ChocoTemplate:AppData.ChocoData:AppData.ChocoData.d1^==^ia600202.us.archive.org~}</div>`);
									Expect(tmpTemplateOutput).to.equal("<div></div>");

									// These two addresses 
									let tmpTemplateOutput2 = testPict.parseTemplate(`<div>{~TemplateIf:ChocoTemplate:AppData.ChocoData:AppData.ChocoData.d1^==^AppData.ChocoData.d0~}</div>`);
									Expect(tmpTemplateOutput2).to.equal("<div><p>/7/items/FrankenberryCountChoculaTevevisionCommercial1971</p></div>");

									// This number equality should render the template
									testPict.parseTemplate(`<div>{~TemplateIf:ChocoTemplate:AppData.ChocoData:AppData.ChocoData.files[1].size^<=^AppData.ChocoData.files[2].size~}</div>`, {},
										(pError, pOutput) =>
										{
											Expect(pOutput).to.equal("<div><p>/7/items/FrankenberryCountChoculaTevevisionCommercial1971</p></div>");
											return fDone();
										});
								}
							);
						test
							(
								'Functions and Services and Conditionals',
								function (fDone)
								{
									var testPict = new libPict(_MockSettings);

									testPict.AppData.ChocoData = _SampleChocoData;

									testPict.services.MockService = {
										testValue: 0,
										testMessagePrefix: 'This was a test... Value?',
										getTestValue: function () { return this.testValue; },
										testFunction:
											function(pNewTestValue)
											{
												// Pick a random number from 1-100 unless something explicit is passed in
												let tmpNewTestValue = (typeof(pNewTestValue) === 'undefined') ? Math.floor(Math.random() * (100 - 1)) + 1 : pNewTestValue;
												this.testValue = tmpNewTestValue;
												return tmpNewTestValue;
											},
										testDataFunction:
											function()
											{
												return { Message: this.testMessagePrefix, Code: 808 };
											},
										metaData:
											{
												bigNumber: 50000,
												smallNumber: 11
											}
									};

									testPict.TemplateProvider.addTemplate('FunctionTestTemplate', '<review>{~D:Record.reviews[0].reviewtitle~}</review><rating>{~D:Pict.services.MockService.getTestValue()~}</rating>');
									let tmpTemplateOutputFunctionsWithConditionals = testPict.parseTemplate(`<div>{~TemplateIfAbsolute:FunctionTestTemplate:AppData.ChocoData:Pict.services.MockService.testFunction()^>=^50~}</div>`);
									
									// This test exercises a function that isn't deterministic -- it randomly generates a value between 1 and 100 and only shows the review if it's >0 50
									let tmpTemplateResult = `<div><review>pre booberry</review><rating>${testPict.services.MockService.testValue}</rating></div>`;
									if (testPict.services.MockService.testValue < 50)
										tmpTemplateResult = "<div></div>";
									Expect(tmpTemplateOutputFunctionsWithConditionals).to.equal(tmpTemplateResult);

									// This template is complicated ... it uses midpoint functions that return an object
									testPict.TemplateProvider.addTemplate('MultiFunctionTestTemplate', '<dog>{~D:Pict.services.MockService.testDataFunction().Message~} {~D:Record.d1~} {~D:Pict.services.MockService.testValue~}</dog>');
									// Pass in the Count Chocula json data as the Record object
									// Set the value to 8675309
									testPict.services.MockService.testValue = 8675309;
									tmpTemplateOutput = testPict.parseTemplate(`<div>{~Template:MultiFunctionTestTemplate:AppData.ChocoData~}</div>`);
									Expect(tmpTemplateOutput).to.equal("<div><dog>This was a test... Value? ia600202.us.archive.org 8675309</dog></div>");

									return fDone();

								}
							);
						}
				);
		}
	);
