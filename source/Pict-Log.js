// ##### Part of the **[retold](https://stevenvelozo.github.io/retold/)** system
/**
* @license MIT
* @author <steven@velozo.com>
*/

/**
* Pict Logging
*
* @class PictLog
*/

var PictLog = function()
{
	function createNew(pPict)
	{
		var _Pict = pPict;

		// Write a log message to the console
		var writeConsole = function(pLevel, pMessage, pObject)
		{
			// Write the message
			console.log('['+pLevel+'] '+pMessage);

			// Write out the object if it is passed in
			if (typeof(pObject) !== 'undefined')
			{
				console.log(JSON.stringify(pObject, null, 4));
			}
		};

		var logTrace = function(pMessage, pObject)
		{
			writeConsole('TRACE', pMessage, pObject);
		};

		var logDebug = function(pMessage, pObject)
		{
			writeConsole('DEBUG', pMessage, pObject);
		};

		var logInfo = function(pMessage, pObject)
		{
			writeConsole('INFO', pMessage, pObject);
		};

		var logWarning = function(pMessage, pObject)
		{
			writeConsole('WARNING', pMessage, pObject);
		};

		var logError = function(pMessage, pObject)
		{
			writeConsole('ERROR', pMessage, pObject);
		};


		// Log the current date and time, well formatted (with Moment-Timezone)
		var logTime = function(pMessage)
		{
			var tmpMessage = (typeof(pMessage) !== 'undefined') ? pMessage : 'Time';
			logInfo(tmpMessage+': '+_Pict.libs.moment().format('MMMM Do YYYY, HH:mm:ss.SSS'))
		};

		// Get a timestamp 
		var getTimeStamp = function()
		{
			return +new Date();
		};

		// Log the delta between a timestamp, and now with a message
		var logTimeDelta = function(pTimeStamp, pMessage)
		{
			var tmpMessage = (typeof(pMessage) !== 'undefined') ? pMessage : 'Time Measurement';

			var tmpEndTime = +new Date();
			var tmpOperationTime = tmpEndTime-pTimeStamp;

			logInfo(tmpMessage +' ('+tmpOperationTime+'ms)');
		};

		// Our factory object
		var oPictLog = (
		{
			trace: logTrace,
			debug: logDebug,
			info: logInfo,
			warning: logWarning,
			error: logError,

			logTime: logTime,

			getTimeStamp: getTimeStamp,
			logTimeDelta: logTimeDelta
		});

		return oPictLog;
	}

	// Pict requires that you initialize it so you can pass in a scope for node.
	// This allows us to not have global variables in nodejs.
	return createNew;
};

module.exports = new PictLog();