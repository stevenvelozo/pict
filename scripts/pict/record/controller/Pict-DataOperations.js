/**
* This file provides boilerplate record access operations.
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
	['pict/Pict',
		'pict/record/controller/Pict-DataOperations-Config',
		'pict/ui/templating/Pict-UI-RecordTemplateMacros',
		'pict/record/controller/operation/Pict-DataOperation-Read', 'pict/record/controller/operation/Pict-DataOperation-ReadList', 'pict/record/controller/operation/Pict-DataOperation-Count',
		'pict/record/controller/operation/Pict-DataOperation-Update', 'pict/record/controller/operation/Pict-DataOperation-Create',
		'pict/record/controller/operation/Pict-DataOperation-Delete'],
	function(Pict,
		PictDataOperationsConfig, 
		PictUIRecordTemplateMacros,
		PictDataOperationRead, PictDataOperationReadList, PictDataOperationCount,
		PictDataOperationUpdate, PictDataOperationCreate,
		PictDataOperationDelete)
	{
		function oNew(pDataSetHash, pMeadowHash)
		{
			var _Pict = Pict;

			// This contains all state for the record data operations and UX
			var _Config = PictDataOperationsConfig(pDataSetHash, pMeadowHash, _Pict);

			var _RecordTemplateMacros = PictUIRecordTemplateMacros;

			var _Behaviors = {};

			var ParseFilter = function(pFilter)
			{
				var tmpFilter = [];
				var tmpCurrentFilter = -1;

				var tmpFilterArray = pFilter.split('~');

				for (i = 0; i < tmpFilterArray.length; i++)
				{
					switch(i % 4)
					{
						case 0:
							// Add a filter to the array
							tmpFilter.push({});
							tmpCurrentFilter++;
							tmpFilter[tmpCurrentFilter].Type = tmpFilterArray[i];
							tmpFilter[tmpCurrentFilter].Field = false;
							tmpFilter[tmpCurrentFilter].Comparison = false;
							tmpFilter[tmpCurrentFilter].Value = false;
							break;
						case 1:
							tmpFilter[tmpCurrentFilter].Field = tmpFilterArray[i];
							break;
						case 2:
							tmpFilter[tmpCurrentFilter].Comparison = tmpFilterArray[i];
							break;
						case 3:
							tmpFilter[tmpCurrentFilter].Value = tmpFilterArray[i];
							break;
					}
				}
				return tmpFilter;
			};

			////////// RETURN OBJECT //////////
			var oDataOperation = (
			{
				New: oNew,

				ParseFilter: ParseFilter
			});

			// Expose the pict property, for meta templates and such
			Object.defineProperty(oDataOperation, 'Pict', {get: function() { return _Pict; }});

			// Wireup the Config object.
			Object.defineProperty(oDataOperation, 'Config', {get: function() { return _Config; }});

			// Wireup the Record Template Macro object.
			Object.defineProperty(oDataOperation, 'RecordTemplates', {get: function() { return _RecordTemplateMacros; }});

			// Create the behavior sets
			_Behaviors.Read = PictDataOperationRead(oDataOperation, _Pict);
			Object.defineProperty(oDataOperation, 'Read', {get: function() { return _Behaviors.Read; }});

			_Behaviors.Count = PictDataOperationCount(oDataOperation, _Pict);
			Object.defineProperty(oDataOperation, 'Count', {get: function() { return _Behaviors.Count; }});
			_Behaviors.ReadList = PictDataOperationReadList(oDataOperation, _Pict);
			Object.defineProperty(oDataOperation, 'ReadList', {get: function() { return _Behaviors.ReadList; }});

			_Behaviors.Update = PictDataOperationUpdate(oDataOperation, _Pict);
			Object.defineProperty(oDataOperation, 'Update', {get: function() { return _Behaviors.Update; }});

			_Behaviors.Create = PictDataOperationCreate(oDataOperation, _Pict);
			Object.defineProperty(oDataOperation, 'Create', {get: function() { return _Behaviors.Create; }});

			_Behaviors.Delete = PictDataOperationDelete(oDataOperation, _Pict);
			Object.defineProperty(oDataOperation, 'Delete', {get: function() { return _Behaviors.Delete; }});


			return oDataOperation;
		}

		return oNew;
	}
);