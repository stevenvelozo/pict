const libFableServiceBase = require('fable').ServiceProviderBase;

class PictDataProvider extends libFableServiceBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		/** @type {import('fable') & import('pict')} */
		this.fable;

		this.serviceType = 'PictDataProvider';
	}

	/**
	 * @param {string} pAddress - The address of the data to retrieve
	 * @param {object} [pData] - (optional) The record to provide to the address resolver
	 */
	getDataByAddress(pAddress, pData)
	{
		let tmpData = (typeof(pData) === 'undefined') ? {} : pData;

		return this.fable.manifest.getValueByHash({AppData:this.fable.AppData, Bundle:this.fable.Bundle, Record:tmpData}, pAddress);
	}
}

module.exports = PictDataProvider;
