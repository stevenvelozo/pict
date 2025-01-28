const libPictTemplate = require('pict-template');

class PictTemplateProviderDateOnlyYMD extends libPictTemplate
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

		this.addPattern('{~DateOnlyYMD:', '~}');
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
		let tmpDateValue = this.resolveStateFromAddress(tmpHash, tmpData, pContextArray);


		if (this.pict.LogNoisiness > 4)
		{
			this.log.trace(`PICT Template [fDateTimeYMD]::[${tmpHash}] with data:`, tmpData);
		}
		else if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PICT Template [fDateTimeYMD]::[${tmpHash}]`);
		}

		// TODO: Modularize this
		const tmpDayJS = this.fable.Dates.dayJS.utc(tmpDateValue).tz('UTC');
		//FIXME: this is kind of wacked out; -62167219200000 is the unix ms timestamp for 0000-01-01 00:00:00 UTC
		//       not even sure showing negative is right; showing the era is probably better (BCE vs CE)
		const prefix = tmpDayJS.valueOf() < -62167219200000 ? '-' : '';

		return prefix + tmpDayJS.format('YYYY-MM-DD');
	}
}

module.exports = PictTemplateProviderDateOnlyYMD;
