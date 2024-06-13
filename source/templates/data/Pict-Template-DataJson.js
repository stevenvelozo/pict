const libPictTemplate = require('../../Pict-Template.js');

class PictTemplateProviderDollars extends libPictTemplate
{
	/**
	 * @param {Object} pFable - The Fable Framework instance
	 * @param {Object} pOptions - The options for the service
	 * @param {String} pServiceHash - The hash of the service
	 */
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		this.addPattern('{~DataJson:', '~}');
		this.addPattern('{~DJ:', '~}');
	}

	render(pTemplateHash, pRecord, pContextArray)
	{
		let tmpHash = pTemplateHash.trim();
		let tmpData = (typeof (pRecord) === 'object') ? pRecord : {};

		if (this.pict.LogNoisiness > 4)
		{
			this.log.trace(`PICT Template [fDataJson]::[${tmpHash}] with tmpData:`, tmpData);
		}
		else if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PICT Template [fDataJson]::[${tmpHash}]`);
		}

		let tmpDataToStringify = this.resolveStateFromAddress(tmpHash, tmpData, pContextArray);

		if (!tmpDataToStringify)
		{
			tmpDataToStringify = pRecord;
		}

		return JSON.stringify(tmpDataToStringify);
	}
}

module.exports = PictTemplateProviderDollars;
