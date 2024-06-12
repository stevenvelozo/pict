const libPictTemplate = require('../../Pict-Template.js');

class PictTemplateProviderDateFormat extends libPictTemplate
{
	/**
	 * @param {Object} pFable - The Fable Framework instance
	 * @param {Object} pOptions - The options for the service
	 * @param {String} pServiceHash - The hash of the service
	 */
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		this.addPattern('{~DateFormat:', '~}');
	}

	render(pTemplateHash, pRecord, pContextArray)
	{
		let tmpHash = pTemplateHash.trim();
		let tmpData = (typeof (pRecord) === 'object') ? pRecord : {};
		let tmpDateValueSet = tmpHash.split('^');

		if (tmpDateValueSet.length < 2)
		{
			this.log.error(`PICT Template [fDateFormat]::[${tmpHash}] did not have a valid format string and date.`);
			return '';
		}

		let tmpDateValue = this.resolveStateFromAddress(tmpDateValueSet[0], tmpData, pContextArray);

		if (this.pict.LogNoisiness > 4)
		{
			this.log.trace(`PICT Template [fDateFormat]::[${tmpHash}] with tmpData:`, tmpData);
		}
		else if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PICT Template [fDateFormat]::[${tmpHash}]`);
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

module.exports = PictTemplateProviderDateFormat;

/*
# DEAR DEAD CODE DIARY:

```javascript

```
*/

