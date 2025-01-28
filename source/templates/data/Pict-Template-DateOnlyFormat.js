const libPictTemplate = require('pict-template');

class PictTemplateProviderDateOnlyFormat extends libPictTemplate
{
	/**
	 * @param {import('fable')} pFable - The Fable Framework instance
	 * @param {any} pOptions - The options for the service
	 * @param {String} pServiceHash - The hash of the service
	 */
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		/** @type {any} */
		this.options;
		/** @type {any} */
		this.log;

		this.addPattern('{~DateOnlyFormat:', '~}');
	}

	render(pTemplateHash, pRecord, pContextArray)
	{
		let tmpHash = pTemplateHash.trim();
		let tmpData = (typeof (pRecord) === 'object') ? pRecord : {};
		let tmpDateValueSet = tmpHash.split('^');

		if (tmpDateValueSet.length < 2)
		{
			this.log.error(`PICT Template [fDateOnlyFormat]::[${tmpHash}] did not have a valid format string and date.`);
			return '';
		}

		let tmpDateValue = this.resolveStateFromAddress(tmpDateValueSet[0], tmpData, pContextArray);

		if (this.pict.LogNoisiness > 4)
		{
			this.log.trace(`PICT Template [fDateOnlyFormat]::[${tmpHash}] with data:`, tmpData);
		}
		else if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PICT Template [fDateOnlyFormat]::[${tmpHash}]`);
		}

		// TODO: Modularize this
		const tmpDayJS = this.fable.Dates.dayJS.utc(tmpDateValue).tz('UTC');

		return tmpDayJS.format(tmpDateValueSet[1]);
	}
}

module.exports = PictTemplateProviderDateOnlyFormat;

/*
# DEAR DEAD CODE DIARY:

```javascript

```
*/

