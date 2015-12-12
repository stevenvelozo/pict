/**
* This file is the main javascript application.
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*
* @description Main RequireJS application.
*/
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define
(
	["pict/Pict-Router", "pict/Pict"],
	function(PictRouter, Pict)
	{
		var _Pict = Pict;

		// Setup the application router, which also holds the global state object.
		// This also configures the Application User Interface object.
		var _PictRouter = PictRouter;
		_PictRouter.Initialize(_Pict);

		// Now set the default route... this could branch by user type easily.
		var defaultRoute = function()
		{
			// SHOW SOME STUFF....
		};
		_PictRouter.SetDefaultRoute(defaultRoute);

		var oApplication = (
		{
		});
	}
);