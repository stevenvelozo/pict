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
	'Pict Entity Provider Tests',
	function()
	{
		setup(() => {});

		suite(
			'Entity Graph Providers',
			function()
			{
				test(
					'Basic Provider with a list.',
					function(fDone)
					{
						const testPict = new libPict(_MockSettings);

						testPict.EntityProvider.gatherDataFromServer(
							[
								{
									"Entity": "Author",
									"Filter": "FBV~IDAuthor~EQ~100",
									"Destination": "AppData.CurrentAuthor",
									// This marshals a single record
									"SingleRecord": true
								},
								{
									"Entity": "BookAuthorJoin",
									"Filter": "FBV~IDAuthor~EQ~{~D:AppData.CurrentAuthor.IDAuthor~}",
									"Destination": "AppData.BookAuthorJoins"
								},
								{
									"Entity": "Book",
									"Filter": "FBL~IDBook~INN~{~PJU:,^IDBook^AppData.BookAuthorJoins~}",
									"Destination": "AppData.Books"
								},
								{
									"Type": "Custom",
									"URL": "Author/Schema",
									"Destination": "AppData.AuthorSchema"
								}
							],
							function (pError, pResult)
							{
								Expect(testPict.AppData.CurrentAuthor.IDAuthor).to.equal(100);
								Expect(testPict.AppData.BookAuthorJoins.length).to.be.greaterThan(0);
								Expect(testPict.AppData.AuthorSchema).to.be.an('object');
								return fDone();
							}.bind(this));
					}
				);
			}
		);
	}
);
