/*
	Unit tests for Filters provider
*/

const libPictApplication = require('pict-application');
const libPictView = require('pict-view');

const Chai = require('chai');
const Expect = Chai.expect;

const libPict = require('../source/Pict.js');

class DoNothingApplication extends libPictApplication
{
	constructor(pFable, pOptions, pServiceHash)
	{
		pOptions.AutoRenderMainViewportViewAfterInitialize = false;
		pOptions.AutoRenderViewsAfterInitialize = false;
		super(pFable, pOptions, pServiceHash);

		let resolveFunc;
		/** @type {Promise & { resolve?: () => void }} */
		this._initialized = new Promise(function (resolve)
		{
			resolveFunc = resolve;
		});
		this._initialized.resolve = resolveFunc;
	}

	get iniitalized()
	{
		return this._initialized;
	}

	onAfterInitialize()
	{
		this._initialized.resolve();
		return super.onAfterInitialize();
	}
}

class DoNothingView extends libPictView
{
	constructor(pPict, pOptions)
	{
		super(pPict, pOptions);
	}
}

suite
(
	'Pict FilterProvider Tests',
	() =>
	{
		/** @type {libPict} */
		let _Pict;
		setup(() =>
		{
			_Pict = new libPict({ PictDefaultURLPrefix: 'http://localhost:8086/1.0/' });
			_Pict.LogNoisiness = 2;
			let _PictEnvironment = new libPict.EnvironmentObject(_Pict);
		});

		test
		(
			'Filter - load all records by extrnal selected values',
			async function()
			{
				let _Application = new DoNothingApplication(_Pict, {});
				await new Promise((resolve, reject) => _Application.initializeAsync((error) =>
				{
					if (error)
					{
						return reject(error);
					}
					resolve();
				}));
				const tmpResults =
				{
					"Entity": "Book",
					"Filter": "Book-e2196901-b386-44c1-84a8-dfef174ac712",
					"ResultDestinationAddress": "AppData.Test",
				};
				await new Promise((resolve, reject) => _Pict.providers.FilterManager.loadRecordsByFilter(
				[
					{
						"UUID": "1",
						"FilterHash": "FilterBookByAuthor[Selection]",
						"Type": "ExternalJoinSelectedValueList",
						"Values": [ 1, 2, 3 ],
						"ExternalFilterByColumns": [ "Name" ],

						"CoreConnectionColumn": "IDBook",

						"JoinTable": "BookAuthorJoin",
						"JoinTableExternalConnectionColumn": "IDAuthor",
						"JoinTableCoreConnectionColumn": "IDBook",

						"ExternalFilterByTable": "Author",
						"ExternalFilterTableIdentityColumn": "IDAuthor", //NOTE: optional
						"ExternalFilterByTableConnectionColumn": "IDAuthor"
					},
					{
						"UUID": "2",
						"Type": "DateRange",
						"Values":
						{
							"Start": "2023-01-01T00:00:00Z",
							"End": "2024-01-01T00:00:00Z"
						},
						"FilterByColumn": "CreateDate"
					}
				], tmpResults, (pError) =>
				{
					try
					{
						Expect(pError).to.not.exist;
						Expect(_Pict.AppData.Test).to.be.an('array');
						resolve();
					}
					catch (pError)
					{
						reject(pError);
					}
				}));
			}
		);

		test
		(
			'Filter - load all records by external selected value',
			async function()
			{
				let _Application = new DoNothingApplication(_Pict, {});
				await new Promise((resolve, reject) => _Application.initializeAsync((error) =>
				{
					if (error)
					{
						return reject(error);
					}
					resolve();
				}));
				const tmpResults =
				{
					"Entity": "Book",
					"Filter": "Book-e2196901-b386-44c1-84a8-dfef174ac712",
					"ResultDestinationAddress": "AppData.Test",
				};
				await new Promise((resolve, reject) => _Pict.providers.FilterManager.loadRecordsByFilter(
				[
					{
						"UUID": "1",
						"FilterHash": "FilterBookByAuthor[Selection]",
						"Type": "ExternalJoinSelectedValue",
						"Value": 1,
						"ExternalFilterByColumns": [ "Name" ],

						"CoreConnectionColumn": "IDBook",

						"JoinTable": "BookAuthorJoin",
						"JoinTableExternalConnectionColumn": "IDAuthor",
						"JoinTableCoreConnectionColumn": "IDBook",

						"ExternalFilterByTable": "Author",
						"ExternalFilterTableIdentityColumn": "IDAuthor", //NOTE: optional
						"ExternalFilterByTableConnectionColumn": "IDAuthor"
					},
					{
						"UUID": "2",
						"Type": "DateRange",
						"Values":
						{
							"Start": "2023-01-01T00:00:00Z",
							"End": "2024-01-01T00:00:00Z"
						},
						"FilterByColumn": "CreateDate"
					}
				], tmpResults, (pError) =>
				{
					try
					{
						Expect(pError).to.not.exist;
						Expect(_Pict.AppData.Test).to.be.an('array');
						resolve();
					}
					catch (pError)
					{
						reject(pError);
					}
				}));
			}
		);

		test
		(
			'Filter - load all records by internal selected values',
			async function()
			{
				let _Application = new DoNothingApplication(_Pict, {});
				await new Promise((resolve, reject) => _Application.initializeAsync((error) =>
				{
					if (error)
					{
						return reject(error);
					}
					resolve();
				}));
				const tmpResults =
				{
					"Entity": "Book",
					"Filter": "Book-e2196901-b386-44c1-84a8-dfef174ac712",
					"ResultDestinationAddress": "AppData.Test",
				};
				await new Promise((resolve, reject) => _Pict.providers.FilterManager.loadRecordsByFilter(
				[
					{
						"UUID": "1",
						"FilterHash": "FilterBookByAuthor[Selection]",
						"Type": "InternalJoinSelectedValueList",
						"Values": [ 1, 2, 3 ],
						"ExternalFilterByColumns": [ "IDAuthor" ],

						"CoreConnectionColumn": "IDBook",

						"RemoteTable": "BookAuthorJoin",
						"JoinExternalConnectionColumn": "IDBook",
						"JoinInternalConnectionColumn": "IDBook"
					}
				], tmpResults, (pError) =>
				{
					try
					{
						Expect(pError).to.not.exist;
						Expect(_Pict.AppData.Test).to.be.an('array');
						Expect(_Pict.AppData.Test.length).to.equal(3);
						resolve();
					}
					catch (pError)
					{
						reject(pError);
					}
				}));
			}
		);

		test
		(
			'Filter - load all records by internal selected value',
			async function()
			{
				let _Application = new DoNothingApplication(_Pict, {});
				await new Promise((resolve, reject) => _Application.initializeAsync((error) =>
				{
					if (error)
					{
						return reject(error);
					}
					resolve();
				}));
				const tmpResults =
				{
					"Entity": "Book",
					"Filter": "Book-e2196901-b386-44c1-84a8-dfef174ac712",
					"ResultDestinationAddress": "AppData.Test",
				};
				await new Promise((resolve, reject) => _Pict.providers.FilterManager.loadRecordsByFilter(
				[
					{
						"UUID": "1",
						"FilterHash": "FilterBookByAuthor[Selection]",
						"Type": "InternalJoinSelectedValueList",
						"Value": 1,
						"ExternalFilterByColumns": [ "IDAuthor" ],

						"CoreConnectionColumn": "IDBook",

						"RemoteTable": "BookAuthorJoin",
						"JoinExternalConnectionColumn": "IDBook",
						"JoinInternalConnectionColumn": "IDBook"
					}
				], tmpResults, (pError) =>
				{
					try
					{
						Expect(pError).to.not.exist;
						Expect(_Pict.AppData.Test).to.be.an('array');
						Expect(_Pict.AppData.Test.length).to.equal(1);
						resolve();
					}
					catch (pError)
					{
						reject(pError);
					}
				}));
			}
		);

		test
		(
			'Filter - load all records',
			async function()
			{
				let _Application = new DoNothingApplication(_Pict, {});
				await new Promise((resolve, reject) => _Application.initializeAsync((error) =>
				{
					if (error)
					{
						return reject(error);
					}
					resolve();
				}));
				const tmpResults =
				{
					"Entity": "Book",
					"Filter": "Book-e2196901-b386-44c1-84a8-dfef174ac712",
					"ResultDestinationAddress": "AppData.Test",
				};
				await new Promise((resolve, reject) => _Pict.providers.FilterManager.loadRecordsByFilter(
				[
					{
						"UUID": "1",
						"FilterHash": "FilterBookByAuthor[Name]",
						"Type": "ExternalJoinStringMatch",
						"Values": [ "John", "Jane" ],
						"ExternalFilterByColumns": [ "Name" ],

						"CoreConnectionColumn": "IDBook",

						"JoinTable": "BookAuthorJoin",
						"JoinTableExternalConnectionColumn": "IDAuthor",
						"JoinTableCoreConnectionColumn": "IDBook",

						"ExternalFilterByTable": "Author",
						"ExternalFilterByTableConnectionColumn": "IDAuthor"
					},
					{
						"UUID": "2",
						"Type": "DateRange",
						"Values":
						{
							"Start": "2023-01-01T00:00:00Z",
							"End": "2024-01-01T00:00:00Z"
						},
						"FilterByColumn": "CreateDate"
					},
					{
						/* TODO: User table not in test data server
						"UUID": "3",
						"Type": "InternalJoinStringMatch",
						"Values": [ "Bob" ],
						"RemoteTable": "User",
						"ExternalFilterByColumns": [ "NameFirst", "NameLast" ],
						"JoinExternalConnectionColumn": "IDUser",
						"JoinInternalConnectionColumn": "CreatingIDUser"
						*/
					}
				], tmpResults, (pError) =>
				{
					try
					{
						Expect(pError).to.not.exist;
						Expect(_Pict.AppData.Test).to.be.an('array');
						resolve();
					}
					catch (pError)
					{
						reject(pError);
					}
				}));
			}
		);

		test
		(
			'Filter - load page of records',
			async function()
			{
				let _Application = new DoNothingApplication(_Pict, {});
				await new Promise((resolve, reject) => _Application.initializeAsync((error) =>
				{
					if (error)
					{
						return reject(error);
					}
					resolve();
				}));
				let tmpResults = {
					"Entity": "Book",
					"Filter": "Book-e2196901-b386-44c1-84a8-dfef174ac712",
					"ResultDestinationAddress": "AppData.Test",
				};
				await new Promise((resolve, reject) => _Pict.providers.FilterManager.loadRecordPageByFilter(
				[
					{
						"UUID": "1",
						"FilterHash": "FilterBookByAuthor[Name]",
						"Type": "ExternalJoinStringMatch",
						"Values": [ "John", "Jane" ],
						"ExternalFilterByColumns": [ "Name" ],

						"CoreConnectionColumn": "IDBook",

						"JoinTable": "BookAuthorJoin",
						"JoinTableExternalConnectionColumn": "IDAuthor",
						"JoinTableCoreConnectionColumn": "IDBook",

						"ExternalFilterByTable": "Author",
						"ExternalFilterByTableConnectionColumn": "IDAuthor"
					},
					{
						"UUID": "2",
						"Type": "DateRange",
						"Values":
						{
							"Start": "2023-01-01T00:00:00Z",
							"End": "2024-01-01T00:00:00Z"
						},
						"FilterByColumn": "CreateDate"
					},
					{
						/* TODO: User table not in test data server
						"UUID": "3",
						"Type": "InternalJoinStringMatch",
						"Values": [ "Bob" ],
						"RemoteTable": "User",
						"ExternalFilterByColumns": [ "NameFirst", "NameLast" ],
						"JoinExternalConnectionColumn": "IDUser",
						"JoinInternalConnectionColumn": "CreatingIDUser"
						*/
					}
				], tmpResults, 0, 10, (pError) =>
				{
					try
					{
						Expect(pError).to.not.exist;
						Expect(_Pict.AppData.Test).to.be.an('array').with.length(10);
						resolve();
					}
					catch (pError)
					{
						reject(pError);
					}
				}));
			}
		);

		test
		(
			'Filter - paginato potato test',
			async function()
			{
				let _Application = new DoNothingApplication(_Pict, {});
				await new Promise((resolve, reject) => _Application.initializeAsync((error) =>
				{
					if (error)
					{
						return reject(error);
					}
					resolve();
				}));
				let tmpResults = {
					"Entity": "Book",
					"Filter": "Book-e2196901-b386-44c1-84a8-dfef174ac712",
					"ResultDestinationAddress": "AppData.Test",
				};
				await new Promise((resolve, reject) => _Pict.providers.FilterManager.loadRecordPageByFilter(
				[
					{
						"UUID": "1",
						"FilterHash": "FilterBookByAuthor[Name]",
						"Type": "ExternalJoinStringMatch",
						"Values": [ "John", "Jane" ],
						"ExternalFilterByColumns": [ "Name" ],

						"CoreConnectionColumn": "IDBook",

						"JoinTable": "BookAuthorJoin",
						"JoinTableExternalConnectionColumn": "IDAuthor",
						"JoinTableCoreConnectionColumn": "IDBook",

						"ExternalFilterByTable": "Author",
						"ExternalFilterByTableConnectionColumn": "IDAuthor"
					},
					{
						"UUID": "2",
						"Type": "DateRange",
						"Values":
						{
							"Start": "2023-01-01T00:00:00Z",
							"End": "2024-01-01T00:00:00Z"
						},
						"FilterByColumn": "CreateDate"
					},
					{
						"Type": "RawFilter",
						"Value": "FSF~IDBook~ASC~0"
					},
					{
						"Type": "RawFilter",
						"Value": "FBV~IDBook~LT~50"
					},
				], tmpResults, 0, 10, (pError) =>
				{
					try
					{
						Expect(pError).to.not.exist;
						Expect(_Pict.AppData.Test).to.be.an('array').with.length(3);
						resolve();
					}
					catch (pError)
					{
						reject(pError);
					}
				}));
			}
		);

		test
		(
			'Filter - load single record by exact ID match',
			async function()
			{
				let _Application = new DoNothingApplication(_Pict, {});
				await new Promise((resolve, reject) => _Application.initializeAsync((error) =>
				{
					if (error)
					{
						return reject(error);
					}
					resolve();
				}));
				let tmpResults = {
					"Entity": "Book",
					"Filter": "Book-e2196901-b386-44c1-84a8-dfef174ac712",
					"ResultDestinationAddress": "AppData.Test",
				};
				await new Promise((resolve, reject) => _Pict.providers.FilterManager.loadRecordPageByFilter(
				[
					{
						"UUID": "1",
						"Type": "NumericMatch",
						"Values": [ 1 ],
						"FilterByColumn": "IDBook",
					}
				], tmpResults, (pError) =>
				{
					try
					{
						Expect(pError).to.not.exist;
						Expect(_Pict.AppData.Test).to.be.an('array').with.length(1);
						Expect(_Pict.AppData.Test[0].IDBook).to.equal(1);
						resolve();
					}
					catch (pError)
					{
						reject(pError);
					}
				}));
			}
		);

		test
		(
			'Filter - load page of records by address',
			async function()
			{
				let _Application = new DoNothingApplication(_Pict, {});
				await new Promise((resolve, reject) => _Application.initializeAsync((error) =>
				{
					if (error)
					{
						return reject(error);
					}
					resolve();
				}));
				let tmpResults = {
					"Entity": "Book",
					"Filter": "Book-e2196901-b386-44c1-84a8-dfef174ac712",
					"ResultDestinationAddress": "AppData.Test",
				};
				_Pict.AppData.FilterConfig =
				[
					{
						"UUID": "1",
						"FilterHash": "FilterBookByAuthor[Name]",
						"Type": "ExternalJoinStringMatch",
						"Values": [ "John", "Jane" ],
						"ExternalFilterByColumns": [ "Name" ],

						"CoreConnectionColumn": "IDBook",

						"JoinTable": "BookAuthorJoin",
						"JoinTableExternalConnectionColumn": "IDAuthor",
						"JoinTableCoreConnectionColumn": "IDBook",

						"ExternalFilterByTable": "Author",
						"ExternalFilterByTableConnectionColumn": "IDAuthor"
					},
					{
						"UUID": "2",
						"Type": "DateRange",
						"Values":
						{
							"Start": "2023-01-01T00:00:00Z",
							"End": "2024-01-01T00:00:00Z"
						},
						"FilterByColumn": "CreateDate"
					},
					{
						/* TODO: User table not in test data server
						"UUID": "3",
						"Type": "InternalJoinStringMatch",
						"Values": [ "Bob" ],
						"RemoteTable": "User",
						"ExternalFilterByColumns": [ "NameFirst", "NameLast" ],
						"JoinExternalConnectionColumn": "IDUser",
						"JoinInternalConnectionColumn": "CreatingIDUser"
						*/
					}
				];
				_Pict.AppData.FilterExperience = tmpResults;
				await new Promise((resolve, reject) => _Pict.providers.FilterManager.executeFilterPage(
					'AppData.FilterConfig', 'AppData.FilterExperience', (pError) =>
					{
						try
						{
							Expect(pError).to.not.exist;
							//FIXME: this should be limited to the page size - but we bumped that up to 10k for short-term so this is just getting everything
							//Expect(_Pict.AppData.Test).to.be.an('array').with.length(100);
							Expect(_Pict.AppData.Test).to.be.an('array').with.length(431);
							resolve();
						}
						catch (pError)
						{
							reject(pError);
						}
					}));
			}
		);

		test
		(
			'Filter - count page of records by address - ignores filters with no values',
			async function()
			{
				let _Application = new DoNothingApplication(_Pict, {});
				await new Promise((resolve, reject) => _Application.initializeAsync((error) =>
				{
					if (error)
					{
						return reject(error);
					}
					resolve();
				}));
				let tmpResults = {
					"Entity": "Book",
					"Filter": "Book-e2196901-b386-44c1-84a8-dfef174ac712",
					"ResultDestinationAddress": "AppData.Test",
				};
				_Pict.AppData.FilterConfig =
				[
					{
						"UUID": "1",
						"FilterHash": "FilterBookByAuthor[Name]",
						"Type": "ExternalJoinStringMatch",
						"Values": [ ],
						"ExternalFilterByColumns": [ "Name" ],

						"CoreConnectionColumn": "IDBook",

						"JoinTable": "BookAuthorJoin",
						"JoinTableExternalConnectionColumn": "IDAuthor",
						"JoinTableCoreConnectionColumn": "IDBook",

						"ExternalFilterByTable": "Author",
						"ExternalFilterByTableConnectionColumn": "IDAuthor"
					},
					{
						"UUID": "1.5",
						"FilterHash": "FilterBookByAuthor[IDAuthor]",
						"Type": "ExternalJoinNumericMatch",
						"Value": 0,
						"ExternalFilterByColumns": [ "IDAuthor" ],

						"CoreConnectionColumn": "IDBook",

						"JoinTable": "BookAuthorJoin",
						"JoinTableExternalConnectionColumn": "IDAuthor",
						"JoinTableCoreConnectionColumn": "IDBook",

						"ExternalFilterByTable": "Author",
						"ExternalFilterByTableConnectionColumn": "IDAuthor"
					},
					{
						"UUID": "2",
						"Type": "DateRange",
						"Values":
						{
							"Start": "",
							"End": "0",
						},
						"FilterByColumn": "CreateDate"
					},
					{
						"UUID": "3",
						"Type": "DateRange",
						"Value": "",
						"FilterByColumn": "Genre"
					},
					{
						"Type": "RawFilter",
						"Value": "FBV~IDBook~GT~0~FSF~IDBook~ASC~0~FBV~CreateDate~GT~0"
					},
					{
						/* TODO: User table not in test data server
						"UUID": "3",
						"Type": "InternalJoinStringMatch",
						"Values": [ "Bob" ],
						"RemoteTable": "User",
						"ExternalFilterByColumns": [ "NameFirst", "NameLast" ],
						"JoinExternalConnectionColumn": "IDUser",
						"JoinInternalConnectionColumn": "CreatingIDUser"
						*/
					}
				];
				_Pict.AppData.FilterExperience = tmpResults;
				const tmpUnfilteredCount = await new Promise((resolve, reject) => _Pict.EntityProvider.getEntitySetRecordCount('Book', '%20', (pError, pCount) =>
				{
					if (pError)
					{
						return reject(pError);
					}
					resolve(pCount);
				}));
				await new Promise((resolve, reject) => _Pict.providers.FilterManager.countRecordsByFilter(
					_Pict.AppData.FilterConfig, tmpResults, (pError) =>
					{
						try
						{
							Expect(pError).to.not.exist;
							Expect(_Pict.AppData.Test).to.equal(tmpUnfilteredCount);
							resolve();
						}
						catch (pError)
						{
							reject(pError);
						}
					}));
			}
		);

		test
		(
			'Filter - load records count',
			async function()
			{
				let _Application = new DoNothingApplication(_Pict, {});
				await new Promise((resolve, reject) => _Application.initializeAsync((error) =>
				{
					if (error)
					{
						return reject(error);
					}
					resolve();
				}));
				let tmpResults = {
					"Entity": "Book",
					"Filter": "Book-e2196901-b386-44c1-84a8-dfef174ac712",
					"ResultDestinationAddress": "AppData.Test",
				};
				await new Promise((resolve, reject) => _Pict.providers.FilterManager.countRecordsByFilter(
				[
					{
						"UUID": "1",
						"FilterHash": "FilterBookByAuthor[Name]",
						"Type": "ExternalJoinStringMatch",
						"Values": [ "John", "Jane" ],
						"ExternalFilterByColumns": [ "Name" ],

						"CoreConnectionColumn": "IDBook",

						"JoinTable": "BookAuthorJoin",
						"JoinTableExternalConnectionColumn": "IDAuthor",
						"JoinTableCoreConnectionColumn": "IDBook",

						"ExternalFilterByTable": "Author",
						"ExternalFilterByTableConnectionColumn": "IDAuthor"
					},
					{
						"UUID": "2",
						"Type": "DateRange",
						"Values":
						{
							"Start": "2023-01-01T00:00:00Z",
							"End": "2024-01-01T00:00:00Z"
						},
						"FilterByColumn": "CreateDate"
					},
					{
						/* TODO: User table not in test data server
						"UUID": "3",
						"Type": "InternalJoinStringMatch",
						"Values": [ "Bob" ],
						"RemoteTable": "User",
						"ExternalFilterByColumns": [ "NameFirst", "NameLast" ],
						"JoinExternalConnectionColumn": "IDUser",
						"JoinInternalConnectionColumn": "CreatingIDUser"
						*/
					}
				], tmpResults, (pError) =>
				{
					try
					{
						Expect(pError).to.not.exist;
						Expect(_Pict.AppData.Test).to.be.greaterThan(400);
						resolve();
					}
					catch (pError)
					{
						reject(pError);
					}
				}));
			}
		);

		test
		(
			'Filter clauses',
			async function()
			{
				const simpleClause = new libPict.FilterClauseLocal(_Pict);

				simpleClause.type = 'StringMatch';
				simpleClause.filterByColumn = 'NameFirst';
				simpleClause.exactMatch = false;
				simpleClause.values = [ 'John', 'Jane' ];

				Expect(simpleClause.generateFilterClauseConfig()).to.deep.equal(
					{
						"Type": "StringMatch",
						"FilterByColumn": "NameFirst",
						"ExactMatch": false,
						"Values": [ "John", "Jane" ]
					}
				);

				const internalJoinClause = new libPict.FilterClauseInternalJoin(_Pict);

				internalJoinClause.type = 'InternalJoinDateRange';
				internalJoinClause.remoteTable = 'User';
				internalJoinClause.externalFilterByColumn = 'CreateDate';
				internalJoinClause.joinExternalConnectionColumn = 'IDUser';
				internalJoinClause.joinInternalConnectionColumn = 'CreatingIDUser';
				internalJoinClause.values.Start = "2023-01-01T00:00:00Z";
				internalJoinClause.values.End = "2024-01-01T00:00:00Z";

				Expect(internalJoinClause.generateFilterClauseConfig()).to.deep.equal(
					{
						"Type": "InternalJoinDateRange",
						"RemoteTable": "User",
						"StartExclusive": undefined,
						"EndExclusive": undefined,
						"ExternalFilterByColumn": "CreateDate",
						"ExternalFilterByColumns": undefined,
						"JoinExternalConnectionColumn": "IDUser",
						"JoinInternalConnectionColumn": "CreatingIDUser",
						"Values":
						{
							"Start": "2023-01-01T00:00:00Z",
							"End": "2024-01-01T00:00:00Z"
						}
					}
				);

				const externalJoinClause = new libPict.FilterClauseExternalJoin(_Pict);

				externalJoinClause.type = 'ExternalJoinNumericMatch';

				externalJoinClause.externalFilterByTable = 'Author';
				externalJoinClause.externalFilterByColumns = [ 'Name' ];
				externalJoinClause.externalFilterByTableConnectionColumn = 'IDAuthor';
				externalJoinClause.joinTable = 'BookAuthorJoin';
				externalJoinClause.joinTableExternalConnectionColumn = 'IDAuthor';
				externalJoinClause.joinTableCoreConnectionColumn = 'IDBook';
				externalJoinClause.coreConnectionColumn = 'IDBook';
				externalJoinClause.values = [ 1, 2, 3 ];

				Expect(externalJoinClause.generateFilterClauseConfig()).to.deep.equal(
					{
						"Type": "ExternalJoinNumericMatch",
						"ExactMatch": undefined,
						"ExternalFilterByTable": "Author",
						"ExternalFilterByColumn": undefined,
						"ExternalFilterByColumns": [ "Name" ],
						"JoinTable": "BookAuthorJoin",
						"JoinTableExternalConnectionColumn": "IDAuthor",
						"JoinTableCoreConnectionColumn": "IDBook",
						"CoreConnectionColumn": "IDBook",
						"ExternalFilterByTableConnectionColumn": "IDAuthor",
						"Values": [ 1, 2, 3 ]
					}
				);
			}
		);
	}
);
