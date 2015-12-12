/**
* This file provides boilerplate record read functions.
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

			var DisplayRecord = function(pRecord, fCallBack)
			{
				tmpCallBack = (typeof(fCallBack) === 'function') ? fCallBack : function() {};

				// Get the Record Template
				var tmpRecordTemplate = _.template($(_Config.DOMTemplateMap.Read).text());

				// Now render the record
				$(_Config.DOMContainerMap.Read).html(tmpRecordTemplate({Record : pRecord, Pict: _Pict}));

				// This allows us to add hooks at the higher layer (from routing)
				if ('Display' in _Config.PostOperationHooks)
					_Config.PostOperationHooks.Display(pRecord);

				tmpCallBack();
			};


			// Create the default request configuration object.
			var _Default_Options_Read = (
			{
				// This value fills out the "Cat/115" part of this call to the API server to get a record
				//     https://bestapiever.com/1.0/Cat/115
				APIReadURI: false,

				IDRecord: false,

				ProcessRecordFunction: DisplayRecord,
				ProcessRecordPostHook: function() {}
			});

			var ReadRecord = function(pOptions)
			{
				var tmpOptions = _.extend({}, _Default_Options_Read, pOptions);

				var tmpAPIReadURI = tmpOptions.APIReadURI ? tmpOptions.APIReadURI : _Config.APIURIMap.Read+tmpOptions.IDRecord;

				// Get starting millisecond
				var tmpOperationStartTime = +new Date();
				console.log('--> Reading Record: '+tmpAPIReadURI);


				$.ajax
				(
					{
						type: 'GET',
						url: tmpAPIReadURI,
						datatype: 'json',
						async: true
					}
				)
				.done
				(
					function (pData)
					{
						if (typeof(pData.Error) !== 'undefined' && pData.Error.indexOf('authentica') > -1)
						{
							console.log('There was a problem retreiving record ('+tmpAPIReadURI+'): '+pData.Error);
							return _Pict.session.ValidateSession();
						}

						var tmpOperationEndTime = +new Date();
						var tmpOperationTime = tmpOperationEndTime - tmpOperationStartTime;
						console.log('  > AJAX Request Read '+_Config.DataSetHash+' Completed ('+tmpOperationTime+'ms)');

						tmpOptions.ProcessRecordFunction(pData, tmpOptions.ProcessRecordPostHook);

						tmpDisplayOperationEndTime = +new Date();
						tmpDisplayOperationTime = tmpDisplayOperationEndTime-tmpOperationEndTime;
						console.log('  > Done Displaying '+_Config.DataSetHash+' Record ('+tmpDisplayOperationTime+'ms)');

						tmpOperationTime = tmpDisplayOperationEndTime - tmpOperationStartTime;
						console.log('  > Total '+_Config.DataSetHash+' Display Time '+tmpOperationTime+'ms');


						if ('Read' in _Config.PostOperationHooks)
							_Config.PostOperationHooks.Read(pData);
					}
				)
				.fail
				(
					function ()
					{
						_Pict.session.ValidateSession();
						console.log('There has been an error retreiving the ['+_Config.DataSetHash+'] record GUID '+tmpOptions.IDRecord+'.');
					}
				);

				return false;
			};

			var oDataOperation = (
			{
				New: oNew,

				ReadRecord: ReadRecord,

				DisplayRecord: DisplayRecord
			});

			Object.defineProperty(oDataOperation, 'Options', {get: function() { return _Default_Options_Read; }});

			return oDataOperation;
		}

		return oNew;
	}
);