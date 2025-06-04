const libPictTemplate = require('pict-template');

class PictTemplateProviderTemplateByDataAddress extends libPictTemplate
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

		this.addPattern('{~TemplateByDataAddress:', '~}');
		this.addPattern('{~TBDA:', '~}');
	}

	/**
	 * Render a template expression, returning a string with the resulting content.
	 *
	 * @param {string} pTemplateDataAddress - The hash contents of the template (what's between the template start and stop tags)
	 * @param {any} pRecord - The json object to be used as the Record for the template render
	 * @param {Array<any>} pContextArray - An array of context objects accessible from the template; safe to leave empty
	 *
	 * @return {string} The rendered template
	 */
	render(pTemplateDataAddress, pRecord, pContextArray)
	{
		let tmpDataAddress = pTemplateDataAddress.trim();
		let tmpData = (typeof (pRecord) === 'object') ? pRecord : {};

		if (this.pict.LogNoisiness > 4)
		{
			this.log.trace(`PICT Template [fTemplateRender]::[${tmpDataAddress}] with tmpData:`, tmpData);
		}
		else if (this.pict.LogNoisiness > 0)
		{
			this.log.trace(`PICT Template [fTemplateRender]::[${tmpDataAddress}]`);
		}

		let tmpTemplateDataAddress;
		let tmpAddressOfData;

		// This is just a simple 2 part hash (the entity and the ID)
		let tmpHashTemplateSeparator = tmpDataAddress.indexOf(':');
		tmpTemplateDataAddress = tmpDataAddress.substring(0, tmpHashTemplateSeparator);
		if (tmpHashTemplateSeparator > -1)
		{
			tmpAddressOfData = tmpDataAddress.substring(tmpHashTemplateSeparator + 1);
		}
		else
		{
			tmpTemplateDataAddress = tmpDataAddress;
		}

		// No template hash
		if (!tmpTemplateDataAddress)
		{
			this.log.warn(`Pict: Template Render: TemplateHash not resolved for [${tmpDataAddress}]`);
			return '';
		}

		const tmpTemplateData = this.pict.resolveStateFromAddress(tmpTemplateDataAddress, pRecord, pContextArray);
		if (!tmpAddressOfData)
		{
			// No address was provided, just render the template with what this template has.
			return this.pict.parseTemplate(tmpTemplateData, pRecord, null, pContextArray);
		}
		else
		{
			return this.pict.parseTemplate(tmpTemplateData, this.resolveStateFromAddress(tmpAddressOfData, tmpData, pContextArray), null, pContextArray);
		}
	}

	/**
	 * Render a template expression, deliver a string with the resulting content to a callback function.
	 *
	 * @param {string} pTemplateDataAddress - The hash contents of the template (what's between the template start and stop tags)
	 * @param {any} pRecord - The json object to be used as the Record for the template render
	 * @param {Array<any>} pContextArray - An array of context objects accessible from the template; safe to leave empty
	 * @param {(error?: Error, content?: String) => void} fCallback - callback function invoked with the rendered template, or an error
	 *
	 * @return {void}
	 */
	renderAsync(pTemplateDataAddress, pRecord, fCallback, pContextArray)
	{
		let tmpDataAddress = pTemplateDataAddress.trim();
		let tmpData = (typeof (pRecord) === 'object') ? pRecord : {};
		let tmpCallback = (typeof (fCallback) === 'function') ? fCallback : () => { return ''; };

		if (this.pict.LogNoisiness > 4)
		{
			this.log.trace(`PICT Template [fTemplateRenderAsync]::[${tmpDataAddress}] with tmpData:`, tmpData);
		}
		else if (this.pict.LogNoisiness > 0)
		{
			this.log.trace(`PICT Template [fTemplateRenderAsync]::[${tmpDataAddress}]`);
		}

		let tmpTemplateDataAddress;
		let tmpAddressOfData;

		// This is just a simple 2 part hash (the entity and the ID)
		let tmpHashTemplateSeparator = tmpDataAddress.indexOf(':');
		tmpTemplateDataAddress = tmpDataAddress.substring(0, tmpHashTemplateSeparator);
		if (tmpHashTemplateSeparator > -1)
		{
			tmpAddressOfData = tmpDataAddress.substring(tmpHashTemplateSeparator + 1);
		}
		else
		{
			tmpTemplateDataAddress = tmpDataAddress;
		}

		// No template hash
		if (!tmpTemplateDataAddress)
		{
			this.log.warn(`Pict: Template Render Async: TemplateHash not resolved for [${tmpDataAddress}]`);
			return tmpCallback(null, '');
		}

		const tmpTemplateData = this.pict.resolveStateFromAddress(tmpTemplateDataAddress, pRecord, pContextArray);
		if (!tmpAddressOfData)
		{
			// No address was provided, just render the template with what this template has.
			// The async portion of this is a mind bender because of how entry can happen dynamically from templates
			this.pict.parseTemplate(tmpTemplateData, pRecord,
				(pError, pValue) =>
				{
					if (pError)
					{
						return tmpCallback(pError, '');
					}
					return tmpCallback(null, pValue);
				}, pContextArray);
		}
		else
		{
			this.pict.parseTemplate(tmpTemplateData, this.resolveStateFromAddress(tmpAddressOfData, tmpData, pContextArray),
				(pError, pValue) =>
				{
					if (pError)
					{
						return tmpCallback(pError, '');
					}
					return tmpCallback(null, pValue);
				}, pContextArray);
		}
	}
}

module.exports = PictTemplateProviderTemplateByDataAddress;
