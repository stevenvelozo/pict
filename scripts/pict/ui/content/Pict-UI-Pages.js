/**
* This file provides basic methods for some static site pages.
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*
* @description Static pages (e.g. permission denied, etc.)
*/
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define
(
	function()
	{
		function oNew(pPict)
		{
			_Pict = pPict;

			var showAccessDenied = function()
			{
				_Pict.staticcontent.WriteContentRaw('#StaticContentAccessDenied');
			};

			// Jump to an href anchor location in the document
			function doJumpToAnchor(pAnchorName)
			{
				$('[name='+pAnchorName+']').scrollView();
			}

			function doWireUpPictTab()
			{
				$('a[data-toggle="tab"]').on
				(
					'shown.bs.tab',
					function (pEvent)
					{
						//e.target // activated tab
						// Activate the route for e.target.href
						_Pict.router.navigate($(pEvent.target).attr('targetroute'), {trigger: true});
						//e.relatedTarget // previous tab
					}
				);
			}

			////////// RETURN OBJECT //////////
			var oPages = (
			{
				ShowAccessDenied: showAccessDenied,

				JumpToAnchor: doJumpToAnchor,
	
				WireUpPictTab: doWireUpPictTab,

				New: oNew
			});

			return oPages;
		}

		return oNew;
	}
);