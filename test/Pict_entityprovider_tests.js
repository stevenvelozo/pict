/**
* Unit tests for Pict
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*/

const Chai = require("chai");
const Expect = Chai.expect;
const Sinon = require("sinon");

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
				test(
					'Decoration Provider with a list.',
					function(fDone)
					{
						const testPict = new libPict(_MockSettings);

						testPict.EntityProvider.gatherDataFromServer(
							[
								{
									"Type": "SetStateAddress",
									"StateAddress": "AppData.TestState",
								},
								{
									"Entity": "Author",
									"Filter": "FBL~IDAuthor~LT~10",
									"Destination": "State.Authors"
								},
								{
									"Entity": "BookAuthorJoin",
									"Filter": "FBL~IDAuthor~INN~{~PJU:,^IDAuthor^Record.State.Authors~}",
									"Destination": "State.BookAuthorJoins"
								},
								{
									"Entity": "Book",
									"Filter": "FBL~IDBook~INN~{~PJU:,^IDBook^Record.State.BookAuthorJoins~}",
									"Destination": "State.Books"
								},
								{
									"Type": "MapJoin",
									"DestinationRecordSetAddress": "State.Authors",
									"DestinationJoinValue": "IDAuthor",
									"JoinJoinValueLHS": "IDAuthor",
									"Joins": "State.BookAuthorJoins",
									"JoinJoinValueRHS": "IDBook",
									"JoinRecordSetAddress": "State.Books",
									"JoinValue": "IDBook",
									"RecordDestinationAddress": "Books"
								},
								{
									"Entity": "BookAuthorJoin",
									"Filter": "FBL~IDBook~INN~{~PJU:,^IDBook^Record.State.Books~}",
									"Destination": "State.BookAuthorJoinsRev"
								},
								{
									"Entity": "Author",
									"Filter": "FBL~IDAuthor~INN~{~PJU:,^IDAuthor^Record.State.BookAuthorJoinsRev~}",
									"Destination": "State.AuthorsRev"
								},
								{
									"Type": "MapJoin",
									"DestinationRecordSetAddress": "State.Books",
									"DestinationJoinValue": "IDBook",
									"JoinJoinValueLHS": "IDBook",
									"Joins": "State.BookAuthorJoinsRev",
									"JoinJoinValueRHS": "IDAuthor",
									"JoinRecordSetAddress": "State.AuthorsRev",
									"JoinValue": "IDAuthor",
									"RecordDestinationAddress": "Authors"
								},
								{
									"Type": "MapJoin",
									"DestinationRecordSetAddress": "State.Books",
									"DestinationJoinValue": "IDBook",
									"JoinJoinValueLHS": "IDBook",
									"Joins": "State.BookAuthorJoinsRev",
									"JoinJoinValueRHS": "IDAuthor",
									"JoinRecordSetAddress": "State.AuthorsRev",
									"JoinValue": "IDAuthor",
									"BucketBy": 'IDAuthor',
									"RecordDestinationAddress": "AuthorMap"
								},
								{
									"Type": "MapJoin",
									"DestinationRecordAddress": "AppData",
									"JoinRecordSetAddress": "State.Books",
									"BucketBy": [ "PublicationYear", "IDBook" ],
									"RecordDestinationAddress": "BooksByYearAndID"
								},
								{
									"Type": "MapJoin",
									"SingleRecord": true,
									"DestinationRecordAddress": "AppData",
									"JoinRecordSetAddress": "State.Books",
									"BucketBy": [ "PublicationYear", "IDBook" ],
									"RecordDestinationAddress": "BooksByYearAndIDSingle"
								},
								{
									"Type": "MapJoin",
									"DestinationRecordAddress": "AppData",
									"JoinRecordSetAddress": "State.Books",
									"BucketByTemplate": "{~PJU:-^IDAuthor^Record.Authors~}",
									"RecordDestinationAddress": "BooksByAuthors"
								},
								{
									"Type": "MapJoin",
									"SingleRecord": true,
									"DestinationRecordAddress": "AppData",
									"JoinRecordSetAddress": "State.Books",
									"BucketBy": "IDBook",
									"RecordDestinationAddress": "BooksByID"
								},
							],
							function (pError, pResult)
							{
								try
								{
									Expect(pError).to.not.exist;
									Expect(testPict.AppData.TestState.Authors.length).to.equal(9);
									Expect(testPict.AppData.TestState.AuthorsRev.length).to.be.greaterThan(8);
									Expect(testPict.AppData.TestState.BookAuthorJoins.length).to.be.greaterThan(8);
									for (const tmpAuthor of testPict.AppData.TestState.Authors)
									{
										Expect(tmpAuthor.Books).to.be.an('array');
										Expect(tmpAuthor.Books.length).to.be.greaterThan(0);
									}
									for (const tmpBook of testPict.AppData.TestState.Books)
									{
										Expect(tmpBook.Authors).to.be.an('array');
										Expect(tmpBook.Authors.length).to.be.greaterThan(0);
										Expect(tmpBook.AuthorMap).to.be.an('object');
										Expect(tmpBook.Authors.length).to.equal(Object.keys(tmpBook.AuthorMap).length);
									}
									Expect(Object.keys(testPict.AppData.BooksByYearAndID).length).to.be.greaterThan(0);
									Expect(Object.keys(testPict.AppData.BooksByYearAndID['2016']).length).to.be.greaterThan(0);
									Expect(testPict.AppData.BooksByYearAndID['2016']['4641']).to.be.an('array');
									Expect(testPict.AppData.BooksByYearAndID['2016']['4641'].length).to.equal(1);
									Expect(testPict.AppData.BooksByYearAndIDSingle['2016']['4641']).to.be.an('object');
									Expect(testPict.AppData.BooksByYearAndIDSingle['2016']['4641'].IDBook).to.equal(4641);
									Expect(Object.keys(testPict.AppData.BooksByAuthors).length).to.be.greaterThan(0);
									Expect(Object.keys(testPict.AppData.BooksByID).length).to.equal(testPict.AppData.TestState.Books.length);
								}
								catch (err)
								{
									return fDone(err);
								}
								return fDone();
							}.bind(this));
					}
				);
			}
		);
		suite(
			'Entity Providers',
			function()
			{
				test(
					'Get a book caches',
					function(fDone)
					{
						const testPict = new libPict(_MockSettings);
						const getJSONSpy = Sinon.spy(testPict.EntityProvider.restClient, 'getJSON');

						testPict.EntityProvider.getEntity('Book', 199, (err, rec) =>
						{
							Expect(rec).to.be.an('object');
							Expect(rec.IDBook).to.equal(199);
							testPict.EntityProvider.getEntity('Book', 199, (err2, rec2) =>
							{
								Expect(rec2).to.be.an('object');
								Expect(rec2.IDBook).to.equal(199);
								Sinon.assert.calledOnce(getJSONSpy);
								return fDone();
							});
						});
					}
				);

				test(
					'Get a book list caches',
					function(fDone)
					{
						const testPict = new libPict(_MockSettings);
						const getJSONSpy = Sinon.spy(testPict.EntityProvider.restClient, 'getJSON');

						testPict.EntityProvider.getEntitySet('Book', `FBV~IDBook~GT~190~FBV~IDBook~LT~200`, (err, recs) =>
						{
							Expect(recs).to.be.an('array');
							Expect(recs.length).to.equal(9);
							Expect(recs[8].IDBook).to.equal(199);
							testPict.EntityProvider.getEntitySet('Book', `FBV~IDBook~GT~190~FBV~IDBook~LT~200`, (err2, recs2) =>
							{
								Expect(recs2).to.be.an('array');
								Expect(recs2.length).to.equal(9);
								Expect(recs2[8].IDBook).to.equal(199);
								Sinon.assert.calledTwice(getJSONSpy); // count + reads
								Sinon.assert.calledWith(getJSONSpy, 'http://localhost:8086/1.0/Books/Count/FilteredTo/FBV~IDBook~GT~190~FBV~IDBook~LT~200');
								Sinon.assert.calledWith(getJSONSpy, 'http://localhost:8086/1.0/Books/FilteredTo/FBV~IDBook~GT~190~FBV~IDBook~LT~200/0/100');
								return fDone();
							});
						});
					}
				);
			}
		);
	}
);
