/**
* This file provides boilerplate record delete functions.
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*
* @description Boilerplate Javascript Record Delete
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
			var _Default_Options_Delete = (
			{
				// This value fills out the "Cat/115" part of this call to the API server to get a record
				//     https://bestapiever.com/1.0/Cat/115
				APIDeleteURI: false,

				IDRecord: false,
				DeleteIndexColumn: _Config.DataSetGUID,

				DeleteRecordPostRoute: false,

				DeleteRecordPostHook: function() {}
			});

			var DeleteRecord = function(pOptions)
			{
				var tmpOptions = _.extend({}, _Default_Options_Delete, pOptions);

				_DataOperations.Read.ReadRecord(
					{
						IDRecord: pOptions.IDRecord,
						ProcessRecordFunction: DisplayDeleteRecordConfirmMessage
					}
				);
			};

			var DisplayDeleteRecordConfirmMessage = function(pRecord)
			{
				// Get the delete confirmation template
				var tmpRecordTemplate = _.template($(_Config.DOMTemplateMap.Delete).text());

				// Display the delete confirmation
				$(_Config.DOMContainerMap.Delete).html(tmpRecordTemplate({Record : pRecord, Pict: _Pict, DAL: _DataOperations}));

				if ('DeleteConfirmation' in _Config.PostOperationHooks)
					_Config.PostOperationHooks.DeleteConfirmation(pRecord);
			};

			var DeleteRecordConfirmed = function(pOptions)
			{
				var tmpOperationStartTime = +new Date();
				console.log('--> Deleting a Record: '+pOptions.IDRecord);

				// TODO: Fail if the ID record is empty?

				var tmpOptions = _.extend({}, _Default_Options_Delete, pOptions);

				// Now construct the record to pass into the DEL request
				var tmpRecord = {};
				tmpRecord[tmpOptions.DeleteIndexColumn] = tmpOptions.IDRecord;


				var tmpAPIDeleteURI = tmpOptions.APIDeleteURI ? tmpOptions.APIDeleteURI : _Config.APIURIMap.Delete;
				var tmpDeleteRecordPostHook = (typeof(pOptions.DeleteRecordPostHook) === 'function') ? pOptions.DeleteRecordPostHook : function(){};

				$.ajax
				(
					{
						type: 'DELETE',
						url: tmpAPIDeleteURI,
						datatype: 'json',
						contentType: 'application/json',
						data: JSON.stringify(tmpRecord),
						async: true
					}
				)
				.done
				(
					function (pData)
					{
						var tmpOperationEndTime = +new Date();
						var tmpOperationTime = tmpOperationEndTime - tmpOperationStartTime;
						console.log('  > AJAX Request Delete '+_Config.DataSetHash+' Completed ('+tmpOperationTime+'ms)');

						// If there is a recordset-level hook, call it here (e.g. cascading events)
						if ('Delete' in _Config.PostOperationHooks)
							_Config.PostOperationHooks.Delete(pData);

						// If there is a ux-specific hook, it gets called here (e.g. refreshing a ui list)
						tmpDeleteRecordPostHook(pData);

						// Finally, after delete the user is redirected to a URI.  This sets the desired URI.
						if (pOptions.DeleteRecordPostRoute)
							_Pict.router.navigate(pOptions.DeleteRecordPostRoute, true);
						else if ('Delete' in _Config.PostOperationURIs)
							_Pict.router.navigate(_Config.PostOperationURIs.Delete, true);
						else
							// If there is no UX or recordset override, fall back to the default list
							_Pict.router.navigate(_Config.DataSetHash+'list', true);
					}
				)
				.fail
				(
					function ()
					{
						_Pict.session.ValidateSession();
						console.log('There has been an error deleting the ['+_Config.DataSetHash+'] record GUID '+pOptions.IDRecord+'.');
					}
				);
			};

			////////// RETURN OBJECT //////////
			var oDataOperation = (
			{
				New: oNew,

				DeleteRecord: DeleteRecord,

				DeleteRecordConfirmed: DeleteRecordConfirmed
			});

			Object.defineProperty(oDataOperation, 'Options', {get: function() { return _Default_Options_Delete; }});

			return oDataOperation;
		}

		return oNew;
	}
);