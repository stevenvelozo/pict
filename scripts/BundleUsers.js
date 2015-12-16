/**
* An example session management
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*
* @description Login and Logout Extensibility for Pict
*/
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define
(
	['pict/record/controller/Pict-RecordController', 'pict/dependencies/async'],
	function(RecordController, libAsync)
	{
		if (typeof(oBundle) !== 'undefined') return oBundle;

		////////// Initialize the bundle with the application //////////
		function oNew(pRouter, pPict)
		{
			var _Pict = pPict;
			var _Router = pRouter;

			var _Users = RecordController('User');
			_Users.DataOperations.Config.EntityTemplateContent.ReadList_Title_Pre = 'System';
			_Users.Initialize(pRouter);

			var _Customers = RecordController('Customer');
			// Eventually manage this through stricture
			_Customers.Config.AddMetaRowColumn({Column:'Name'});
			_Customers.Config.AddMetaRowColumn({Column:'CreateDate', Title: 'Created', Hash: 'DateDelta'});
			_Customers.Initialize(pRouter);

			var oBundleController = (
			{
			});

			return oBundleController;
		}

		////////// Return Object //////////
		var oBundle = (
		{
			New: oNew
		});

		return oBundle;
	}
);