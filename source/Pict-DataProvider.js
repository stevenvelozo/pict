const libFableServiceBase = require('fable').ServiceProviderBase;

class PictDataProvider extends libFableServiceBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		this.serviceType = 'PictDataProvider';
	}

	getDataByAddress(pAddress, pData)
	{
		let tmpData = (typeof(pData) === 'undefined') ? {} : pData;

		return this.fable.manifest.getValueByHash({AppData:this.AppData, Bundle:this.Bundle, Record:tmpData}, pAddress);
	}
}

module.exports = PictDataProvider;
