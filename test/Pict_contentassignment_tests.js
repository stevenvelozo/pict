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
						fDone();
					}
				);
			}
		);
	}
);
