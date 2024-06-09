const libFableServiceBase = require('fable').ServiceProviderBase;

class PictTemplateProvider extends libFableServiceBase
{
	/**
	 * @param {Object} pFable - The Fable Framework instance
	 * @param {Object} pOptions - The options for the service
	 * @param {String} pServiceHash - The hash of the service
	 */
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		this.pict = this.fable;

		this.serviceType = 'PictTemplate';
	}

	/**
	 * Render a template expression, returning a string with the resulting content.
	 *
	 * @param {string} pTemplateHash - The hash contents of the template (what's between the template start and stop tags)
	 * @param {object} pRecord - The json object to be used as the Record for the template render
	 * @param {array} pContextArray - An array of context objects accessible from the template; safe to leave empty
	 */
	render(pTemplateHash, pRecord, pContextArray)
	{
		return '';
	}

	/**
	 * 
	 * @param {string} pTemplateHash - The hash contents of the template (what's between the template start and stop tags)
	 * @param {object} pRecord - The json object to be used as the Record for the template render
	 * @param {array} pContextArray - An array of context objects accessible from the template; safe to leave empty
	 * @param {*} fCallback 
	 * @returns 
	 */
	renderAsync(pTemplateHash, pRecord, fCallback, pContextArray)
	{
		return fCallback(null, this.render(pTemplateHash, pRecord, pContextArray));
	}

	/**
	 * Provide a match criteria for a template expression.  Anything between these two values is returned as the template hash.
	 *
	 * @param {string} pMatchStart - The string pattern to start a match in the template trie
	 * @param {string} pMatchEnd  - The string pattern to stop a match in the trie acyclic graph
	 */
	addPattern(pMatchStart, pMatchEnd)
	{
		return this.pict.MetaTemplate.addPatternBoth(pMatchStart, pMatchEnd, this.render, this.renderAsync, this);
	}

	/**
	 * Read a value from a nested object using a dot notation string.
	 *
	 * @param {string} pAddress - The address to resolve
	 * @param {object} pRecord - The record to resolve
	 * @param {Array<any>} pContextArray - The context array to resolve (optional)
	 *
	 * @returns {any} The value at the given address, or undefined
	 */
	resolveStateFromAddress(pAddress, pRecord, pContextArray)
	{
		let tmpContextArray = (Array.isArray(pContextArray)) ? pContextArray : [this.pict];

		return this.pict.manifest.getValueByHash(
			{
				Pict:this.pict,
				AppData:this.pict.AppData,
				Bundle:this.pict.Bundle,
				Context:tmpContextArray,
				Record:pRecord
			}, pAddress);
	}
}

module.exports = PictTemplateProvider;
module.exports.template_hash = 'Default';