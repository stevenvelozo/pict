const libPictTemplate = require('pict-template');

class PictTemplateProviderRandomNumberString extends libPictTemplate
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
		this.log;

		this.addPattern('{~RandomNumberString:', '~}');
		this.addPattern('{~RNS:', '~}');
	}

	render(pTemplateHash, pRecord, pContextArray)
	{
		let tmpHash = pTemplateHash.trim();

		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PICT Template [fRandomNumberString]::[${tmpHash}]`);
		}

		let tmpStringLength = 4;
		let tmpMaxNumber = 9999;

		if (tmpHash.length > 0)
		{
			let tmpHashParts = tmpHash.split(',');
			if (tmpHashParts.length > 0)
			{
				try
				{
					tmpStringLength = parseInt(tmpHashParts[0]);
				}
				catch
				{
					tmpStringLength = 4;
				}
			}
			if (tmpHashParts.length > 1)
			{
				try
				{
					tmpMaxNumber = parseInt(tmpHashParts[1]);
				}
				catch
				{
					tmpMaxNumber = 9999;
				}
			}
		}

		return this.fable.DataGeneration.randomNumericString(tmpStringLength, tmpMaxNumber);
	}
}

module.exports = PictTemplateProviderRandomNumberString;
