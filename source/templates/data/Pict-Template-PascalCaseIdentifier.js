const libPictTemplate = require('pict-template');

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

		/** @type {any} */
		this.options;
		/** @type {any} */
		this.log;

		this.addPattern('{~PascalCaseIdentifier:', '~}');
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
			this.log.trace(`PICT Template [fPascalCaseIdentifier]::[${tmpHash}] with tmpData:`, tmpData);
		}
		else if (this.pict.LogNoisiness > 3)
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

