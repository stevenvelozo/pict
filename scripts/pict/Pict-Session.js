/**
* This file provides basic login services.
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*
* @description Login, logout and UX for these both!
*/
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define
(
	['pict/Pict-Session-DefaultBehaviors'],
	function(DefaultBehaviors)
	{
		// Because this is a "global state" type object, if one exists just go with it.
		if (typeof(oSession) !== 'undefined') return oSession;

		var _Pict;
		var _Initialized = false;

		var _UserRecord;
		var _Authenticated;

		// These are to prevent continuous retry flapping that can occur when a request fails
		var _FlapRoute;
		var _FlapCheck;
		var _ForceReload;

		var _Behaviors = DefaultBehaviors;

		////////// Initialization and State Management //////////
		var oInitialize = function(pPict)
		{
			if (!pPict)
				return false;

			_FlapRoute = '';
			_FlapCheck = 0;
			_ForceReload = true;

			_UserRecord = false;

			_Pict = pPict;

			_Initialized = true;

			return true;
		};

		var doResetUserState = function()
		{
			// Reset the state of this object to empty
			_UserRecord = {};
			_Authenticated = false;

			_UserRecord.UserID = 0;
			_UserRecord.Role = 'None';
			_UserRecord.UserRoleIndex = 0;

			// Reset the state of the UI to logged out
			if (_Initialized)
			{
				// Clear cached lists and record counts
				_Pict.ResetCache();

				_Behaviors.UXClearUser();
			}

			return false;
		};

		var doSetUserState = function(pUserToken)
		{

			if ((typeof(pUserToken) !== 'object') || (typeof(pUserToken.UserID) !== 'number') || (pUserToken.UserID < 1))
				return doResetUserState();

			_Authenticated = true;

			_UserRecord = pUserToken;

			_Initialized = true;

			// Set the state of the UI to logged in
			_Behaviors.UXSetUser(_UserRecord);

			if (_ForceReload)
			{
				// This increments the flap check.
				if (_FlapRoute == Backbone.history.fragment)
				{
					_FlapCheck++;
				}
				else
				{
					_FlapRoute = Backbone.history.fragment;
					_FlapCheck = 0;
				}

				// This tries four times.  It is safe to bet that there is a connection issue if it fails four times.
				if (_FlapCheck < 4)
					Backbone.history.loadUrl();
				else
					_Pict.WriteContent('ProblemRoute');

				_ForceReload = false;
			}


			return true;
		};

		var validateAuthenticated = function()
		{
			// Test if the user is authenticated
			if (_Authenticated) return true;
			// Display the default page
			_Pict.WriteContent('Default');
			// Try logging in
			doCheckStatus(true, true);
			return false;
		};


		var validateSession = function()
		{
			// Check the login... this happens if a request attempt fails
			_Pict.WriteContent('Default');
			_Pict.session.CheckStatus(true, true, true);
		};

		function doLogin(pUserName, pPassword)
		{
			// Login on the server, then clear the browser state
			_Behaviors.Authenticate(pUserName, pPassword,
				function(pSessionToken)
				{
					// Assume the behavior twiddles any UX bits that are necessary if this fails
					if (pSessionToken)
						doSetUserState(pSessionToken);
				});

			return false;
		}

		function doLogout()
		{
			// Logout on the server, then clear the browser state
			_Behaviors.Deauthenticate(
				function()
				{
					doResetUserState();
				});

			return false;
		}

		var doCheckStatus = function(pForceCheck, pForceReload)
		{
			var tmpForceCheck = (typeof(pForceCheck) === 'undefined') ? false : pForceCheck;
			var tmpForceReload = (typeof(pForceReload) === 'undefined') ? false : pForceReload;

			// Don't do the AJAX request if we are already authenticated.
			// TODO: ASAP this needs a timeout to match the session timeout
			if (_Authenticated && !pForceCheck) return true;

			_Behaviors.CheckSessionStatus(
				function(pSessionToken)
				{
					if (!pSessionToken)
					{
						doResetUserState();	
					}
					else
					{
						_ForceReload = true;
						doSetUserState(pSessionToken);
					}
				});
		};

		////////// Return Object //////////
		var oSession = (
		{
			Initialize: oInitialize,

			ResetUserState: doResetUserState,

			Login: doLogin,
			Logout: doLogout,

			CheckStatus: doCheckStatus,

			ValidateSession: validateSession,
			ValidateAuthenticated: validateAuthenticated
		});

		var getAuthenticated = function() {return _Authenticated; };
		Object.defineProperty(oSession, 'authenticated', {get: getAuthenticated, enumerable: true });

		var getInitialized = function() {return _Initialized; };
		Object.defineProperty(oSession, 'initialized', {get: getInitialized, enumerable: true });

		var getRecord = function() { return _UserRecord; };
		Object.defineProperty(oSession, 'record', {get: getRecord, enumerable: true });

		var getBehaviors = function() { return _Behaviors; };
		Object.defineProperty(oSession, 'behaviors', {get: getBehaviors, enumerable: true });

		return oSession;
	}
);
