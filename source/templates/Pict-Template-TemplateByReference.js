const libPictTemplate = require('pict-template');

class PictTemplateProviderTemplate extends libPictTemplate
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

		this.addPattern('{~TemplateByReference:', '~}');
		this.addPattern('{~TBR:', '~}');
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
		let tmpData = (typeof (pRecord) === 'object') ? pRecord : {};

		if (this.pict.LogNoisiness > 4)
		{
			this.log.trace(`PICT Template [fTemplateRender]::[${tmpHash}] with tmpData:`, tmpData);
		}
		else if (this.pict.LogNoisiness > 0)
		{
			this.log.trace(`PICT Template [fTemplateRender]::[${tmpHash}]`);
		}

		let tmpTemplateHashReferenceLocation;
		let tmpAddressOfData;

		// This is just a simple 2 part hash (the entity and the ID)
		let tmpHashTemplateSeparator = tmpHash.indexOf(':');
		tmpTemplateHashReferenceLocation = tmpHash.substring(0, tmpHashTemplateSeparator);
		if (tmpHashTemplateSeparator > -1)
		{
			tmpAddressOfData = tmpHash.substring(tmpHashTemplateSeparator + 1);
		}
		else
		{
			tmpTemplateHashReferenceLocation = tmpHash;
		}

		// No template hash
		if (!tmpTemplateHashReferenceLocation)
		{
			this.log.warn(`Pict: Template Render: TemplateHashReferenceLocation not resolved for [${tmpHash}]`);
			return '';
		}

		// Now look up the template by the reference
		let tmpTemplateHash = this.resolveStateFromAddress(tmpTemplateHashReferenceLocation, pRecord, pContextArray, null, pScope);

		// No template hash
		if (!tmpTemplateHash)
		{
			this.log.warn(`Pict: Template Render: TemplateHash not resolved for [${tmpHash}]`);
			return '';
		}

		if (!tmpAddressOfData)
		{
			// No address was provided, just render the template with what this template has.
			return this.pict.parseTemplateByHash(tmpTemplateHash, pRecord, null, pContextArray, pScope);
		}
		else
		{
			return this.pict.parseTemplateByHash(tmpTemplateHash, this.resolveStateFromAddress(tmpAddressOfData, tmpData, pContextArray, null, pScope), null, pContextArray, pScope);
		}
	}

	/**
	 * Render a template expression, deliver a string with the resulting content to a callback function.
	 *
	 * @param {string} pTemplateHash - The hash contents of the template (what's between the template start and stop tags)
	 * @param {any} pRecord - The json object to be used as the Record for the template render
	 * @param {(error?: Error, content?: String) => void} fCallback - callback function invoked with the rendered template, or an error
	 * @param {Array<any>} pContextArray - An array of context objects accessible from the template; safe to leave empty
	 * @param {any} [pScope] - A sticky scope that can be used to carry state and simplify template
	 *
	 * @return {void}
	 */
	renderAsync(pTemplateHash, pRecord, fCallback, pContextArray, pScope)
	{
		let tmpHash = pTemplateHash.trim();
		let tmpData = (typeof (pRecord) === 'object') ? pRecord : {};
		let tmpCallback = (typeof (fCallback) === 'function') ? fCallback : () => { return ''; };

		if (this.pict.LogNoisiness > 4)
		{
			this.log.trace(`PICT Template [fTemplateRenderAsync]::[${tmpHash}] with tmpData:`, tmpData);
		}
		else if (this.pict.LogNoisiness > 0)
		{
			this.log.trace(`PICT Template [fTemplateRenderAsync]::[${tmpHash}]`);
		}

		let tmpTemplateHashReferenceLocation;
		let tmpAddressOfData;

		// This is just a simple 2 part hash (the entity and the ID)
		let tmpHashTemplateSeparator = tmpHash.indexOf(':');
		tmpTemplateHashReferenceLocation = tmpHash.substring(0, tmpHashTemplateSeparator);
		if (tmpHashTemplateSeparator > -1)
		{
			tmpAddressOfData = tmpHash.substring(tmpHashTemplateSeparator + 1);
		}
		else
		{
			tmpTemplateHashReferenceLocation = tmpHash;
		}

		// No template hash
		if (!tmpTemplateHashReferenceLocation)
		{
			this.log.warn(`Pict: Template Render Async: TemplateHashReferenceLocation not resolved for [${tmpHash}]`);
			return fCallback(null, '');
		}

		// Now look up the template by the reference
		let tmpTemplateHash = this.resolveStateFromAddress(tmpTemplateHashReferenceLocation, pRecord, pContextArray, null, pScope);

		// No template hash
		if (!tmpTemplateHash)
		{
			this.log.warn(`Pict: Template Render Async: TemplateHash not resolved for [${tmpHash}]`);
			return fCallback(null, '');
		}

		if (!tmpAddressOfData)
		{
			// No address was provided, just render the template with what this template has.
			// The async portion of this is a mind bender because of how entry can happen dynamically from templates
			this.pict.parseTemplateByHash(tmpTemplateHash, pRecord,
				(pError, pValue) =>
				{
					if (pError)
					{
						return tmpCallback(pError, '');
					}
					return tmpCallback(null, pValue);
				}, pContextArray, pScope);
		}
		else
		{
			this.pict.parseTemplateByHash(tmpTemplateHash, this.resolveStateFromAddress(tmpAddressOfData, tmpData, pContextArray, null, pScope),
				(pError, pValue) =>
				{
					if (pError)
					{
						return tmpCallback(pError, '');
					}
					return tmpCallback(null, pValue);
				}, pContextArray, pScope);
		}
	}
}

module.exports = PictTemplateProviderTemplate;
