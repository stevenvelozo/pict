const libPictTemplate = require('pict-template');

class PictTemplateProviderRandomNumber extends libPictTemplate
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

		this.addPattern('{~RandomNumber:', '~}');
		this.addPattern('{~RN:', '~}');
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
		let tmpHash = pTemplateHash.trim();

		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PICT Template [fRandomNumber]::[${tmpHash}]`);
		}

		let tmpMinimumNumber = 0;
		let tmpMaxNumber = 9999999;

		if (tmpHash.length > 0)
		{
			let tmpHashParts = tmpHash.split(',');
			if (tmpHashParts.length > 0)
			{
				try
				{
					tmpMinimumNumber = parseInt(tmpHashParts[0]);
				}
				catch
				{
					tmpMinimumNumber = 0;
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
					tmpMaxNumber = 9999999;
				}

			}
		}

		return this.fable.DataGeneration.randomIntegerBetween(tmpMinimumNumber, tmpMaxNumber);
	}
}

module.exports = PictTemplateProviderRandomNumber;
