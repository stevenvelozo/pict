const libPictTemplate = require('../Pict-Template.js');

class PictTemplateProviderData extends libPictTemplate
{
	/**
	 * @param {Object} pFable - The Fable Framework instance
	 * @param {Object} pOptions - The options for the service
	 * @param {String} pServiceHash - The hash of the service
	 */
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		this.addPattern('{~Data:', '~}');
		this.addPattern('{~D:', '~}');
	}

	render(pTemplateHash, pRecord, pContextArray)
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

		let tmpValue = '';
		if (tmpHash != null)
		{
			tmpValue = this.resolveStateFromAddress(tmpHash, tmpRecord, pContextArray);
		}
		if ((tmpValue == null) || (tmpValue == 'undefined') || (typeof(tmpValue) == 'undefined'))
		{
			return '';
		}
		return tmpValue;
	}
}

module.exports = PictTemplateProviderData;
