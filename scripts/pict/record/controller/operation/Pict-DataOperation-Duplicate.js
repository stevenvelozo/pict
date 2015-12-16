/**
* Boilerplate record duplicate functions.
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
	function()
	{
		function oNew(pDataOperations, pPict)
		{
			if ((typeof(pDataOperations) === 'undefined') || (typeof(pPict) === 'undefined'))
				return false;

			var _DataOperations = pDataOperations;
			var _Config = _DataOperations.Config;
			var _Pict = pPict;

			// Create the default request configuration object.
			var _Default_Options_Duplicate = (
			{
				IDRecord: false,
				PostFormDisplayHook: false
			});

			function DuplicateRecord(pGUIDRecord, fPostFormDisplayHook)
			{
				var tmpOptions = _.extend({}, _Default_Options_Duplicate, pOptions);

				_DataOperations.Read.ReadRecord(
					{
						IDRecord: tmpOptions.IDRecord, 
						ProcessRecordFunction: DisplayDuplicateRecordForm, 
						ProcessRecordPostHook: tmpOptions.PostFormDisplayHook
					}
				);
			}

			function DisplayDuplicateRecordForm(pRecord, fPostFormDisplayHook)
			{
				var tmpCancelURL = _Config.DataSetHash+'read/'+pRecord[_Config.DataSetGUID];
				var tmpRecordTemplate = _.template($(_Config.DOMTemplateMap.Update).text());

				$(_Config.DOMContainerMap.Update).html(tmpRecordTemplate({Record : pRecord, CancelURL: tmpCancelURL, Pict: _Pict, DAL: _DataOperations}));

				// Change the ID to RECORD_DUPLICATE
				$('#'+_Config.DataSetGUID).val('RECORD_DUPLICATE');

				// If the word "Edit" is the first word of the title, change it to Duplicate
				if ($('#TitleText').html().substring(0, 4) === 'Edit')
				{
					var tmpTitle = $('#TitleText').html();
					$('#TitleText').html('Duplicate'+tmpTitle.substring(4,tmpTitle.length));
				}

				if (typeof(fPostFormDisplayHook) === 'function')
					fPostFormDisplayHook(pRecord);
				else
					_DataOperations.Update.WireDefaultUpdateRecordForm(pRecord);

				// Now the user-defined post operation hook
				if ('DisplayUpdate' in _Config.PostOperationHooks)
					_Config.PostOperationHooks.DisplayUpdate(pRecord);
			}
			////////// RETURN OBJECT //////////
			var oDataOperation = (
			{
				New: oNew,

				DuplicateRecord: DuplicateRecord
			});

			Object.defineProperty(oDataOperation, 'Options', {get: function() { return _Default_Options_Update; }});

			return oDataOperation;
		}

		return oNew;
	}
);