const libPictTemplate = require('../Pict-Template.js');

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

		this.addPattern('{~Template:', '~}');
		this.addPattern('{~T:', '~}');
	}

	render(pTemplateHash, pRecord, pContextArray)
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

		let tmpTemplateHash = false;
		let tmpAddressOfData = false;

		// This is just a simple 2 part hash (the entity and the ID)
		let tmpHashTemplateSeparator = tmpHash.indexOf(':');
		tmpTemplateHash = tmpHash.substring(0, tmpHashTemplateSeparator);
		if (tmpHashTemplateSeparator > -1)
		{
			tmpAddressOfData = tmpHash.substring(tmpHashTemplateSeparator + 1);
		}
		else
		{
			tmpTemplateHash = tmpHash;
		}

		// No template hash
		if (!tmpTemplateHash)
		{
			this.log.warn(`Pict: Template Render: TemplateHash not resolved for [${tmpHash}]`);
			return `Pict: Template Render: TemplateHash not resolved for [${tmpHash}]`;
		}

		if (!tmpAddressOfData)
		{
			// No address was provided, just render the template with what this template has.
			return this.pict.parseTemplateByHash(tmpTemplateHash, pRecord, null, pContextArray);
		}
		else
		{
			return this.pict.parseTemplateByHash(tmpTemplateHash, this.resolveStateFromAddress(tmpAddressOfData, tmpData, pContextArray), null, pContextArray);
		}
	}

	renderAsync(pTemplateHash, pRecord, fCallback, pContextArray)
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

		let tmpTemplateHash = false;
		let tmpAddressOfData = false;

		// This is just a simple 2 part hash (the entity and the ID)
		let tmpHashTemplateSeparator = tmpHash.indexOf(':');
		tmpTemplateHash = tmpHash.substring(0, tmpHashTemplateSeparator);
		if (tmpHashTemplateSeparator > -1)
		{
			tmpAddressOfData = tmpHash.substring(tmpHashTemplateSeparator + 1);
		}
		else
		{
			tmpTemplateHash = tmpHash;
		}

		// No template hash
		if (!tmpTemplateHash)
		{
			this.log.warn(`Pict: Template Render Async: TemplateHash not resolved for [${tmpHash}]`);
			return `Pict: Template Render Async: TemplateHash not resolved for [${tmpHash}]`;
		}

		if (!tmpAddressOfData)
		{
			// No address was provided, just render the template with what this template has.
			// The async portion of this is a mind bender because of how entry can happen dynamically from templates
			return this.pict.parseTemplateByHash(tmpTemplateHash, pRecord,
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
			return this.pict.parseTemplateByHash(tmpTemplateHash, this.resolveStateFromAddress(tmpAddressOfData, tmpData, pContextArray),
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

module.exports = PictTemplateProviderTemplate;
