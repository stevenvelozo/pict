/**
* Pict - Behavior Modifications (customization) for Automatic Data Operations
*
* @license MIT
*
* @author Steven Velozo <steven@velozo.com>
*/
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define
(
	[],
	function()
	{
		function oNew(pRecordSetHash, pMeadowHash, pPict)
		{
			var _Pict = pPict;

			////////// CONFIGURATION STATE //////////
			// The hash for both identifiers in the DOM and the logic bundle name
			var _DataSetHash = pRecordSetHash;
			var _MeadowHash = (typeof(pMeadowHash) === 'undefined') ? _DataSetHash : pMeadowHash;

			// The record GUID identifier
			var _DataSetGUID = 'ID'+_DataSetHash;

			// A table of URIs for each API endpoint
			var _APIURIMap;
			// Initialize the API URI Map with a specific hash
			function initializeAPIURIMap(pAPIURIMapDataSet)
			{
				var tmpAPIURIMapDataSet = (typeof(pAPIURIMapDataSet) === 'undefined') ? _DataSetHash : pAPIURIMapDataSet;

				_APIURIMap = (
				{
					Create: _Pict.apiServer+tmpAPIURIMapDataSet+'/Create',
					CreateFilled: _Pict.apiServer+tmpAPIURIMapDataSet,
					// This is the only entry on here that won't be set by the default API->Behavior of a
					// logic bundle.  This is an entry that is expected to be set in the api file.
					ReadListFiltered: _Pict.apiServer+tmpAPIURIMapDataSet+'s/',
					ReadList: _Pict.apiServer+tmpAPIURIMapDataSet+'s',
					Read: _Pict.apiServer+tmpAPIURIMapDataSet+'/',
					ReadByID: _Pict.apiServer+tmpAPIURIMapDataSet+'/',
					Update: _Pict.apiServer+tmpAPIURIMapDataSet,
					Delete: _Pict.apiServer+tmpAPIURIMapDataSet,
					ToolTip: _Pict.apiServer+tmpAPIURIMapDataSet+'/Read/',
					Count: _Pict.apiServer+tmpAPIURIMapDataSet+'s/Count',
					CountFiltered: _Pict.apiServer+tmpAPIURIMapDataSet+'s/Count'
				});
			}
			initializeAPIURIMap(_MeadowHash);

			// A table of DOM containers with each template in it.
			var _DOMTemplateMap;
			// Initialize the DOM Template Map
			var initializeDOMTemplateMap = function(pDOMTemplateMapHash)
			{
				var tmpDOMTemplateMapHash = (typeof(pDOMTemplateMapHash) === 'undefined') ? _DataSetHash : pDOMTemplateMapHash;
				_DOMTemplateMap = (
				{
					Create: '#Create_'+tmpDOMTemplateMapHash,
					CreateCompleted: '#CreateCompleted_'+tmpDOMTemplateMapHash,
					Read: '#Read_'+tmpDOMTemplateMapHash,
					Update: '#Update_'+tmpDOMTemplateMapHash,
					Delete: '#Delete_'+tmpDOMTemplateMapHash,
					DeleteCompleted: '#DeleteCompleted_'+tmpDOMTemplateMapHash,
					Table: '#Table_'+tmpDOMTemplateMapHash,
					Rows: '#Rows_'+tmpDOMTemplateMapHash,
					Hover: '#Hover_'+tmpDOMTemplateMapHash
				});
			};
			initializeDOMTemplateMap(_DataSetHash);

			// A table of DOM containers for each template to go to.
			var _DOMContainerMap;
			function initializeDOMContainerMap(pDOMContainerMapHash)
			{
				var tmpDOMContainerMapHash = (typeof(pDOMContainerMapHash) === 'undefined') ? _DataSetHash : pDOMContainerMapHash;

				_DOMContainerMap = (
				{
					Read: '#Container_'+tmpDOMContainerMapHash,
					Update: '#Container_'+tmpDOMContainerMapHash,
					UpdateForm: '#Form_Update_'+tmpDOMContainerMapHash,
					Delete: '#Container_'+tmpDOMContainerMapHash,
					Table: '#Container_'+tmpDOMContainerMapHash,
					RowsPagingTop: '#RowsPagingTop_'+tmpDOMContainerMapHash,
					RowsPagingBottom: '#RowsPagingBottom_'+tmpDOMContainerMapHash,
					Rows: '#ContainerRows_'+tmpDOMContainerMapHash,
					Hover: '#ContainerHover_'+tmpDOMContainerMapHash
				});
			}
			initializeDOMContainerMap(_DataSetHash);

			// These are used by the metatemplates for titles and other content identifiers
			var _EntityTemplateContent;
			function initializeEntityTemplateMap()
			{
				_EntityTemplateContent = (
				{
					ReadList_Title_Pre: '',
					ReadList_Title: _DataSetHash +'s'
				});
			}
			initializeEntityTemplateMap();

			// The metatemplate record row column definitions
			/*
				The format for these columns is (string, namefirst, hidden xs and small) --- the type is unnecessary as it is defaulted to String.  In fact, the only required piece is the Column.
				{
					Title: 'First Name',
					Column: 'NameFirst',

					Type: 'Default',

					HiddenClasses: ['xs', 's']
				},

				A more complex example:
				<td class="AutoFillByID" RecordType="User" ID="<%= Records[i].CreatingIDUser %>" DisplayField="NameFirst" DisplayFieldExtra="NameLast"></td>
				{
					Title: 'First Name',
					Column: 'NameFirst',

					Type: 'AutoFill',
					AutoFillRecord: 'User',
					AutoFillDisplayField: 'NameFirst',
					AutoFillDisplayFieldExtra: 'NameLast'
				}
				The format for these columns is (string, namefirst, hidden xs and small) --- the type is unnecessary as it is defaulted to String.  In fact, the only required piece is the Column.
				{
					Column: '',
					Type: 'ActionsMenu'
				},
			*/
			var _MetaRowColumns = [];
			var addMetaRowColumn = function(pOptions)
			{
				pOptions.Pict = _Pict;
				_MetaRowColumns.push(pOptions);
			}
			var _MetaRowMenu = true;

			// A set of post-operation hooks, for connecting other records.
			var _PostOperationHooks = {};
			// A set of post-operation url transfers, for after actions happen
			var _PostOperationURIs = {};

			// A set of pre-operation hooks, for fiddling with data before it gets piped
			var _PreOperationHooks = {};

			function setAPIURIMapEntry(pAPIURIMapHash, pAPIURIMapValue)
			{
				_APIURIMap[pAPIURIMapHash] = pAPIURIMapValue;
			}

			function setDOMContainerMapEntry(pDOMContainerMapHash, pDOMContainerMapValue)
			{
				_DOMContainerMap[pDOMContainerMapHash] = pDOMContainerMapValue;
			}

			function setDOMTemplateMapEntry(pDOMTemplateMapHash, pDOMTemplateMapValue)
			{
				_DOMTemplateMap[pDOMTemplateMapHash] = pDOMTemplateMapValue;
			}

			function setPreOperationHook(pOperation, fPostOperationHook)
			{
				_PreOperationHooks[pOperation] = fPostOperationHook;
			}

			function setPostOperationHook(pOperation, fPostOperationHook)
			{
				_PostOperationHooks[pOperation] = fPostOperationHook;
			}

			function setPostOperationURI(pOperation, fPostOperationURI)
			{
				_PostOperationURIs[pOperation] = fPostOperationURI;
			}

			oConfig = (
			{
				initializeAPIURIMap: initializeAPIURIMap,
				initializeDOMTemplateMap: initializeDOMTemplateMap,
				initializeDOMContainerMap: initializeDOMContainerMap,

				AddMetaRowColumn: addMetaRowColumn,

				SetAPIURIMapEntry: setAPIURIMapEntry,
				SetDOMTemplateMapEntry: setDOMTemplateMapEntry,
				SetDOMContainerMapEntry: setDOMContainerMapEntry,

				SetPostOperationHook: setPostOperationHook,
				SetPostOperationURI: setPostOperationURI,
				SetPreOperationHook: setPreOperationHook
			});

			Object.defineProperty(oConfig, 'DataSetHash', {get: function() { return _DataSetHash; }});
			Object.defineProperty(oConfig, 'MeadowHash', {get: function() { return _MeadowHash; }});
			Object.defineProperty(oConfig, 'DataSetGUID', {get: function() { return _DataSetGUID; }});

			Object.defineProperty(oConfig, 'EntityTemplateContent', {get: function() { return _EntityTemplateContent; }});
			Object.defineProperty(oConfig, 'MetaRowColumns', {get: function() { return _MetaRowColumns; }});
			Object.defineProperty(oConfig, 'MetaRowMenu', {get: function() { return _MetaRowMenu; }});

			Object.defineProperty(oConfig, 'APIURIMap', {get: function() { return _APIURIMap; }});

			Object.defineProperty(oConfig, 'DOMTemplateMap', {get: function() { return _DOMTemplateMap; }});
			Object.defineProperty(oConfig, 'DOMContainerMap', {get: function() { return _DOMContainerMap; }});

			Object.defineProperty(oConfig, 'PostOperationHooks', {get: function() { return _PostOperationHooks; }});
			Object.defineProperty(oConfig, 'PreOperationHooks', {get: function() { return _PreOperationHooks; }});
			Object.defineProperty(oConfig, 'PostOperationURIs', {get: function() { return _PostOperationURIs; }});

			return oConfig;
		}

		return oNew;
	}
);