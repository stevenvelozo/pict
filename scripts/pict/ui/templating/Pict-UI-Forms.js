/**
* This file is the boiler plate record templates
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*
* @description Record Templates
*/
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define
(
	function()
	{
		var _Pict;

		// Template caches
		var _FormInputTemplates = { };
		var _MenuItemTemplates = { };

		////////// Initialization //////////
		function oInitialize(pPict)
		{
			_Pict = pPict;
		}


		////////// Menu Items for Recordsets //////////
		// Generate Filter MenuItem
		function doGetFilterMenuItem(pType, pDataSet, pFilterField, pFilterTitle, pFilterTarget)
		{
			var tmpFilter = {};

			tmpFilter.Type = pType;
			tmpFilter.DataSet = pDataSet;
			tmpFilter.Field = pFilterField;
			tmpFilter.Title = pFilterTitle;
			tmpFilter.Target = pFilterTarget;

			// This gets set if there is an extension, like a _List template
			var tmpFilterTemplate = false;
			var tmpFilterTemplateKey = 'Filter'+tmpFilter.Type;
			if (_MenuItemTemplates.hasOwnProperty(tmpFilterTemplateKey))
				tmpFilterTemplate = _MenuItemTemplates[tmpFilterTemplateKey];
			else
			{
				var tmpFilterTemplateString = $('#Template_Filter_MenuItem_'+tmpFilter.Type);
				if (tmpFilterTemplateString.size() === 0)
				{
					console.log('   Invalid filter type on Menu add... template not found: '+tmpFilter.Type);
					return true;
				}
				tmpFilterTemplate = _.template(tmpFilterTemplateString.text());
				_MenuItemTemplates[tmpFilterTemplateKey] = tmpFilterTemplate;
			}
			return tmpFilterTemplate({ Filter: tmpFilter, Pict: _Pict });
		}

		// Generate Sort MenuItem
		function doGetSortMenuItem(pDataSet, pFilterField, pFilterTitle, pFilterTarget)
		{
			var tmpFilter = {};

			tmpFilter.DataSet = pDataSet;
			tmpFilter.Field = pFilterField;
			tmpFilter.Title = pFilterTitle;
			tmpFilter.Target = pFilterTarget;

			// Get the filter menu item template (this should be cached eventually)
			var tmpFilterTemplate = false;
			var tmpFilterTemplateKey = 'FilterSort';
			if (_MenuItemTemplates.hasOwnProperty(tmpFilterTemplateKey))
				tmpFilterTemplate = _MenuItemTemplates[tmpFilterTemplateKey];
			else
			{
				var tmpFilterTemplateString = $('#Template_Filter_MenuItem_Sort');
				if (tmpFilterTemplateString.size() === 0)
				{
					console.log('   Invalid sort filter template!');
					return true;
				}
				tmpFilterTemplate = _.template(tmpFilterTemplateString.text());
				_MenuItemTemplates[tmpFilterTemplateKey] = tmpFilterTemplate;
			}
			if (tmpFilterTemplate)
				return tmpFilterTemplate({ Filter: tmpFilter, Pict: _Pict });

			return '';
		}

		////////// Forms and Record Display //////////
		// Form Fields
		function doGetFormField(pFieldTitle, pFieldName, pFieldValue, pFieldType, pFieldPlaceholder, pFieldRequired)
		{
			var tmpField = {};
			tmpField.Title = pFieldTitle;
			tmpField.FieldName = pFieldName;
			tmpField.Value = pFieldValue;

			tmpField.Type = (typeof(pFieldType) === 'undefined') ? 'text' : pFieldType;
			tmpField.PlaceHolder = (typeof(pFieldPlaceholder) === 'undefined') ? '' : pFieldPlaceholder;

			tmpField.Required = (typeof(pFieldRequired) === 'undefined') ? false : true;

			return doGetFieldTemplate(tmpField, 'Template_Field_Value_Input_');
		}

		function doGetReadOnlyFormField(pFieldTitle, pFieldName, pFieldValue, pFieldType, pFieldPlaceholder)
		{
			var tmpField = {};
			tmpField.Title = pFieldTitle;
			tmpField.FieldName = pFieldName;
			tmpField.Value = pFieldValue;

			tmpField.Type = (typeof(pFieldType) === 'undefined') ? 'text' : pFieldType;
			tmpField.PlaceHolder = (typeof(pFieldPlaceholder) === 'undefined') ? '' : pFieldPlaceholder;

			return doGetFieldTemplate(tmpField, 'Template_Field_Value_Input_Readonly_');
		}

		function doGetHiddenFormField(pFieldName, pFieldValue)
		{
			var tmpField = {};
			tmpField.FieldName = pFieldName;
			tmpField.Value = pFieldValue;

			return doGetFieldTemplate(tmpField, 'Template_Field_Value_Input_hidden');
		}


		// Record view Fields
		function doGetFieldDisplay(pFieldTitle, pFieldValue, pFieldType, pAutoFillRecordType, pAutoFillRecordIDColumn, pAutoFillRecordID, pAutoFillDisplayField, pAutoFillDisplayFieldExtra)
		{
			var tmpField = {};
			tmpField.Title = pFieldTitle;
			tmpField.Value = pFieldValue;

			tmpField.Type = (typeof(pFieldType) === 'undefined') ? 'text' : pFieldType;

			tmpField.AutoFillRecordType = (typeof(pAutoFillRecordType) === 'undefined') ? false : pAutoFillRecordType;
			tmpField.AutoFillRecordIDColumn = (typeof(pAutoFillRecordIDColumn) === 'undefined') ? false : pAutoFillRecordIDColumn;
			tmpField.AutoFillRecordID = (typeof(pAutoFillRecordID) === 'undefined') ? false : pAutoFillRecordID;
			tmpField.AutoFillDisplayField = (typeof(pAutoFillDisplayField) === 'undefined') ? false : pAutoFillDisplayField;
			tmpField.AutoFillDisplayFieldExtra = (typeof(pAutoFillDisplayFieldExtra) === 'undefined') ? false : pAutoFillDisplayFieldExtra;

			return doGetFieldTemplate(tmpField, 'Template_Field_Value_Display_');
		}

		// Check for cached field template processor
		function doGetFieldTemplate(pField, pTemplatePrefix)
		{
			var tmpFieldTemplate = false;
			var tmpFieldTemplateKey = pTemplatePrefix+pField.Type;
			if (_FormInputTemplates.hasOwnProperty(tmpFieldTemplateKey))
				tmpFieldTemplate = _MenuItemTemplates[tmpFieldTemplateKey];
			else
			{
				var tmpFieldTemplateString = $('#'+pTemplatePrefix+pField.Type);
				if (tmpFieldTemplateString.size() === 0)
					return true;
				tmpFieldTemplate = _.template(tmpFieldTemplateString.text());
				_MenuItemTemplates[tmpFieldTemplateKey] = tmpFieldTemplate;
			}

			if (tmpFieldTemplate)
				return tmpFieldTemplate({ Field: pField, Pict: _Pict });

			return '';
		}

		////////// Return Object //////////
		oApplicationTemplates = (
		{
			Initialize: oInitialize,

			GetSortMenuItem: doGetSortMenuItem,
			GetFilterMenuItem: doGetFilterMenuItem,

			GetFormField: doGetFormField,
			GetReadOnlyFormField: doGetReadOnlyFormField,
			GetHiddenFormField: doGetHiddenFormField,

			GetFieldDisplay: doGetFieldDisplay,
			GetFieldTemplate: doGetFieldTemplate
		});

		return oApplicationTemplates;
	}
);