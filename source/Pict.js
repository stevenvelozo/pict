// ##### Part of the **[retold](https://stevenvelozo.github.io/retold/)** system
/**
* @license MIT
* @author <steven@velozo.com>
*/

/**
* Pict browser UX library
*
* @class Pict
*/
var Pict = function()
{
	function createNew(pSettings, pScope)
	{
		// Initialize the scoping object for Pict.
		var _Scope = (typeof(pScope) === 'object') ? pScope :      // Use the passed-in scope if it is a valid object
						(typeof(window) !== 'undefined') ? window : // Check for a browser window object (in-browser mode)
						global;                                    // Use the es6 global scope, per Node

		// Dependencies are shared with children like this so we can share them
		// This keeps them minified and safe to use across the browser, node and even sandboxed templates
		var _Dependencies = {};
		_Dependencies.underscore = require('underscore');
		_Dependencies.jquery = require('jquery');
		_Dependencies.backbone = require('backbone');
		_Dependencies.moment = require('moment');
		// This module is browser-only
		if ((typeof(window) !== 'undefined') && (typeof(document) !== 'undefined'))
		{
			_Dependencies.mousetrap = require('mousetrap');
		}

		// Setup the application settings object
		var libFableSettings = require('fable-settings');
		// TODO: Enhance fable-settings to have a stripped-down default object for cases like this
		// Delete the extraneous properties from the standard fable settings defaults.
		delete libFableSettings.default.APIServerPort;
		delete libFableSettings.default.ConfigFile;
		delete libFableSettings.default.SessionStrategy;
		delete libFableSettings.default.MemcachedURL;
		delete libFableSettings.default.MongoDBURL;
		delete libFableSettings.default.MySQL;
		delete libFableSettings.default.LogStreams;
		var _Settings = libFableSettings.new(pSettings);

		// Our factory object
		var oPict = (
		{
			initialize: createNew
		});

		/**
		 * External Dependency Libraries
		 *
		 * @property libs
		 * @type object
		 */
		Object.defineProperty(oPict, 'libs',
			{
				get: function() { return _Dependencies; },
				enumerable: true
			});

		/**
		 * Settings
		 *
		 * @property settings
		 * @type object
		 */
		Object.defineProperty(oPict, 'settings',
			{
				get: function() { return _Settings.settings; },
				enumerable: true
			});

		// This has behaviors similar to bunyan, for consistency
		var _Log = require('./Pict-Log.js')(oPict);
		/**
		 * Logging
		 *
		 * @property log
		 * @type object
		 */
		Object.defineProperty(oPict, 'log',
			{
				get: function() { return _Log; },
				enumerable: true
			});		 

		// Register dependencies globally with the browser if they aren't there
		function registerGlobalDependency(pDependencyHash, pDependency)
		{
			// Check that it isn't there yet...
			if (!window.hasOwnProperty(pDependencyHash))
			{
				_Log.info('Pict is registering a global browser dependency: '+pDependencyHash);
				window[pDependencyHash] = _Dependencies[pDependency];
			}
		};
		if (typeof(window) !== 'undefined')
		{
			registerGlobalDependency('jQuery', 'jquery');
			registerGlobalDependency('$', 'jquery');
			registerGlobalDependency('_', 'underscore');
			registerGlobalDependency('Backbone', 'backbone');
			registerGlobalDependency('moment', 'moment');
			registerGlobalDependency('Mousetrap', 'mousetrap');
		}

		// Create a variable with pict in it within the module scope.
		_Scope.pict = oPict;

		return oPict;
	}

	// Pict requires that you initialize it so you can pass in a scope for node.
	// This allows us to not have global variables in nodejs.
	return {initialize: createNew};
};

module.exports = new Pict();