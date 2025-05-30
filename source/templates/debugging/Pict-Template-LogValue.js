const libPictTemplate = require('pict-template');

class PictTemplateProviderLogValue extends libPictTemplate
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

		this.addPattern('{~LogValue:', '~}');
		this.addPattern('{~LV:', '~}');
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

		let tmpValue = this.resolveStateFromAddress(tmpHash, tmpData, pContextArray);
		let tmpValueType = typeof (tmpValue);
		if ((tmpValue == null) || (tmpValueType == 'undefined'))
		{
			this.log.trace(`PICT Template Log Value: [${tmpHash}] is ${tmpValueType}.`);
		}
		else if (tmpValueType == 'object')
		{
			this.log.trace(`PICT Template Log Value: [${tmpHash}] is an object.`, tmpValue);
		}
		else
		{
			this.log.trace(`PICT Template Log Value: [${tmpHash}] is a ${tmpValueType} = [${tmpValue}]`);
		}
		return '';
	}
}

module.exports = PictTemplateProviderLogValue;
