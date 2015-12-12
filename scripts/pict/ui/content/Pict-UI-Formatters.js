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
* Content Formatting Functions
*/

define
(
	function()
	{
		/*
		 * Cleanse a string for use as a DOM Identifier
		 */
		function doCleanseDOMIdentifierString(pSourceIdentifier)
		{
			return pSourceIdentifier.replace(/^[^a-z]+|[^\w:.-]+/gi, "");
		}

		/*
		 * Ellipsify a string because tables suck and so do divs for data grids
		 */
		function doEllipses(pString, pMaxLength, pTrailingCharacterLength, pEllipses)
		{
			if ((typeof(pString) === 'undefined') || (pString === null))
				return '';
			var tmpMaxLength = (typeof(pMaxLength) === 'undefined') ? 40 : pMaxLength;
			var tmpTrailingCharacterLength = (typeof(pTrailingCharacterLength) === 'undefined') ? 0 : pTrailingCharacterLength;
			if (tmpTrailingCharacterLength > tmpMaxLength)
			{
				// Bad values!  Ignoring trailing character length.
				tmpTrailingCharacterLength = 0;
			}
			// HTML ellipses character code: &#8230;
			var tmpEllipses = (typeof(pEllipses) === 'undefined') ? '<span class="pictEllipses">&#8230</span>' : pEllipses;

			var tmpStringLength = pString.length;

			if (tmpStringLength < pMaxLength)
				return pString;

			if (tmpTrailingCharacterLength > 0)
			{
				return pString.substring(0, tmpMaxLength - tmpTrailingCharacterLength)+tmpEllipses+pString.substring(tmpStringLength - tmpTrailingCharacterLength, tmpStringLength);
			}
			else
			{
				return pString.substring(0, tmpMaxLength - tmpTrailingCharacterLength)+tmpEllipses;
			}
		}

		/*
		 * Make bytes show up as a human readable string
		 */
		function doGetHumanReadableByteCount(pFileSize)
		{
			var tmpOrderOfMagnitude = -1;
			var tmpByteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
			do
			{
				pFileSize = pFileSize / 1024;
				tmpOrderOfMagnitude++;
			} while (pFileSize > 1024);

			return Math.max(pFileSize, 0.1).toFixed(1) + tmpByteUnits[tmpOrderOfMagnitude];
		}

		/*
		 * Add commas to numbers, for readability and beauty.
		 */
		function doAddCommas(pNumber)
		{
			// If the regex doesn't match, `replace` returns the string unmodified
			return (pNumber.toString()).replace
			(
				// Note to self: each parentheses group (or 'capture') in the
				// js regex becomes an argument to the function; in this case,
				// every argument after 'match'
				/^([-+]?)(0?)(\d+)(.?)(\d+)$/g,
				function(pMatch, pSign, pZeros, pBefore, pDecimal, pAfter)
				{
					// If there was no decimal, the last capture grabs the final digit, so
					// we have to put it back together with the 'before' substring
					return pSign + (pDecimal ? doInsertCommas(pBefore) + pDecimal + pAfter : doInsertCommas(pBefore + pAfter));
				}
			);
		}

		// Simplify and reverse the number string
		var doReverseNumberString = function(pString)
		{
			return pString.split('').reverse().join('');
		};

		// Insert commas every three characters from the right
		var doInsertCommas  = function(pString)
		{
			// Reverse, because it's easier to do things from the left, given arbitrary digit counts
			var tmpReversed = doReverseNumberString(pString);
			// Add commas every three characters
			var tmpReversedWithCommas = tmpReversed.match(/.{1,3}/g).join(',');
			// Reverse again (back to normal direction)
			return doReverseNumberString(tmpReversedWithCommas);
		};

		// Format a dollars string (showing -- if it is not a valid dollar amount)
		var doFormatDollars = function(pValue)
		{
			var tmpDollarAmount = parseFloat(pValue).toFixed(2);

			if (tmpDollarAmount == 'NaN')
				return '--';

			return '$'+doAddCommas(tmpDollarAmount);
		};

		// Format a dollars string up to 5 digits of precision (showing -- if it is not a valid dollar amount)
		var doFormatDollarsFullPrecision = function(pValue)
		{
			var tmpDollarAmount = parseFloat(pValue).toFixed(5);

			if (tmpDollarAmount == 'NaN')
				return '--';

			return '$'+tmpDollarAmount;
		};

		// Format a dollars string without the dollar sign (showing 0.00 if it is not a valid dollar amount)
		var doFormatDollarsEntry = function(pValue)
		{
			var tmpDollarAmount = parseFloat(pValue).toFixed(2);

			if (tmpDollarAmount == 'NaN')
				return '0.00';

			return tmpDollarAmount;
		};

		// Turn a decimal day into a fractional day
		var doFormatFractionalDay = function(pValue)
		{
			//var tmpDisplayValue = pValue.toFixed(3);

			// Now gray out the right 0's
			//return tmpDisplayValue.replace(/(0+)$/, '<span class="pictDIM">$1</span>');
			return pValue;
		};

		oFormatters = (
		{
			AddCommas: doAddCommas,

			FormatDollars: doFormatDollars,
			FormatDollarsFullPrecision: doFormatDollarsFullPrecision,
			FormatDollarsEntry: doFormatDollarsEntry,

			FormatFractionalDay: doFormatFractionalDay,

			GetHumanReadableByteCount: doGetHumanReadableByteCount,

			Ellipses: doEllipses,

			CleanseDOMIdentifierString: doCleanseDOMIdentifierString
		});

		return oFormatters;
	}
);