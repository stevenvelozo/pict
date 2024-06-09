const libPictTemplate = require('../../Pict-Template.js');

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

		this.addPattern('{~Digits:', '~}');
	}

	render(pHash, pData, pContextArray)
	{
		let tmpHash = pHash.trim();
		let tmpData = (typeof (pData) === 'object') ? pData : {};

		if (this.LogNoisiness > 4)
		{
			this.log.trace(`PICT Template [fDigits]::[${tmpHash}] with tmpData:`, tmpData);
		}
		else if (this.LogNoisiness > 3)
		{
			this.log.trace(`PICT Template [fDigits]::[${tmpHash}]`);
		}

		let tmpColumnData = this.resolveStateFromAddress(tmpHash, tmpData, pContextArray);
		return this.fable.DataFormat.formatterAddCommasToNumber(this.fable.DataFormat.formatterRoundNumber(tmpColumnData, 2));
	}
}

module.exports = PictTemplateProviderDigits;
