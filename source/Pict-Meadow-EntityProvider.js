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

		this.restClient = this.fable.instantiateServiceProviderWithoutRegistration('RestClient');

		this.cache = {};

		this.prepareRequestOptions = (pOptions) => { return pOptions; };
	}

	initializeCache(pEntity)
	{
		// This should not be happening as often as it's happening.
		if (!this.cache.hasOwnProperty(pEntity))
		{
			this.cache[pEntity] = this.fable.instantiateServiceProviderWithoutRegistration('ObjectCache');
			// TODO: Make this a configuration?
			// For now cache for 30 seconds.
			this.cache[pEntity].maxAge = 30000;
			this.cache[pEntity].maxLength = 10000;

			this.fable.Bundle[pEntity] = this.cache[pEntity].RecordMap;
		}
	}

	getEntity(pEntity, pIDRecord, fCallback)
	{
		this.initializeCache(pEntity);
		// Discard anything from the cache that has expired or is over size.
		this.cache[pEntity].prune(
			function ()
			{
				let tmpPossibleRecord = this.cache[pEntity].read(pIDRecord);

				if (tmpPossibleRecord)
				{
					return fCallback(null, tmpPossibleRecord);
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
			}.bind(this));
	}

	getEntitySetPage(pEntity, pMeadowFilterExpression, pRecordStartCursor, pRecordCount, fCallback)
	{
		let tmpURL = `${this.options.urlPrefix}${pEntity}s/FilteredTo/${pMeadowFilterExpression}/${pRecordStartCursor}/${pRecordCount}`;

		return this.restClient.getJSON(tmpURL,
			function (pDownloadError, pDownloadResponse, pDownloadBody)
			{
				return fCallback(pDownloadError, pDownloadBody);
			}.bind(this));
	}

	getEntitySetRecordCount(pEntity, pMeadowFilterExpression, fCallback)
	{
		let tmpURL = `${this.options.urlPrefix}${pEntity}s/Count/FilteredTo/${pMeadowFilterExpression}`;

		return this.restClient.getJSON(tmpURL,
			function (pError, pResponse, pBody)
			{
				if (pError)
				{
					this.log.error(`Error getting entity count of [${pEntity}] filtered to [${pMeadowFilterExpression}] from url [${tmpURL}]: ${pError}`);
					return fCallback(pError);
				}
				let tmpRecordCount = 0;
				if (pBody.Count)
				{
					tmpRecordCount = pBody.Count;
				}
				return fCallback(pError, tmpRecordCount);
			}.bind(this));
	}

	getEntitySet(pEntity, pMeadowFilterExpression, fCallback)
	{
		// TODO: Should we test for too many record IDs here by string length in pMeadowFilterExpression?
		//       FBL~ID${pDestinationEntity}~INN~${tmpIDRecordsCommaSeparated}
		//       If the list is mega-long we can parse it and break it into chunks.
		this.initializeCache(pEntity);
		// Discard anything from the cache that has expired or is over size.
		this.cache[pEntity].prune(
			function ()
			{
				return this.getEntitySetRecordCount(pEntity, pMeadowFilterExpression,
					(pRecordCountError, pRecordCount) =>
					{
						if (pRecordCountError)
						{
							return fCallback(pRecordCountError);
						}
						let tmpRecordCount = pRecordCount;

						if (isNaN(pRecordCount))
						{
							this.log.error(`Entity count did not return a number for [${pEntity}] filtered to [${pMeadowFilterExpression}]... something is fatally wrong from the server accessed in getEntitySet call.`);
							return fCallback(new Error('Entity count did not return a number in getEntitySet.'));
						}

						let tmpDownloadURIFragments = [];
						let tmpDownloadBatchSize = this.options.downloadBatchSize;
						for (let i = 0; i < (tmpRecordCount / tmpDownloadBatchSize); i++)
						{
							// Generate each of the URI fragments to download
							tmpDownloadURIFragments.push(`${this.options.urlPrefix}${pEntity}s/FilteredTo/${pMeadowFilterExpression}/${i * tmpDownloadBatchSize}/${tmpDownloadBatchSize}`);
						}

						let tmpEntitySet = [];

						// Now run these in series (it's possible to parallelize the requests but they would not be in server order)
						this.fable.Utility.eachLimit(tmpDownloadURIFragments, 1,
							(pURIFragment, fDownloadCallback) =>
							{
								this.restClient.getJSON(pURIFragment,
									(pDownloadError, pDownloadResponse, pDownloadBody) =>
									{
										tmpEntitySet = tmpEntitySet.concat(pDownloadBody);
										// Should we be caching each record?
										return fDownloadCallback(pDownloadError);
									});
							},
							(pFullDownloadError) =>
							{
								return fCallback(pFullDownloadError, tmpEntitySet);
							})
					});
			}.bind(this));
	}
}

module.exports = PictMeadowEntityProvider;