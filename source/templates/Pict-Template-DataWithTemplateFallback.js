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
			this.log.trace(`PICT DataWithTemplateFallback [fDataRender]::[${tmpHash}] with tmpRecord:`, tmpRecord);
		}
		else if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PICT DataWithTemplateFallback [fDataRender]::[${tmpHash}]`);
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

			if (tmpValue && tmpValue !== 'undefined')
			{
				if (this.pict.LogNoisiness > 3)
				{
					this.log.trace(`PICT DataWithTemplateFallback [fDataRender]::[${tmpHash}] - Found value: ${tmpValue}`);
					// If a value is found, return it
					return tmpValue;
				}
			}
		}
		// If the value is not found or is undefined, try to use the fallback template
		const tmpFallbackTemplate = this.pict.parseTemplateByHash(tmpTemplateFallbackAddress, tmpRecord, null, pContextArray);
		if (tmpFallbackTemplate == null || tmpFallbackTemplate === '')
		{
			this.log.warn(`PICT DataWithTemplateFallback [fDataRender]::[${tmpHash}] - No fallback template found at address: ${tmpTemplateFallbackAddress}`);
			// If no fallback template is found, return an empty string
			return '';
		}
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PICT DataWithTemplateFallback [fDataRender]::[${tmpHash}] - Using fallback template from address: ${tmpTemplateFallbackAddress}`);
		}
		return tmpFallbackTemplate;
	}

	/**
	 * Render a template expression asynchronously, returning a string with the resulting content or an optional fallback template string from an address.
	 *
	 * @param {string} pTemplateHash - The hash contents of the template (what's between the template start and stop tags)
	 * @param {any} pRecord - The json object to be used as the Record for the template render
	 * @param {(pError?: Error, pResult?: string) => void} fCallback - The callback function to be called with the result
	 * @param {Array<any>} pContextArray - An array of context objects accessible from the template; safe to leave empty
	 *
	 * @return {void} The result is passed to the callback function
	 */
	renderAsync(pTemplateHash, pRecord, fCallback, pContextArray)
	{
		let tmpHash = pTemplateHash.trim();
		let tmpRecord = (typeof (pRecord) === 'object') ? pRecord : {};
		let tmpCallback = (typeof (fCallback) === 'function') ? fCallback : () => { return ''; };

		if (this.pict.LogNoisiness > 4)
		{
			this.log.trace(`PICT DataWithTemplateFallback [fDataRender]::[${tmpHash}] with tmpRecord:`, tmpRecord);
		}
		else if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PICT DataWithTemplateFallback [fDataRender]::[${tmpHash}]`);
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

			if (tmpValue && tmpValue !== 'undefined')
			{
				if (this.pict.LogNoisiness > 3)
				{
					this.log.trace(`PICT DataWithTemplateFallback [fDataRender]::[${tmpHash}] - Found value: ${tmpValue}`);
				}
				return tmpCallback(null, tmpValue);
			}
		}
		// If the value is not found or is undefined, try to use the fallback template
		this.pict.parseTemplateByHash(tmpTemplateFallbackAddress, tmpRecord, (pError, pValue) =>
			{
				if (pError)
				{
					return tmpCallback(pError, '');
				}
				if (pValue == null || pValue === '')
				{
					this.log.warn(`PICT DataWithTemplateFallback [fDataRender]::[${tmpHash}] - No fallback template found at address: ${tmpTemplateFallbackAddress}`);
					// If no fallback template is found, return an empty string
					return tmpCallback(null, '');
				}
				if (this.pict.LogNoisiness > 3)
				{
					this.log.trace(`PICT DataWithTemplateFallback [fDataRender]::[${tmpHash}] - Using fallback template from address: ${tmpTemplateFallbackAddress}`);
				}
				return tmpCallback(null, pValue);
			}, pContextArray);
	}

}

module.exports = PictTemplateProviderData;
