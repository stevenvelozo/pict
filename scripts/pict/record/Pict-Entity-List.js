/**
* Pict - Shared List of Entity Providers
*
* @license MIT
*
* @author Steven Velozo <steven@velozo.com>
*/
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define
(
	function()
	{
		// This is a singleton
		var oApplicationEntityList;
		if (typeof(oApplicationEntityList) !== 'undefined') return oApplicationEntityList;

		var _Entities = {};

		var addEntity = function(pEntityHash, pEntity)
		{
			console.log('Adding Entity to Published List: '+pEntityHash);
			_Entities[pEntityHash] = pEntity;
		};

		var getEntity = function(pEntityHash)
		{
			return _Entities[pEntityHash];
		};

		oApplicationEntityList = (
		{
			addEntity: addEntity,
			getEntity: getEntity
		});

		/**
		 * Access to the entity container
		 *
		 * @property entities
		 * @type object
		 */
		var getEntities = function()
		{
			return _Entities;
		};
		Object.defineProperty(oApplicationEntityList, 'entities', {get: getEntities, enumerable: true });

		return oApplicationEntityList;
	}
);