const libPictTemplate = require('pict-template');

class PictTemplateProviderDataEncodeJavascriptString extends libPictTemplate
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

		this.addPattern('{~DataEncodeJavascriptString:', '~}');
		this.addPattern('{~DEJS:', '~}');
	}

	render(pTemplateHash, pRecord, pContextArray)
	{
		let tmpHash = pTemplateHash.trim();
		let tmpData = (typeof (pRecord) === 'object') ? pRecord : {};

		if (this.pict.LogNoisiness > 4)
		{
			this.log.trace(`PICT Template [fDataJson]::[${tmpHash}] with tmpData:`, tmpData);
		}
		else if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PICT Template [fDataJson]::[${tmpHash}]`);
		}

		let tmpDataToEncode = this.resolveStateFromAddress(tmpHash, tmpData, pContextArray);

		return this.pict.DataFormat.stringEncodeForJavascript(tmpDataToEncode);
	}
}

module.exports = PictTemplateProviderDataEncodeJavascriptString;
