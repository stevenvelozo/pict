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

suite(
		'Pict Templates: Complex operations',
		function ()
		{
			setup(
					function ()
					{
					}
				);

			suite(
					'Conditionals',
					function ()
					{
						test(
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

									// Construct the bridge list scenario
									testPict.AppData.currentBridgeList = [];
									testPict.TemplateProvider.addTemplate('BridgeInspection-Bridge-EmptyMessage', '<p>There are no bridges to inspect.</p>');
									// This number equality should render
									let tmpTemplateOutput_No_Bridges = testPict.parseTemplate(`{~TIfAbs:BridgeInspection-Bridge-EmptyMessage:AppData:AppData.currentBridgeList.length^==^0~}`);
									Expect(tmpTemplateOutput_No_Bridges).to.equal("<p>There are no bridges to inspect.</p>");
									// Add some bridges to the list
									testPict.AppData.currentBridgeList = [1, 2, 3];
									let tmpTemplateOutput_With_Bridges = testPict.parseTemplate(`{~TIfAbs:BridgeInspection-Bridge-EmptyMessage:AppData:AppData.currentBridgeList.length^==^0~}`);
									Expect(tmpTemplateOutput_With_Bridges).to.equal("");

									// This number equality should render the template (the numeric value is == 838)
									let tmpTemplateOutput6 = testPict.parseTemplate(`<div>{~TIfAbs:ChocoTemplate:AppData.ChocoData:AppData.ChocoData.files[0].size^<^838~}</div>`, {},
										(pError, pOutput) =>
										{
											Expect(pOutput).to.equal("<div></div>");
											fDone();
										});
								}
							);
						test(
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
						test(
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
										testErrorFunction:
											function()
											{
												throw new Error('This is a thrown error.');
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
									const tmpTemplateOutput = testPict.parseTemplate(`<div>{~Template:MultiFunctionTestTemplate:AppData.ChocoData~}</div>`);
									Expect(tmpTemplateOutput).to.equal("<div><dog>This was a test... Value? ia600202.us.archive.org 8675309</dog></div>");

									// Errors in functions should be caught and not crash the system
									testPict.TemplateProvider.addTemplate('MultiFunctionErrorTestTemplate', '<dog>{~D:Pict.services.MockService.testErrorFunction().Message~} {~D:Record.d1~} {~D:Pict.services.MockService.testValue~}</dog>');
									testPict.TemplateProvider.addTemplate('MultiFunctionMissingTestTemplate', '<dog>{~D:Pict.services.MockService.FunctionDoesntExist().Message~} {~D:Record.d1~} {~D:Pict.services.MockService.testValue~}</dog>');
									Expect(testPict.parseTemplate(`<div>{~Template:MultiFunctionErrorTestTemplate:AppData.ChocoData~}</div>`))
										.to.equal("<div><dog>false ia600202.us.archive.org 8675309</dog></div>");
									Expect(testPict.parseTemplate(`<div>{~Template:MultiFunctionMissingTestTemplate:AppData.ChocoData~}</div>`))
										.to.equal("<div><dog>false ia600202.us.archive.org 8675309</dog></div>");


									return fDone();
								}
							);
						test(
								'Template Value Sets with indices',
								function (fDone)
								{
									var testPict = new libPict(_MockSettings);

									testPict.AppData.ChocoData = _SampleChocoData;

									testPict.TemplateProvider.addTemplate('Container', '{"K":"{~D:Record.Key~}","V":"{~T:ValueTemplate:Record.Value~}"},');
									testPict.TemplateProvider.addTemplate('ValueTemplate', '{~D:Record.format~}-->{~D:Record.size~}');
									let tmpTemplateDataWithKeys = testPict.parseTemplate(`{~TemplateValueSet:Container:AppData.ChocoData.files~}`);

									Expect(tmpTemplateDataWithKeys).to.equal(`{"K":"0","V":"Thumbnail-->838"},{"K":"1","V":"Thumbnail-->6843"},{"K":"2","V":"Thumbnail-->8388"},{"K":"3","V":"Thumbnail-->5993"},{"K":"4","V":"Thumbnail-->4951"},{"K":"5","V":"Thumbnail-->3383"},{"K":"6","V":"Thumbnail-->3503"},{"K":"7","V":"Archive BitTorrent-->4093"},{"K":"8","V":"Metadata-->"},{"K":"9","V":"Metadata-->1371"},{"K":"10","V":"Metadata-->620"},{"K":"11","V":"Item Tile-->7481"},{"K":"12","V":"Animated GIF-->101114"},{"K":"13","V":"MPEG2-->31625216"},{"K":"14","V":"Video Index-->31141"},{"K":"15","V":"Ogg Video-->2248166"},{"K":"16","V":"512Kb MPEG4-->2378677"},`);

									return fDone();
								}
							);
						test(
								'Template JSON Record',
								function (fDone)
								{
									var testPict = new libPict(_MockSettings);

									testPict.AppData.ChocoData = _SampleChocoData;

									let tmpTemplateDataWithKeys = testPict.parseTemplate(`{~DataJson:AppData.ChocoData.files[1]~}`);
									let tmpTemplateDataWithKeysShorthand = testPict.parseTemplate(`{~DJ:AppData.ChocoData.files[1]~}`);

									Expect(tmpTemplateDataWithKeys).to.equal(`{"name":"FrankenberryCountChoculaTevevisionCommercial1971.thumbs/frankerberry_countchockula_1971.0001_000004.jpg","source":"derivative","format":"Thumbnail","original":"frankerberry_countchockula_1971.0001.mpg","mtime":"1296336957","size":"6843","md5":"c93fa52000ab4665e69b25c403e11aff","crc32":"9444e6f6","sha1":"716b4f9950b8147f51d3265f9c62ff86451308d5"}`);
									Expect(tmpTemplateDataWithKeys).to.equal(tmpTemplateDataWithKeysShorthand);

									return fDone();
								}
							);
						test(
								'Template Set with Payload',
								function (fDone)
								{
									var testPict = new libPict(_MockSettings);

									testPict.AppData.Data = {
										Keys: [{"Key": "Name" }, { "Key": "Age" }, { "Key": "FavoriteColor" }],
										Map: {"Name": "Steve", "Homeroom":"Dog", "Age": 50, "FavoriteColor": "Blue" }
									};

									testPict.TemplateProvider.addTemplate('SetWithPayload', '[aa {~D:Record.Data.Key~}]');
									testPict.TemplateProvider.addTemplate('SetWithParsedPayload', '[{~D:Record.Data.Key~} :==: {~DVBK:Record.Payload:Record.Data.Key~}]');

									let tmpTemplateDataWithKeys = testPict.parseTemplate(`{~TSWP:SetWithPayload:AppData.Data.Keys:AppData.Data.Map~}`);

									Expect(tmpTemplateDataWithKeys).to.equal('[aa Name][aa Age][aa FavoriteColor]');

									let tmpTemplateData = testPict.parseTemplate(`{~TSWP:SetWithParsedPayload:AppData.Data.Keys:AppData.Data.Map~}`);
									
									Expect(tmpTemplateData).to.equal('[Name :==: Steve][Age :==: 50][FavoriteColor :==: Blue]');

									return fDone();
								}
							);
						}
				);
		}
	);


