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
		/** @type {ilbPict} */
		let _Pict;
		setup(() =>
		{
			_Pict = new libPict({ PictDefaultURLPrefix: 'http://localhost:8086/1.0/' });
			_Pict.LogNoisiness = 2;
			let _PictEnvironment = new libPict.EnvironmentObject(_Pict);
		});

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
								Expect(_Pict.AppData.Test).to.be.an('array').with.length(100);
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
	}
);
