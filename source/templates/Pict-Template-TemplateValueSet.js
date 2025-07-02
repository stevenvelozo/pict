const libPictTemplate = require('pict-template');

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

		/** @type {any} */
		this.log;

		this.addPattern('{~TemplateValueSet:', '~}');
		this.addPattern('{~TVS:', '~}');
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
			this.log.trace(`PICT Template [fTemplateValueSetRender]::[${tmpHash}] with tmpData:`, tmpData);
		}
		else if (this.pict.LogNoisiness > 0)
		{
			this.log.trace(`PICT Template [fTemplateValueSetRender]::[${tmpHash}]`);
		}

		let tmpTemplateHash;
		let tmpAddressOfData;

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
			return '';
		}

		tmpData = this.resolveStateFromAddress(tmpAddressOfData, tmpData, pContextArray, null, pScope);

		let tmpDataValueSet = [];
		if (Array.isArray(tmpData))
		{
			for (let i = 0; i < tmpData.length; i++)
			{
				tmpDataValueSet.push({ Value: tmpData[i], Key: i });
			}
		}
		else if (typeof (tmpData) === 'object')
		{
			let tmpValueKeys = Object.keys(tmpData);
			for (let i = 0; i < tmpValueKeys.length; i++)
			{
				tmpDataValueSet.push({ Value: tmpData[tmpValueKeys[i]], Key: tmpValueKeys[i] });
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
			return this.pict.parseTemplateSetByHash(tmpTemplateHash, pRecord, null, pContextArray, pScope);
		}
		else
		{
			return this.pict.parseTemplateSetByHash(tmpTemplateHash, tmpData, null, pContextArray, pScope);
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
			this.log.trace(`PICT Template [fTemplateValueSetRenderAsync]::[${tmpHash}] with tmpData:`, tmpData);
		}
		else if (this.pict.LogNoisiness > 0)
		{
			this.log.trace(`PICT Template [fTemplateValueSetRenderAsync]::[${tmpHash}]`);
		}

		let tmpTemplateFromMapHash;
		let tmpAddressOfData;

		// This is a 3 part hash with the map address and the key address both
		let tmpTemplateHashPart = tmpHash.split(':');

		if (tmpTemplateHashPart.length < 2)
		{
			this.log.trace(`PICT TemplateFromMap [fTemplateRenderAsync]::[${tmpHash}] failed because there were not three stanzas in the expression [${pTemplateHash}]`);
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
		tmpData = this.resolveStateFromAddress(tmpAddressOfData, tmpData, pContextArray, null, pScope);

		let tmpDataValueSet = [];
		if (Array.isArray(tmpData))
		{
			for (let i = 0; i < tmpData.length; i++)
			{
				tmpDataValueSet.push({ Value: tmpData[i], Key: i });
			}
		}
		else if (typeof (tmpData) === 'object')
		{
			let tmpValueKeys = Object.keys(tmpData);
			for (let i = 0; i < tmpValueKeys.length; i++)
			{
				tmpDataValueSet.push({ Value: tmpData[tmpValueKeys[i]], Key: tmpData[tmpValueKeys[i]] });
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
			this.pict.parseTemplateSetByHash(tmpTemplateFromMapHash, pRecord,
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
			this.pict.parseTemplateSetByHash(tmpTemplateFromMapHash, tmpData,
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

module.exports = PictTemplateProviderTemplateValueSet;
