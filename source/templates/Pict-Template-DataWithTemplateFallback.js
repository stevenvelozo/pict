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

		this.addPattern('{~DataWithTemplateFallback:', '~}');
		this.addPattern('{~DWTF:', '~}');
	}

	/**
	 * Render a template expression, returning a string with the resulting content or an optional default template string from an address.
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

		let tmpTemplateFallbackAddress = '';
		if (tmpHash.indexOf(':') > -1)
		{
			tmpTemplateFallbackAddress = tmpHash.split(':')[1];
			tmpHash = tmpHash.split(':')[0];
		}

		let tmpValue = '';
		if (tmpHash != null)
		{
			tmpValue = this.resolveStateFromAddress(tmpHash, tmpRecord, pContextArray);
		}
		if ((tmpValue == null) || (tmpValue == 'undefined') || (typeof(tmpValue) == 'undefined') || (tmpValue === ''))
		{
			const tmpDefaultTemplate = this.pict.parseTemplateByHash(tmpTemplateFallbackAddress, tmpRecord, null, pContextArray);
			if (tmpDefaultTemplate == null || tmpDefaultTemplate === '')
			{
				this.log.warn(`PICT Template [fDataRender]::[${tmpHash}] - No default template found at address: ${tmpTemplateFallbackAddress}`);
				// If no default template is found, return an empty string
				return '';
			}
			if (this.pict.LogNoisiness > 3)
			{
				this.log.trace(`PICT Template [fDataRender]::[${tmpHash}] - Using default template from address: ${tmpTemplateFallbackAddress}`);
			}
			return tmpDefaultTemplate;
		}
		return tmpValue;
	}
}

module.exports = PictTemplateProviderData;
