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
	ProductVersion: '1.0.0',
});

suite(
	'Pict Content Assignment',
	() =>
	{
		setup (() => {});

		suite(
			'Basic Content Assignment',
			() =>
			{
				test(
					'Set, read, and replace some content at an address',
					(fDone) =>
					{
						let testPict = new libPict(_MockSettings);
						let testEnvironment = new libPict.EnvironmentObject(testPict);

						let tmpBox = testPict.ContentAssignment.assignContent('#MyBox', 'toy');
						tmpBox = testPict.ContentAssignment.readContent('#MyBox');
						Expect(tmpBox).to.equal('toy');
						tmpBox = testPict.ContentAssignment.assignContent('#MyBox', '');
						Expect(tmpBox).to.equal('');
						fDone();
					}
				);

				test(
					'Set, read, and remove an attribute at an address',
					(fDone) =>
					{
						let testPict = new libPict(_MockSettings);
						let testEnvironment = new libPict.EnvironmentObject(testPict);

						let tmpCar = testPict.ContentAssignment.readAttribute('#MyFavoriteCar', 'Car');
						Expect(tmpCar).to.equal(false);
						testPict.ContentAssignment.setAttribute('#MyFavoriteCar', 'Car', 'Data Car');
						tmpCar = testPict.ContentAssignment.readAttribute('#MyFavoriteCar', 'Car');
						Expect(tmpCar).to.equal('Data Car');
						testPict.ContentAssignment.removeAttribute('#MyFavoriteCar', 'Car');
						tmpCar = testPict.ContentAssignment.readAttribute('#MyFavoriteCar', 'Car');
						Expect(tmpCar).to.equal(false);
						fDone();
					}
				);

				test(
					'Set, read, and remove a class at an address',
					(fDone) =>
					{
						let testPict = new libPict(_MockSettings);
						let testEnvironment = new libPict.EnvironmentObject(testPict);
						let tmpCondimentMatch;
						let tmpSandwich;

						// dress a sandwich
						tmpSandwich = testPict.ContentAssignment.addClass('#MySandwich', 'mustard');
						tmpCondimentMatch = testPict.ContentAssignment.hasClass('#MySandwich', 'mustard');
						Expect(tmpCondimentMatch).to.equal(true);
						Expect(tmpSandwich).to.contain('mustard');
						tmpSandwich = testPict.ContentAssignment.addClass('#MySandwich', 'vegan mayo');
						tmpCondimentMatch = testPict.ContentAssignment.hasClass('#MySandwich', 'vegan mayo');
						Expect(tmpCondimentMatch).to.equal(true);
						Expect(tmpSandwich).to.contain('vegan mayo');
						tmpSandwich = testPict.ContentAssignment.addClass('#MySandwich', 'pickles');
						tmpCondimentMatch = testPict.ContentAssignment.hasClass('#MySandwich', 'pickles');
						Expect(tmpCondimentMatch).to.equal(true);
						tmpSandwich = testPict.ContentAssignment.removeClass('#MySandwich', 'pickles');
						tmpCondimentMatch = testPict.ContentAssignment.hasClass('#MySandwich', 'pickles');
						Expect(tmpCondimentMatch).to.equal(false);


						tmpCondimentMatch = testPict.ContentAssignment.hasClass('#MySandwich', 'Chives');
						Expect(tmpCondimentMatch).to.equal(false);
						testPict.ContentAssignment.toggleClass('#MySandwich', 'Chives');
						tmpCondimentMatch = testPict.ContentAssignment.hasClass('#MySandwich', 'Chives');
						Expect(tmpCondimentMatch).to.equal(true);
						tmpSandwich = testPict.ContentAssignment.toggleClass('#MySandwich', 'Chives');
						tmpCondimentMatch = testPict.ContentAssignment.hasClass('#MySandwich', 'Chives');
						Expect(tmpCondimentMatch).to.equal(false);
						fDone();
					}
				);

				test(
					'Virtual Assignment of Content',
					(fDone) =>
					{
						let testPict = new libPict(_MockSettings);
						let testEnvironment = new libPict.EnvironmentObject(testPict);

						testPict.ContentAssignment.projectContent('virtual-assignment', '__CachedData', 'SomeValue');
						Expect(testPict.__CachedData).to.equal('SomeValue');
						fDone();
					}
				);
			}
		);

		suite(
			'append_once semantics',
			() =>
			{
				// Simulate a real-browser-like DOM by wiring custom functions, since the
				// default Node test path has no document and the EnvironmentObject mock
				// always returns empty for getElement (which masks the bug).
				const buildPict = () =>
				{
					let tmpPict = new libPict(_MockSettings);
					let tmpDomState = {};
					let tmpDestinationContent = {};
					let tmpAppendLog = [];
					tmpPict.ContentAssignment.customGetElementFunction = (pAddress) => tmpDomState[pAddress] || [];
					tmpPict.ContentAssignment.customReadFunction = (pAddress) =>
					{
						return (pAddress in tmpDestinationContent) ? tmpDestinationContent[pAddress] : null;
					};
					tmpPict.ContentAssignment.customAppendFunction = (pAddress, pContent) =>
					{
						tmpAppendLog.push({ Address: pAddress, Content: pContent });
					};
					return { pict: tmpPict, dom: tmpDomState, content: tmpDestinationContent, appends: tmpAppendLog };
				};

				test(
					'TestAddress provided; selector not in DOM -> appends',
					(fDone) =>
					{
						let tmpHarness = buildPict();
						tmpHarness.dom['#host'] = [ { tagName: 'DIV' } ];
						tmpHarness.dom['#Widget-Row-Once'] = [];
						tmpHarness.pict.ContentAssignment.projectContent('append_once', '#host', '<div id="Widget-Row-Once"/>', '#Widget-Row-Once');
						Expect(tmpHarness.appends.length).to.equal(1);
						Expect(tmpHarness.appends[0].Address).to.equal('#host');
						fDone();
					}
				);

				test(
					'TestAddress provided; selector already present -> skips append',
					(fDone) =>
					{
						let tmpHarness = buildPict();
						tmpHarness.dom['#host'] = [ { tagName: 'DIV' } ];
						tmpHarness.dom['#Widget-Row-Once'] = [ { tagName: 'DIV' } ];
						tmpHarness.pict.ContentAssignment.projectContent('append_once', '#host', '<div id="Widget-Row-Once"/>', '#Widget-Row-Once');
						Expect(tmpHarness.appends.length).to.equal(0);
						fDone();
					}
				);

				test(
					'No TestAddress; destination is empty -> appends',
					(fDone) =>
					{
						// Without a TestAddress the "once" promise is kept by
						// treating an empty destination as "nothing here yet."
						let tmpHarness = buildPict();
						tmpHarness.dom['#host'] = [ { tagName: 'DIV' } ];
						tmpHarness.content['#host'] = '';
						tmpHarness.pict.ContentAssignment.projectContent('append_once', '#host', '<div/>');
						Expect(tmpHarness.appends.length).to.equal(1);
						fDone();
					}
				);

				test(
					'No TestAddress; destination already has content -> skips append',
					(fDone) =>
					{
						// A populated destination is the signal that the append
						// already happened -- re-renders must not duplicate.
						let tmpHarness = buildPict();
						tmpHarness.dom['#host'] = [ { tagName: 'DIV' } ];
						tmpHarness.content['#host'] = '<div>already here</div>';
						tmpHarness.pict.ContentAssignment.projectContent('append_once', '#host', '<div/>');
						Expect(tmpHarness.appends.length).to.equal(0);
						fDone();
					}
				);

				test(
					'Empty-string TestAddress is treated as no TestAddress (does not hit getElement)',
					(fDone) =>
					{
						// querySelectorAll('') throws in real browsers; routing an
						// empty string into getElement would crash on the DOM path.
						// Treat '' the same as omitted and fall back to the
						// destination-emptiness check.
						let tmpHarness = buildPict();
						tmpHarness.dom['#host'] = [ { tagName: 'DIV' } ];
						tmpHarness.content['#host'] = '';
						let tmpGetElementCalls = [];
						let tmpOriginalGet = tmpHarness.pict.ContentAssignment.customGetElementFunction;
						tmpHarness.pict.ContentAssignment.customGetElementFunction = (pAddress) =>
						{
							tmpGetElementCalls.push(pAddress);
							return tmpOriginalGet(pAddress);
						};
						tmpHarness.pict.ContentAssignment.projectContent('append_once', '#host', '<div/>', '');
						Expect(tmpHarness.appends.length).to.equal(1);
						Expect(tmpGetElementCalls).to.not.include('');
						fDone();
					}
				);

				test(
					'No TestAddress; destination is whitespace-only -> appends',
					(fDone) =>
					{
						// Whitespace (indentation between HTML tags) counts as empty.
						let tmpHarness = buildPict();
						tmpHarness.dom['#host'] = [ { tagName: 'DIV' } ];
						tmpHarness.content['#host'] = '   \n\t  ';
						tmpHarness.pict.ContentAssignment.projectContent('append_once', '#host', '<div/>');
						Expect(tmpHarness.appends.length).to.equal(1);
						fDone();
					}
				);
			}
		);
	}
);
