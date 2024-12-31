const libPictTemplate = require('pict-template');

class PictTemplateProviderNotEmpty extends libPictTemplate
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

		this.addPattern('{~NotEmpty:', '~}');
		this.addPattern('{~NE:', '~}');
	}

	render(pTemplateHash, pRecord, pContextArray)
	{
		let tmpHash = pTemplateHash.trim();
		let tmpData = (typeof (pRecord) === 'object') ? pRecord : {};

		if (this.pict.LogNoisiness > 4)
		{
			this.log.trace(`PICT Template [fNotEmptyRender]::[${tmpHash}] with tmpData:`, tmpData);
		}
		else if (this.pict.LogNoisiness > 2)
		{
			this.log.trace(`PICT Template [fNotEmptyRender]::[${tmpHash}]`);
		}

		let tmpHashParts = tmpHash.split('^');

		// For now just check truthiness.  Not sure if this is grand.
		if (this.resolveStateFromAddress(tmpHashParts[0], tmpData, pContextArray))
		{
			return tmpHashParts[1];
		}
		else
		{
			return '';
		}
	}
}

module.exports = PictTemplateProviderNotEmpty;
