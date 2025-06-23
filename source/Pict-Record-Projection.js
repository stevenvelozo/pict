const libFableServiceBase = require('fable').ServiceProviderBase;

class PictRecordProvider extends libFableServiceBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		/** @type {import('fable') & import('pict')} */
		this.fable;

		this.serviceType = 'PictRecordProvider';
	}

	project(pRecord, pManifest, pProjection)
	{
		return true;
	}
}

module.exports = PictRecordProvider;
