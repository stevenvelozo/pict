const libPictTemplate = require('pict-template');

class PictTemplateProviderNotEmpty extends libPictTemplate
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
		this.log;

		this.addPattern('{~NotEmpty:', '~}');
		this.addPattern('{~NE:', '~}');
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
			this.log.trace(`PICT Template [fNotEmptyRender]::[${tmpHash}] with tmpData:`, tmpData);
		}
		else if (this.pict.LogNoisiness > 2)
		{
			this.log.trace(`PICT Template [fNotEmptyRender]::[${tmpHash}]`);
		}

		let tmpHashParts = tmpHash.split('^');

		// For now just check truthiness.  Not sure if this is grand.
		if (this.resolveStateFromAddress(tmpHashParts[0], tmpData, pContextArray, null, pScope))
		{
			return tmpHashParts[1];
		}

		return '';
	}
}

module.exports = PictTemplateProviderNotEmpty;
