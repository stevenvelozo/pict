const libPictTemplate = require('../../Pict-Template.js');

class PictTemplateProviderPascalCaseIdentifier extends libPictTemplate
{
	/**
	 * @param {Object} pFable - The Fable Framework instance
	 * @param {Object} pOptions - The options for the service
	 * @param {String} pServiceHash - The hash of the service
	 */
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		this.addPattern('{~PascalCaseIdentifier:', '~}');
	}

	render(pHash, pData, pContextArray)
	{
		let tmpHash = pHash.trim();
		let tmpData = (typeof (pData) === 'object') ? pData : {};

		if (this.LogNoisiness > 4)
		{
			this.log.trace(`PICT Template [fPascalCaseIdentifier]::[${tmpHash}] with tmpData:`, tmpData);
		}
		else if (this.LogNoisiness > 3)
		{
			this.log.trace(`PICT Template [fPascalCaseIdentifier]::[${tmpHash}]`);
		}

		let tmpValue = this.resolveStateFromAddress(tmpHash, tmpData, pContextArray);
		if ((tmpValue == null) || (tmpValue == 'undefined') || (typeof (tmpValue) == 'undefined'))
		{
			return '';
		}
		return this.pict.DataFormat.cleanNonAlphaCharacters(this.pict.DataFormat.capitalizeEachWord(tmpValue));
	}
}

module.exports = PictTemplateProviderPascalCaseIdentifier;

/*
# DEAR DEAD CODE DIARY:

```javascript

```
*/

