const libPictTemplate = require('pict-template');

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

		/** @type {any} */
		this.log;

		this.addPattern('{~Data:', '~}');
		this.addPattern('{~D:', '~}');
	}

	/**
	 * Render a template expression, returning a string with the resulting content.
	 *
	 * @param {string} pTemplateHash - The hash contents of the template (what's between the template start and stop tags)
	 * @param {any} pRecord - The json object to be used as the Record for the template render
	 * @param {Array<any>} pContextArray - An array of context objects accessible from the template; safe to leave empty
	 *
	 * @return {string} The rendered template
	 */
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

		let tmpDefaultValue = '';
		if (tmpHash.indexOf(':') > -1)
		{
			tmpDefaultValue = tmpHash.split(':')[1];
			tmpHash = tmpHash.split(':')[0];
		}

		let tmpValue = '';
		if (tmpHash != null)
		{
			tmpValue = this.resolveStateFromAddress(tmpHash, tmpRecord, pContextArray);
		}
		if ((tmpValue == null) || (tmpValue == 'undefined') || (typeof(tmpValue) == 'undefined') || (tmpValue === ''))
		{
			return tmpDefaultValue;
		}
		return tmpValue;
	}
}

module.exports = PictTemplateProviderData;
