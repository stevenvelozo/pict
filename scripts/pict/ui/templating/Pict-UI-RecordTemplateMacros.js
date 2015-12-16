/**
* This file is the record template macros, for the meta templates (and others)
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*
* @description Record Template Macros
*/
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define
(
	function()
	{
		// Template caches
		var _Templates = {};

		var getTemplate = function(pTemplateType, pTemplateHash)
		{
			var tmpTemplateHash = (typeof(pTemplateHash) === 'undefined') ? 'Default' : pTemplateHash;
			var tmpTemplateID = pTemplateType+'_'+tmpTemplateHash;
			// Row headers are exception, they ignore the type for now
			if (pTemplateType == 'RowHeader')
			{
				tmpTemplateID = pTemplateType;
			}
			// If the template is cached, use the cached version
			if (!_Templates.hasOwnProperty(tmpTemplateID))
			{
				// Cache it
				var tmpTemplateString = $('#Template_'+tmpTemplateID);
				if (tmpTemplateString.size() === 0)
				{
					console.log('   Invalid Template Requested: '+tmpTemplateID);
					return false;
				}
				tmpFilterTemplate = _.template(tmpTemplateString.text());
				_Templates[tmpTemplateID] = tmpFilterTemplate;
			}

			return _Templates[tmpTemplateID];
		};

		// Parse Template
		/*
			Options:
			{
				Type: 'Row',
				Hash: undefined,

				Title: ''
			}
		*/
		var parseTemplate = function(pTemplateType, pOptions, pRecord)
		{
			if (typeof(pOptions) !== 'object')
			{
				return '';
			}

			var tmpTemplate = getTemplate(pTemplateType, pOptions.Hash);

			if (!tmpTemplate)
			{
				return '';
			}

			return tmpTemplate({Options: pOptions, Record: pRecord});
		};

		////////// Return Object //////////
		oApplicationTemplates = (
		{
			Parse: parseTemplate
		});

		return oApplicationTemplates;
	}
);