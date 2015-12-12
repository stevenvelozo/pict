/**
* This file is the record keyboard event handlers
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*
* @description Record Keyboard Event Handler
*/
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define
(
	function()
	{
		var _Pict;
		var _Router;

		////////// Initialization //////////
		function oInitialize(pPict, pRouter)
		{
			_Pict = pPict;
			_Router = pRouter;
		}

		////////// Keyboard Trigger Handlers //////////
		// FROM List GO TO Read
		function doTriggerRead()
		{
			var tmpKeyboardLink = $('.pictRecordReadLink').first().attr("href");
			if (tmpKeyboardLink)
				_Router.navigate(tmpKeyboardLink, {trigger: true});
		}

		// FROM List GO TO First Record IN List
		function doTriggerFirstRecord()
		{
			var tmpKeyboardLink = $('.pictRecordRows .pictHoverRow .pictListViewLink').first().attr("href");
			if (tmpKeyboardLink)
				_Router.navigate(tmpKeyboardLink, {trigger: true});
		}

		// GO TO Create
		function doTriggerCreate()
		{
			var tmpKeyboardLink = $('.pictRecordCreateLink').first().attr("href");
			if (tmpKeyboardLink)
				_Router.navigate(tmpKeyboardLink, {trigger: true});
		}

		// GO TO Duplicagte
		function doTriggerDuplicate()
		{
			var tmpKeyboardLink = $('.pictRecordDuplicateLink').first().attr("href");
			if (tmpKeyboardLink)
				_Router.navigate(tmpKeyboardLink, {trigger: true});
		}

		// ON List Load Previous Page
		function doTriggerListPrevious()
		{
			var tmpKeyboardLink = $('.pictListPagingControls .pictListPreviousPage').first().attr("href");
			if (tmpKeyboardLink)
				_Router.navigate(tmpKeyboardLink, {trigger: true});
		}

		// ON List Load Next Page
		function doTriggerListNext()
		{
			var tmpKeyboardLink = $('.pictListPagingControls .pictListNextPage').first().attr("href");
			if (tmpKeyboardLink)
				_Router.navigate(tmpKeyboardLink, {trigger: true});
		}

		// FROM Read GO TO Edit
		function doTriggerEdit()
		{
			var tmpKeyboardLink = $('.pictRecordEditLink').first().attr("href");
			if (tmpKeyboardLink)
				_Router.navigate(tmpKeyboardLink, {trigger: true});
		}

		// FROM Read GO TO List
		function doTriggerList()
		{
			var tmpKeyboardLink = $('.pictRecordListLink').first().attr("href");
			if (tmpKeyboardLink)
				_Router.navigate(tmpKeyboardLink, {trigger: true});
		}

		// FROM Read GO TO Next Record OR List IF Last IN List
		function doTriggerNextRecord()
		{
			var tmpRecordElement = $('.pictRecordViewContainer').first();

			if (!tmpRecordElement) return false;

			var tmpRecordID = $(tmpRecordElement).attr("ID");
			var tmpNextRecordID = false;
			var tmpRecordDataSetHash = $(tmpRecordElement).attr("DataSetHash");

			var tmpCachedList = _Pict.GetCache('list'+tmpRecordDataSetHash);
			if (!tmpCachedList) return false;

			// See if the passed-in record is in the current list.
			for(var i = 0; i < tmpCachedList.length; i++)
				if (tmpCachedList[i]['ID'+tmpRecordDataSetHash] == tmpRecordID)
				{
					if (i < (tmpCachedList.length - 1))
					{
						// If there is a next record, return the guid.
						_Router.navigate('#'+tmpRecordDataSetHash+'read'+'/'+tmpCachedList[i+1]['ID'+tmpRecordDataSetHash], {trigger: true});
						return false;
					}
				}

			// If the record is the last in the list, go back to the list.
			if (tmpCachedList[tmpCachedList.length - 1]['ID'+tmpRecordDataSetHash] == tmpRecordID)
			{
				Mousetrap.reset();
				doTriggerList();
			}

			// Otherwise return 0
			return false;
		}

		// FROM Read GO TO Previous Record OR List IF First IN List
		function doTriggerPreviousRecord()
		{
			var tmpRecordElement = $('.pictRecordViewContainer').first();

			if (!tmpRecordElement) return false;

			var tmpRecordID = $(tmpRecordElement).attr("ID");
			var tmpNextRecordID = false;
			var tmpRecordDataSetHash = $(tmpRecordElement).attr("DataSetHash");

			var tmpCachedList = _Pict.GetCache('list'+tmpRecordDataSetHash);
			if (!tmpCachedList) return false;

			if (tmpCachedList[0]['ID'+tmpRecordDataSetHash] == tmpRecordID)
			{
				// If the record is the first in the list, go back to the list.
				Mousetrap.reset();
				doTriggerList();
				return false;
			}

			// See if the passed-in record is in the current list.
			for(var i = 0; i < tmpCachedList.length; i++)
				if (tmpCachedList[i]['ID'+tmpRecordDataSetHash] == tmpRecordID)
				{
					if (i < (tmpCachedList.length))
					{
						// Go to the previous record!
						_Router.navigate('#'+tmpRecordDataSetHash+'read'+'/'+tmpCachedList[i-1]['ID'+tmpRecordDataSetHash], {trigger: true});
						return false;
					}
				}

			// Otherwise return 0
			return false;
		}


		////////// Return Object //////////
		oKeyHandler = (
		{
			Initialize: oInitialize,

			TriggerRead: doTriggerRead,
			TriggerFirstRecord: doTriggerFirstRecord,
			TriggerListPrevious: doTriggerListPrevious,
			TriggerListNext: doTriggerListNext,

			TriggerCreate: doTriggerCreate,
			TriggerDuplicate: doTriggerDuplicate,

			TriggerEdit: doTriggerEdit,
			TriggerList: doTriggerList,
			TriggerNextRecord: doTriggerNextRecord,
			TriggerPreviousRecord: doTriggerPreviousRecord
		});

		return oKeyHandler;
	}
);