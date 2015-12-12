/**
* This file provides default behaviors for the login services.
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*
*/

if (typeof define !== 'function') { var define = require('amdefine')(module); }

define
(
	function()
	{
		// Because this is a "global state" type object, if one exists just go with it.
		if (typeof(oDefaultBehaviors) !== 'undefined') return oDefaultBehaviors;

		var _Pict;

		// If these behaviors aren't reloaded, PICT provides a simple login mock functionality
		var _MockSessionUserToken = false;

		var _MockUser = ({"Version":"1.2.3", "SessionID":"MOCK-SESSION-0x00001", "LoggedIn":true, "UserRole":"User", "UserRoleIndex":1, "UserID":1, "CustomerID":1, "DeviceID":"MOCK-DEVICE-0x00001", "Title":"User", "NameFirst":"Jane", "NameLast":"Fonda", "Email":"jane.fonda@test.com"});

		var _MockAdministator = ({"Version":"1.2.3", "SessionID":"MOCK-SESSION-0x00002", "LoggedIn":true, "UserRole":"User", "UserRoleIndex":5, "UserID":2, "CustomerID":2, "DeviceID":"MOCK-DEVICE-0x00002", "Title":"Administrator", "NameFirst":"Gloria", "NameLast":"Estefan", "Email":"gloria.estefan@test.com"});

		// Authenticate the user
		var Authenticate = function(pUserName, pPassword, fCallback)
		{
			// Any user with the name administrator logs in immediately
			if (pUserName.toLowerCase === 'administrator')
				_MockSessionUserToken = _MockAdministator;
			// Any normal user with the password "bad" is failed
			else if(pPassword === 'bad')
				_MockSessionUserToken = false;
			// Any other normal user is logged in
			else
				_MockSessionUserToken = _MockUser;

			fCallback(_MockSessionUserToken);
		};

		// Deauthenticate the user
		var Deauthenticate = function(fCallback)
		{
			_MockSessionUserToken = false;
			fCallback();
		};

		// This checks the session status.
		var CheckSessionStatus = function(fCallback)
		{
			// If the callback is false, it logs the user out
			if (!_MockSessionUserToken)
			{
				fCallback(false);
			}

			// Otherwise it expects a PICT Session token
			fCallback(_MockSessionUserToken);
		};

		// This is here to hook in any UX functions that should update when the user is logged in
		var UXSetUser = function(pRecord) {};

		// This is here to hook in any UX functions that should update when the user is logged out
		var UXClearUser = function() {};

		var oDefaultBehaviors = (
		{
			Authenticate: Authenticate,
			Deauthenticate: Deauthenticate,
			CheckSessionStatus: CheckSessionStatus,

			UXSetUser: UXSetUser,
			UXClearUser: UXClearUser
		});

		return oDefaultBehaviors;
	}
);