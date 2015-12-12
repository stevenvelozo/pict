/**
* Boilerplate record count functions.
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*
* @description Boilerplate Javascript Record Access
*/
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define
(
	function()
	{
		function oNew(pDataOperations, pPict)
		{
			if ((typeof(pDataOperations) === 'undefined') || (typeof(pPict) === 'undefined'))
				return false;

			var _DataOperations = pDataOperations;
			var _Config = _DataOperations.Config;
			var _Pict = pPict;

			// Create the default request configuration object.
			var _Default_Options_Count = (
			{
				Filter: false,

				URIFilter: false,

				ProcessRecordFunction: function() {}
			});

			function ReadRecordCount(pOptions)
			{
				var tmpOptions = _.extend({}, _Default_Options_Count, pOptions);

				var tmpCountRoute = _Config.APIURIMap.Count;
				if ((tmpOptions.URIFilter !== '') && (tmpOptions.URIFilter !== null) && (typeof(tmpOptions.URIFilter) !== 'undefined'))
					tmpCountRoute = _Config.APIURIMap.CountFiltered +'/'+ tmpOptions.URIFilter;

				$.ajax
				(
					{
						type: 'GET',
						async: true,
						url: tmpCountRoute,
						datatype: 'json'
					}
				)
				.done
				(
					function (pData)
					{
						if (typeof(pData.Error) !== 'undefined' && pData.Error.indexOf('authentica') > -1)
						{
							console.log('There was a problem retreiving record count for ['+_Config.DataSetHash+']: '+pData.Error);
							return _Pict.session.ValidateSession();
						}
						var tmpCount = 0;
						if (typeof(pData) === 'object')
						{
							tmpCount = pData.Count;
						}
						if (tmpOptions.ProcessRecordFunction)
							tmpOptions.ProcessRecordFunction(tmpCount);
					}
				)
				.fail
				(
					function ()
					{
						console.log('There has been an error retreiving record count for ['+_Config.DataSetHash+']('+tmpOptions.URIFilter+').');
					}
				);

				return false;
			}

			////////// RETURN OBJECT //////////
			var oDataOperation = (
			{
				New: oNew,

				ReadRecordCount: ReadRecordCount
			});

			Object.defineProperty(oDataOperation, 'Options', {get: function() { return _Default_Options_Count; }});

			return oDataOperation;
		}

		return oNew;
	}
);