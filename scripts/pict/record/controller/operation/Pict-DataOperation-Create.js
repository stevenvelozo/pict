/**
* Boilerplate record create functions.
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
	['pict/dependencies/async'],
	function(libAsync)
	{
		function oNew(pDataOperations, pPict)
		{
			if ((typeof(pDataOperations) === 'undefined') || (typeof(pPict) === 'undefined'))
				return false;

			var _DataOperations = pDataOperations;
			var _Config = _DataOperations.Config;
			var _Pict = pPict;

			// Create the default request configuration object.
			var _Default_Options_Create = (
			{
				Record: false,

				// This is a function that gets passed in to manage workflow after a create is completed
				CreateRecordComplete: false
			});

			var CreateRecord = function(pOptions)
			{
				var tmpCreateRecordCompleted = (typeof(pOptions.CreateRecordCompleted) === 'function') ? pOptions.CreateRecordCompleted : CreateRecordCompleted;

				$.ajax
				(
					{
						type: 'GET',
						url: _Config.APIURIMap.Create,
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
							console.log('There was a problem creating an empty record: '+pData.Error);
							return _Pict.session.ValidateSession();
						}
						// This is either a passed-in function or the default display function
						if (pData.Success === '1')
							tmpCreateRecordCompleted(pData.Record);
					}
				)
				.fail
				(
					function ()
					{
						console.log('There has been an error creating a ['+_Config.DataSetHash+'] record.');
					}
				);

				return false;
			};

			var CreateRecordFilled = function(pForm, pFormData, fCreateRecordCompleted)
			{
				var tmpCreateRecordCompleted = (typeof(fCreateRecordCompleted) === 'function') ? fCreateRecordCompleted : CreateRecordCompleted;

				libAsync.waterfall(
					[
						function (fStageComplete)
						{
							// This allows us to add hooks at the higher layer (from routing)
							if ('Create' in _Config.PreOperationHooks)
							{
								_Config.PreOperationHooks.Create(pFormData, pForm,
									function(pContinue)
									{
										// Don't create if prehook tells us not to.
										if (!pContinue)
										{
											console.log('  > Canceled create due to hook return.');
											fStageComplete(true);
										}
										else
										{
											fStageComplete(false);
										}
									});
							}
							else
							{
								fStageComplete(false);
							}
						},
						function(fStageComplete)
						{
							var tmpRecord = _Config.PreOperationHooks.CreateMarshalRecordFromUpdateForm(pFormData);
							$.ajax
							(
								{
									type: 'POST',
									url: _Config.APIURIMap.CreateFilled,
									dataType: 'json',
									contentType: 'application/json',
									data: JSON.stringify(tmpRecord),
									async: true
								}
							)
							.done
							(
								function (pData)
								{
									if (typeof(pData.Error) !== 'undefined' && pData.Error.indexOf('authentica') > -1)
									{
										console.log('There was a problem creating a record: '+pData.Error);
										fStageComplete();
										return _Pict.session.ValidateSession();
									}
									// This is either a passed-in function or the default display function
									if (typeof(pData[_Config.DataSetGUID]) !== 'undefined')
									{
										// This allows us to add hooks at the higher layer (from routing)
										if ('PersistRecordComplete' in _Config.PostOperationHooks)
											_Config.PostOperationHooks.PersistRecordComplete(pData);
										tmpCreateRecordCompleted(pData);
									}

									fStageComplete();
								}
							)
							.fail
							(
								function ()
								{
									console.log('There has been an error creating a filled ['+_Config.DataSetHash+'] record.');
									fStageComplete();
								}
							);
						}
					],
					function(pError)
					{
						if (pError)
						{
							console.log('  > There was an error creating '+_Config.DataSetHash+': '+pError);
						}
					});
			};

			var DisplayCreateRecord = function()
			{
				var tmpRecord = {};
				tmpRecord[_Config.DataSetGUID] = 'RECORD_CREATE';
				_DataOperations.Update.DisplayUpdateRecordForm(tmpRecord, false, _Config.DataSetHash+'list' );
			};

			var CreateRecordCompleted = function(pRecord)
			{
				// Get the current record, and display it
				// Run a full roundtrip to get anything the server added to the ORM.
				if ('CreateCustom' in _Config.PostOperationURIs)
					_Pict.router.navigate(_Config.PostOperationURIs.CreateCustom, true);
				else
					_DataOperations.Read.ReadRecord(
						{
							IDRecord: pRecord[_Config.DataSetGUID], 
							ProcessRecordFunction: DisplayCreateRecordCompleted
						}
					);
			};

			var DisplayCreateRecordCompleted = function(pRecord)
			{
				if ('Create' in _Config.PostOperationURIs)
					_Pict.router.navigate(_Config.PostOperationURIs.Create(pRecord), true);
				else
					_Pict.router.navigate(_Config.DataSetHash+'read/'+pRecord[_Config.DataSetGUID], true);
			};

			var oDataOperation = (
			{
				CreateRecord: CreateRecord,
				CreateRecordFilled: CreateRecordFilled,

				DisplayCreateRecord: DisplayCreateRecord,

				New: oNew
			});

			Object.defineProperty(oDataOperation, 'Options', {get: function() { return _Default_Options_Create; }});

			return oDataOperation;
		}

		return oNew;
	}
);