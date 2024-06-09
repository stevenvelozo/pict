const libPictTemplate = require('../../Pict-Template.js');

class PictTemplateProviderJoinUnique extends libPictTemplate
{
	/**
	 * @param {Object} pFable - The Fable Framework instance
	 * @param {Object} pOptions - The options for the service
	 * @param {String} pServiceHash - The hash of the service
	 */
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		this.addPattern('{~JoinUnique:', '~}');
		this.addPattern('{~JU:', '~}');
	}

	render(pHash, pData, pContextArray)
	{
		let tmpHash = pHash;
		let tmpData = (typeof (pData) === 'object') ? pData : {};

		if (this.LogNoisiness > 4)
		{
			this.log.trace(`PICT Join Unique [fDataRender]::[${tmpHash}] with tmpData:`, tmpData);
		}
		else if (this.LogNoisiness > 3)
		{
			this.log.trace(`PICT Join Unique [fDataRender]::[${tmpHash}]`);
		}

		let tmpDataAddresses = tmpHash.split('^');
		if (tmpDataAddresses.length < 2)
		{
			return '';
		}

		// Get the separator string
		let tmpSeparator = tmpDataAddresses.shift();

		let tmpValueList = [];
		let tmpValueMap = {};
		for (let i = 0; i < tmpDataAddresses.length; i++)
		{
			let tmpValueSet = this.resolveStateFromAddress(tmpDataAddresses[i], tmpData, pContextArray);

			if (tmpValueSet && Array.isArray(tmpValueSet))
			{
				for (let j = 0; j < tmpValueSet.length; j++)
				{
					if (!(tmpValueSet[j] in tmpValueMap))
					{
						tmpValueMap[tmpValueSet[j]] = true;
						tmpValueList.push(tmpValueSet[j]);
					}
				}
			}
			else if (tmpValueSet)
			{
				if (!(tmpValueSet in tmpValueMap))
				{
					tmpValueMap[tmpValueSet] = true;
					tmpValueList.push(tmpValueSet);
				}
			}
		}

		return tmpValueList.join(tmpSeparator);
	}
}

module.exports = PictTemplateProviderJoinUnique;
