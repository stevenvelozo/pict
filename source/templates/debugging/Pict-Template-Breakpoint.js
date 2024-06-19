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
		this.addPattern('{~Breakpoint', '~}');
	}

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
