/**
* Boilerplate record update functions.
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
			var _Default_Options_Update = (
			{
				IDRecord: false,

				// This is the standard hook that is called after the form is displayed (generally it is the wireup)
				// Note if you override this, you will have to wire up the update form yourself
				PostFormDisplayHook: false
			});

			var UpdateRecord = function(pOptions)
			{
				var tmpOptions = _.extend({}, _Default_Options_Update, pOptions);

				_DataOperations.Read.ReadRecord(
					{
						IDRecord: tmpOptions.IDRecord,
						ProcessRecordFunction: DisplayUpdateRecordForm, 
						ProcessRecordPostHook: tmpOptions.PostFormDisplayHook
					}
				);
			};

			var DisplayUpdateRecordForm = function(pRecord, fPostFormDisplayHook, pCancelURL)
			{
				var tmpCancelURL =  (typeof(pCancelURL) === 'undefined') ? _Config.DataSetHash+'read/'+pRecord[_Config.DataSetGUID] : pCancelURL;
				var tmpRecordTemplate = _.template($(_Config.DOMTemplateMap.Update).text());

				$(_Config.DOMContainerMap.Update).html(tmpRecordTemplate({Record : pRecord, CancelURL: tmpCancelURL, Pict: _Pict, DAL: _DataOperations}));

				if (typeof(fPostFormDisplayHook) === 'function')
					fPostFormDisplayHook(pRecord);
				else
					WireDefaultUpdateRecordForm(pRecord);

				// Now the user-defined post operation hook
				if ('DisplayUpdate' in _Config.PostOperationHooks)
					_Config.PostOperationHooks.DisplayUpdate(pRecord);
			};

			var WireDefaultUpdateRecordForm = function(pRecord)
			{
				$(_Config.DOMContainerMap.UpdateForm).submit
				(
					function()
					{
						// If a custom validator has been defined, use it.
						if ('RecordValidate' in _Config.PreOperationHooks)
							_Config.PreOperationHooks.RecordValidate(ProcessUpdateForm);
						else
							DefaultUpdateRecordFormValidator(ProcessUpdateForm);

						return false;
					}
				);
			};

			var DefaultUpdateRecordFormValidator = function(fSuccess, fFail)
			{
				var tmpSuccess = (typeof(fSuccess) === 'function') ? fSuccess : function() {};
				var tmpFail = (typeof(fFail) === 'function') ? fFail : function() {};

				tmpSuccess();
			};

			var MarshalRecordFromUpdateForm = function(pForm)
			{
				var tmpRecord = {};
				for(var i = 0; i < pForm.length; i++)
				{
					if (pForm[i].name.substring(0, 6) != 'CHECK_')
						tmpRecord[pForm[i].name] = pForm[i].value;
				}
				return tmpRecord;
			};
			// Set the default marshallers
			_Config.PreOperationHooks.UpdateMarshalRecordFromUpdateForm = MarshalRecordFromUpdateForm;
			_Config.PreOperationHooks.CreateMarshalRecordFromUpdateForm = MarshalRecordFromUpdateForm;

			var ProcessUpdateForm = function()
			{
				// Get starting millisecond
				var tmpOperationStartTime = +new Date();
				console.log('--> Updating '+_Config.DataSetHash);

				var tmpForm = $(_Config.DOMContainerMap.UpdateForm);
				var tmpFormData = tmpForm.serializeArray();

				// Pull in and convert all checkboxes to their proper binary representation
				$(tmpForm).find('.pictAutoCheck').each(
					function()
					{
						var tmpCheckedValue = 0;
						if ($(this).prop('checked'))
							tmpCheckedValue = 1;
						tmpFormData.push({ name: $(this).attr('id').substr(6, $(this).attr('id').length - 6), value: tmpCheckedValue });
					}
				);

				// These are passed through the form action and method
				var tmpAPIUpdateURI = tmpForm.attr('action');
				var tmpAPIUpdateMethod = tmpForm.attr('method');

				// Determine if the GUID is set to "RECORD_CREATE"
				var tmpGUID = $('#'+_Config.DataSetGUID).val(); // TODO: Allow this to be set by a piece of content in the form
				if ((tmpGUID === 'RECORD_CREATE') || (tmpGUID === 'RECORD_DUPLICATE'))
					// Create a new record filled rather than updating it.
					return _DataOperations.Create.CreateRecordFilled(tmpForm, tmpFormData);


				libAsync.waterfall(
					[
						function (fStageComplete)
						{
							// This allows us to add hooks at the higher layer (from routing)
							if ('Update' in _Config.PreOperationHooks)
							{
								_Config.PreOperationHooks.Update(tmpFormData, tmpForm,
									function(pContinue)
									{
										// Don't update if prehook tells us not to.
										if (!pContinue)
										{
											console.log('  > Canceled update due to hook return.');
											fStageComplete(true);
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
							// Marshal the record from the form
							var tmpRecord = _Config.PreOperationHooks.UpdateMarshalRecordFromUpdateForm(tmpFormData);

							$.ajax
							({
								type: 'PUT',
								url: tmpAPIUpdateURI,
								datatype: 'json',
								contentType: 'application/json',
								data: JSON.stringify(tmpRecord),
								async: true
							})
							.done
							(
								function (pData)
								{
									if (typeof(pData.Error) !== 'undefined' && pData.Error.indexOf('authentica') > -1)
									{
										console.log('There was a problem updating a record: '+pData.Error);
										fStageComplete();
										return doValidateConnection();
									}
									var tmpOperationEndTime = +new Date();
									var tmpOperationTime = tmpOperationEndTime - tmpOperationStartTime;

									if (typeof(pData[_Config.DataSetGUID]) !== 'undefined')
									{
										// This allows us to add hooks at the higher layer (from routing)
										if ('PersistRecordComplete' in _Config.PostOperationHooks)
											_Config.PostOperationHooks.PersistRecordComplete(pData);

										console.log('  > Successfully updated '+_Config.DataSetHash+' GUID '+pData[_Config.DataSetGUID]+' in '+tmpOperationTime+'ms');
										// TODO: Take this new pattern for defaulting on false in that value back to original behavior.
										if ('Update' in _Config.PostOperationURIs)
											if (_Config.PostOperationURIs.Update)
											{
												_Pict.router.navigate(_Config.PostOperationURIs.Update, true);
											}
										_Pict.router.navigate(_Config.DataSetHash+'read/'+pData[_Config.DataSetGUID], true);
									}
									else
										console.log('  > There was a problem updating '+_Config.DataSetHash+' after '+tmpOperationTime+'ms');

									fStageComplete();
								}
							)
							.fail
							(
								function ()
								{
									console.log('  > There was an error updating '+_Config.DataSetHash);
									fStageComplete();
								}
							);
						}
					],
					function(pError)
					{
						if (pError)
						{
							console.log('  > There was an error updating '+_Config.DataSetHash+': '+pError);
						}
					});

				return false;
			};

			////////// RETURN OBJECT //////////
			var oDataOperation = (
			{
				New: oNew,

				UpdateRecord: UpdateRecord,

				DisplayUpdateRecordForm: DisplayUpdateRecordForm,

				MarshalRecordFromUpdateForm: MarshalRecordFromUpdateForm,
				WireDefaultUpdateRecordForm: WireDefaultUpdateRecordForm
			});

			Object.defineProperty(oDataOperation, 'Options', {get: function() { return _Default_Options_Update; }});

			return oDataOperation;
		}

		return oNew;
	}
);