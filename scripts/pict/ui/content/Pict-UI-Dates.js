/**
* This file is display date functions
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*
* @description Display Date Functions
*/
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define
(
	function()
	{
		var _Pict;

		// TODO: Make these change based on config file.
		var _ServerTimeZone = 'Etc/UTC';
		var _OutputTimeZone = 'America/Los_Angeles';

		////////// Initialization //////////
		function oInitialize(pPict)
		{
			_Pict = pPict;
		}

		////////// Date Formatting for Template Processing //////////
		// Get a delta from now (e.g. 10 minutes ago, 3 months ago)
		function doFormatDateDelta(pDate)
		{
			// TODO: Try/catch and return pdate on problem parsing
			// This will assume the server is always utc.
			var tmpTime = moment.utc(pDate, 'YYYY-MM-DD H:mm:ss').toDate();
			return moment(tmpTime).fromNow(true);
		}

		// Get a short date (e.g. 10pm EST)
		function doFormatDateShort(pDate)
		{
			return doFormatDate(pDate, "ha z");
		}

		// Get a short date (e.g. Oct 6th 14)
		function doFormatDateReadableListDay(pDate)
		{
			return doFormatDateOnly(pDate, "MMM Do YYYY");
		}

		// Get a short date (e.g. October 6th 14)
		function doFormatDateReadableDay(pDate)
		{
			return doFormatDateOnly(pDate, "MMMM Do YYYY");
		}

		// Get a super long date (e.g. Thursday, July 18, 2013 12:54 PM)
		function doFormatDateLong(pDate)
		{
			return doFormatDate(pDate, 'LLLL');
		}

		// Get a super long date (e.g. Thursday, July 18, 2013 12:54 PM)
		function doFormatDateShortWithTime(pDate)
		{
			return doFormatDate(pDate, 'h:mmA MMMM Do');
		}

		// Get a super long date (e.g. Thursday, July 18, 2013)
		function doFormatDateOnlyLong(pDate)
		{
			return doFormatDateOnly(pDate, 'dddd, LL');
		}

		// Format a date with an arbitrary string, casting it from InputTimeZone to OutputTimeZone
		function doFormatDate(pDate, pFormat)
		{
			// TODO: Try/catch and return pdate on problem parsing
			// This will assume the server is always utc.
			var tmpTime = moment.utc(pDate, 'YYYY-MM-DD H:mm:ss');
			return tmpTime.tz(_OutputTimeZone).format(pFormat);
		}

		// Format the date with the simple international ISO format (e.g. 2014-01-25)
		function doFormatDateISO(pDate)
		{
			return doFormatDate(pDate, 'YYYY-MM-DD');
		}

		// Format the date with the simple international ISO format (e.g. 2014-01-25)
		function doFormatDateOnlyISO(pDate)
		{
			return doFormatDateOnly(pDate, 'YYYY-MM-DD');
		}

		// Format a date with an arbitrary string, casting it from InputTimeZone to OutputTimeZone
		function doFormatDateOnly(pDate, pFormat)
		{
			// TODO: Try/catch and return pdate on problem parsing
			// This will assume the server is always utc.
			if ((typeof(pDate) === 'undefined') || (pDate === null))
				return '';
			var tmpTime = moment.utc(pDate.substr(0, 10)+" 12:00:00", 'YYYY-MM-DD H:mm:ss');
			return tmpTime.tz(_OutputTimeZone).format(pFormat);
		}

		////////// Return Object //////////
		oDateFormatting = (
		{
			Initialize: oInitialize,

			FormatDateISO: doFormatDateISO,
			FormatDateOnlyISO: doFormatDateOnlyISO,
			FormatDateDelta: doFormatDateDelta,
			FormatDateLong: doFormatDateLong,
			FormatDateOnlyLong: doFormatDateOnlyLong,
			FormatDateShort: doFormatDateShort,
			FormatDateShortWithTime: doFormatDateShortWithTime,
			FormatDateReadableListDay: doFormatDateReadableListDay,
			FormatDateReadableDay: doFormatDateReadableDay,

			FormatDate: doFormatDate,
			FormatDateOnly: doFormatDateOnly
		});

		return oDateFormatting;
	}
);