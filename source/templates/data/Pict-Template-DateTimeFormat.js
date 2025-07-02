const libPictTemplate = require('pict-template');

class PictTemplateProviderDateTimeFormat extends libPictTemplate
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

		this.addPattern('{~DateTimeFormat:', '~}');
		this.addPattern('{~DateFormat:', '~}'); // for backwards compatibility
	}

	/**
	 * Render a template expression, returning a string with the resulting content.
	 *
	 * @param {string} pTemplateHash - The hash contents of the template (what's between the template start and stop tags)
	 * @param {any} pRecord - The json object to be used as the Record for the template render
	 * @param {Array<any>} pContextArray - An array of context objects accessible from the template; safe to leave empty
	 * @param {any} [pScope] - A sticky scope that can be used to carry state and simplify template
	 *
	 * @return {string} The rendered template
	 */
	render(pTemplateHash, pRecord, pContextArray, pScope)
	{
		let tmpHash = pTemplateHash.trim();
		let tmpData = (typeof (pRecord) === 'object') ? pRecord : {};
		let tmpDateValueSet = tmpHash.split('^');

		if (tmpDateValueSet.length < 2)
		{
			this.log.error(`PICT Template [fDateTimeFormat]::[${tmpHash}] did not have a valid format string and date.`);
			return '';
		}

		let tmpDateValue = this.resolveStateFromAddress(tmpDateValueSet[0], tmpData, pContextArray, null, pScope);

		if (this.pict.LogNoisiness > 4)
		{
			this.log.trace(`PICT Template [fDateTimeFormat]::[${tmpHash}] with data:`, tmpData);
		}
		else if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PICT Template [fDateTimeFormat]::[${tmpHash}]`);
		}

		// TODO: Modularize this
		let tmpDayJS = this.fable.Dates.dayJS.utc(tmpDateValue);
		try
		{
			// Try to cast the day to be a specific timezone if one is set for the app
			if (this.options.Timezone)
			{
				tmpDayJS = tmpDayJS.tz(this.options.Timezone);
			}
			else
			{
				try
				{
					tmpDayJS = tmpDayJS.tz(this.fable.Dates.dayJS.tz.guess());
				}
				catch (pError)
				{
					this.log.error(`Error guessing dayJS guess() function; dates may be formatted to GMT by default. (${pError.message || pError})`);
				}
			}
		}
		catch
		{
			//this.log.error(`Error casting date passed timezone using tz .. casting to the browser guess which is [${this.fable.Dates.dayJS.tz.guess()}].`);
			// Day.js will try to guess the user's timezone for us
			try
			{
				tmpDayJS = tmpDayJS.tz(this.fable.Dates.dayJS.tz.guess());
			}
			catch (pError)
			{
				this.log.error(`Error guessing dayJS guess() function; dates may be formatted to GMT by default. (${pError.message || pError})`);
			}
		}

		return tmpDayJS.format(tmpDateValueSet[1]);
	}
}

module.exports = PictTemplateProviderDateTimeFormat;

/*
# DEAR DEAD CODE DIARY:

```javascript

```
*/

