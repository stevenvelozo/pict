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
		function oNew(pDataOperations)
		{
			var _DataOperations = pDataOperations;

			var _Verbs = (
				{
					create: _DataOperations.Config.DataSetHash+"create",
					createanother: _DataOperations.Config.DataSetHash+"createanother",
					list: _DataOperations.Config.DataSetHash+"list",
					listfiltered: _DataOperations.Config.DataSetHash+"list/:pFilter",
					read: _DataOperations.Config.DataSetHash+"read/<%= IDRecord %>",
					edit: _DataOperations.Config.DataSetHash+"edit/<%= IDRecord %>",
					duplicate: _DataOperations.Config.DataSetHash+"duplicate/<%= IDRecord %>",
					delete: _DataOperations.Config.DataSetHash+"delete/<%= IDRecord %>",
					deleteconfirm: _DataOperations.Config.DataSetHash+"deleteconfirm/<%= IDRecord %>"
				}
			);

			/**
			* Wrap a string in a template expression for output
			*
			* @method Templatize
			* @param {String} pExpression The string to wrap in template delimiters
			*/
			var Templatize = function(pExpression)
			{
				return '<%= '+pExpression+' %>';
			};

			/**
			* Get the route for a particular verb
			*
			*/
			var Route = function(pVerb)
			{
				if (_Verbs.hasOwnProperty(pVerb))
					return _Verbs[pVerb];

				return '';
			};


			/**
			* Generate a Pict container ID
			*
			* @method ContainerID
			* @param {String} pContainerTypeHash The type of container template (e.g. Update, Read)
			*/
			var ContainerID = function(pContainerTypeHash)
			{
				return pContainerTypeHash+'_'+_DataOperations.Config.DataSetHash;
			};

			oMetaTemplates = (
			{
				Route: Route,

				Templatize: Templatize,

				ContainerID: ContainerID,

				IdentityColumn: pDataOperations.DataSetGUID
			});

			return oMetaTemplates;
		}

		return oNew;
	}
);