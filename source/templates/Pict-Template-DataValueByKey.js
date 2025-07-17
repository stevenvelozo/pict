const libPictTemplate = require('pict-template');

class PictTemplateProviderDataValueByKey extends libPictTemplate
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

		this.addPattern('{~DataValueByKey:', '~}');
		this.addPattern('{~DVBK:', '~}');
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
		let tmpRecord = (typeof(pRecord) === 'object') ? pRecord : {};

		if (this.pict.LogNoisiness > 4)
		{
			this.log.trace(`PICT Template [fDataRender]::[${tmpHash}] with tmpData:`, tmpRecord);
		}
		else if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PICT Template [fDataRender]::[${tmpHash}]`);
		}

		let tmpHashArray = tmpHash.split(':');

		if (tmpHashArray.length < 2)
		{
			this.log.trace(`PICT Template [fDataRender]::[${tmpHash}] failed because there were not two stanzas in the expression [${pTemplateHash}]`);
			return '';
		}

		let tmpDefaultValue = '';
		if (tmpHashArray.length > 2)
		{
			tmpDefaultValue = tmpHashArray[2];
		}

		let tmpValueObject = this.resolveStateFromAddress(tmpHashArray[0], tmpRecord, pContextArray, null, pScope, pState);
		let tmpValueAddress = this.resolveStateFromAddress(tmpHashArray[1], tmpRecord, pContextArray, null, pScope, pState);
		let tmpValue = this.pict.manifest.getValueByHash(tmpValueObject, tmpValueAddress);
		if ((tmpValue == null) || (tmpValue == 'undefined') || (typeof(tmpValue) == 'undefined'))
		{
			return tmpDefaultValue;
		}
		return tmpValue;
	}
}

module.exports = PictTemplateProviderDataValueByKey;
