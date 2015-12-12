// ##### Part of the **[retold](https://stevenvelozo.github.io/retold/)** system
/**
* @license MIT
* @author <steven@velozo.com>
*/

// RequireJS Initialization
if (typeof define !== 'function') { var define = require('amdefine')(module); }

/**
* Pict UI
*
* Application Content Functions
*/

define
(
	function()
	{
		var _Pict;

		////////// Initialization //////////
		function oInitialize(pPict)
		{
			_Pict = pPict;
		}
		////////// Return Object //////////
		oApplicationContent = (
		{
			Initialize: oInitialize
		});

		return oApplicationContent;
	}
);