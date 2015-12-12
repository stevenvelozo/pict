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
	function()
	{
		if (typeof(oBundle) !== 'undefined') return oBundle;

		////////// Initialize the bundle with the application //////////
		function oNew(pRouter, pPict)
		{
			var _Pict = pPict;
			var _Router = pRouter;
/*
			// Authenticate the user
			_Pict.session.behaviors.Authenticate = function(pUserName, pPassword, fCallback)
			{
				if (pPassword === 'password')
					fCallback(JSON.parse('{"IDUser":1,"NameFirst":"Luser","NameLast":"McUsryington","IDCustomer":1,"Role":"User","RoleIndex":1,"Email":"user@test.com","Title":"User"}'))
				else
					fCallback(false);
			};

			// Deauthenticate the user
			_Pict.session.behaviors.Deauthenticate = function(fCallback)
			{
				fCallback();
			};

			// Check the session's status
			_Pict.session.behaviors.CheckSessionStatus = function(fCallback)
			{
				fCallback(false);
			};

			// Setup the user interface for a user just logging in
			_Pict.session.behaviors.UXSetUser = function(pRecord)
			{
			};

			// Set the user interface to a non-logged-in state after a logout action
			_Pict.session.behaviors.UXClearUser = function()
			{
			};
*/
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





