/**
* This file is an example Pict Application
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
	["pict/Pict",
		// The application-specific bundles
		// The services that are expected to run by the app
		'BundleUsers', 
		'BundleSession'],
	function(Pict,
		BundleUsers, 
		BundleSession)
	{
		// Instantiate the Pict framework
		var _Pict = Pict;
		// Set the site prefix
		_Pict.sitePrefix = 'Retold LibraryList';
		// Initialize the router
		_Pict.routermanagement.Initialize(_Pict);

		// ## Wire Up Bundles
		var _Users = BundleUsers.New(_Pict.router, _Pict);

		// Configure Security
		var _Session = BundleSession.New(_Pict.router, _Pict);

		// Now set the default route... this could branch by user type easily.
		var defaultRoute = function()
		{
			// Execute a default route
		};
		_Pict.routermanagement.SetDefaultRoute(defaultRoute);

		// Setup what happens when a route goes off.
		var _AutoCloseModals = [];
		// Add a function to pict to track these modals
		_Pict.RegisterAutoCloseModal = function(pModal)
		{
			_AutoCloseModals.push(pModal);
		};
		_Pict.router.on
		(
			"route",
			function(pRoute, pParameters)
			{
				// Close any open modals that are registered to autoclose
				var tmpAutoCloseModals = _AutoCloseModals;
				_AutoCloseModals = [];
				for (var i = 0; i < tmpAutoCloseModals.length; i++)
				{
					tmpAutoCloseModals[i].modal('hide');
				}

				// Scroll to the header on route change and change the document title
				var tmpHeader = $('#TitleText');
				if (tmpHeader.length > 0)
				{
					$('#navbar-main').scrollViewFast();
					// Also set the browser tab text to the header text
					document.title = _Pict.sitePrefix+' - '+$(tmpHeader).text();
				}
			}
		);

		// Now check if the user is logged in or not.  Pict will set the ux state properly.
		_Pict.session.ValidateAuthenticated();

		var oApplication = ({});
	}
);