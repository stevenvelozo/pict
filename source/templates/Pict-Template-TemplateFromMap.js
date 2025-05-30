const libPictTemplate = require('pict-template');

class PictTemplateProviderTemplateFromMap extends libPictTemplate
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

		this.addPattern('{~TFM:', '~}');
		this.addPattern('{~TemplateFromMap:', '~}');
	}

	/**
	 * Render a template expression, returning a string with the resulting content.
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
		let tmpData = (typeof (pRecord) === 'object') ? pRecord : {};

		if (this.pict.LogNoisiness > 4)
		{
			this.log.trace(`PICT TemplateFromMap [fTemplateFromMapRender]::[${tmpHash}] with tmpData:`, tmpData);
		}
		else if (this.pict.LogNoisiness > 0)
		{
			this.log.trace(`PICT TemplateFromMap [fTemplateFromMapRender]::[${tmpHash}]`);
		}

		let tmpTemplateFromMapHash;
		let tmpAddressOfMap;
		let tmpAddressOfKey;

		// This is a 3 part hash with the map address and the key address both
		let tmpTemplateHashPart = tmpHash.split(':');

		if (tmpTemplateHashPart.length < 3)
		{
			this.log.trace(`PICT TemplateFromMap [fTemplateFromMapRenderAsync]::[${tmpHash}] failed because there were not three stanzas in the expression [${pTemplateHash}]`);
			return ''
		}

		tmpTemplateFromMapHash = tmpTemplateHashPart[0];
		tmpAddressOfMap = tmpTemplateHashPart[1];
		tmpAddressOfKey = tmpTemplateHashPart[2];

		// No TemplateFromMap hash
		if (!tmpTemplateFromMapHash)
		{
			this.log.warn(`Pict: TemplateFromMap Render: TemplateFromMapHash not resolved for [${tmpHash}]`);
			return '';
		}

		// Now resolve the data
		let tmpMap = this.resolveStateFromAddress(tmpAddressOfMap, tmpData, pContextArray);
		let tmpKey = this.resolveStateFromAddress(tmpAddressOfKey, tmpData, pContextArray);

		if (!tmpMap)
		{
			this.log.warn(`Pict: TemplateFromMap Render: Map not resolved for [${tmpHash}]`);
			return '';
		}

		tmpData = tmpMap[tmpKey];

		if (!tmpData)
		{
			// No address was provided, just render the TemplateFromMap with what this TemplateFromMap has.
			return this.pict.parseTemplateByHash(tmpTemplateFromMapHash, pRecord, null, pContextArray);
		}
		else
		{
			return this.pict.parseTemplateByHash(tmpTemplateFromMapHash, tmpData, null, pContextArray);
		}
	}

	/**
	 * Render a template expression, deliver a string with the resulting content to a callback function.
	 *
	 * @param {string} pTemplateHash - The hash contents of the template (what's between the template start and stop tags)
	 * @param {any} pRecord - The json object to be used as the Record for the template render
	 * @param {Array<any>} pContextArray - An array of context objects accessible from the template; safe to leave empty
	 * @param {(error?: Error, content?: String) => void} fCallback - callback function invoked with the rendered template, or an error
	 *
	 * @return {void}
	 */
	renderAsync(pTemplateHash, pRecord, fCallback, pContextArray)
	{
		let tmpHash = pTemplateHash.trim();
		let tmpData = (typeof (pRecord) === 'object') ? pRecord : {};
		let tmpCallback = (typeof (fCallback) === 'function') ? fCallback : () => { return ''; };

		if (this.pict.LogNoisiness > 4)
		{
			this.log.trace(`PICT TemplateFromMap [fTemplateFromMapRenderAsync]::[${tmpHash}] with tmpData:`, tmpData);
		}
		else if (this.pict.LogNoisiness > 0)
		{
			this.log.trace(`PICT TemplateFromMap [fTemplateFromMapRenderAsync]::[${tmpHash}]`);
		}

		let tmpTemplateFromMapHash;
		let tmpAddressOfMap;
		let tmpAddressOfKey;

		// This is a 3 part hash with the map address and the key address both
		let tmpTemplateHashPart = tmpHash.split(':');

		if (tmpTemplateHashPart.length < 3)
		{
			this.log.trace(`PICT TemplateFromMap [fTemplateFromMapRenderAsync]::[${tmpHash}] failed because there were not three stanzas in the expression [${pTemplateHash}]`);
			return fCallback(null, '');
		}

		tmpTemplateFromMapHash = tmpTemplateHashPart[0];
		tmpAddressOfMap = tmpTemplateHashPart[1];
		tmpAddressOfKey = tmpTemplateHashPart[2];

		// No TemplateFromMap hash
		if (!tmpTemplateFromMapHash)
		{
			this.log.warn(`Pict: TemplateFromMap Render Async: TemplateFromMapHash not resolved for [${tmpHash}]`);
			return fCallback(null, '');
		}

		// Now resolve the data
		let tmpMap = this.resolveStateFromAddress(tmpAddressOfMap, tmpData, pContextArray);
		let tmpKey = this.resolveStateFromAddress(tmpAddressOfKey, tmpData, pContextArray);

		if (!tmpMap)
		{
			this.log.warn(`Pict: TemplateFromMap Render: Map not resolved for [${tmpHash}]`);
			return fCallback(null, '');
		}

		tmpData = tmpMap[tmpKey];

		if (!tmpData)
		{
			// No address was provided, just render the TemplateFromMap with what this TemplateFromMap has.
			// The async portion of this is a mind bender because of how entry can happen dynamically from TemplateFromMaps
			this.pict.parseTemplateByHash(tmpTemplateFromMapHash, pRecord,
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
			this.pict.parseTemplateByHash(tmpTemplateFromMapHash, tmpData,
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

module.exports = PictTemplateProviderTemplateFromMap;
