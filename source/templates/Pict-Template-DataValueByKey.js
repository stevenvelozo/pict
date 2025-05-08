const libPictTemplate = require('pict-template');

class PictTemplateProviderDataValueByKey extends libPictTemplate
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

		this.addPattern('{~DataValueByKey:', '~}');
		this.addPattern('{~DVBK:', '~}');
	}

	render(pTemplateHash, pRecord, pContextArray)
	{
		let tmpHash = pTemplateHash.trim();
		let tmpRecord = (typeof(pRecord) === 'object') ? pRecord : {};

		if (this.pict.LogNoisiness > 4)
		{
			this.log.trace(`PICT Template [fDataRender]::[${tmpHash}] with tmpData:`, tmpRecord);
		}
		else if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PICT Template [fDataRender]::[${tmpHash}]`);
		}

		let tmpHashArray = tmpHash.split(':');

		if (tmpHashArray.length < 2)
		{
			this.log.trace(`PICT Template [fDataRender]::[${tmpHash}] failed because there were not two stanzas in the expression [${pTemplateHash}]`);
			return '';
		}

		let tmpDefaultValue = '';
		if (tmpHashArray.length > 2)
		{
			tmpDefaultValue = tmpHashArray[2];
		}

		let tmpValueObject = this.resolveStateFromAddress(tmpHashArray[0], tmpRecord, pContextArray);
		let tmpValueAddress = this.resolveStateFromAddress(tmpHashArray[1], tmpRecord, pContextArray);
		let tmpValue = this.pict.manifest.getValueByHash(tmpValueObject, tmpValueAddress);
		if ((tmpValue == null) || (tmpValue == 'undefined') || (typeof(tmpValue) == 'undefined'))
		{
			return tmpDefaultValue;
		}
		return tmpValue;
	}
}

module.exports = PictTemplateProviderDataValueByKey;
