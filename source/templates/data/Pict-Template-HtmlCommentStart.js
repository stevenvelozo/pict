const libPictTemplate = require('pict-template');

class PictTemplateProviderHTMLCommandStart extends libPictTemplate
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

		this.addPattern('{~HtmlCommentStart:', '~}');
		this.addPattern('{~HCS:', '~}');
	}

	render(pTemplateHash, pRecord, pContextArray)
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

		let tmpValue = false;
		if (tmpHash != null)
		{
			tmpValue = this.resolveStateFromAddress(tmpHash, tmpRecord, pContextArray);
		}
		if (!tmpValue)
		{
			return '<!-- ';
		}
		return '';
	}
}

module.exports = PictTemplateProviderHTMLCommandStart;
