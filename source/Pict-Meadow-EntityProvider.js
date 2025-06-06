const libFableServiceBase = require('fable').ServiceProviderBase;

class PictMeadowEntityProvider extends libFableServiceBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		/** @type {any} */
		this.options;
		/** @type {import('pict') & { settings: any } & { newAnticipate: any }} */
		this.fable;
		/** @type {any} */
		this.log;

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

		//@ts-ignore - FIXME - remove once we have fable types
		this.restClient = this.fable.RestClient ?? this.fable.instantiateServiceProviderWithoutRegistration('RestClient');

		/** @type {Record<string, import('cachetrax')>} */
		this.recordCache = {};
		/** @type {Record<string, import('cachetrax')>} */
		this.recordSetCache = {};

		this.prepareRequestOptions = (pOptions) => { return pOptions; };
	}

	initializeCache(pEntity)
	{
		// This should not be happening as often as it's happening.
		if (!(pEntity in this.recordCache))
		{
			//@ts-ignore - FIXME - remove once we have fable types
			this.recordCache[pEntity] = this.fable.instantiateServiceProviderWithoutRegistration('ObjectCache');
			// TODO: Make this a configuration?
			// For now cache for 30 seconds.
			this.recordCache[pEntity].maxAge = 30000;
			this.recordCache[pEntity].maxLength = 10000;

			this.fable.Bundle[pEntity] = this.recordCache[pEntity].RecordMap;
		}
		// This should not be happening as often as it's happening.
		if (!(pEntity in this.recordSetCache))
		{
			//@ts-ignore - FIXME - remove once we have fable types
			this.recordSetCache[pEntity] = this.fable.instantiateServiceProviderWithoutRegistration('ObjectCache');
			// TODO: Make this a configuration?
			// For now cache for 10 seconds.
			this.recordSetCache[pEntity].maxAge = 10000;
			this.recordSetCache[pEntity].maxLength = 100;
		}
	}

	gatherEntitySet(pEntityInformation, pContext, fCallback)
	{
		// First sanity check the pEntityInformation
		if (!('Entity' in pEntityInformation) || (typeof(pEntityInformation.Entity) != 'string'))
		{
			this.log.warn(`EntityBundleRequest failed to parse entity request because the entity stanza did not contain an Entity string.`);
			return fCallback();
		}
		if (!('Destination' in pEntityInformation) || (typeof(pEntityInformation.Destination) != 'string'))
		{
			this.log.warn(`EntityBundleRequest failed to parse entity request because the entity stanza did not contain a Destination string.`);
			return fCallback();
		}
		if (!('Filter' in pEntityInformation) || (typeof(pEntityInformation.Filter) != 'string'))
		{
			pEntityInformation.Filter = '';
		}
		if (!('FilterData' in pEntityInformation) || (typeof(pEntityInformation.FilterData) != 'object'))
		{
			pEntityInformation.FilterData = {};
		}
		pContext.StepData = pEntityInformation.FilterData;
		if (!('RecordStartCursor' in pEntityInformation) || (typeof(pEntityInformation.RecordStartCursor) != 'number'))
		{
			pEntityInformation.RecordStartCursor = 0;
		}
		if (!('PageSize' in pEntityInformation) || (typeof(pEntityInformation.PageSize) != 'number'))
		{
			pEntityInformation.PageSize = 100;
		}

		let tmpRecordStartCursor = null;
		let tmpRecordCount = null;
		if (pEntityInformation.RecordCount)
		{
			tmpRecordStartCursor = pEntityInformation.RecordStartCursor;
			tmpRecordCount = pEntityInformation.RecordCount;
		}
		// Parse the filter template
		const tmpFilterString = this.fable.parseTemplate(pEntityInformation.Filter, pContext);

		// Create a callback function to handle receiving the record set
		const fRecordFetchComplete = (pError, pRecordSet) =>
		{
			if (pError)
			{
				this.log.error(`EntityBundleRequest request Error getting entity set for [${pEntityInformation.Entity}] with filter [${tmpFilterString}]: ${pError}`, pError);
				return fCallback(pError, '');
			}

			this.log.trace(`EntityBundleRequest found ${pRecordSet.length} records for ${pEntityInformation.Entity} filtered to [${tmpFilterString}]`);

			// Now assign it back to the destination; because this is not view specific it doesn't use the manifests from them (to deal with scope overlap with subgrids).
			if (pEntityInformation.SingleRecord)
			{
				if (pRecordSet.length > 1)
				{
					this.log.warn(`EntityBundleRequest found more than one record for ${pEntityInformation.Entity} filtered to [${tmpFilterString}] but SingleRecord is true; setting the first record.`);
				}
				if (pRecordSet.length < 1)
				{
					this.fable.manifest.setValueByHash(pContext, pEntityInformation.Destination, false);
				}
				this.fable.manifest.setValueByHash(pContext, pEntityInformation.Destination, pRecordSet[0]);
			}
			else
			{
				this.fable.manifest.setValueByHash(pContext, pEntityInformation.Destination, pRecordSet);
			}

			return fCallback();
		};
		if (tmpRecordCount)
		{
			this.getEntitySetPage(pEntityInformation.Entity, tmpFilterString, tmpRecordStartCursor, tmpRecordCount, fRecordFetchComplete);
		}
		else
		{
			this.getEntitySet(pEntityInformation.Entity, tmpFilterString, fRecordFetchComplete);
		}
	}

	mapJoinSingleDestination(pDestinationEntity, pCustomRequestInformation, pContext, fCallback)
	{
		const tmpSourceEntities = this.fable.manifest.getValueByHash(pContext, pCustomRequestInformation.JoinRecordSetAddress);
		if (!Array.isArray(tmpSourceEntities))
		{
			return fCallback(new Error(`EntityBundleRequest failed to map join because the source [${pCustomRequestInformation.JoinRecordSetAddress}] did not return an array.`));
		}

		const tmpSourceLookup = {};
		for (const tmpSourceEntity of tmpSourceEntities)
		{
			const tmpSourceJoinValue = tmpSourceEntity[pCustomRequestInformation.JoinValue];
			tmpSourceLookup[tmpSourceJoinValue] = tmpSourceEntity;
		}

		for (const tmpSourceEntity of tmpSourceEntities)
		{
			if (!tmpSourceEntity)
			{
				this.log.error(`EntityBundleRequest failed to map join because the source entity was not found in the source lookup.`);
				continue;
			}
			if (pCustomRequestInformation.BucketBy || pCustomRequestInformation.BucketByTemplate)
			{
				const tmpBucketValues = [];
				if (pCustomRequestInformation.BucketBy)
				{
					const tmpBucketByKeys = Array.isArray(pCustomRequestInformation.BucketBy) ? pCustomRequestInformation.BucketBy : [pCustomRequestInformation.BucketBy];
					for (const tmpBucketByKey of tmpBucketByKeys)
					{
						const tmpBucketValue = this.fable.manifest.getValueByHash(tmpSourceEntity, tmpBucketByKey);
						tmpBucketValues.push(tmpBucketValue);
					}
				}
				else
				{
					const tmpBucketByTemplates = Array.isArray(pCustomRequestInformation.BucketByTemplate) ? pCustomRequestInformation.BucketByTemplate : [pCustomRequestInformation.BucketByTemplate];
					for (const tmpBucketByTemplate of tmpBucketByTemplates)
					{
						const tmpBucketValue = this.fable.parseTemplate(tmpBucketByTemplate, tmpSourceEntity);
						tmpBucketValues.push(tmpBucketValue);
					}
				}
				const tmpBucketAddress = `${pCustomRequestInformation.RecordDestinationAddress}.${tmpBucketValues.join('.')}`;
				this.fable.manifest.setValueByHash(pDestinationEntity, tmpBucketAddress, tmpSourceEntity);
			}
			else if (pCustomRequestInformation.SingleRecord)
			{
				if (pDestinationEntity[pCustomRequestInformation.RecordDestinationAddress] && this.fable.LogNoisiness > 1)
				{
					this.fable.log.warn(`EntityBundleRequest found more than one record for [${pCustomRequestInformation.RecordDestinationAddress}] in mapJoin mapped as SingleRecord.`);
				}
				pDestinationEntity[pCustomRequestInformation.RecordDestinationAddress] = tmpSourceEntity;
			}
			else
			{
				pDestinationEntity[pCustomRequestInformation.RecordDestinationAddress] = pDestinationEntity[pCustomRequestInformation.RecordDestinationAddress] || [];
				pDestinationEntity[pCustomRequestInformation.RecordDestinationAddress].push(tmpSourceEntity);
			}
		}
		fCallback(null, [pDestinationEntity]);
	}

	mapJoin(pCustomRequestInformation, pContext, fCallback)
	{
		const tmpSingleDestinationEntity = pCustomRequestInformation.DestinationRecordAddress ? this.fable.manifest.getValueByHash(pContext, pCustomRequestInformation.DestinationRecordAddress) : null;
		const tmpDestinationEntities = pCustomRequestInformation.DestinationRecordSetAddress ? this.fable.manifest.getValueByHash(pContext, pCustomRequestInformation.DestinationRecordSetAddress) : null;
		if (!Array.isArray(tmpDestinationEntities) && !tmpSingleDestinationEntity)
		{
			return fCallback(new Error(`EntityBundleRequest failed to map join because the destination [${pCustomRequestInformation.DestinationRecordSetAddress}] did not return an array.`));
		}
		if (tmpSingleDestinationEntity)
		{
			return this.mapJoinSingleDestination(tmpSingleDestinationEntity, pCustomRequestInformation, pContext, fCallback);
		}

		const tmpJoinEntities = this.fable.manifest.getValueByHash(pContext, pCustomRequestInformation.Joins);
		if (!Array.isArray(tmpJoinEntities))
		{
			return fCallback(new Error(`EntityBundleRequest failed to map join because the join [${pCustomRequestInformation.Joins}] did not return an array.`));
		}
		const tmpSourceEntities = this.fable.manifest.getValueByHash(pContext, pCustomRequestInformation.JoinRecordSetAddress);
		if (!Array.isArray(tmpSourceEntities))
		{
			return fCallback(new Error(`EntityBundleRequest failed to map join because the source [${pCustomRequestInformation.JoinRecordSetAddress}] did not return an array.`));
		}

		const tmpLHSJoinKey = pCustomRequestInformation.JoinJoinValueLHS || pCustomRequestInformation.DestinationJoinValue;
		const tmpRHSJoinKey = pCustomRequestInformation.JoinJoinValueRHS || pCustomRequestInformation.JoinValue;
		const tmpDestinationLookup = {};
		const tmpSourceLookup = {};
		const tmpJoinMap = {};
		for (const tmpDestinationEntity of tmpDestinationEntities || [])
		{
			const tmpDestinationJoinValue = tmpDestinationEntity[pCustomRequestInformation.DestinationJoinValue];
			tmpDestinationLookup[tmpDestinationJoinValue] = tmpDestinationEntity;
		}
		for (const tmpSourceEntity of tmpSourceEntities)
		{
			const tmpSourceJoinValue = tmpSourceEntity[pCustomRequestInformation.JoinValue];
			tmpSourceLookup[tmpSourceJoinValue] = tmpSourceEntity;
		}

		for (const tmpJoinEntity of tmpJoinEntities)
		{
			const tmpLHSJoinValue = tmpJoinEntity[tmpLHSJoinKey];
			const tmpRHSJoinValue = tmpJoinEntity[tmpRHSJoinKey];
			tmpJoinMap[tmpLHSJoinValue] = tmpJoinMap[tmpLHSJoinValue] || new Set();
			tmpJoinMap[tmpLHSJoinValue].add(tmpRHSJoinValue);
		}

		for (const tmpLHSJoinValue of Object.keys(tmpJoinMap))
		{
			const tmpRHSJoinValues = Array.from(tmpJoinMap[tmpLHSJoinValue]);
			const tmpDestinationEntity = tmpDestinationLookup[tmpLHSJoinValue];
			if (!tmpDestinationEntity)
			{
				this.log.error(`EntityBundleRequest failed to map join because the LHS join value [${tmpLHSJoinValue}] was not found in the destination lookup.`);
				continue;
			}
			for (const tmpRHSJoinValue of tmpRHSJoinValues)
			{
				const tmpSourceEntity = tmpSourceLookup[tmpRHSJoinValue];
				if (!tmpSourceEntity)
				{
					this.log.error(`EntityBundleRequest failed to map join because the RHS join value [${tmpRHSJoinValue}] was not found in the source lookup.`);
					continue;
				}
				if (pCustomRequestInformation.BucketBy || pCustomRequestInformation.BucketByTemplate)
				{
					const tmpBucketValues = [];
					if (pCustomRequestInformation.BucketBy)
					{
						const tmpBucketByKeys = Array.isArray(pCustomRequestInformation.BucketBy) ? pCustomRequestInformation.BucketBy : [pCustomRequestInformation.BucketBy];
						for (const tmpBucketByKey of tmpBucketByKeys)
						{
							const tmpBucketValue = this.fable.manifest.getValueByHash(tmpSourceEntity, tmpBucketByKey);
							tmpBucketValues.push(tmpBucketValue);
						}
					}
					else
					{
						const tmpBucketByTemplates = Array.isArray(pCustomRequestInformation.BucketByTemplate) ? pCustomRequestInformation.BucketByTemplate : [pCustomRequestInformation.BucketByTemplate];
						for (const tmpBucketByTemplate of tmpBucketByTemplates)
						{
							const tmpBucketValue = this.fable.parseTemplate(tmpBucketByTemplate, tmpSourceEntity);
							tmpBucketValues.push(tmpBucketValue);
						}
					}
					if (!tmpDestinationEntity[pCustomRequestInformation.RecordDestinationAddress])
					{
						tmpDestinationEntity[pCustomRequestInformation.RecordDestinationAddress] = {};
					}
					const tmpBucketAddress = `${pCustomRequestInformation.RecordDestinationAddress}.${tmpBucketValues.join('.')}`;
					this.fable.manifest.setValueByHash(tmpDestinationEntity, tmpBucketAddress, tmpSourceEntity);
				}
				else if (pCustomRequestInformation.SingleRecord)
				{
					if (tmpDestinationEntity[pCustomRequestInformation.RecordDestinationAddress] && this.fable.LogNoisiness > 1)
					{
						this.fable.log.warn(`EntityBundleRequest found more than one record for [${pCustomRequestInformation.RecordDestinationAddress}] in mapJoin mapped as SingleRecord.`);
					}
					tmpDestinationEntity[pCustomRequestInformation.RecordDestinationAddress] = tmpSourceEntity;
				}
				else
				{
					tmpDestinationEntity[pCustomRequestInformation.RecordDestinationAddress] = tmpDestinationEntity[pCustomRequestInformation.RecordDestinationAddress] || [];
					tmpDestinationEntity[pCustomRequestInformation.RecordDestinationAddress].push(tmpSourceEntity);
				}
			}
		}
		fCallback(null, tmpDestinationEntities);
	}

	gatherCustomDataSet(pCustomRequestInformation, pContext, fCallback)
	{
		// First sanity check the pCustomRequestInformation
		if (!('URL' in pCustomRequestInformation) || (typeof(pCustomRequestInformation.URL) != 'string'))
		{
			this.log.warn(`EntityBundleRequest failed to parse custom data request because the stanza did not contain a URL string.`);
			return fCallback();
		}
		if (!('URLData' in pCustomRequestInformation) || (typeof(pCustomRequestInformation.URLData) != 'object'))
		{
			pCustomRequestInformation.URLData = {};
		}
		pContext.StepData = pCustomRequestInformation.URLData;
		// Parse the filter template
		const tmpURLTemplateString = this.fable.parseTemplate(pCustomRequestInformation.URL, pContext);
		if (tmpURLTemplateString == '')
		{
			// We may want to continue, but for now let's say nah and nope out.
			this.log.warn(`EntityBundleRequest failed to parse custom data request because the entity Filter did not return a string for FilterBy`)
		}

		let tmpURLPrefix = '';
		// This will only be true if the "Host" is set.
		const tmpCustomURIHost = pCustomRequestInformation.Host ? pCustomRequestInformation.Host : false;
		// If "Host" is set, protocol and port are optional.
		const tmpCustomURIProtocol = pCustomRequestInformation.Protocol ? pCustomRequestInformation.Protocol : 'https';
		const tmpCustomURIPort = pCustomRequestInformation.Port ? pCustomRequestInformation.Port : false;

		if (tmpCustomURIHost)
		{
			tmpURLPrefix = `${tmpCustomURIProtocol}://${tmpCustomURIHost}`;
			if (tmpCustomURIPort)
			{
				tmpURLPrefix += `:${tmpCustomURIPort}`;
			}
		}
		else
		{
			tmpURLPrefix = this.fable.EntityProvider.options.urlPrefix;
		}

		// Now get the records
		const callback = (pError, pResponse, pData) =>
		{
			if (pError)
			{
				this.log.error(`EntityBundleRequest request Error getting data set for [${pCustomRequestInformation.Entity}] with filter [${tmpURLTemplateString}]: ${pError}`, pError);
				return fCallback(pError, '');
			}

			this.log.trace(`EntityBundleRequest completed request for ${pCustomRequestInformation.Entity} filtered to [${tmpURLTemplateString}]`);

			// Since this is a templated endpoint it can be used for logging etc.
			if (pCustomRequestInformation.Destination)
			{
				this.fable.manifest.setValueByHash(pContext, pCustomRequestInformation.Destination, pData);
			}

			return fCallback();
		};

		let tmpOptions = (
			{
				url: `${tmpURLPrefix}${tmpURLTemplateString}`
			});
		tmpOptions = this.fable.EntityProvider.prepareRequestOptions(tmpOptions);
		return this.fable.EntityProvider.restClient.getJSON(tmpOptions, callback);
	}

	/**
	 * Gather data from the server returning a promise when it is complete.
	 *
	 * @param {Array<Record<string, any>>} pEntitiesBundleDescription - The entity bundle description object.
	 * @param {(error?: Error) => void} fCallback - The callback function to call when the data gathering is complete.
	 */
	gatherDataFromServer(pEntitiesBundleDescription, fCallback)
	{
		if (!Array.isArray(pEntitiesBundleDescription))
		{
			this.log.error(`EntityBundleRequest failed to parse entity bundle request because the input was not an array.`);
			return fCallback(new Error('EntityBundleRequest failed to parse entity bundle request because the input was not an array.'));
		}

		let tmpAnticipate = this.fable.newAnticipate();
		const tmpStateStack = [];
		let tmpState = {};

		for (let i = 0; i < pEntitiesBundleDescription.length; i++)
		{
			let tmpEntityBundleEntry = pEntitiesBundleDescription[i];
			tmpAnticipate.anticipate(
				(fNext) =>
				{
					try
					{
						switch (tmpEntityBundleEntry.Type)
						{
							case 'SetStateAddress':
								tmpStateStack.push(tmpState);
								tmpState = this.fable.manifest.getValueByHash(this.fable, tmpEntityBundleEntry.StateAddress);
								if (typeof tmpState === 'undefined')
								{
									tmpState = {};
									this.fable.manifest.setValueByHash(this.fable, tmpEntityBundleEntry.StateAddress, tmpState);
								}
								break;
							case 'PopState':
								if (tmpStateStack.length > 0)
								{
									tmpState = tmpStateStack.pop();
								}
								else
								{
									this.log.warn(`EntityBundleRequest encountered a PopState without a matching SetStateAddress.`);
								}
								break;
							case 'Custom':
								return this.gatherCustomDataSet(tmpEntityBundleEntry, this.prepareState(tmpState, tmpEntityBundleEntry), fNext);
							case 'MapJoin':
								return this.mapJoin(tmpEntityBundleEntry, this.prepareState(tmpState, tmpEntityBundleEntry), fNext);
							// This is the default case, for a meadow entity set or single entity
							case 'MeadowEntity':
							default:
								return this.gatherEntitySet(tmpEntityBundleEntry, this.prepareState(tmpState, tmpEntityBundleEntry), fNext);
						}
					}
					catch (pError)
					{
						this.log.error(`EntityBundleRequest error gathering entity set: ${pError}`, { Stack: pError.stack });
					}
					return fNext();
				});
		}

		tmpAnticipate.wait(
			(pError) =>
			{
				//FIXME: should we be ignoring this error? rejecting here is unsafe since the result isn't guaranteed to be handled, so will crash stuff currently
				if (pError)
				{
					this.log.error(`EntityBundleRequest error gathering entity set: ${pError}`, { Stack: pError.stack });
					return fCallback(pError);
				}
				return fCallback();
			});
	}

	/**
	 * Creates a wrapper state object to allow referencing common global state in addition to flow-state.
	 *
	 * @param {Record<string, any>} pState - The state object to prepare.
	 * @param {any} [pStepConfiguration] - (optional) The step configuration object provided in the config, if any.
	 * @return {Record<string, any>} - The prepared state object.
	 */
	prepareState(pState, pStepConfiguration)
	{
		return {
			State: pState,
			AppData: this.fable.AppData,
			Pict: this.fable,
			Fable: this.fable,
			StepConfiguration: pStepConfiguration,
		};
	}

	getEntity(pEntity, pIDRecord, fCallback)
	{
		this.initializeCache(pEntity);
		// Discard anything from the cache that has expired or is over size.
		this.recordCache[pEntity].prune(
			function ()
			{
				let tmpPossibleRecord = this.recordCache[pEntity].read(pIDRecord);

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
						/*
						 * FIXME: This breaks entity reads for nonexistent records. Putting this back for now until we can audit and fix all the places that may rely on this.
						if (pResponse && pResponse.statusCode && pResponse.statusCode >= 400)
						{
							this.log.error(`Error getting entity [${pEntity}] with ID [${pIDRecord}] from url [${tmpOptions.url}]: ${pResponse.statusCode} ${pResponse.statusMessage}`);
							return fCallback(new Error(`Error getting entity [${pEntity}] with ID [${pIDRecord}] from url [${tmpOptions.url}]: ${pResponse.statusCode} ${JSON.stringify(pBody || {})}`));
						}
						*/
						if (pBody)
						{
							this.recordCache[pEntity].put(pBody, pIDRecord);
						}
						return fCallback(pError, pBody);
					});
			}.bind(this));
	}

	getEntitySetPage(pEntity, pMeadowFilterExpression, pRecordStartCursor, pRecordCount, fCallback)
	{
		const tmpFilterStanza = pMeadowFilterExpression ? `/FilteredTo/${pMeadowFilterExpression}` : '';
		const tmpURL = `${this.options.urlPrefix}${pEntity}s${tmpFilterStanza}/${pRecordStartCursor}/${pRecordCount}`;

		return this.restClient.getJSON(tmpURL,
			function (pDownloadError, pDownloadResponse, pDownloadBody)
			{
				if (pDownloadResponse && pDownloadResponse.statusCode && pDownloadResponse.statusCode >= 400)
				{
					this.log.error(`Error getting entity set of [${pEntity}] filtered to [${pMeadowFilterExpression}] from url [${tmpURL}]: ${pDownloadResponse.statusCode} ${pDownloadResponse.statusMessage}`);
					return fCallback(new Error(`Error getting entity set of [${pEntity}] filtered to [${pMeadowFilterExpression}] from url [${tmpURL}]: ${pDownloadResponse.statusCode} ${JSON.stringify(pDownloadBody || {})}`));
				}
				return fCallback(pDownloadError, pDownloadBody);
			}.bind(this));
	}

	getEntitySetRecordCount(pEntity, pMeadowFilterExpression, fCallback)
	{
		const tmpFilterStanza = pMeadowFilterExpression ? `/FilteredTo/${pMeadowFilterExpression}` : '';
		const tmpURL = `${this.options.urlPrefix}${pEntity}s/Count${tmpFilterStanza}`;

		return this.restClient.getJSON(tmpURL,
			function (pError, pResponse, pBody)
			{
				if (pResponse && pResponse.statusCode && pResponse.statusCode >= 400)
				{
					this.log.error(`Error getting entity count of [${pEntity}] filtered to [${pMeadowFilterExpression}] from url [${tmpURL}]: ${pResponse.statusCode} ${pResponse.statusMessage}`);
					return fCallback(new Error(`Error getting entity count of [${pEntity}] filtered to [${pMeadowFilterExpression}] from url [${tmpURL}]: ${pResponse.statusCode} ${JSON.stringify(pBody || {})}`));
				}
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
		this.recordSetCache[pEntity].prune(
			function ()
			{
				let tmpPossibleRecords = this.recordSetCache[pEntity].read(pMeadowFilterExpression);

				if (tmpPossibleRecords)
				{
					return fCallback(null, tmpPossibleRecords);
				}
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
						const tmpFilterStanza = pMeadowFilterExpression ? `/FilteredTo/${pMeadowFilterExpression}` : '';
						for (let i = 0; i < (tmpRecordCount / tmpDownloadBatchSize); i++)
						{
							// Generate each of the URI fragments to download
							tmpDownloadURIFragments.push(`${this.options.urlPrefix}${pEntity}s${tmpFilterStanza}/${i * tmpDownloadBatchSize}/${tmpDownloadBatchSize}`);
						}

						let tmpEntitySet = [];

						// Now run these in series (it's possible to parallelize the requests but they would not be in server order)
						this.fable.Utility.eachLimit(tmpDownloadURIFragments, 1,
							(pURIFragment, fDownloadCallback) =>
							{
								this.restClient.getJSON(pURIFragment,
									(pDownloadError, pDownloadResponse, pDownloadBody) =>
									{
										if (pDownloadResponse && pDownloadResponse.statusCode && pDownloadResponse.statusCode >= 400)
										{
											this.log.error(`Error getting entity set of [${pEntity}] filtered to [${pMeadowFilterExpression}] from url [${pURIFragment}]: ${pDownloadResponse.statusCode} ${pDownloadResponse.statusMessage}`);
											return fDownloadCallback(new Error(`Error getting entity set of [${pEntity}] filtered to [${pMeadowFilterExpression}] from url [${pURIFragment}]: ${pDownloadResponse.statusCode} ${JSON.stringify(pDownloadBody || {})}`));
										}
										tmpEntitySet = tmpEntitySet.concat(pDownloadBody);
										// Should we be caching each record?
										return fDownloadCallback(pDownloadError);
									});
							},
							(pFullDownloadError) =>
							{
								if (tmpEntitySet)
								{
									this.recordSetCache[pEntity].put(tmpEntitySet, pMeadowFilterExpression);
								}
								return fCallback(pFullDownloadError, tmpEntitySet);
							})
					});
			}.bind(this));
	}
}

module.exports = PictMeadowEntityProvider;
