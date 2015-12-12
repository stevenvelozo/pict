/**
* This file provides a generic Logic Bundle wrapper for application data routing.
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*
* @description Logic Bundle Data Provider
*/
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define
(
	['pict/Pict',
	 'pict/record/controller/Pict-DataOperations',
	 'pict/record/controller/Pict-InteractionControllers',
	 'pict/record/Pict-Entity-TemplateManager'],
	function(Pict, DataOperations, InteractionControllers, EntityTemplateManager)
	{
		function oNew(pDataSetHash, pMeadowHash)
		{
			// The triumverate we are wiring together...
			var _Pict = Pict;
			var _DataOperations = DataOperations(pDataSetHash, pMeadowHash);
			var _DataControllers = InteractionControllers(_Pict, _DataOperations);


			////////// INITIALIZATION AND WIREUP //////////
			function oInitialize(pRouter)
			{
				// Create the automagic wire-ups for the DataOperation Model -> UI View
				_DataControllers = InteractionControllers(_DataOperations, _Pict);
				// Wire them into the router
				_DataControllers.Initialize(pRouter);

				// Generate templates for this entity
				EntityTemplateManager(_DataOperations, _Pict);

				_DataOperations.Config.SetPostOperationHook ('Display', _Pict.recordInteractionHandlers.WireUpPictRecordView);
				_DataOperations.Config.SetPostOperationHook ('DisplayUpdate', _Pict.recordInteractionHandlers.WireUpPictUpdate);
				_DataOperations.Config.SetPostOperationHook ('DisplayListContainer', _Pict.recordInteractionHandlers.WireUpPictListWrapper);
				_DataOperations.Config.SetPostOperationHook ('ReadRecordList', _Pict.recordInteractionHandlers.WireUpPictList);
				_DataOperations.Config.SetPostOperationHook ('ReadFilteredRecordList', _Pict.recordInteractionHandlers.WireUpPictList);
				_DataControllers.SetAuthorizer('Update', _DataControllers.ValidateUser);

				return true;
			}

			////////// DATA ACCESS //////////
			// Expose the data operations for custom behaviors
			function getDataOperations()
			{
				return _DataOperations;
			}

			function getDataControllers()
			{
				return _DataControllers;
			}


			////////// RETURN OBJECT //////////
			var oRecordController = (
			{
				Initialize: oInitialize,
				GetDataOperations: getDataOperations,
				GetDataControllers: getDataControllers
			});

			Object.defineProperty(oRecordController, 'Config', {get: function() { return _DataOperations.Config; }});
			Object.defineProperty(oRecordController, 'DataOperations', {get: function() { return _DataOperations; }});
			Object.defineProperty(oRecordController, 'DataControllers', {get: function() { return _DataControllers; }});

			return oRecordController;
		}

		return oNew;
	}
);