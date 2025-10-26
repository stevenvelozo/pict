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

		this.addPattern('{~DataWithAbsoluteFallback:', '~}');
		this.addPattern('{~DWAF:', '~}');
	}

	/**
	 * Render a template expression, returning a string with the resulting content or an optional default template string from an address.
	 *
	 * @param {string} pTemplateHash - The hash contents of the template (what's between the template start and stop tags)
	 * @param {any} pRecord - The json object to be used as the Record for the template render
	 * @param {Array<any>} pContextArray - An array of context objects accessible from the template; safe to leave empty
	 * @param {any} [pScope] - A sticky scope that can be used to carry state and simplify template
	 * @param {any} [pState] - A catchall state object for plumbing data through template processing.
	 *
	 * @return {string} The rendered template
	 */
	render(pTemplateHash, pRecord, pContextArray, pScope, pState)
	{
		let tmpHash = pTemplateHash.trim();
		let tmpRecord = (typeof(pRecord) === 'object') ? pRecord : {};

		if (this.pict.LogNoisiness > 4)
		{
			this.log.trace(`PICT DataWithAbsoluteFallback [fDataRender]::[${tmpHash}] with tmpRecord:`, tmpRecord);
		}
		else if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PICT DataWithAbsoluteFallback [fDataRender]::[${tmpHash}]`);
		}

		let tmpAbsoluteFallbackValue = '';
		if (tmpHash.indexOf(':') > -1)
		{
			tmpAbsoluteFallbackValue = tmpHash.split(':')[1];
			tmpHash = tmpHash.split(':')[0];
		}

		let tmpValue = '';
		if (tmpHash != null)
		{
			tmpValue = this.resolveStateFromAddress(tmpHash, tmpRecord, pContextArray, null, pScope, pState);

			if (tmpValue && tmpValue !== 'undefined')
			{
				if (this.pict.LogNoisiness > 3)
				{
					this.log.trace(`PICT DataWithAbsoluteFallback [fDataRender]::[${tmpHash}] - Found value: ${tmpValue}`);
				}
				// If a value is found, return it
				return tmpValue;
			}
		}
		// If the value is not found or is undefined, use the fallback value.
		return tmpAbsoluteFallbackValue;
	}

	/**
	 * Render a template expression asynchronously, returning a string with the resulting content or an optional fallback template string from an address.
	 *
	 * @param {string} pTemplateHash - The hash contents of the template (what's between the template start and stop tags)
	 * @param {any} pRecord - The json object to be used as the Record for the template render
	 * @param {(pError?: Error, pResult?: string) => void} fCallback - The callback function to be called with the result
	 * @param {Array<any>} pContextArray - An array of context objects accessible from the template; safe to leave empty
	 * @param {any} [pScope] - A sticky scope that can be used to carry state and simplify template
	 * @param {any} [pState] - A catchall state object for plumbing data through template processing.
	 *
	 * @return {void} The result is passed to the callback function
	 */
	renderAsync(pTemplateHash, pRecord, fCallback, pContextArray, pScope, pState)
	{
		let tmpHash = pTemplateHash.trim();
		let tmpRecord = (typeof (pRecord) === 'object') ? pRecord : {};
		let tmpCallback = (typeof (fCallback) === 'function') ? fCallback : () => { return ''; };

		if (this.pict.LogNoisiness > 4)
		{
			this.log.trace(`PICT DataWithAbsoluteFallback [fDataRender]::[${tmpHash}] with tmpRecord:`, tmpRecord);
		}
		else if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PICT DataWithAbsoluteFallback [fDataRender]::[${tmpHash}]`);
		}

		let tmpAbsoluteFallbackValue = '';
		if (tmpHash.indexOf(':') > -1)
		{
			tmpAbsoluteFallbackValue = tmpHash.split(':')[1];
			tmpHash = tmpHash.split(':')[0];
		}

		let tmpValue = '';
		if (tmpHash != null)
		{
			tmpValue = this.resolveStateFromAddress(tmpHash, tmpRecord, pContextArray, null, pScope, pState);

			if (tmpValue && tmpValue !== 'undefined')
			{
				if (this.pict.LogNoisiness > 3)
				{
					this.log.trace(`PICT DataWithAbsoluteFallback [fDataRender]::[${tmpHash}] - Found value: ${tmpValue}`);
				}
				return tmpCallback(null, tmpValue);
			}
		}
		// If the value is not found or is undefined, use the fallback value
		return tmpCallback(null, tmpAbsoluteFallbackValue);
	}

}

module.exports = PictTemplateProviderData;
