/**
* This file provides CRUD UX automatically from Meadow-Endpoint Entities.
*
* @license MIT
*
* @author Steven Velozo <steven@velozo.com>
*
* @description Standardized UX from Entities on a Meadow Endpoint
*/
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define
(
	["pict/record/controller/Pict-RecordController"],
	function(RecordController)
	{
		////////// Initialize the bundle with the application //////////
		function oNew(pEntityName, pEntityViewControllerGUID, pRouter, pPict)
		{
			var _Pict = pPict;
			var _Router = pRouter;

			var _EntityName = pEntityName;
			// We use this GUID to generate unique div identifiers and such.
			// It should be only alpha, no spaces and be unique for the whole app.
			var _EntityViewControllerGUID = pEntityViewControllerGUID;

			var _Entity = false;
			var _Schema = false;

			// Grab the Meadow endpoint schema
			var doLoadSchema = function(fComplete)
			{
				var tmpComplete = (typeof(fComplete) === 'function') ? fComplete : function() {};

				$.ajax
				(
					{
						type: 'GET',
						url: _PictGetAPIServer()+_EntityName+'/Schema',
						datatype: 'json',
						async: true
					}
				)
				.done
				(
					function (pData)
					{
						if (typeof(pData.Error) !== 'undefined')
						{
							console.log('There was a problem retreiving the schema for ['+_EntityName+']: '+pData.Error);
							if (pData.Error.indexOf('authentica') > -1)
								_Pict.session.CheckStatus(true, true, true);
							tmpComplete(false);
						}
						_Schema = pData;
						tmpComplete(true);
					}
				)
				.fail
				(
					function ()
					{
						doValidateConnection();
						console.log('There has been an error retreiving the ['+_EntityName+'].');
					}
				);

				return false;
			};

			/**
			 * Connect the routes
			 *
			 * These can be overwritten later.
			 */
			_Entity = RecordController(_EntityName);
			_Entity.Initialize(pRouter);
			_Entity.Config.SetPostOperationHook ('Display', _Pict.recordInteractionHandlers.WireUpPictRecordView);
			_Entity.Config.SetPostOperationHook ('DisplayUpdate', _Pict.recordInteractionHandlers.WireUpPictUpdate);
			_Entity.Config.SetPostOperationHook ('DisplayListContainer', _Pict.recordInteractionHandlers.WireUpPictListWrapper);
			_Entity.Config.SetPostOperationHook ('ReadRecordList', _Pict.recordInteractionHandlers.WireUpPictList);
			_Entity.Config.SetPostOperationHook ('ReadFilteredRecordList', _Pict.recordInteractionHandlers.WireUpPictList);

			var oEntityViewController = (
			{
				loadSchema: doLoadSchema,
				New: oNew
			});

			/**
			 * Access to the contained entity
			 *
			 * @property entity
			 * @type object
			 */
			var getEntity = function()
			{
				return _Entity;
			};
			Object.defineProperty(oEntityViewController, 'entity', {get: getEntity, enumerable: true });

			/**
			 * Lazily loaded Meadow schema
			 *
			 * @property schema
			 * @type object
			 */
			var getSchema = function()
			{
				if (_Schema === false)
				{
					doLoadSchema(
						function()
						{
							return _Schema;
						});
				}
				return _EndpointAuthorizationLevels;
			};
			Object.defineProperty(oEntityViewController, 'schema', {get: getSchema, enumerable: true });

			// Now register this View Controller in the Pict registry
			_Pict.controllers.addEntity(_EntityName+_EntityViewControllerGUID, oEntityViewController);

			return oEntityViewController;
		}

		return {New: oNew};
	}
);