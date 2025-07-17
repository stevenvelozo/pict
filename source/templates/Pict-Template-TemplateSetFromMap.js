const libPictTemplate = require('pict-template');

class PictTemplateProviderTemplateSetFromMap extends libPictTemplate
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

		this.addPattern('{~TSFM:', '~}');
		this.addPattern('{~TemplateSetFromMap:', '~}');
	}

	/**
	 * Render a template expression, returning a string with the resulting content.
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
		let tmpData = (typeof (pRecord) === 'object') ? pRecord : {};

		if (this.pict.LogNoisiness > 4)
		{
			this.log.trace(`PICT TemplateFromMap [fTemplateFromMapSetRender]::[${tmpHash}] with tmpData:`, tmpData);
		}
		else if (this.pict.LogNoisiness > 0)
		{
			this.log.trace(`PICT TemplateFromMap [fTemplateFromMapSetRender]::[${tmpHash}]`);
		}

		let tmpTemplateFromMapHash;
		let tmpAddressOfMap;
		let tmpAddressOfKey;

		// This is a 3 part hash with the map address and the key address both
		let tmpTemplateHashPart = tmpHash.split(':');

		if (tmpTemplateHashPart.length < 3)
		{
			this.log.trace(`PICT TemplateFromMap [fTemplateFromMapRenderAsync]::[${tmpHash}] failed because there were not three stanzas in the expression [${pTemplateHash}]`);
			return '';
		}

		tmpTemplateFromMapHash = tmpTemplateHashPart[0];
		tmpAddressOfMap = tmpTemplateHashPart[1];
		tmpAddressOfKey = tmpTemplateHashPart[2];

		// No TemplateFromMap hash
		if (!tmpTemplateFromMapHash)
		{
			this.log.warn(`Pict: TemplateFromMap Render Async: TemplateFromMapHash not resolved for [${tmpHash}]`);
			return '';
		}

		// Now resolve the data
		let tmpMap = this.resolveStateFromAddress(tmpAddressOfMap, tmpData, pContextArray, null, pScope, pState);
		let tmpKey = this.resolveStateFromAddress(tmpAddressOfKey, tmpData, pContextArray, null, pScope, pState);

		if (!tmpMap)
		{
			this.log.warn(`Pict: TemplateFromMap Render: Map not resolved for [${tmpHash}]`);
			return '';
		}

		tmpData = tmpMap[tmpKey];

		if (!tmpData)
		{
			// No address was provided, just render the TemplateFromMap with what this TemplateFromMap has.
			return this.pict.parseTemplateSetByHash(tmpTemplateFromMapHash, pRecord, null, pContextArray, pScope, pState);
		}
		else
		{
			return this.pict.parseTemplateSetByHash(tmpTemplateFromMapHash, tmpData, null, pContextArray, pScope, pState);
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
	 * @param {any} [pState] - A catchall state object for plumbing data through template processing.
	 *
	 * @return {void}
	 */
	renderAsync(pTemplateHash, pRecord, fCallback, pContextArray, pScope, pState)
	{
		let tmpHash = pTemplateHash.trim();
		let tmpData = (typeof (pRecord) === 'object') ? pRecord : {};
		let tmpCallback = (typeof (fCallback) === 'function') ? fCallback : () => { return ''; };

		if (this.pict.LogNoisiness > 4)
		{
			this.log.trace(`PICT TemplateFromMap [fTemplateFromMapSetRenderAsync]::[${tmpHash}] with tmpData:`, tmpData);
		}
		else if (this.pict.LogNoisiness > 0)
		{
			this.log.trace(`PICT TemplateFromMap [fTemplateFromMapSetRenderAsync]::[${tmpHash}]`);
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
			this.log.warn(`Pict: TemplateFromMapSet Render Async: TemplateFromMapHash not resolved for [${tmpHash}]`);
			return fCallback(null, '');
		}

		// Now resolve the data
		let tmpMap = this.resolveStateFromAddress(tmpAddressOfMap, tmpData, pContextArray, null, pScope, pState);
		let tmpKey = this.resolveStateFromAddress(tmpAddressOfKey, tmpData, pContextArray, null, pScope, pState);

		if (!tmpMap)
		{
			this.log.warn(`Pict: TemplateFromMapSet Render: Map not resolved for [${tmpHash}]`);
			return fCallback(null, '');
		}

		tmpData = tmpMap[tmpKey];

		if (!tmpData)
		{
			// No address was provided, just render the TemplateFromMap with what this TemplateFromMap has.
			// The async portion of this is a mind bender because of how entry can happen dynamically from TemplateFromMaps
			this.pict.parseTemplateSetByHash(tmpTemplateFromMapHash, pRecord,
				(pError, pValue) =>
				{
					if (pError)
					{
						return tmpCallback(pError, '');
					}
					return tmpCallback(null, pValue);
				}, pContextArray, pScope, pState);
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
				}, pContextArray, pScope, pState);
		}
	}
}

module.exports = PictTemplateProviderTemplateSetFromMap;
