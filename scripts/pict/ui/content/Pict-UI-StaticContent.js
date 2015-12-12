/**
* This file provides basic routing for page content.
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*
* @description Page content setting functions
*/
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define
(
	function()
	{
		var oStaticContent;
		if (typeof(oStaticContent) !== 'undefined') return oStaticContent;

		// The template to use if there isn't a template in the system aligned with the requested hash
		var _DefaultContentHash = 'ContentNotFound';

		// The prefix applied to each template container identifier
		var _PagePrefix = '#Page';

		var _WriteContentDelegate;

		function oInitialize(fWriteContentDelegate)
		{
			_WriteContentDelegate = (typeof(fWriteContentDelegate) === 'undefined') ? doDefaultWriteContentDelegate : fWriteContentDelegate;

			return true;
		}

		function doDefaultWriteContentDelegate(pTemplate)
		{
			return false;
		}

		function doGetTemplateFunction (pTemplateIdentfier)
		{
			return _.template($(pTemplateIdentfier).text());
		}

		function doWriteContentRaw(pTemplateIdentfier, pTemplateValues)
		{
			var tmpTemplateValues = (typeof(pTemplateValues) === 'undefined') ? {} : pTemplateValues;

			var tmpTemplateIdentifier = pTemplateIdentfier;

			var tmpTemplateFunction = doGetTemplateFunction(tmpTemplateIdentifier);

			return _WriteContentDelegate(tmpTemplateFunction(tmpTemplateValues));
		}

		function doWriteContent(pTemplateIdentfier, pTemplateValues)
		{
			var tmpTemplateIdentifier = _PagePrefix+pTemplateIdentfier;
			return doWriteContentRaw(tmpTemplateIdentifier, pTemplateValues);
		}

		////////// Return Object //////////
		oStaticContent = (
		{
			Initialize: oInitialize,
			WriteContentRaw: doWriteContentRaw,
			WriteContent: doWriteContent
		});

		return oStaticContent;
	}
);