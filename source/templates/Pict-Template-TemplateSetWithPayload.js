const libPictTemplate = require('pict-template');

class PictTemplateProviderTemplateSetWithPayload extends libPictTemplate
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

		this.addPattern('{~TemplateSetWithPayload:', '~}');
		this.addPattern('{~TSWP:', '~}');
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

		if (this.pict.LogNoisiness > 4)
		{
			this.log.trace(`PICT Template [fTemplateSetWithPayloadRender]::[${tmpHash}] with record:`, pRecord);
		}
		else if (this.pict.LogNoisiness > 0)
		{
			this.log.trace(`PICT Template [fTemplateSetWithPayloadRender]::[${tmpHash}]`);
		}

		let tmpTemplateHash;
		let tmpAddressOfData;
		let tmpAddressOfPayload;

		// This is just a simple 3 part hash (template, address of set, address of payload)
		let tmpTemplateHashes = tmpHash.trim().split(':');
		if (tmpTemplateHashes.length < 3)
		{
			this.log.trace(`PICT Template [fTemplateSetWithPayloadRender]::[${tmpHash}] failed because there were not three stanzas in the expression [${pTemplateHash}]`);
			return ``;
		}
		tmpTemplateHash = tmpTemplateHashes[0];
		tmpAddressOfData = tmpTemplateHashes[1];
		tmpAddressOfPayload = tmpTemplateHashes[2];

		let tmpData = this.resolveStateFromAddress(tmpAddressOfData, pRecord, pContextArray, null, pScope);
		if (!tmpData)
		{
			tmpData = pRecord;
		}
		if (!tmpData)
		{
			tmpData = {};
		}

		let tmpPayloadData = this.resolveStateFromAddress(tmpAddressOfPayload, pRecord, pContextArray, null, pScope);
		if (!tmpPayloadData)
		{
			tmpPayloadData = pRecord;
		}
		if (!tmpPayloadData)
		{
			tmpPayloadData = {};
		}

		return this.pict.parseTemplateSetWithPayloadByHash(tmpTemplateHash, tmpData, tmpPayloadData, null, pContextArray, pScope);
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
		let tmpCallback = (typeof (fCallback) === 'function') ? fCallback : () => { return ''; };

		if (this.pict.LogNoisiness > 4)
		{
			this.log.trace(`PICT Template [fTemplateSetWithPayloadRenderAsync]::[${tmpHash}]`);
		}
		else if (this.pict.LogNoisiness > 0)
		{
			this.log.trace(`PICT Template [fTemplateSetWithPayloadRenderAsync]::[${tmpHash}]`);
		}

		let tmpTemplateHash;
		let tmpAddressOfData;
		let tmpAddressOfPayload;

		// This is just a simple 3 part hash (template, address of set, address of payload)
		let tmpTemplateHashes = tmpHash.trim().split(':');
		if (tmpTemplateHashes.length < 3)
		{
			this.log.trace(`PICT Template [fTemplateSetWithPayloadRender]::[${tmpHash}] failed because there were not three stanzas in the expression [${pTemplateHash}]`);
			return fCallback(null, '');
		}
		tmpTemplateHash = tmpTemplateHashes[0];
		tmpAddressOfData = tmpTemplateHashes[1];
		tmpAddressOfPayload = tmpTemplateHashes[2];

		let tmpData = this.resolveStateFromAddress(tmpAddressOfData, pRecord, pContextArray, null, pScope);
		if (!tmpData)
		{
			tmpData = pRecord;
		}
		if (!tmpData)
		{
			tmpData = {};
		}

		let tmpPayloadData = this.resolveStateFromAddress(tmpAddressOfPayload, pRecord, pContextArray, null, pScope);
		if (!tmpPayloadData)
		{
			tmpPayloadData = pRecord;
		}
		if (!tmpPayloadData)
		{
			tmpPayloadData = {};
		}

		this.pict.parseTemplateSetWithPayloadByHash(tmpTemplateHash, tmpData, tmpPayloadData,
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

module.exports = PictTemplateProviderTemplateSetWithPayload;
