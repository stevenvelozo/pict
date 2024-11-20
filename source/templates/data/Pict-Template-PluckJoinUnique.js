const libPictTemplate = require('pict-template');

class PictTemplateProviderPluckJoinUnique extends libPictTemplate
{
	/**
	 * @param {Object} pFable - The Fable Framework instance
	 * @param {Object} pOptions - The options for the service
	 * @param {String} pServiceHash - The hash of the service
	 */
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		this.addPattern('{~PluckJoinUnique:', '~}');
		this.addPattern('{~PJU:', '~}');
	}

	render(pTemplateHash, pRecord, pContextArray)
	{
		let tmpHash = pTemplateHash;
		let tmpData = (typeof (pRecord) === 'object') ? pRecord : {};

		if (this.pict.LogNoisiness > 4)
		{
			this.log.trace(`PICT Pluck Join Unique [fDataRender]::[${tmpHash}] with tmpData:`, tmpData);
		}
		else if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PICT Pluck Join Unique [fDataRender]::[${tmpHash}]`);
		}

		let tmpDataAddresses = tmpHash.split('^');
		if (tmpDataAddresses.length < 3)
		{
			return '';
		}

		// Get the separator string
		let tmpSeparator = tmpDataAddresses.shift();
		let tmpAddress = tmpDataAddresses.shift();

		let tmpValueList = [];
		let tmpValueMap = {};
		for (let i = 0; i < tmpDataAddresses.length; i++)
		{
			let tmpValueSet = this.resolveStateFromAddress(tmpDataAddresses[i], tmpData, pContextArray);

			if (tmpValueSet && Array.isArray(tmpValueSet))
			{
				// This one only works on arrays of objects.
				for (let j = 0; j < tmpValueSet.length; j++)
				{
					if ((tmpValueSet[j] === null) || (typeof(tmpValueSet) !== 'object'))
					{
						continue;
					}
					let tmpValue = this.pict.manifest.getValueByHash(tmpValueSet[j], tmpAddress);
					if (!(tmpValue in tmpValueMap))
					{
						tmpValueMap[tmpValue] = true;
						tmpValueList.push(tmpValue);
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

module.exports = PictTemplateProviderPluckJoinUnique;
