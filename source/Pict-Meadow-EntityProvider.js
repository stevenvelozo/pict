const libFableServiceBase = require('fable').ServiceProviderBase;

class PictMeadowEntityProvider extends libFableServiceBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		this.serviceType = 'PictMeadowProvider';

		if (this.fable.settings.PictDefaultURLPrefix)
		{
			this.options.urlPrefix = this.fable.settings.PictDefaultURLPrefix;
		}
		else if (!this.options.urlPrefix)
		{
			this.options.urlPrefix = '/1.0/';
		}

		if (this.fable.settings.PictDefaultDownloadBatchSize)
		{
			this.options.downloadBatchSize = this.fable.settings.PictDefaultDownloadBatchSize;
		}
		else if (!this.options.downloadBatchSize)
		{
			this.options.downloadBatchSize = 100;
		}

		this.restClient = this.fable.serviceManager.instantiateServiceProviderWithoutRegistration('RestClient');

		this.cache = {};

		this.prepareRequestOptions = (pOptions) => { return pOptions; };
	}

	initializeCache(pEntity)
	{
		// This should not be happening as often as it's happening.
		if (!this.cache.hasOwnProperty(pEntity))
		{
			this.cache[pEntity] = this.fable.serviceManager.instantiateServiceProviderWithoutRegistration('ObjectCache');
			// TODO: Make this a configuration?
			// For now cache for 30 seconds.
			this.cache[pEntity].maxAge = 30000;
			this.cache[pEntity].maxLength = 10000;

			this.fable.Bundle[pEntity] = this.cache[pEntity].RecordMap;
		}
	}
	
	getEntity (pEntity, pIDRecord, fCallback)
	{
		this.initializeCache(pEntity);
		// Discard anything from the cache that has expired or is over size.
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

	getEntitySet = function (pEntity, pMeadowFilterExpression, fCallback)
	{
		this.initializeCache(pEntity);
		// TODO: Should we test for too many record IDs here by string length?
		// FBL~ID${pDestinationEntity}~INN~${tmpIDRecordsCommaSeparated}
		// Discard anything from the cache that has expired or is over size.
		this.cache[pEntity].prune(
			()=>
			{
				let tmpCountOptions = (
					{
						url: `${this.options.urlPrefix}${pEntity}s/Count/FilteredTo/${pMeadowFilterExpression}`
					});
				tmpCountOptions = this.prepareRequestOptions(tmpCountOptions);

				return this.restClient.getJSON(tmpCountOptions,
					(pError, pResponse, pBody) =>
					{
						if (pError)
						{
							this.log.error(`Error getting bulk entity count of [${pEntity}] filtered to [${pMeadowFilterExpression}] from server [${tmpCountOptions.url}]: ${pError}`);
							return fCallback(pError);
						}
						let tmpRecordCount = 0;
						if (pBody.Count)
						{
							tmpRecordCount = pBody.Count;
						}

						let tmpDownloadURIFragments = [];
						let tmpDownloadBatchSize = this.options.downloadBatchSize;
						for (let i = 0; i < (tmpRecordCount / tmpDownloadBatchSize); i++)
						{
							// Generate each of the URI fragments to download
							tmpDownloadURIFragments.push(`${this.options.urlPrefix}${pEntity}s/FilteredTo/${pMeadowFilterExpression}/${i*tmpDownloadBatchSize}/${tmpDownloadBatchSize}`);
						}

						let tmpEntitySet = [];
						// Now run these in series (it's possible to parallelize but no reason to)
						this.fable.Utility.eachLimit(tmpDownloadURIFragments, 1, 
							(pURIFragment, fDownloadCallback)=>
							{
								let tmpOptions = (
								{
									url: `${this.options.urlPrefix}${pURIFragment}`
								});
								tmpOptions = this.prepareRequestOptions(tmpOptions);

								this.restClient.getJSON(pURIFragment,
									(pDownloadError, pDownloadResponse, pDownloadBody)=>
									{
										tmpEntitySet = tmpEntitySet.concat(pDownloadBody);
										// Should we be caching each record?
										return fDownloadCallback(pDownloadError);
									});
							},
							(pFullDownloadError)=>
							{
								return fCallback(pFullDownloadError, tmpEntitySet);
							})
					});
			});
	}
}

module.exports = PictMeadowEntityProvider;