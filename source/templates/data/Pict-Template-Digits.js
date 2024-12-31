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

	render(pTemplateHash, pRecord, pContextArray)
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

		let tmpColumnData = this.resolveStateFromAddress(tmpHash, tmpData, pContextArray);
		return this.fable.DataFormat.formatterAddCommasToNumber(this.fable.DataFormat.formatterRoundNumber(tmpColumnData, 2));
	}
}

module.exports = PictTemplateProviderDigits;
