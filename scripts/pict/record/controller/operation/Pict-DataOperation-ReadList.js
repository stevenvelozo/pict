/**
* This file provides boilerplate record list functions.
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*
* @description Boilerplate Javascript Record Access
*/
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define
(
	['pict/record/controller/operation/Pict-DataOperation-ReadList-Paging'],
	function(PictDataOperationReadListPaging)
	{
		function oNew(pDataOperations, pPict)
		{
			if ((typeof(pDataOperations) === 'undefined') || (typeof(pPict) === 'undefined'))
				return false;

			var _DataOperations = pDataOperations;
			var _Config = _DataOperations.Config;
			var _Pict = pPict;

			// TODO: Make the data paging object stateless
			var _ApplicationDataPaging = PictDataOperationReadListPaging();

			/**
			 * Display the rows of the list (this is the default process records function for ReadRecordList)
			 */
			var DisplayRecordListRows = function (pRecords, pOptions)
			{
				// Get the row template
				var tmpRowsTemplate = _.template($(_Config.DOMTemplateMap.Rows).text());

				// Empty the row container
				$(_Config.DOMContainerMap.Rows).empty();

				// Now render the rows
				// ...The logic for enumeration, counting, etc. is expected in in the template.
				$(_Config.DOMContainerMap.Rows).html(tmpRowsTemplate({ Records:pRecords, Pict:_Pict, Options:pOptions }));
			};

			// Create the default request configuration object.
			var _Default_Options_ReadList = (
			{
				// This value fills out the "Cats" part of this call to the API server to get list results:
				//     https://bestapiever.com/1.0/Cats
				APIReadListURI: false,

				// This value generates links to routes for other pages of the list, for example the "CatList" part of:
				//     https://bestapiever.com/#CatList
				ListRoutePath: false,

				// This value generates the filter, both in the API call and the Router call, for example the "By/Breed/Calico" parts of:
				//     https://bestapiever.com/1.0/Cats/By/Breed/Calico
				//     https://bestapiever.com/1.0/Cats/Count/By/Breed/Calico
				//     https://bestapiever.com/#CatListRoute/By/Breed/Calico
				ListFilter: undefined,

				ProcessRecordsFunction: DisplayRecordListRows,

				// State for the paging control
				Paging:
					{
						// The template used to generate the paging control at the top and bottom of the recordset
						PagingTemplate: _.template($('#GenericListPaging').text()),

						// This value fills out the list Begin value for paging, which is the "0" in this api call for Meadow:
						//     https://bestapiever.com/1.0/Cats/0/25
						CurrentPage: 0,
						// This value fills out the list Cap value for paging, which is the "25" in this api call for Meadow:
						//     https://bestapiever.com/1.0/Cats/0/25
						PageSize: 25,
						// This contains the count of records in the current filtered set
						TotalRecordSetCount: 0,
						// This contains the length of the current request (e.g. the 35 of 5,000 records)
						RecordResultsLength: 0,

						// The list of DIVs to render the pages to
						Targets: [],

						// The default count function returns zero.
						CountFunction: _DataOperations.Count.ReadRecordCount
					}

			});

			/**
			 * Load a list of records from an ajax source, and put them in the list.
			 */
			var ReadRecordList = function (pOptions)
			{
				// Reset the cache for this list.
				// This is used for things such as keyboard next / previous commands when viewing a record.
				_Pict.SetCache('list'+_Config.DataSetHash, false);

				var tmpOptions = _.extend({}, _Default_Options_ReadList, pOptions);
				tmpOptions.Paging = _.extend({}, _Default_Options_ReadList.Paging, pOptions.Paging ? pOptions.Paging : {});

				var tmpAPIReadListURI = tmpOptions.APIReadListURI ? tmpOptions.APIReadListURI : _Config.APIURIMap.ReadList;

				// If it doesn't have the explicit API server, pull in the API server from PICT
				var tmpPictAPIServer = _Pict.apiServer;
				if ((tmpAPIReadListURI.substring(0,4) !== 'http') && (tmpAPIReadListURI.substring(0,tmpPictAPIServer.length) !== tmpPictAPIServer))
					tmpAPIReadListURI = tmpPictAPIServer+tmpAPIReadListURI;

				// If there is an appended path, stuff it onto the API call
				if (tmpOptions.ListFilter)
				{
					tmpAPIReadListURI += '/'+tmpOptions.ListFilter;
				}
				// Tack on the paging stuff to the API call.
				tmpAPIReadListURI += '/'+tmpOptions.Paging.CurrentPage+'/'+tmpOptions.Paging.PageSize;

				console.log('--> Reading Record List: '+tmpAPIReadListURI);

				// Get starting millisecond
				var tmpOperationStartTime = +new Date();

				$.ajax
				(
					{
						type: 'GET',
						url: tmpAPIReadListURI,
						datatype: 'json',
						async: true
					}
				)
				.done
				(
					function (pData)
					{
						if (typeof(pData.Error) !== 'undefined' && pData.Error.indexOf('authenticat') > -1)
						{
							console.log('##> There was a problem retreiving record list: '+pData.Error);
							return _Pict.session.ValidateSession();
						}
						if (typeof(pData.Error) !== 'undefined')
						{
							console.log('##> There was a problem retreiving record list: '+pData.Error);
						}
						if (((typeof(pData.length) === 'undefined') || pData.length < 1) && tmpOptions.Paging.CurrentPage > 0)
						{
							tmpOptions.Paging.CurrentPage = 0;
							ReadRecordList(tmpOptions);
						}

						var tmpOperationEndTime = +new Date();
						var tmpOperationTime = tmpOperationEndTime - tmpOperationStartTime;
						console.log('  > AJAX Request Read List '+_Config.DataSetHash+' Completed ('+tmpOperationTime+'ms)');

						console.log('  > Displaying List '+_Config.DataSetHash+' ('+pData.length+' items)');
						// Configure and display paging.
						tmpOptions.ListRoutePath = tmpOptions.ListRoutePath ? tmpOptions.ListRoutePath : _Config.DataSetHash+'list';
						tmpOptions.Paging.RecordResultsLength = pData.length;
						tmpOptions.Paging.Targets.push(_Config.DOMContainerMap.RowsPagingTop);
						tmpOptions.Paging.Targets.push(_Config.DOMContainerMap.RowsPagingBottom);
						_ApplicationDataPaging.DisplayPagingControl(tmpOptions);

						tmpOptions.ProcessRecordsFunction(pData, tmpOptions);
						_Pict.SetCache('list'+_Config.DataSetHash, pData);

						tmpDisplayOperationEndTime = +new Date();
						tmpDisplayOperationTime = tmpDisplayOperationEndTime-tmpOperationEndTime;
						console.log('  > Done Displaying '+_Config.DataSetHash+' List ('+tmpDisplayOperationTime+'ms)');

						tmpOperationTime = tmpDisplayOperationEndTime - tmpOperationStartTime;
						console.log('  > Total '+_Config.DataSetHash+' List Display Time '+tmpOperationTime+'ms');

						if ('ReadRecordList' in _Config.PostOperationHooks)
							_Config.PostOperationHooks.ReadRecordList(pData);

						return false;
					}
				)
				.fail
				(
					function ()
					{
						_Pict.session.ValidateSession();
						console.log('There has been an error retreiving the '+_Config.DataSetHash+' record list.');
					}
				);

				return false;
			};

			var DisplayListContainer = function (pCustomParameter, pPageIndex, pEntriesPerPage)
			{
				var tmpRecordListContainerTemplate = _.template($(_Config.DOMTemplateMap.Table).text());
				$(_Config.DOMContainerMap.Table).html(tmpRecordListContainerTemplate({ Pict: _Pict }));

				if ('DisplayListContainer' in _Config.PostOperationHooks)
					_Config.PostOperationHooks.DisplayListContainer(pCustomParameter, pPageIndex, pEntriesPerPage);
			};

			////////// RETURN OBJECT //////////
			var oDataOperation = (
			{
				New: oNew,

				ReadRecordList: ReadRecordList,

				DisplayListContainer: DisplayListContainer
			});

			Object.defineProperty(oDataOperation, 'Options', {get: function() { return _Default_Options_ReadList; }});

			return oDataOperation;
		}

		return oNew;
	}
);