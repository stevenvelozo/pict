const libPictTemplate = require('../Pict-Template.js');

class PictTemplateProviderTemplateValueSet extends libPictTemplate
{
	/**
	 * @param {Object} pFable - The Fable Framework instance
	 * @param {Object} pOptions - The options for the service
	 * @param {String} pServiceHash - The hash of the service
	 */
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		this.addPattern('{~TemplateValueSet:', '~}');
		this.addPattern('{~TVS:', '~}');
	}

	render(pHash, pData, pContextArray)
	{
		let tmpHash = pHash.trim();
		let tmpData = (typeof (pData) === 'object') ? pData : {};

		if (this.LogNoisiness > 4)
		{
			this.log.trace(`PICT Template [fTemplateValueSetRender]::[${tmpHash}] with tmpData:`, tmpData);
		}
		else if (this.LogNoisiness > 0)
		{
			this.log.trace(`PICT Template [fTemplateValueSetRender]::[${tmpHash}]`);
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

		tmpData = this.resolveStateFromAddress(tmpAddressOfData, tmpData, pContextArray);

		let tmpDataValueSet = [];
		if (Array.isArray(tmpData))
		{
			for (let i = 0; i < tmpData.length; i++)
			{
				tmpDataValueSet.push({ Value: tmpData[i] });
			}
		}
		else if (typeof (tmpData) === 'object')
		{
			let tmpValueKeys = Object.keys(tmpData);
			for (let i = 0; i < tmpValueKeys.length; i++)
			{
				tmpDataValueSet.push({ Value: tmpData[tmpValueKeys[i]] });
			}
		}
		else
		{
			tmpDataValueSet.push({ Value: tmpData });
		}
		tmpData = tmpDataValueSet;

		if (!tmpData)
		{
			// No address was provided, just render the template with what this template has.
			return this.pict.parseTemplateSetByHash(tmpTemplateHash, pData, pContextArray);
		}
		else
		{
			return this.pict.parseTemplateSetByHash(tmpTemplateHash, tmpData, pContextArray);
		}
	}
	renderAsync(pHash, pData, fCallback, pContextArray)
	{
		let tmpHash = pHash.trim();
		let tmpData = (typeof (pData) === 'object') ? pData : {};
		let tmpCallback = (typeof (fCallback) === 'function') ? fCallback : () => { return ''; };

		if (this.LogNoisiness > 4)
		{
			this.log.trace(`PICT Template [fTemplateValueSetRenderAsync]::[${tmpHash}] with tmpData:`, tmpData);
		}
		else if (this.LogNoisiness > 0)
		{
			this.log.trace(`PICT Template [fTemplateValueSetRenderAsync]::[${tmpHash}]`);
		}

		let tmpTemplateFromMapHash = false;
		let tmpAddressOfData = false;

		// This is a 3 part hash with the map address and the key address both
		let tmpTemplateHashPart = tmpHash.split(':');

		if (tmpTemplateHashPart.length < 2)
		{
			this.log.trace(`PICT TemplateFromMap [fTemplateRenderAsync]::[${tmpHash}] failed because there were not three stanzas in the expression [${pHash}]`);
			return fCallback(null, '');
		}

		tmpTemplateFromMapHash = tmpTemplateHashPart[0]
		tmpAddressOfData = tmpTemplateHashPart[1];

		// No TemplateFromMap hash
		if (!tmpTemplateFromMapHash)
		{
			this.log.warn(`Pict: TemplateFromMap Render Async: TemplateFromMapHash not resolved for [${tmpHash}]`);
			return fCallback(null, '');
		}

		// Now resolve the data
		tmpData = this.resolveStateFromAddress(tmpAddressOfData, tmpData, pContextArray);

		let tmpDataValueSet = [];
		if (Array.isArray(tmpData))
		{
			for (let i = 0; i < tmpData.length; i++)
			{
				tmpDataValueSet.push({ Value: tmpData[i] });
			}
		}
		else if (typeof (tmpData) === 'object')
		{
			let tmpValueKeys = Object.keys(tmpData);
			for (let i = 0; i < tmpValueKeys.length; i++)
			{
				tmpDataValueSet.push({ Value: tmpData[tmpValueKeys[i]] });
			}
		}
		else
		{
			tmpDataValueSet.push({ Value: tmpData });
		}
		tmpData = tmpDataValueSet;

		if (!tmpData)
		{
			// No address was provided, just render the template with what this template has.
			// The async portion of this is a mind bender because of how entry can happen dynamically from templates
			return this.pict.parseTemplateSetByHash(tmpTemplateFromMapHash, pData,
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
			return this.pict.parseTemplateSetByHash(tmpTemplateFromMapHash, tmpData,
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

module.exports = PictTemplateProviderTemplateValueSet;
