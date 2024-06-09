const libPictTemplate = require('../../Pict-Template.js');

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

		this.addPattern('{~NotEmpty:', '~}');
		this.addPattern('{~NE:', '~}');
	}

	render(pHash, pData, pContextArray)
	{
		let tmpHash = pHash.trim();
		let tmpData = (typeof (pData) === 'object') ? pData : {};

		if (this.LogNoisiness > 4)
		{
			this.log.trace(`PICT Template [fNotEmptyRender]::[${tmpHash}] with tmpData:`, tmpData);
		}
		else if (this.LogNoisiness > 2)
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
