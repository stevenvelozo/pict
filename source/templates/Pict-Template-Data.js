const libPictTemplate = require('../Pict-Template.js');

class PictTemplateProvider extends libPictTemplate
{
	/**
	 * @param {Object} pFable - The Fable Framework instance
	 * @param {Object} pOptions - The options for the service
	 * @param {String} pServiceHash - The hash of the service
	 */
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		this.addPattern('{~Data:', '~}');
		this.addPattern('{~D:', '~}');
	}

	render(pHash, pRecord, pContextArray)
	{
		let tmpHash = pHash.trim();
		let tmpRecord = (typeof(pRecord) === 'object') ? pRecord : {};

		if (this.pict.LogNoisiness > 4)
		{
			this.log.trace(`PICT Template [fDataRender]::[${tmpHash}] with tmpData:`, tmpRecord);
		}
		else if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PICT Template [fDataRender]::[${tmpHash}]`);
		}

		let tmpValue = '';
		if (tmpHash != null)
		{
			tmpValue = this.resolveStateFromAddress(tmpHash, tmpRecord, pContextArray);
		}
		if ((tmpValue == null) || (tmpValue == 'undefined') || (typeof(tmpValue) == 'undefined'))
		{
			return '';
		}
		return tmpValue;
	}
}

module.exports = PictTemplateProvider;

/*
# DEAR DEAD CODE DIARY:

```javascript
//{~Data:AppData.Some.Value.to.Render~}
let fDataRender = (pHash, pData, pContextArray)=>
	{
		let tmpHash = pHash.trim();
		let tmpData = (typeof(pData) === 'object') ? pData : {};

		if (this.LogNoisiness > 4)
		{
			this.log.trace(`PICT Template [fDataRender]::[${tmpHash}] with tmpData:`, tmpData);
		}
		else if (this.LogNoisiness > 3)
		{
			this.log.trace(`PICT Template [fDataRender]::[${tmpHash}]`);
		}

		let tmpValue = '';
		if (tmpHash != null)
		{
			tmpValue = this.resolveStateFromAddress(tmpHash, tmpData, pContextArray);
		}
		if ((tmpValue == null) || (tmpValue == 'undefined') || (typeof(tmpValue) == 'undefined'))
		{
			return '';
		}
		return tmpValue;
	};
this.MetaTemplate.addPattern('{~D:', '~}', fDataRender);
this.MetaTemplate.addPattern('{~Data:', '~}', fDataRender);
```
*/