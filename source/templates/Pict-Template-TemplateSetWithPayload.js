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

	render(pTemplateHash, pRecord, pContextArray)
	{
		let tmpHash = pTemplateHash.trim();

		if (this.pict.LogNoisiness > 4)
		{
			this.log.trace(`PICT Template [fTemplateSetWithPayloadRender]::[${tmpHash}] with tmpData:`, tmpData);
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

		let tmpData = this.resolveStateFromAddress(tmpAddressOfData, pRecord, pContextArray);
		if (!tmpData)
		{
			tmpData = pRecord;
		}
		if (!tmpData)
		{
			tmpData = {};
		}

		let tmpPayloadData = this.resolveStateFromAddress(tmpAddressOfPayload, pRecord, pContextArray);
		if (!tmpPayloadData)
		{
			tmpPayloadData = pRecord;
		}
		if (!tmpPayloadData)
		{
			tmpPayloadData = {};
		}

		return this.pict.parseTemplateSetWithPayloadByHash(tmpTemplateHash, tmpData, tmpPayloadData, null, pContextArray);
	}

	renderAsync(pTemplateHash, pRecord, fCallback, pContextArray)
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
			return ``;
		}
		tmpTemplateHash = tmpTemplateHashes[0];
		tmpAddressOfData = tmpTemplateHashes[1];
		tmpAddressOfPayload = tmpTemplateHashes[2];

		let tmpData = this.resolveStateFromAddress(tmpAddressOfData, pRecord, pContextArray);
		if (!tmpData)
		{
			tmpData = pRecord;
		}
		if (!tmpData)
		{
			tmpData = {};
		}

		let tmpPayloadData = this.resolveStateFromAddress(tmpAddressOfPayload, pRecord, pContextArray);
		if (!tmpPayloadData)
		{
			tmpPayloadData = pRecord;
		}
		if (!tmpPayloadData)
		{
			tmpPayloadData = {};
		}

		return this.pict.parseTemplateSetWithPayloadByHash(tmpTemplateHash, tmpData, tmpPayloadData, this.resolveStateFromAddress(tmpAddressOfPayload, pRecord, pContextArray),
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

module.exports = PictTemplateProviderTemplateSetWithPayload;
