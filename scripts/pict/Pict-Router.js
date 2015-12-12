/**
* This file is the main application routes
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*
* @description Main application backbone routes!
*/
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define
(
	function()
	{
		var _Router;
		var _RouterPrototype;

		var _Pict;

		/**
		 * This is meant to be overloaded by the application.
		 */
		var showDefaultRoute = function ()
		{
			return true;
		};

		/**
		 * Override the default route (what is displayed for an empty route string)
		 */
		var setDefaultRoute = function(fDefaultRoute)
		{
			showDefaultRoute = fDefaultRoute;
		};

		function oInitialize(pPict)
		{
			_Pict = pPict;

			////////// DEFINE CUSTOM ROUTES //////////
			_RouterPrototype = Backbone.Router.extend
			({
				routes:
				{
					"":"displayDefault",
					"content/:pContentHash": "displayContent",
					"content/:pContentHash/:pAnchorTag": "displayContentWithAnchor",
					"modalContent/:pContentHash": "displayModalContent",
					"modalContent/:pContentHash/:pAnchorTag": "displayModalContentWithAnchor",
					"login": "displayLogin",
					"logout": "doLogout"
				},
				displayDefault:function()
				{
					showDefaultRoute();
				},
				displayContent:function(pContentHash)
				{
					_Pict.WriteContent(pContentHash);
				},
				displayContentWithAnchor:function(pContentHash, pAnchorName)
				{
					_Pict.WriteContent(pContentHash);
					_Pict.JumpToAnchor(pAnchorName);
				},
				displayModalContent:function(pContentHash)
				{
					var tmpTemplate = _.template($('#StaticContent'+ pContentHash).text());
					var dialog = bootbox.dialog({
						size: 'large',
						className: "modal-scroll-height",
						message: tmpTemplate(),
						buttons: {
							"confirm": {
								className: "btn-primary",
								callback: function() {
									dialog.modal('hide');
									// Go back on close
									window.history.back();
								}
							}
						},
						onEscape: function () {
							// Go back on close
							window.history.back();
						}
					});
					$('.modal-scroll-height').find('.modal-body').css("max-height", $(window).height() - 160);
				},
				displayModalContentWithAnchor:function(pContentHash, pAnchorName)
				{
					_Pict.WriteContent(pContentHash);
					_Pict.JumpToAnchor(pAnchorName);
				},
				displayLogin:function()
				{
					$('#loginModal').modal({backdrop: false, show: true, keyboard: false});
				},
				doLogout:function()
				{
					_Pict.session.Logout();
				}
			});

			_Router = new _RouterPrototype();

			////////// CONNECT THE ROUTER TO THE USER INTERFACE //////////
			_Pict.Initialize(_Router);

			////////// START THE ROUTER PROCESSING //////////
			Backbone.history.start();
			
			return true;
		}

		////////// Return Object //////////
		var oApplicationRoutes = (
		{
			SetDefaultRoute: setDefaultRoute,
			Initialize: oInitialize
		});

		Object.defineProperty(oApplicationRoutes, 'Router', {get: function() { return _Router; }});
		Object.defineProperty(oApplicationRoutes, 'RouterPrototype', {get: function() { return _RouterPrototype; }});

		return oApplicationRoutes;
	}
);