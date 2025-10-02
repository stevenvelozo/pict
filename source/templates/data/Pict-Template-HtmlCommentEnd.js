const libPictTemplate = require('pict-template');

class PictTemplateProviderHTMLCommandEnd extends libPictTemplate
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

		this.addPattern('{~HtmlCommentEnd:', '~}');
		this.addPattern('{~HCE:', '~}');
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
		let tmpRecord = (typeof(pRecord) === 'object') ? pRecord : {};

		if (this.pict.LogNoisiness > 4)
		{
			this.log.trace(`PICT Template [fDataRender]::[${tmpHash}] with tmpData:`, tmpRecord);
		}
		else if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PICT Template [fDataRender]::[${tmpHash}]`);
		}

		let tmpValue = false;
		const [ tmpValueAddress, tmpPolarityStr ] = tmpHash.split(':');
		if (tmpValueAddress != null)
		{
			tmpValue = this.resolveStateFromAddress(tmpValueAddress, tmpRecord, pContextArray, null, pScope, pState);
		}
		const tmpPolarity = tmpPolarityStr != null ? tmpPolarityStr === '1' || tmpPolarityStr.toLowerCase() === 'true' || tmpPolarityStr.toLowerCase() === 't' : false;
		if (Boolean(tmpValue) == tmpPolarity)
		{
			return ' -->';
		}
		return '';
	}
}

module.exports = PictTemplateProviderHTMLCommandEnd;
