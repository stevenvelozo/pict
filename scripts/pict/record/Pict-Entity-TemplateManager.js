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
	["pict/ui/templating/Pict-MetaTemplates"],
	function(PictMetaTemplates)
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

		/**
		 * Append a template script to the DOM
		 */
		var generateTemplateScript = function(pMetaTemplateParameters)
		{
			// TODO: This === might need to be == ... unit test it.
			var tmpTemplateExists = ($('#'+pMetaTemplateParameters.TemplateTargetAddress).length > 0);
			//console.log('- Automagically checking template: '+pMetaTemplateParameters.TemplateTargetAddress);

			if (tmpTemplateExists && pMetaTemplateParameters.Overwrite)
			{
				// TODO: Research if we can debug templates that are modififed with jquery
				$('#'+pMetaTemplateParameters.TemplateTargetAddress).html(pMetaTemplateParameters.MetaTemplate({Meta: pMetaTemplateParameters}));
			}
			else if (!tmpTemplateExists)
			{
				// We are using native javascript here to create DOM elements because uding jquery prevents us from being able to debug live
				// (per discussions in http://stackoverflow.com/questions/610995/cant-append-script-element)
				var tmpTemplate   = document.createElement("script");
				tmpTemplate.id = pMetaTemplateParameters.TemplateTargetAddress;
				console.log('+ Automagically creating template: '+pMetaTemplateParameters.TemplateTargetAddress);
				tmpTemplate.type  = "text/html";
				tmpTemplate.text  = pMetaTemplateParameters.MetaTemplate({Meta: pMetaTemplateParameters});
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
				pMetaTemplateParameters.MetaTemplate = _.template(_MetaTemplates[pMetaTemplateParameters.TemplateMetaHash]);
			}

			return;
		};

		var generateTemplate = function(pTemplateMetaHash, pDataOperations, pPict)
		{
			var tmpMetaTemplateParameters = (
			{
				Pict: pPict,

				TemplateFunctions: PictMetaTemplates(pDataOperations),



				MetaTemplate: false,

				TemplateMetaHash: pTemplateMetaHash,
				TemplateTargetAddress: false,

				DataOperations: pDataOperations,

				Overwrite: false
			});

			getMetaTemplate(tmpMetaTemplateParameters);

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
		var generateTemplates = function(pDataOperations, pPict)
		{
			// TODO: Validate EntityName, View Controller, Schema and Data Operations
			// TODO: Only generate scripts for the necessary templates...  Right now this generates every script even if they are not used.
			generateTemplate('Container_ReadList', pDataOperations, pPict);
			generateTemplate('Container_Read', pDataOperations, pPict);
			generateTemplate('Container_Update', pDataOperations, pPict);
			generateTemplate('Container_Delete', pDataOperations, pPict);

			generateTemplate('Table', pDataOperations, pPict);
			generateTemplate('Rows', pDataOperations, pPict);

			generateTemplate('Read', pDataOperations, pPict);
			generateTemplate('RecordRender', pDataOperations, pPict);

			generateTemplate('Update', pDataOperations, pPict);

			generateTemplate('Delete', pDataOperations, pPict);
			generateTemplate('DeleteCompleted', pDataOperations, pPict);
		};

		return generateTemplates;
	}
);