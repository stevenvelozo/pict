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
						this.timeout(10000); // Allow for the server to respond
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
									"AllRecords": true,
									"Destination": "State.Authors"
								},
								{
									"Entity": "BookAuthorJoin",
									"Filter": "FBL~IDAuthor~INN~{~PJU:,^IDAuthor^Record.State.Authors~}",
									"AllRecords": true,
									"Destination": "State.BookAuthorJoins"
								},
								{
									"Entity": "Book",
									"Filter": "FBL~IDBook~INN~{~PJU:,^IDBook^Record.State.BookAuthorJoins~}",
									"AllRecords": true,
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
									"AllRecords": true,
									"Destination": "State.BookAuthorJoinsRev"
								},
								{
									"Entity": "Author",
									"Filter": "FBL~IDAuthor~INN~{~PJU:,^IDAuthor^Record.State.BookAuthorJoinsRev~}",
									"AllRecords": true,
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
				test(
					'Sync bundle test.',
					function()
					{
						const testPict = new libPict(_MockSettings);
						testPict.AppData.Comics =
						[
							{ IDComic: 1, Name: 'Batman', InStock: true, Genres: [ 'Action', 'Sci-Fi' ] },
							{ IDComic: 2, Name: 'Superman', InStock: true, Genres: [ 'Action', 'Sci-Fi' ] },
							{ IDComic: 3, Name: 'Non Action Comic Book', InStock: true, Genres: [ 'Slice of Life', 'Sci-Fi' ] },
							{ IDComic: 4, Name: 'Other Non Action Comic Book', InStock: false, Genres: [ 'Slice of Life', 'Sci-Fi' ] },
						];
						testPict.AppData.ActionBooks = [{ IDComic: 1, ExtraColumn: 'ExtraValue' }];
						const tmpBundle = [{
							"Type": "ProjectDataset",
							//"InputRecordsetAddress": "AppData.Comics[]<<~?Genre,==,Sci-Fi?~>>",
							"InputRecordsetAddress": "AppData.Comics[]<<~?InStock,TRUE,?~>>",
							"OutputRecordsetAddress": "AppData.SciFiBooks",
							"AllRecords": true,
							"OutputRecordsetAddressMapping":
							{
								"InputRecord.Genres[],AnyContains,Action": "AppData.ActionBooks"
							},
							"RecordPrototypeAddress": "OutputRecordset[]<<~?IDComic,==,{~D:Record.InputRecord.IDComic~}?~>>",
							"RecordFieldMapping":
							{
								"AppData.ActionBooks":
								{
									"InputRecord.Name": "OutputRecord.Title",
									"InputRecord.IDComic": "OutputRecord.IDComic"
								},
								"Default":
								{
									"InputRecord.Name": "OutputRecord.Title",
									"InputRecord.IDComic": "OutputRecord.IDComic"
								}
							}
						}];

						testPict.EntityProvider.processBundle(tmpBundle);
						Expect(testPict.AppData.ActionBooks.length).to.equal(2);
						Expect(testPict.AppData.ActionBooks[0].ExtraColumn).to.equal('ExtraValue');
						Expect(testPict.AppData.ActionBooks[0].Title).to.equal('Batman');
						Expect(testPict.AppData.ActionBooks[0].IDComic).to.equal(1);
						Expect(testPict.AppData.ActionBooks[1].Title).to.equal('Superman');
						Expect(testPict.AppData.ActionBooks[1].IDComic).to.equal(2);
						Expect(testPict.AppData.SciFiBooks.length).to.equal(1);
						Expect(testPict.AppData.SciFiBooks[0].Title).to.equal('Non Action Comic Book');
						Expect(testPict.AppData.SciFiBooks[0].IDComic).to.equal(3);
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


				test(
					'Get a book list then expect single record cache to be populated',
					function(fDone)
					{
						const testPict = new libPict(_MockSettings);
						const getJSONSpy = Sinon.spy(testPict.EntityProvider.restClient, 'getJSON');

						let tmpAnticipate = testPict.newAnticipate();
						let tmpTestState = {};

						// First, get 10 books which should automatically prime both the list cache and single record caches.
						tmpAnticipate.anticipate(
							(fStageComplete) =>
							{
								testPict.EntityProvider.getEntitySet('Book', `FBV~IDBook~GT~190~FBV~IDBook~LT~200`,
									(pError, pRecords) =>
									{
										Expect(pRecords).to.be.an('array');
										Expect(pRecords.length).to.equal(9);
										Expect(pRecords[8].IDBook).to.equal(199);
										return fStageComplete(pError);
									});
							});
						
						// Now, get a single book within the ID range that should be in the cache already.
						tmpAnticipate.anticipate(
							(fStageComplete) =>
							{
								testPict.EntityProvider.getEntity('Book', 195,
									(pError, pRecord) =>
									{
										Expect(pRecord).to.be.an('object');
										Expect(pRecord.IDBook).to.equal(195);
										Sinon.assert.calledTwice(getJSONSpy);
										return fStageComplete(pError);
									});
							});

						// Now, get a single book outside the ID range that should not be in the cache already.
						tmpAnticipate.anticipate(
							(fStageComplete) =>
							{
								testPict.EntityProvider.getEntity('Book', 88,
									(pError, pRecord) =>
									{
										Expect(pRecord).to.be.an('object');
										Expect(pRecord.IDBook).to.equal(88);
										Sinon.assert.calledThrice(getJSONSpy);
										return fStageComplete(pError);
									});
							});

						// Now, get a single book within the ID range that should be in the cache already again.
						tmpAnticipate.anticipate(
							(fStageComplete) =>
							{
								testPict.EntityProvider.getEntity('Book', 195,
									(pError, pRecord) =>
									{
										Expect(pRecord).to.be.an('object');
										Expect(pRecord.IDBook).to.equal(195);
										Sinon.assert.calledThrice(getJSONSpy);
										return fStageComplete(pError);
									});
							});

						// Wait for everything asynchronous to be completed
						tmpAnticipate.wait(fDone);
					}
				);

				test(
					'Manually exercise the cache function',
					function(fDone)
					{
						const testPict = new libPict(_MockSettings);
						const getJSONSpy = Sinon.spy(testPict.EntityProvider.restClient, 'getJSON');

						let tmpAnticipate = testPict.newAnticipate();
						let tmpTestState = {};

						let tmpRecordList = [
							{ IDBook: 191, IDAuthor: 10, Reviewer: 'Alice', Rating: 4 },
							{ IDBook: 192, IDAuthor: 11, Reviewer: 'Bob', Rating: 5 },
							{ IDBook: 193, IDAuthor: 12, Reviewer: 'Charlie', Rating: 3 },
							{ IDBook: 194, IDAuthor: 13, Reviewer: 'Diana', Rating: 4 },
							{ IDBook: 195, IDAuthor: 14, Reviewer: 'Eve', Rating: 5 },
							{ IDBook: 196, IDAuthor: 15, Reviewer: 'Frank', Rating: 2 },
							{ IDBook: 197, IDAuthor: 16, Reviewer: 'Grace', Rating: 4 },
							{ IDBook: 198, IDAuthor: 17, Reviewer: 'Heidi', Rating: 3 },
							{ IDBook: 199, IDAuthor: 18, Reviewer: 'Ivan', Rating: 1 },
							{ IDBook: 196, IDAuthor: 15, Reviewer: 'Frank', Rating: 2 },
							{ IDBook: 197, IDAuthor: 16, Reviewer: 'Grace', Rating: 4 },
							{ IDBook: 198, IDAuthor: 17, Reviewer: 'Heidi', Rating: 3 },
							{ IDBook: 199, IDAuthor: 18, Reviewer: 'Ivan', Rating: 1 }
						];

						// First, get 10 books which should automatically prime both the list cache and single record caches.
						tmpAnticipate.anticipate(
							(fStageComplete) =>
							{
								testPict.EntityProvider.cacheConnectedEntityRecords(tmpRecordList, ['IDBook', 'IDAuthor'], [], false, fStageComplete)
							});
						
						// Now, get a single book within the ID range that should be in the cache already.
						tmpAnticipate.anticipate(
							(fStageComplete) =>
							{
								testPict.EntityProvider.getEntity('Book', 195,
									(pError, pRecord) =>
									{
										Expect(pRecord).to.be.an('object');
										Expect(pRecord.IDBook).to.equal(195);
										Sinon.assert.callCount(getJSONSpy, 4);
										return fStageComplete(pError);
									});
							});

						// Now, get a single book outside the ID range that should not be in the cache already.
						tmpAnticipate.anticipate(
							(fStageComplete) =>
							{
								testPict.EntityProvider.getEntity('Book', 88,
									(pError, pRecord) =>
									{
										Expect(pRecord).to.be.an('object');
										Expect(pRecord.IDBook).to.equal(88);
										Sinon.assert.callCount(getJSONSpy, 5);
										return fStageComplete(pError);
									});
							});

						// Now, get a single book within the ID range that should be in the cache already again.
						tmpAnticipate.anticipate(
							(fStageComplete) =>
							{
								testPict.EntityProvider.getEntity('Author', 16,
									(pError, pRecord) =>
									{
										Expect(pRecord).to.be.an('object');
										Sinon.assert.callCount(getJSONSpy, 5);
										return fStageComplete(pError);
									});
							});

						// Wait for everything asynchronous to be completed
						tmpAnticipate.wait(fDone);
					}
				);
			}
		);
	}
);
