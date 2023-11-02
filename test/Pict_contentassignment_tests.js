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

suite
(
	'Pict Content Assignment',
	() =>
	{
		setup (() => {});

		suite
		(
			'Basic Content Assignment',
			() =>
			{
				test
				(
					'Set content into an address',
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
			}
		);
	}
);