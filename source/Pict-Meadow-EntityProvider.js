const libFableServiceBase = require('fable').ServiceProviderBase;

class PictMeadowEntityProvider extends libFableServiceBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		this.serviceType = 'PictMeadowProvider';

		if (!this.options.urlPrefix)
		{
			this.options.urlPrefix = '/1.0/';
		}

		this.restClient = this.fable.serviceManager.instantiateServiceProviderWithoutRegistration('RestClient');

		this.cache = {};

		this.prepareRequestOptions = (pOptions) => { return pOptions; };
	}
	
	getEntity (pEntity, pIDRecord, fCallback)
	{
		// This should not be happening as often as it's happening.
		if (!this.cache.hasOwnProperty(pEntity))
		{
			this.cache[pEntity] = this.fable.serviceManager.instantiateServiceProviderWithoutRegistration('ObjectCache');
			// TODO: Make this a configuration?
			// For now cache for 30 seconds.
			this.cache[pEntity].maxAge = 30000;
			this.cache[pEntity].maxLength = 10000;
		}

		this.cache[pEntity].prune(
			()=>
			{
				let tmpPossibleRecord = this.cache[pEntity].read(pIDRecord);
				
				if (tmpPossibleRecord)
				{
					return tmpPossibleRecord;
				}

				let tmpOptions = (
					{
						url: `${this.options.urlPrefix}${pEntity}/${pIDRecord}`
					});

				tmpOptions = this.prepareRequestOptions(tmpOptions);

				return this.restClient.getJSON(tmpOptions,
					(pError, pResponse, pBody) =>
					{
						if (pBody)
						{
							this.cache[pEntity].put(pBody, pIDRecord);
						}
						return fCallback(pError, pBody);
					});
			}
		);
	}

	getEntitySet = function (pEntity, pDestinationEntity, pIDRecordList, fCallback)
	{
		// TODO: Should we test for too many record IDs here by string length?
		let tmpIDRecordsCommaSeparated = pIDRecordList.join(',');
		let tmpOptions = (
			{
				url: `${this.options.urlPrefix}${pEntity}s/FilteredTo/FBL~ID${pDestinationEntity}~INN~${tmpIDRecordsCommaSeparated}`
			});

		return this.restClient.getJSON(tmpOptions,
			(pError, pResponse, pBody) =>
			{
				return fCallback(pError, pBody);
			});
	}
}

module.exports = PictMeadowEntityProvider;