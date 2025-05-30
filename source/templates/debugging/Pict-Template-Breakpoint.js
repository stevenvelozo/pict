const libPictTemplate = require('pict-template');

class PictTemplateProviderBreakpoint extends libPictTemplate
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

		this.addPattern('{~Breakpoint', '~}');
	}

	/**
	 * Render a template expression, returning a string with the resulting content.
	 *
	 * @param {string} pTemplateHash - The hash contents of the template (what's between the template start and stop tags)
	 * @param {any} pRecord - The json object to be used as the Record for the template render
	 * @param {Array<any>} pContextArray - An array of context objects accessible from the template; safe to leave empty
	 *
	 * @return {string} The rendered template
	 */
	render(pTemplateHash, pRecord, pContextArray)
	{
		let tmpHash = pTemplateHash.trim();
		let tmpError = new Error(`PICT Template Breakpoint: ${tmpHash}`);
		this.log.trace(`PICT Template Breakpoint: ${tmpHash}`, tmpError.stack);
		//throw tmpError;
		debugger; // eslint-disable-line no-debugger
		return '';
	}

}

module.exports = PictTemplateProviderBreakpoint;
