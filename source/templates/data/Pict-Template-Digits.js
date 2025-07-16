const libPictTemplate = require('pict-template');

class PictTemplateProviderDigits extends libPictTemplate
{
	/**
	 * @param {Object} pFable - The Fable Framework instance
	 * @param {Object} pOptions - The options for the service
	 * @param {String} pServiceHash - The hash of the service
	 */
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		/** @type {any} */
		this.options;
		/** @type {any} */
		this.log;

		this.addPattern('{~Digits:', '~}');
	}

	/**
	 * Render a template expression, returning a string with the resulting content.
	 *
	 * @param {string} pTemplateHash - The hash contents of the template (what's between the template start and stop tags)
	 * @param {any} pRecord - The json object to be used as the Record for the template render
	 * @param {Array<any>} pContextArray - An array of context objects accessible from the template; safe to leave empty
	 * @param {any} [pScope] - A sticky scope that can be used to carry state and simplify template
	 * @param {any} [pState] - A catchall state object for plumbing data through template processing.
	 *
	 * @return {string} The rendered template
	 */
	render(pTemplateHash, pRecord, pContextArray, pScope, pState)
	{
		let tmpHash = pTemplateHash.trim();
		let tmpData = (typeof (pRecord) === 'object') ? pRecord : {};

		if (this.pict.LogNoisiness > 4)
		{
			this.log.trace(`PICT Template [fDigits]::[${tmpHash}] with tmpData:`, tmpData);
		}
		else if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PICT Template [fDigits]::[${tmpHash}]`);
		}

		let tmpColumnData = this.resolveStateFromAddress(tmpHash, tmpData, pContextArray, null, pScope);
		return this.fable.DataFormat.formatterAddCommasToNumber(this.fable.DataFormat.formatterRoundNumber(tmpColumnData, 2));
	}
}

module.exports = PictTemplateProviderDigits;
