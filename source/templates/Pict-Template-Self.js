const libPictTemplate = require('pict-template');

class PictTemplateProviderSelf extends libPictTemplate
{
	/**
	 * @param {Object} pFable - The Fable Framework instance
	 * @param {Object} pOptions - The options for the service
	 * @param {String} pServiceHash - The hash of the service
	 */
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		this.addPattern('{~Pict', '~}');
		this.addPattern('{~P', '~}');
		this.addPattern('{~p', '~}');
	}

	render(pTemplateHash, pRecord, pContextArray)
	{
		return this.pict.browserAddress;
	}
}

module.exports = PictTemplateProviderSelf;
