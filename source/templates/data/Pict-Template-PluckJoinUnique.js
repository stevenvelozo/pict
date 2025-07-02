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

		/** @type {any} */
		this.options;
		/** @type {any} */
		this.log;

		this.addPattern('{~PluckJoinUnique:', '~}');
		this.addPattern('{~PJU:', '~}');
	}

	/**
	 * Render a template expression, returning a string with the resulting content.
	 *
	 * @param {string} pTemplateHash - The hash contents of the template (what's between the template start and stop tags)
	 * @param {any} pRecord - The json object to be used as the Record for the template render
	 * @param {Array<any>} pContextArray - An array of context objects accessible from the template; safe to leave empty
	 * @param {any} [pScope] - A sticky scope that can be used to carry state and simplify template
	 *
	 * @return {string} The rendered template
	 */
	render(pTemplateHash, pRecord, pContextArray, pScope)
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
			let tmpValueSet = this.resolveStateFromAddress(tmpDataAddresses[i], tmpData, pContextArray, null, pScope);

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
