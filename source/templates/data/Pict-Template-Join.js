const libPictTemplate = require('../../Pict-Template.js');

class PictTemplateProviderJoin extends libPictTemplate
{
	/**
	 * @param {Object} pFable - The Fable Framework instance
	 * @param {Object} pOptions - The options for the service
	 * @param {String} pServiceHash - The hash of the service
	 */
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		this.addPattern('{~Join:', '~}');
		this.addPattern('{~J:', '~}');
	}

	render(pTemplateHash, pRecord, pContextArray)
	{
		let tmpHash = pTemplateHash;
		let tmpData = (typeof (pRecord) === 'object') ? pRecord : {};

		if (this.pict.LogNoisiness > 4)
		{
			this.log.trace(`PICT Join [fDataRender]::[${tmpHash}] with tmpData:`, tmpData);
		}
		else if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PICT Join [fDataRender]::[${tmpHash}]`);
		}

		let tmpDataAddresses = tmpHash.split('^');
		if (tmpDataAddresses.length < 2)
		{
			return '';
		}

		// Get the separator string
		let tmpSeparator = tmpDataAddresses.shift();

		let tmpValueList = [];
		for (let i = 0; i < tmpDataAddresses.length; i++)
		{
			let tmpValueSet = this.resolveStateFromAddress(tmpDataAddresses[i], tmpData, pContextArray);
			if (tmpValueSet && Array.isArray(tmpValueSet))
			{
				for (let j = 0; j < tmpValueSet.length; j++)
				{
					tmpValueList.push(tmpValueSet[j]);
				}
			}
			else if (tmpValueSet)
			{
				tmpValueList.push(tmpValueSet);
			}
		}

		return tmpValueList.join(tmpSeparator);
	}
}

module.exports = PictTemplateProviderJoin;
