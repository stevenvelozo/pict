/**
* This file is the bridge between the main application and the DOM
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*
* @description Main application UX/UI code.
*/
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define
(
	["pict/Pict-Router", "pict/Pict-Session",
	 "pict/ui/content/Pict-UI-StaticContent", "pict/ui/content/Pict-UI-Pages", "pict/ui/content/Pict-UI-Formatters", "pict/ui/content/Pict-UI-Dates", "pict/ui/templating/Pict-UI-Forms", "pict/ui/Pict-UI-BrowserExtensions",
	 "pict/record/controller/interaction/Pict-Interactions-EventWireups", "pict/record/controller/Pict-Record-Lists", "pict/record/Pict-Entity-List"],
	function(PictRouter, PictSession,
		PictUIStaticContent, PictUIPages, PictUIFormatters, PictUIDates, PictUIForms, PictUIBrowserExtensions,
		PictInteractionsEventWireup, PictRecordLists, PictEntityList)
	{
		if (typeof(oPict) !== 'undefined') return oPict;

		var _ListCache;

		var _SitePrefix = 'Pict';

		var _PictRouter = PictRouter;
		// Create a Backbone router variable
		var _Router = false;

		// The div in which to stuff the main application content
		var _DefaultContainerContent = '#appContentContainer';


		var initialize = function(pRouter)
		{
			// Set the Backbone Router reference object
			_Router = pRouter;

			// Initialize the list cache
			_ListCache = {};

			// Setup the static content display function
			_StaticContent.Initialize(writeContentDelegate);

			_Session.Initialize(oPict);

			_Dates.Initialize(oPict);

			_DataLists.Initialize(oPict);

			_RecordTemplates.Initialize(oPict);

			_RecordInteractions.Initialize(oPict, _Router);
		};

		////////// List Cache //////////
		// TODO: Move this to its own module, so we can start expiring cache times
		var doSetCache = function(pCacheKey, pCacheValue)
		{
			_ListCache[pCacheKey] = pCacheValue;
		};

		var doGetCache = function(pCacheKey)
		{
			if (_ListCache.hasOwnProperty(pCacheKey))
				return _ListCache[pCacheKey];
			return false;
		};

		var doClearCache = function(pCacheKey)
		{
			if (!_ListCache.hasOwnProperty(pCacheKey))
				return false;

			delete _ListCache[pCacheKey];
			return true;
		};

		var doResetCache = function()
		{
			// TODO: Research why jslint hates this.
			//delete _ListCache;
			_ListCache = {};
			return true;
		};

		////////// Content Writing //////////
		var writeContent = function(pPageHash, pData)
		{
			var tmpData = (typeof(pData) === 'undefined') ? { Pict: oPict } : pData;
			tmpData.Pict = oPict;
			var tmpPageHash = (typeof(pPageHash) === 'undefined') ? 'Default' : pPageHash;
			_StaticContent.WriteContent(tmpPageHash, tmpData);
		};

		// Update the content container
		var writeContentDelegate = function(pContent)
		{
			$(_DefaultContainerContent).html(pContent);
		};

		var writeContentDirectly = function(pTemplateHash, pTarget, pData)
		{
			var tmpTemplate = _.template($(pTemplateHash).text());
			$(pTarget).html(tmpTemplate(pData));
		};

		var oPict = (
		{
			Initialize: initialize,

			WriteContent: writeContent,
			WriteContentDelegate: writeContentDelegate,
			WriteContentDirectly: writeContentDirectly,

			GetCache: doGetCache,
			SetCache: doSetCache,
			ClearCache: doClearCache,
			ResetCache: doResetCache
		});


		// A unique hash representing the application name.  Used in titles, messages, logging, etc.
		var getSitePrefix = function() { return _SitePrefix; };
		var setSitePrefix = function(pSitePrefix)
		{
			_SitePrefix = pSitePrefix;
		};
		Object.defineProperty(oPict, 'sitePrefix', {get: getSitePrefix, set: setSitePrefix, enumerable: true });

		// The backbone router
		var getRouter = function() { return _Router; };
		Object.defineProperty(oPict, 'router', {get: getRouter, enumerable: true });

		// The pict router managment functions
		var getPictRouter = function() { return _PictRouter; };
		Object.defineProperty(oPict, 'routermanagement', {get: getPictRouter, enumerable: true });


		// Content formatting macros
		var _Formatters = PictUIFormatters;
		var getFormatters = function() { return _Formatters; };
		Object.defineProperty(oPict, 'formatters', {get: getFormatters, enumerable: true });

		// Functionality for anaging entire pages
		var _Pages = PictUIPages(oPict);
		var getContentPages = function() {return _Pages; };
		Object.defineProperty(oPict, 'pages', {get: getContentPages, enumerable: true });


		var _Dates = PictUIDates;
		var getDates = function() { return _Dates; };
		Object.defineProperty(oPict, 'dates', {get: getDates, enumerable: true });

		var _DataLists = PictRecordLists;
		var getDataLists = function() { return _DataLists; };
		Object.defineProperty(oPict, 'dataLists', {get: getDataLists, enumerable: true });

		var _RecordTemplates = PictUIForms;
		var getRecordTemplates = function() { return _RecordTemplates; };
		Object.defineProperty(oPict, 'recordTemplates', {get: getRecordTemplates, enumerable: true });

		var _BrowserExtensions = PictUIBrowserExtensions;
		var getBrowserExtensions = function() { return _BrowserExtensions; };
		Object.defineProperty(oPict, 'BrowserExtensions', {get: getBrowserExtensions, enumerable: true });

		var _Entities = PictEntityList;
		var getControllers = function() { return _Entities; };
		Object.defineProperty(oPict, 'controllers', {get: getControllers, enumerable: true });

		var _RecordInteractions = PictInteractionsEventWireup;
		var getRecordInteractionHandlers = function() { return _RecordInteractions; };
		Object.defineProperty(oPict, 'recordInteractionHandlers', {get: getRecordInteractionHandlers, enumerable: true });
		
		var _Session = PictSession;
		var getSession = function() { return _Session; };
		Object.defineProperty(oPict, 'session', {get: getSession, enumerable: true });

		var _StaticContent = PictUIStaticContent;
		var getStaticContent = function() { return _StaticContent; };
		Object.defineProperty(oPict, 'staticcontent', {get: getStaticContent, enumerable: true });


		// The API Server to use
		var _APIServer = '/1.0/';
		var getAPIServer = function()
		{
			return _APIServer;
		};
		var setAPIServer = function(pAPIServer)
		{
			return _APIServer;
		};
		Object.defineProperty(oPict, 'apiServer', {get: getAPIServer, set: setAPIServer, enumerable: true });

		return oPict;
	}
);