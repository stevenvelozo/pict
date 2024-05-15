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
									let tmpTemplateOutput3 = testPict.parseTemplate(`<div>{~TemplateIf:ChocoTemplate:AppData.ChocoData:AppData.ChocoData.files[1].size^<=^AppData.ChocoData.files[2].size~}</div>`, {},
										(pError, pOutput) =>
										{
											Expect(pOutput).to.equal("<div><p>/7/items/FrankenberryCountChoculaTevevisionCommercial1971</p></div>");
											return fDone();
										});

									// // This number equality should render the template (the numeric value is == 838)
									// let tmpTemplateOutput4 = testPict.parseTemplate(`<div>{~TemplateIfAbsolute:ChocoTemplate:AppData.ChocoData:AppData.ChocoData.files[0].size^>^837~}</div>`);
									// Expect(tmpTemplateOutput4).to.equal("<div><p>/7/items/FrankenberryCountChoculaTevevisionCommercial1971</p></div>");

									// // This number equality should render the template (the numeric value is == 838)
									// let tmpTemplateOutput5 = testPict.parseTemplate(`<div>{~TemplateIfAbsolute:ChocoTemplate:AppData.ChocoData:AppData.ChocoData.files[0].size^<^839~}</div>`);
									// Expect(tmpTemplateOutput5).to.equal("<div><p>/7/items/FrankenberryCountChoculaTevevisionCommercial1971</p></div>");

									// // This number equality should render the template (the numeric value is == 838)
									// let tmpTemplateOutput6 = testPict.parseTemplate(`<div>{~TIfAbs:ChocoTemplate:AppData.ChocoData:AppData.ChocoData.files[0].size^<^838~}</div>`, {},
									// 	(pError, pOutput) =>
									// 	{
									// 		Expect(pOutput).to.equal("<div></div>");
									// 		fDone();
									// 	});
								}
							);
						}
				);
		}
	);