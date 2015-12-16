/**
* Pict - Generate templates for Entities if they don't exist in the root of the DOM
*
* @license MIT
*
* @author Steven Velozo <steven@velozo.com>
*
* @description Dynamic Template Generation for Meadow Entities
*/
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define
(
	function()
	{
		// These are the meta template scripts, used as the patterns for generating the templates for the entities
		var _MetaTemplates = {};

		// Load the default meta scripts
		var loadMetaScript = function(pMetaTemplateHash)
		{
			var tmpTemplateHash = '#Pict_Meta_'+pMetaTemplateHash;
			var tmpTemplateExists = ($(tmpTemplateHash).length > 0);

			if (tmpTemplateExists)
			{
				return $(tmpTemplateHash).text();
			}

			return '';
		};
		var loadMetaScripts = function(pTemplateHash, pTemplateScript)
		{
//		 *	CONTAINER Templates
			_MetaTemplates.Container_ReadList = loadMetaScript('Container_ReadList');
			_MetaTemplates.Container_Read = loadMetaScript('Container_Read');
			_MetaTemplates.Container_Update = loadMetaScript('Container_Update');
			_MetaTemplates.Container_Delete = loadMetaScript('Container_Delete');
//		 * 	OPERATION Templates
			_MetaTemplates.Create = loadMetaScript('Create');
			_MetaTemplates.Table = loadMetaScript('Table');
			_MetaTemplates.Rows = loadMetaScript('Rows');
			_MetaTemplates.Read = loadMetaScript('Read');
			_MetaTemplates.RecordRender = loadMetaScript('RecordRender');
			_MetaTemplates.Update = loadMetaScript('Update');
			_MetaTemplates.Delete = loadMetaScript('Delete');
			_MetaTemplates.DeleteCompleted = loadMetaScript('DeleteCompleted');
		};
		loadMetaScripts();

		var _Replace_HASH = /MTS_HASH_MTE/g;
		var _Replace_GUID = /MTS_GUID_MTE/g;

		var _Replace_ReadList_Title_Pre = /MTS_ReadList_Title_Pre_MTE/g;
		var _Replace_ReadList_Title = /MTS_ReadList_Title_MTE/g;
		var processMetaScript = function(pMetaTemplateParameters)
		{
			// Perform each regex on the meta template script.
			var tmpResult = _MetaTemplates[pMetaTemplateParameters.TemplateMetaHash];

			tmpResult = tmpResult.replace(_Replace_HASH, pMetaTemplateParameters.DataOperations.Config.DataSetHash);
			tmpResult = tmpResult.replace(_Replace_GUID, pMetaTemplateParameters.DataOperations.Config.DataSetGUID);

			// For the moment, do not try to parse these.  Just replace.
			// These run once on page load, and a better first optimization would make them lazily loading.
			tmpResult = tmpResult.replace(_Replace_ReadList_Title, pMetaTemplateParameters.DataOperations.Config.EntityTemplateContent.ReadList_Title);
			tmpResult = tmpResult.replace(_Replace_ReadList_Title_Pre, pMetaTemplateParameters.DataOperations.Config.EntityTemplateContent.ReadList_Title_Pre);

			return tmpResult;
		};

		/**
		 * Append a template script to the DOM
		 */
		var generateTemplateScript = function(pMetaTemplateParameters)
		{
			var tmpTemplateExists = ($('#'+pMetaTemplateParameters.TemplateTargetAddress).length > 0);
			
			if (!tmpTemplateExists)
			{
				// We are using native javascript here to create DOM elements because uding jquery prevents us from being able to debug live
				// (per discussions in http://stackoverflow.com/questions/610995/cant-append-script-element)
				var tmpTemplate   = document.createElement("script");
				tmpTemplate.id = pMetaTemplateParameters.TemplateTargetAddress;
				console.log('+ Automagically creating template: '+pMetaTemplateParameters.TemplateTargetAddress);
				tmpTemplate.type  = "text/html";
				tmpTemplate.text  = processMetaScript(pMetaTemplateParameters);
				document.body.appendChild(tmpTemplate);
			}

			return;
		};

		/**
		 * Generate a script ID (the actual DOM identifier used in the generated script tag)
		 */
		var getScriptAddress = function(pMetaTemplateParameters)
		{
			// TODO: This is where we can change around the view controller guids.
			if (pMetaTemplateParameters.TemplateMetaHash.substring(0, 10) == 'Container_')
			{
				pMetaTemplateParameters.TemplateTargetAddress = 'Page'+pMetaTemplateParameters.DataOperations.Config.DataSetHash+'_'+pMetaTemplateParameters.TemplateMetaHash.substring(10);
			}
			else
			{
				pMetaTemplateParameters.TemplateTargetAddress = pMetaTemplateParameters.TemplateMetaHash+'_'+pMetaTemplateParameters.DataOperations.Config.DataSetHash;
			}

			return;
		};

		var getMetaTemplate = function(pMetaTemplateParameters)
		{
			if(typeof(_MetaTemplates[pMetaTemplateParameters.TemplateMetaHash]) !== 'undefined')
			{
				pMetaTemplateParameters.MetaTemplate = _MetaTemplates[pMetaTemplateParameters.TemplateMetaHash];
			}

			return;
		};

		var generateTemplate = function(pTemplateMetaHash, pDataOperations)
		{
			var tmpMetaTemplateParameters = (
			{
				MetaTemplate: false,

				TemplateMetaHash: pTemplateMetaHash,
				TemplateTargetAddress: false,

				DataOperations: pDataOperations
			});

			getScriptAddress(tmpMetaTemplateParameters);

			generateTemplateScript(tmpMetaTemplateParameters);
		};

		/**
		 * Dynamically generate templates where appropriate, use the customized ones if they are already there.
		 *
		 * The DataOperations class uses the following templates:
		 * 	OPERATION Templates --> setDOMTemplateMapEntry(pDOMTemplateMapHash, pDOMTemplateMapValue)
		 *		Create: '#Create_'+tmpDOMTemplateMapHash,
		 *		Read: '#Read_'+tmpDOMTemplateMapHash,
		 *		Update: '#Update_'+tmpDOMTemplateMapHash,
		 *		Delete: '#Delete_'+tmpDOMTemplateMapHash,
		 *		DeleteCompleted: '#DeleteCompleted_'+tmpDOMTemplateMapHash,
		 *		Table: '#Table_'+tmpDOMTemplateMapHash,
		 *		Rows: '#Rows_'+tmpDOMTemplateMapHash,
		 *		Hover: '#Hover_'+tmpDOMTemplateMapHash
		 *
		 *	CONTAINER Templates --> setDOMContainerMapEntry(pDOMContainerMapHash, pDOMContainerMapValue)
		 *		Read: '#Container_'+tmpDOMContainerMapHash,
		 *		Update: '#Container_'+tmpDOMContainerMapHash,
		 *		Delete: '#Container_'+tmpDOMContainerMapHash,
		 *
		 */
		var generateTemplates = function(pDataOperations)
		{
			// TODO: Validate EntityName, View Controller, Schema and Data Operations
			// TODO: Only generate scripts for the necessary templates...  Right now this generates every script even if they are not used.
			generateTemplate('Container_ReadList', pDataOperations);
			generateTemplate('Container_Read', pDataOperations);
			generateTemplate('Container_Update', pDataOperations);
			generateTemplate('Container_Delete', pDataOperations);

			generateTemplate('Table', pDataOperations);
			generateTemplate('Rows', pDataOperations);

			generateTemplate('Read', pDataOperations);
			generateTemplate('RecordRender', pDataOperations);

			generateTemplate('Update', pDataOperations);

			generateTemplate('Delete', pDataOperations);
			generateTemplate('DeleteCompleted', pDataOperations);
		};

		return generateTemplates;
	}
);