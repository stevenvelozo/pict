// ##### Part of the **[retold](https://stevenvelozo.github.io/retold/)** system
/**
* @license MIT
* @author <steven@velozo.com>
*/
var libUnderscore = require('underscore');

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
						(typeof window !== 'undefined') ? window : // Check for a browser window object (in-browser mode)
						global;                                    // Use the es6 global scope, per Node

		// Setup the application settings object
		var _Settings = require('fable-settings').new(pSettings);

		var oPict = (
		{
			initialize: createNew
		});

		// Create a variable with pict in it within the module scope.
		_Scope.pict = oPict;

		/**
		 * Settings
		 *
		 * @property settings
		 * @type string
		 */
		Object.defineProperty(oPict, 'settings',
			{
				get: function() { return _Settings.settings; },
				enumerable: true
			});

		return oPict;
	}

	// In a browser, automatically intialize pict
	if (typeof window !== 'undefined')
	{
		return createNew();
	}
	else
	{
		// Pict requires that you initialize it so you can pass in a scope for node.
		// This allows us to not have global variables in nodejs.
		return {initialize: createNew};
	}
};

module.exports = new Pict();