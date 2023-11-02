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

				test
				(
					'Check an element for a class name, then add and remove classes',
					(fDone) =>
					{
						let testPict = new libPict(_MockSettings);
						let classMap = {};
						// for 'hasClass'
						testPict.ContentAssignment.customReadClassFunction = (pAddress, pClass) =>
						{ 
							if (pClass === 'mustard') 
							{
								return true;
							} 
							else 
							{
								return false;
							}
						}
						// for 'addClass'
						testPict.ContentAssignment.customSetClassFunction = (pAddress, pClass) =>
						{ 
							if (!classMap[pAddress]) 
							{
								classMap[pAddress] = [];
							} 
							if (!classMap[pAddress].hasOwnProperty(pClass)) 
							{
								classMap[pAddress].push(pClass);
							}
						}
						// for 'removeClass'
						testPict.ContentAssignment.customRemoveClassFunction = (pAddress, pClass) =>
						{ 
							if (!classMap[pAddress]) 
							{
								classMap[pAddress] = [];
							} 
							if (!classMap[pAddress].hasOwnProperty(pClass)) 
							{
								classMap[pAddress].splice(pClass);
							}
						}
						// dress a sandwich
						let tmpSandwich = testPict.ContentAssignment.hasClass('#MySandwich', 'mustard');
						Expect(tmpSandwich).to.equal(true);
						tmpSandwich = testPict.ContentAssignment.hasClass('#MySandwich', 'mayo');
						Expect(tmpSandwich).to.equal(false);
						testPict.ContentAssignment.addClass('#MySandwich', 'pickles');
						testPict.ContentAssignment.addClass('#MySandwich', 'mayo');
						Expect(classMap['#MySandwich']).to.contain('mayo');
						testPict.ContentAssignment.removeClass('#MySandwich', 'pickles');
						Expect(classMap['#MySandwich']).to.not.contain('pickles');
						fDone();
					}
				);
				
			}
		);
	}
);