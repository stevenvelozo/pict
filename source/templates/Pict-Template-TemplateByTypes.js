const libPictTemplate = require('pict-template');

class PictTemplateProviderTemplateByTypes extends libPictTemplate
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

		this.addPattern('{~TemplateByType:', '~}');
		this.addPattern('{~TBT:', '~}');
	}

	/**
	 * Render a template expression if it's in the passed-in types, otherwise falling back to a fallback template, returning a string with the resulting content.
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
			this.log.trace(`PICT Template [fTemplateRender]::[${tmpHash}] with tmpData:`, tmpData);
		}
		else if (this.pict.LogNoisiness > 0)
		{
			this.log.trace(`PICT Template [fTemplateRender]::[${tmpHash}]`);
		}

		let tmpAddressToTest;
		let tmpDataTypesToTest;
		let tmpTemplateHash;
		let tmpAddressOfData;
		let tmpFallbackTemplate;

		// This is {~TBT:AppData.Some.Address.To.Test:string,number:SomeTemplate:FallbackTemplate~}
		let tmpTemplateHashes = tmpHash.trim().split(':');

		if (tmpTemplateHashes.length < 3)
		{
			return '';
		}

		tmpAddressToTest = tmpTemplateHashes[0];
		tmpDataTypesToTest = tmpTemplateHashes[1].split(',');
		tmpTemplateHash = tmpTemplateHashes[2];

		if (tmpTemplateHashes.length > 3)
		{
			tmpAddressOfData = tmpTemplateHashes[3];
		}

		if (tmpTemplateHashes.length > 4)
		{
			tmpFallbackTemplate = tmpTemplateHashes[4];
		}

		// No template hash
		if (!tmpTemplateHash)
		{
			return '';
		}

		let tmpRecord = pRecord;
		if (tmpAddressOfData)
		{
			tmpRecord = this.resolveStateFromAddress(tmpAddressOfData, tmpData, pContextArray, null, pScope, pState);
		}

		let tmpTypeOfDataAtAddress = typeof(this.resolveStateFromAddress(tmpAddressToTest, tmpData, pContextArray, null, pScope, pState));
		if (tmpTypeOfDataAtAddress == 'object')
		{
			// Test if it's an array
			if (Array.isArray(this.resolveStateFromAddress(tmpAddressToTest, tmpData, pContextArray, null, pScope, pState)))
			{
				tmpTypeOfDataAtAddress = 'array';
			}
		}
		if (tmpDataTypesToTest.indexOf(tmpTypeOfDataAtAddress) === -1)
		{
			// Type not found, use the fallback template if we have one.
			if (tmpFallbackTemplate)
			{
				tmpTemplateHash = tmpFallbackTemplate;
			}
			else
			{
				return '';
			}
		}

		// No address was provided, just render the template with what this template has.
		return this.pict.parseTemplateByHash(tmpTemplateHash, tmpRecord, null, pContextArray, pScope, pState);
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
			this.log.trace(`PICT Template [fTemplateRenderAsync]::[${tmpHash}] with tmpData:`, tmpData);
		}
		else if (this.pict.LogNoisiness > 0)
		{
			this.log.trace(`PICT Template [fTemplateRenderAsync]::[${tmpHash}]`);
		}

		let tmpAddressToTest;
		let tmpDataTypesToTest;
		let tmpTemplateHash;
		let tmpAddressOfData;
		let tmpFallbackTemplate;

		// This is {~TBT:AppData.Some.Address.To.Test:string,number:SomeTemplate:FallbackTemplate~}
		let tmpTemplateHashes = tmpHash.trim().split(':');

		if (tmpTemplateHashes.length < 3)
		{
			return fCallback(null, '');
		}

		tmpAddressToTest = tmpTemplateHashes[0];
		tmpDataTypesToTest = tmpTemplateHashes[1].split(',');
		tmpTemplateHash = tmpTemplateHashes[2];

		if (tmpTemplateHashes.length > 3)
		{
			tmpAddressOfData = tmpTemplateHashes[3];
		}

		if (tmpTemplateHashes.length > 4)
		{
			tmpFallbackTemplate = tmpTemplateHashes[4];
		}

		// No template hash
		if (!tmpTemplateHash)
		{
			return fCallback(null, '');
		}

		let tmpRecord = pRecord;
		if (tmpAddressOfData)
		{
			tmpRecord = this.resolveStateFromAddress(tmpAddressOfData, tmpData, pContextArray, null, pScope, pState);
		}

		let tmpTypeOfDataAtAddress = typeof(this.resolveStateFromAddress(tmpAddressToTest, tmpData, pContextArray, null, pScope, pState));
		if (tmpTypeOfDataAtAddress == 'object')
		{
			// Test if it's an array
			if (Array.isArray(this.resolveStateFromAddress(tmpAddressToTest, tmpData, pContextArray, null, pScope, pState)))
			{
				tmpTypeOfDataAtAddress = 'array';
			}
		}
		if (tmpDataTypesToTest.indexOf(tmpTypeOfDataAtAddress) === -1)
		{
			// Type not found, use the fallback template if we have one.
			if (tmpFallbackTemplate)
			{
				tmpTemplateHash = tmpFallbackTemplate;
			}
			else
			{
				return fCallback(null, '');
			}
		}

		// No address was provided, just render the template with what this template has.
		this.pict.parseTemplateByHash(tmpTemplateHash, tmpRecord,
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

module.exports = PictTemplateProviderTemplateByTypes;
