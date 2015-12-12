/**
* This file is the list population functions from RPC calls
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*
* @description Data dropdown population
*/
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define
(
	function()
	{
		var oApplicationDataLists;
		if (typeof(oApplicationDataLists) !== 'undefined') return oApplicationDataLists;

		var _Pict;

		var _DataLookupCache;

		function oInitialize(pPict)
		{
			_Pict = pPict;
			_DataLookupCache = {};
		}

		function doCheckValueFromAttribute(pDestinationList)
		{
			var tmpValue = $(pDestinationList).attr('currentvalue');

			if (!tmpValue || (tmpValue === ''))
				return false;

			$(pDestinationList).val(tmpValue);
		}

		function doCheckAllValuesFromAttribute()
		{
			$('select[currentvalue]').each(
				function(pElement)
				{
					doCheckValueFromAttribute(this);
				}
			);
		}

		function doAutoFillValuesByID(fAdjustContent)
		{
			var tmpAdjustContent = (typeof(fAdjustContent) === 'function') ? fAdjustContent : function() { };
			var tmpDataToCollect = {};
			var tmpCompleted = {};

			$('.AutoFillByID').each(
				function(pIndex)
				{
					var tmpRecordType = $(this).attr('RecordType');
					var tmpRecordID = $(this).attr('ID');
					var tmpRecordDisplayField = $(this).attr('DisplayField');
					var tmpRecordDisplayFieldExtra = $(this).attr('DisplayFieldExtra');

					var tmpCacheAddress = tmpRecordType+':'+tmpRecordDisplayField+'.'+tmpRecordDisplayFieldExtra+':'+tmpRecordID;

					//console.log('Looking for '+tmpRecordType+' '+tmpRecordID);

					if (!tmpCompleted.hasOwnProperty(tmpCacheAddress))
					{
						doAssignValuesByID(tmpRecordType, tmpRecordID, tmpRecordDisplayField, tmpRecordDisplayFieldExtra, tmpAdjustContent);
						tmpCompleted[tmpCacheAddress] = true;
					}
				}
			);
		}
		function doAssignValuesByID(pRecordType, pIDRecord, pDisplayField, pDisplayAdditionalField, fAdjustContent)
		{
			var tmpAdjustContent = (typeof(fAdjustContent) === 'function') ? fAdjustContent : function() { };
			var tmpDisplayField = pDisplayField;
			var tmpDisplayAdditionalField = (typeof(pDisplayAdditionalField) === 'undefined') ? '' : pDisplayAdditionalField;
			var tmpCacheAddress = pRecordType+':'+tmpDisplayField+'.'+tmpDisplayAdditionalField+':'+pIDRecord;

			var tmpTargetElements = '.AutoFillByID[RecordType='+pRecordType+'][ID='+pIDRecord+'][DisplayField='+pDisplayField+']';
			if (tmpDisplayAdditionalField.length > 0)
				tmpTargetElements += '[DisplayFieldExtra='+pDisplayAdditionalField+']';

			if (_DataLookupCache.hasOwnProperty(tmpCacheAddress))
			{
				$(tmpTargetElements).html(_DataLookupCache[tmpCacheAddress]);
				$(tmpTargetElements).removeClass('AutoFillByID');
				tmpAdjustContent();
				return true;
			}
			$.ajax
			(
				{
					type: 'GET',
					url: _Pict.apiServer+pRecordType+'/'+pIDRecord,
					datatype: 'json'
				}
			)
			.done
			(
				function (pData)
				{
					if (!pData)
						return false;

					var tmpValue = '';
					if (pData.hasOwnProperty(pDisplayField) && pData.hasOwnProperty(pDisplayAdditionalField))
						tmpValue = pData[pDisplayField]+' '+pData[pDisplayAdditionalField];
					else if (tmpDisplayAdditionalField == 'LongDateFormat')
						tmpValue = _Pict.dates.FormatDateOnlyLong(pData[pDisplayField]);
					else if (pData.hasOwnProperty(pDisplayField))
						tmpValue = pData[pDisplayField];

					$(tmpTargetElements).html(tmpValue);
					$(tmpTargetElements).removeClass('AutoFillByID');
					_DataLookupCache[tmpCacheAddress] = tmpValue;
					tmpAdjustContent();
					return true;
				}
			);
			return true;
		}

		function doSetFilterScreenTagList(pCategory, pType, pField, pDestinationList, fListTemplate)
		{
			// Validate that there is somewhere in the DOM to put the values
			if (typeof(pDestinationList) === 'undefined') return false;

			var tmpListTemplateFunction = (typeof(fListTemplate) === 'undefined') ? doRenderFilterOptionTagList : fListTemplate;

			// Load the Data Sources for the specific user
			$.ajax
			(
				{
					type: 'GET',
					url: _Pict.apiServer+'DataListLookup/GetValues/'+pCategory+'/'+pType+'/'+pField,
					datatype: 'json'
				}
			)
			.done
			(
				function (pData)
				{
					// Expected in the MN format with "Success = 1" and "Record = []" of Records with Hash, Name and optional Count values in each record
					var tmpData = JSON.parse(pData);
					if ((tmpData.Success) && (tmpData.Record.length > 0))
					{
						var tmpTags = tmpListTemplateFunction(tmpData);
						$('#'+pDestinationList).select2({tags: tmpTags, maximumSelectionSize: 1, separator: '|'});
					}
				}
			);
		}
		function doRenderFilterOptionTagList(pListData)
		{
			// This expects data with "Value" and "Hash"
			var tmpListOptions = Array();
			for (var i = 0; i < pListData.Record.length; i++)
				tmpListOptions [tmpListOptions.length] = pListData.Record[i].Value;
			tmpListOptions.sort();
			return tmpListOptions;
		}

		function doSetFilterScreenSelectList(pCategory, pType, pField, pDestinationList, pDefaultValue)
		{
			// Validate that there is somewhere in the DOM to put the values
			if (typeof(pDestinationList) === 'undefined') return false;
			var tmpDefaultValue = (typeof(pDefaultValue) !== 'undefined') ? pDefaultValue : (typeof(pField) === 'undefined') ? false : pField;

//			var tmpListTemplateFunction = (typeof(fListTemplate) === 'undefined') ? doRenderFilterOptionList : fListTemplate;
			var tmpListTemplateFunction = doRenderFilterOptionList;

			// Load the Data Sources for the specific user
			$.ajax
			(
				{
					type: 'GET',
					url: _Pict.apiServer+'DataListLookup/GetValues/'+pCategory+'/'+pType+'/'+pField,
					datatype: 'json'
				}
			)
			.done
			(
				function (pData)
				{
					// Expected in the MN format with "Success = 1" and "Record = []" of Records with Hash, Name and optional Count values in each record
					var tmpData = JSON.parse(pData);
					if ((tmpData.Success == 1) && (tmpData.Record.length > 0))
					{
						var tmpOptions = tmpListTemplateFunction(tmpData);
						$(pDestinationList).html(tmpOptions);
						doCheckValueFromAttribute(pDestinationList);
					}
				}
			);
		}
		function doRenderFilterOptionList(pListData)
		{
			// This expects data with "Value" and "ValueCount"
			var tmpListOptions = '<option value="0">None</option>';
			for (var i = 0; i < pListData.Record.length; i++)
				tmpListOptions += '<option value="' + pListData.Record[i].Hash + '">' + pListData.Record[i].Value + "</option>\n";
			return tmpListOptions;
		}

		function doLoadFilterCustomSelect(pElement)
		{
			doLoadCustomSelect('HashList', 'Filled_'+$(pElement).attr('data-pict-listof'), '', '#'+$(pElement).attr('id'));
		}

		// TODO: Move everything to options
		function doLoadCustomSelect(pCategory, pDestinationList, pOptions)
		{
			// Validate that there is somewhere in the DOM to put the values
			if (typeof(pDestinationList) === 'undefined') return false;

			var tmpDefaultOptions = { TemplateFunction: doRenderFilterOptionList, AutoFocus: false, NoneOption: false, DefaultValue: false, CallBack: false, Placeholder: 'Select a value from the list...'};
			var tmpOptions = tmpDefaultOptions;
			if (typeof(pOptions) !== 'undefined') tmpOptions = $.extend(tmpDefaultOptions, pOptions);

			var tmpQueryString = '';

			if (tmpOptions.hasOwnProperty('FilterValue'))
				tmpQueryString = pCategory+'Select'+'/In/'+tmpOptions.FilterValue;
			else
				tmpQueryString = pCategory+'Select';

			// Load the Data Sources for the specific user
			$.ajax
			(
				{
					type: 'GET',
					url: _Pict.apiServer+tmpQueryString,
					datatype: 'json'
				}
			)
			.done
			(
				function (pData)
				{
					var tmpSelectOptions = {width: 'resolve'};

					if (tmpOptions.Placeholder)
						tmpSelectOptions.placeholder = tmpOptions.Placeholder;

					var tmpListData = [];
					// Add the none option to the list
					if (tmpOptions.NoneOption)
						tmpListData.push(tmpOptions.NoneOption);

					var tmpDefaultListEntry = false;
					for (var i = 0; i < pData.length; i++)
					{
						// Add the item to the list
						tmpListData.push({id: pData[i].Hash, text: pData[i].Value});
						// Check if the default matches the hash
						if (tmpOptions.DefaultValue && (pData[i].Hash == tmpOptions.DefaultValue))
						{
							var tmpValue = pData[i].Value;
							tmpDefaultListEntry = {id: tmpOptions.DefaultValue, text: tmpValue};
							console.log('Processing '+tmpData.Record[i].Hash);
						}
					}
					if (tmpDefaultListEntry)
						tmpSelectOptions.initSelection = function(pElement, pCallBack){ pCallBack(tmpDefaultListEntry); };

					tmpSelectOptions.data = tmpListData;

					$(pDestinationList).select2(tmpSelectOptions);

					if (tmpOptions.AutoFocus)
						$(pDestinationList).select2('focus');

					$("SELECT.select2-offscreen").select2();

					if (tmpOptions.CallBack)
						tmpOptions.CallBack();
				}
			);
		}

		function doLoadCustomMultiSelect(pCategory, pDestinationList, pOptions)
		{
			// Validate that there is somewhere in the DOM to put the values
			if (typeof(pDestinationList) === 'undefined') return false;

			var tmpDefaultOptions = { TemplateFunction: doRenderFilterOptionList, AutoFocus: false, NoneOption: false, DefaultValue: false, CallBack: false, Placeholder: 'Select a value from the list...'};
			var tmpOptions = tmpDefaultOptions;
			if (typeof(pOptions) !== 'undefined') tmpOptions = $.extend(tmpDefaultOptions, pOptions);

			var tmpQueryString = '';

			if (tmpOptions.hasOwnProperty('FilterValue'))
				tmpQueryString = pCategory+'Select'+'/In/'+tmpOptions.FilterValue;
			else
				tmpQueryString = pCategory+'Select';

			// Load the Data Sources for the specific user
			$.ajax
			(
				{
					type: 'GET',
					url: _Pict.apiServer+tmpQueryString,
					datatype: 'json'
				}
			)
			.done
			(
				function (pData)
				{
					// Expected in the MN format with "Success = 1" and "Record = []" of Records with Hash, Name and optional Count values in each record
					var tmpData = pData;
//					if ((tmpData.Success != 1))
//						return false;

					var tmpSelectOptions = {width: 'resolve', multiple: true, maximumSelectionSize: 20, separator: '|'};

					if (tmpOptions.Placeholder)
						tmpSelectOptions.placeholder = tmpOptions.Placeholder;

					var tmpExclusionList = [];
					if (tmpOptions.ExclusionList)
						tmpExclusionList = tmpOptions.ExclusionList;

					var tmpListData = [];
					// Add the none option to the list
					if (tmpOptions.NoneOption)
						tmpListData.push(tmpOptions.NoneOption);

					var tmpDefaultListEntry = false;
					for (var i = 0; i < tmpData.length; i++)
					{
						if ($.inArray(tmpData[i].Hash, tmpExclusionList) === -1)
						{
							// Add the item to the list
							tmpListData.push({id: tmpData[i].Hash, text: tmpData[i].Value});
							// Check if the default matches the hash
							if (tmpOptions.DefaultValue && (tmpData[i].Hash == tmpOptions.DefaultValue))
							{
								var tmpValue = tmpData[i].Value;
								tmpDefaultListEntry = {id: tmpOptions.DefaultValue, text: tmpValue};
							}
							//console.log('Processing '+tmpData[i].Hash);
						}
					}
					if (tmpDefaultListEntry)
						tmpSelectOptions.initSelection = function(pElement, pCallBack){ pCallBack(tmpDefaultListEntry); };

					tmpSelectOptions.data = tmpListData;

					$(pDestinationList).select2(tmpSelectOptions);

					if (tmpOptions.AutoFocus)
						$(pDestinationList).select2('focus');

					if (tmpOptions.CallBack)
						tmpOptions.CallBack(tmpListData.length);
				}
			);
		}

		function doLoadCustomSelectTags(pCategory, pType, pField, pDestinationList, pOptions)
		{
			// Validate that there is somewhere in the DOM to put the values
			if (typeof(pDestinationList) === 'undefined') return false;

			var tmpDefaultOptions = { TemplateFunction: doRenderFilterOptionList, AutoFocus: false, NoneOption: false, DefaultValue: false, CallBack: false, Placeholder: 'Select a value from the list...'};
			var tmpOptions = tmpDefaultOptions;
			if (typeof(pOptions) !== 'undefined') tmpOptions = $.extend(tmpDefaultOptions, pOptions);

			var tmpQueryString = '';

			if (tmpOptions.hasOwnProperty('SecondFilterValue'))
				tmpQueryString = 'DataListLookup/GetValuesDouble/'+pCategory+'/'+pType+'/'+pField+'/'+tmpOptions.SecondFilterValue;
			else
				tmpQueryString = 'DataListLookup/GetValues/'+pCategory+'/'+pType+'/'+pField;

			// Load the Data Sources for the specific user
			$.ajax
			(
				{
					type: 'GET',
					url: _Pict.apiServer+tmpQueryString,
					datatype: 'json'
				}
			)
			.done
			(
				function (pData)
				{
					// Expected in the MN format with "Success = 1" and "Record = []" of Records with Hash, Name and optional Count values in each record
					var tmpData = JSON.parse(pData);
//					if ((tmpData.Success != 1))
//						return false;

					var tmpSelectOptions = {width: 'resolve', maximumSelectionSize: 20, separator: '|'};

					if (tmpOptions.Placeholder)
						tmpSelectOptions.placeholder = tmpOptions.Placeholder;

					var tmpListData = [];
					// Add the none option to the list
					if (tmpOptions.NoneOption)
						tmpListData.push(tmpOptions.NoneOption);

					var tmpDefaultListEntry = false;
					if (tmpData.Success == 1)
						for (var i = 0; i < tmpData.Record.length; i++)
						{
							// Add the item to the list
							tmpListData.push(tmpData.Record[i].Hash);
							//console.log('Processing '+tmpData.Record[i].Hash);
						}
					if (tmpDefaultListEntry)
						tmpSelectOptions.initSelection = function(pElement, pCallBack){ pCallBack(tmpDefaultListEntry); };

					tmpSelectOptions.tags = tmpListData;

					$(pDestinationList).select2(tmpSelectOptions);

					if (tmpOptions.AutoFocus)
						$(pDestinationList).select2('focus');

					if (tmpOptions.CallBack)
						tmpOptions.CallBack();
				}
			);
		}

		function doLoadEmptyCustomSelect(pDestinationList, pOptions)
		{
			// Validate that there is somewhere in the DOM to put the values
			if (typeof(pDestinationList) === 'undefined') return false;

			var tmpDefaultOptions = { TemplateFunction: doRenderFilterOptionList, AutoFocus: false, NoneOption: false, DefaultValue: false, CallBack: false, Placeholder: 'Select a value from the list...'};
			var tmpOptions = tmpDefaultOptions;
			if (typeof(pOptions) !== 'undefined') tmpOptions = $.extend(tmpDefaultOptions, pOptions);

			var tmpSelectOptions = {width: 'resolve'};

			if (tmpOptions.Placeholder)
				tmpSelectOptions.placeholder = tmpOptions.Placeholder;

			var tmpListData = [];
			// Add the none option to the list
			if (tmpOptions.NoneOption)
				tmpListData.push(tmpOptions.NoneOption);

			tmpSelectOptions.data = tmpListData;

			$(pDestinationList).select2(tmpSelectOptions);

			if (tmpOptions.AutoFocus)
				$(pDestinationList).select2('focus');

			if (tmpOptions.CallBack)
				tmpOptions.CallBack();
		}

		oApplicationDataLists = (
		{
			CheckValueFromAttribute: doCheckValueFromAttribute,
			CheckAllValuesFromAttribute: doCheckAllValuesFromAttribute,

			AutoFillValuesByID: doAutoFillValuesByID,

			SetFilterScreenTagList: doSetFilterScreenTagList,
			SetFilterScreenSelectList: doSetFilterScreenSelectList,

			LoadFilterCustomSelect: doLoadFilterCustomSelect,

			LoadCustomSelect: doLoadCustomSelect,
			LoadCustomMultiSelect: doLoadCustomMultiSelect,
			LoadCustomSelectTags: doLoadCustomSelectTags,
			LoadEmptyCustomSelect: doLoadEmptyCustomSelect,

			Initialize: oInitialize
		});

		return oApplicationDataLists;
	}
);