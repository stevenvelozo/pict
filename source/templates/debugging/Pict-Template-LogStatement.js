const libPictTemplate = require('../../Pict-Template.js');

class PictTemplateProviderLogStatement extends libPictTemplate
{
	/**
	 * @param {Object} pFable - The Fable Framework instance
	 * @param {Object} pOptions - The options for the service
	 * @param {String} pServiceHash - The hash of the service
	 */
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		this.addPattern('{~LogStatement:', '~}');
		this.addPattern('{~LS:', '~}');
	}

	render(pTemplateHash, pRecord, pContextArray)
	{
		let tmpHash = pTemplateHash.trim();
		this.log.trace(`PICT Template Log Message: ${tmpHash}`);
		return '';
	}
}

module.exports = PictTemplateProviderLogStatement;
