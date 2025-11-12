const libFableServiceBase = require('fable').ServiceProviderBase;

class PictMeadowEntityProvider extends libFableServiceBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		/** @type {any} */
		this.options;
		/** @type {import('./Pict') & { settings: any } & { newAnticipate: any }} */
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

		if (!this.options.downloadBatchSize)
		{
			if (typeof this.fable.settings.PictDefaultDownloadBatchSize === 'number')
			{
				this.options.downloadBatchSize = this.fable.settings.PictDefaultDownloadBatchSize;
			}
			else
			{
				this.options.downloadBatchSize = 100;
			}
		}

		//@ts-ignore - FIXME - remove once we have fable types
		this.restClient = this.fable.RestClient ?? this.fable.instantiateServiceProviderWithoutRegistration('RestClient');

		/** @type {Record<string, import('cachetrax')>} */
		this.recordCache = {};
		/** @type {Record<string, import('cachetrax')>} */
		this.recordSetCache = {};

		this.entityColumnTranslations = (
			{
				CreatingIDUser: 'User',
				UpdatingIDUser: 'User',
				DeletingIDUser: 'User'
			});

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

	gatherEntitySetCount(pEntityInformation, pContext, fCallback)
	{
		pEntityInformation.CountOnly = true;
		return this.gatherEntitySet(pEntityInformation, pContext, fCallback);
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
		//TODO: consider ChunkSize for cases when AllRecords is set and we want to control the to-server page size
		if (!('PageSize' in pEntityInformation) || (typeof(pEntityInformation.PageSize) != 'number'))
		{
			//TODO: this is a safety measure to try and not break things when we release this pict version; should be a lower value
			pEntityInformation.PageSize = 10000;
		}
		if (!('AllRecords' in pEntityInformation) || (typeof(pEntityInformation.AllRecords) != 'boolean'))
		{
			pEntityInformation.AllRecords = false;
		}

		let tmpRecordStartCursor = null;
		let tmpPageSize = null;
		if (pEntityInformation.PageSize)
		{
			tmpRecordStartCursor = pEntityInformation.RecordStartCursor;
			tmpPageSize = pEntityInformation.PageSize;
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

			if (pEntityInformation.CountOnly)
			{
				this.log.trace(`EntityBundleRequest counted ${pRecordSet} records for ${pEntityInformation.Entity} filtered to [${tmpFilterString}]${!pEntityInformation.CountOnly && !pEntityInformation.AllRecords ? ` [${tmpRecordStartCursor}/${tmpPageSize}]` : ''}`);

				this.fable.manifest.setValueByHash(pContext, pEntityInformation.Destination, pRecordSet);
			}
			// Now assign it back to the destination; because this is not view specific it doesn't use the manifests from them (to deal with scope overlap with subgrids).
			else if (pEntityInformation.SingleRecord)
			{
				this.log.trace(`EntityBundleRequest found ${pRecordSet.length} records for ${pEntityInformation.Entity} filtered to [${tmpFilterString}]${!pEntityInformation.CountOnly && !pEntityInformation.AllRecords ? ` [${tmpRecordStartCursor}/${tmpPageSize}]` : ''}`);

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
				this.log.trace(`EntityBundleRequest found ${pRecordSet.length} records for ${pEntityInformation.Entity} filtered to [${tmpFilterString}]${!pEntityInformation.CountOnly && !pEntityInformation.AllRecords ? ` [${tmpRecordStartCursor}/${tmpPageSize}]` : ''}`);

				this.fable.manifest.setValueByHash(pContext, pEntityInformation.Destination, pRecordSet);
			}

			return fCallback();
		};
		if (pEntityInformation.CountOnly)
		{
			this.getEntitySetRecordCount(pEntityInformation.Entity, tmpFilterString, fRecordFetchComplete);
		}
		else if (tmpPageSize && !pEntityInformation.AllRecords)
		{
			this.getEntitySetPage(pEntityInformation.Entity, tmpFilterString, tmpRecordStartCursor, tmpPageSize, fRecordFetchComplete);
		}
		else
		{
			this.getEntitySet(pEntityInformation.Entity, tmpFilterString, fRecordFetchComplete);
		}
	}

	mapJoinSingleDestination(pDestinationEntity, pCustomRequestInformation, pContext)
	{
		const tmpSourceEntities = this.fable.manifest.getValueByHash(pContext, pCustomRequestInformation.JoinRecordSetAddress);
		if (!Array.isArray(tmpSourceEntities))
		{
			throw new Error(`EntityBundleRequest failed to map join because the source [${pCustomRequestInformation.JoinRecordSetAddress}] did not return an array.`);
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
						if (tmpBucketValue)
						{
							tmpBucketValues.push(tmpBucketValue);
						}
					}
				}
				if (tmpBucketValues.length < 1)
				{
					if (this.fable.LogNoisiness > 0)
					{
						this.log.warn(`EntityBundleRequest failed to map join because no bucket values were found.`, { pCustomRequestInformation, tmpSourceEntity });
					}
				}
				else
				{
					const tmpBucketAddress = `${pCustomRequestInformation.RecordDestinationAddress}.${tmpBucketValues.join('.')}`;
					if (pCustomRequestInformation.SingleRecord)
					{
						//TODO: warn if there is a collision?
						this.fable.manifest.setValueByHash(pDestinationEntity, tmpBucketAddress, tmpSourceEntity);
					}
					else
					{
						let tmpBucketArray = this.fable.manifest.getValueByHash(pDestinationEntity, tmpBucketAddress, tmpSourceEntity);
						if (!tmpBucketArray)
						{
							tmpBucketArray = [];
							this.fable.manifest.setValueByHash(pDestinationEntity, tmpBucketAddress, tmpBucketArray);
						}
						tmpBucketArray.push(tmpSourceEntity);
					}
				}
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
		return [pDestinationEntity];
	}

	mapJoin(pCustomRequestInformation, pContext)
	{
		const tmpSingleDestinationEntity = pCustomRequestInformation.DestinationRecordAddress ? this.fable.manifest.getValueByHash(pContext, pCustomRequestInformation.DestinationRecordAddress) : null;
		const tmpDestinationEntities = pCustomRequestInformation.DestinationRecordSetAddress ? this.fable.manifest.getValueByHash(pContext, pCustomRequestInformation.DestinationRecordSetAddress) : null;
		if (!Array.isArray(tmpDestinationEntities) && !tmpSingleDestinationEntity)
		{
			throw new Error(`EntityBundleRequest failed to map join because the destination [${pCustomRequestInformation.DestinationRecordSetAddress}] did not return an array.`);
		}
		if (tmpSingleDestinationEntity)
		{
			return this.mapJoinSingleDestination(tmpSingleDestinationEntity, pCustomRequestInformation, pContext);
		}

		const tmpJoinEntities = this.fable.manifest.getValueByHash(pContext, pCustomRequestInformation.Joins);
		if (!Array.isArray(tmpJoinEntities))
		{
			throw new Error(`EntityBundleRequest failed to map join because the join [${pCustomRequestInformation.Joins}] did not return an array.`);
		}
		const tmpSourceEntities = this.fable.manifest.getValueByHash(pContext, pCustomRequestInformation.JoinRecordSetAddress);
		if (!Array.isArray(tmpSourceEntities))
		{
			throw new Error(`EntityBundleRequest failed to map join because the source [${pCustomRequestInformation.JoinRecordSetAddress}] did not return an array.`);
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
					if (pCustomRequestInformation.SingleRecord)
					{
						//TODO: warn if there is a collision?
						this.fable.manifest.setValueByHash(tmpDestinationEntity, tmpBucketAddress, tmpSourceEntity);
					}
					else
					{
						let tmpBucketArray = this.fable.manifest.getValueByHash(tmpDestinationEntity, tmpBucketAddress, tmpSourceEntity);
						if (!tmpBucketArray)
						{
							tmpBucketArray = [];
							this.fable.manifest.setValueByHash(tmpDestinationEntity, tmpBucketAddress, tmpBucketArray);
						}
						tmpBucketArray.push(tmpSourceEntity);
					}
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
		return tmpDestinationEntities;
	}

	/**
	 * ExampleConfig:
	 * {
	 *      "InputRecordsetAddress": "AppData.DocumentData.ReportData.Observations[]<<~?ObservationType,==,WalbecNDTRollerTests?~>>",
	 *      "OutputRecordsetAddress": "AppData.DocumentData.ReportData.FormData.ADDTests",
	 * 		"OutputRecordsetAddressMapping":
	 *      {
	 * 			"InputRecord.Tags[],AnyContains,HR": "AppData.DocumentData.ReportData.FormData.HRTests",
	 * 			"InputRecord.Tags[],AnyContains,CR": "AppData.DocumentData.ReportData.FormData.CRTests",
	 * 			"InputRecord.Tags[],AnyContains,IR": "AppData.DocumentData.ReportData.FormData.IRTests"
	 *      },
	 * 		"RecordPrototypeAddress": "OutputRecordSet[]<<~?IDObservation,==,{~D:InputRecord.IDObservation~}?~>>",
	 * 		"RecordFieldMapping":
	 *      {
	 * 			"AppData.DocumentData.ReportData.FormData.HRTests":
	 *          {
	 *               "InputRecord.Details.WalbecNDTRollerTests[0].Datum.MaterialTemperature": "OutputRecord.Temp",
	 *               "InputRecord.Details.WalbecNDTRollerTests[0].Datum.PercentDensity": "OutputRecord.Density",
	 *               "InputRecord.Details.WalbecNDTRollerTests[0].Datum.Offset": "OutputRecord.Offset",
	 *               "InputRecord.IDObservation": "OutputRecord.IDObservation"
	 *          },
	 * 			"AppData.DocumentData.ReportData.FormData.CRTests":
	 *          {
	 *               "InputRecord.Details.WalbecNDTRollerTests[0].Datum.MaterialTemperature": "OutputRecord.CRTemp",
	 *               "InputRecord.Details.WalbecNDTRollerTests[0].Datum.PercentDensity": "OutputRecord.CRDensity",
	 *               "InputRecord.Details.WalbecNDTRollerTests[0].Datum.Offset": "OutputRecord.CROffset",
	 *               "InputRecord.IDObservation": "OutputRecord.IDObservation"
	 *          },
	 * 			"AppData.DocumentData.ReportData.FormData.IRTests":
	 *          {
	 *               "InputRecord.Details.WalbecNDTRollerTests[0].Datum.MaterialTemperature": "OutputRecord.IRTemp",
	 *               "InputRecord.Details.WalbecNDTRollerTests[0].Datum.PercentDensity": "OutputRecord.IRDensity",
	 *               "InputRecord.Details.WalbecNDTRollerTests[0].Datum.Offset": "OutputRecord.IROffset",
	 *               "InputRecord.IDObservation": "OutputRecord.IDObservation"
	 *          },
	 *          "Default":
	 *          {
	 *               "InputRecord.Details.WalbecNDTRollerTests[0].Datum.MaterialTemperature": "OutputRecord.ADDTemp",
	 *               "InputRecord.Details.WalbecNDTRollerTests[0].Datum.PercentDensity": "OutputRecord.ADDDensity",
	 *               "InputRecord.Details.WalbecNDTRollerTests[0].Datum.Offset": "OutputRecord.ADDOffset",
	 *               "InputRecord.IDObservation": "OutputRecord.IDObservation"
	 *          }
	 *      }
	 * }
	 */
	projectDataset(pConfiguration, pContext)
	{
		let tmpInputRecordset = this.fable.manifest.getValueByHash(pContext, pConfiguration.InputRecordsetAddress);
		if (typeof tmpInputRecordset == null || typeof tmpInputRecordset !== 'object')
		{
			throw new Error(`EntityBundleRequest failed to project dataset because the input recordset [${pConfiguration.InputRecordsetAddress}] did not return an valid object.`);
		}
		if (!Array.isArray(tmpInputRecordset))
		{
			tmpInputRecordset = [ tmpInputRecordset ];
		}
		let tmpDefaultOutputRecordset = this.fable.manifest.getValueByHash(pContext, pConfiguration.OutputRecordsetAddress);
		if (!tmpDefaultOutputRecordset)
		{
			tmpDefaultOutputRecordset = [];
			this.fable.manifest.setValueByHash(pContext, pConfiguration.OutputRecordsetAddress, tmpDefaultOutputRecordset);
		}
		for (const tmpInputRecord of tmpInputRecordset)
		{
			let tmpOutputRecordset = tmpDefaultOutputRecordset;
			let tmpOutputRecordsetAddressOverride;
			if (typeof pConfiguration.OutputRecordsetAddressMapping === 'object')
			{
				tmpOutputRecordsetAddressOverride = this._resolveOutputRecordsetAddressMapping(pConfiguration, pContext, tmpInputRecord);
				if (tmpOutputRecordsetAddressOverride)
				{
					tmpOutputRecordset = this.fable.manifest.getValueByHash(pContext, tmpOutputRecordsetAddressOverride);
					if (!tmpOutputRecordset)
					{
						tmpOutputRecordset = [];
						this.fable.manifest.setValueByHash(pContext, tmpOutputRecordsetAddressOverride, tmpOutputRecordset);
					}
				}
				if (!tmpOutputRecordset || !Array.isArray(tmpOutputRecordset))
				{
					tmpOutputRecordset = tmpDefaultOutputRecordset;
				}
			}
			const tmpPrototypeAddress = this.fable.parseTemplate(pConfiguration.RecordPrototypeAddress, Object.assign({ InputRecord: tmpInputRecord }, pContext));
			const tmpRecordPrototype = this.fable.manifest.getValueByHash(Object.assign({ InputRecord: tmpInputRecord, OutputRecordset: tmpOutputRecordset }, pContext), tmpPrototypeAddress);
			let tmpOutputRecord = { };
			if (Array.isArray(tmpRecordPrototype) && tmpRecordPrototype.length > 0)
			{
				tmpOutputRecord = tmpRecordPrototype[0];
			}
			else
			{
				tmpOutputRecordset.push(tmpOutputRecord);
			}
			let tmpRecordFieldMapping = pConfiguration.RecordFieldMapping[tmpOutputRecordsetAddressOverride] || pConfiguration.RecordFieldMapping.Default;
			if (!tmpRecordFieldMapping)
			{
				tmpRecordFieldMapping = pConfiguration.RecordFieldMapping[Object.keys(pConfiguration.RecordFieldMapping)[0]];
			}
			if (!tmpRecordFieldMapping)
			{
				throw new Error(`EntityBundleRequest failed to project dataset because the record field mapping for [${tmpOutputRecordsetAddressOverride}] did not return a mapping.`);
			}
			for (const tmpInputFieldAddress of Object.keys(tmpRecordFieldMapping))
			{
				const tmpOutputFieldAddress = tmpRecordFieldMapping[tmpInputFieldAddress];
				const tmpInputFieldValue = this.fable.manifest.getValueByHash(Object.assign({ InputRecord: tmpInputRecord }, pContext), tmpInputFieldAddress);
				this.fable.manifest.setValueByHash(Object.assign({ OutputRecord: tmpOutputRecord }, pContext), tmpOutputFieldAddress, tmpInputFieldValue);
			}
		}
	}

	_resolveOutputRecordsetAddressMapping(pConfiguration, pContext, pInputRecord)
	{
		const tmpAddressSpace = Object.assign({ InputRecord: pInputRecord }, pContext);
		for (const tmpRule of Object.keys(pConfiguration.OutputRecordsetAddressMapping))
		{
			const [ tmpLHSAddress, tmpOperator, tmpMatchValue ] = tmpRule.split(',');
			const tmpLHS = this.fable.manifest.getValueByHash(tmpAddressSpace, tmpLHSAddress);
			if (!tmpLHS)
			{
				if (this.fable.LogNoisiness > 0)
				{
					this.log.warn(`EntityBundleRequest failed to project dataset because the LHS address [${tmpLHSAddress}] did not return a value.`);
				}
				continue;
			}
			switch (tmpOperator)
			{
				case 'AnyContains':
					if (!Array.isArray(tmpLHS))
					{
						//TODO: consider making this use objects as well?
						this.log.error(`EntityBundleRequest failed to project dataset because the LHS address [${tmpLHSAddress}] did not return an array.`);
						continue;
					}
					for (const tmpLHSValue of tmpLHS)
					{
						if (String(tmpLHSValue).includes(tmpMatchValue))
						{
							return pConfiguration.OutputRecordsetAddressMapping[tmpRule];
						}
					}
			}
		}
		return null;
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
	 * Local version of gatherDataFromServer that only support synchronous operations.
	 *
	 * @param {Array<Record<string, any>>} pEntitiesBundleDescription - The entity bundle description object.
	 */
	processBundle(pEntitiesBundleDescription)
	{
		if (!Array.isArray(pEntitiesBundleDescription))
		{
			this.log.error(`EntityBundleRequest failed to parse entity bundle request because the input was not an array.`);
			throw new Error('EntityBundleRequest failed to parse entity bundle request because the input was not an array.');
		}

		const tmpStateStack = [];
		let tmpState = {};

		for (const tmpEntityBundleEntry of pEntitiesBundleDescription)
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
					case 'MapJoin':
						this.mapJoin(tmpEntityBundleEntry, this.prepareState(tmpState, tmpEntityBundleEntry));
						break;
					case 'ProjectDataset':
						this.projectDataset(tmpEntityBundleEntry, this.prepareState(tmpState, tmpEntityBundleEntry));
						break;
					default:
						this.log.error(`EntityBundleRequest encountered an unsupported type [${tmpEntityBundleEntry.Type}] in the entity bundle description.`);
				}
			}
			catch (pError)
			{
				this.log.error(`EntityBundleRequest error gathering entity set: ${pError}`, { Stack: pError.stack });
			}
		}
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
								return fNext();
							case 'PopState':
								if (tmpStateStack.length > 0)
								{
									tmpState = tmpStateStack.pop();
								}
								else
								{
									this.log.warn(`EntityBundleRequest encountered a PopState without a matching SetStateAddress.`);
								}
								return fNext();
							case 'Custom':
								return this.gatherCustomDataSet(tmpEntityBundleEntry, this.prepareState(tmpState, tmpEntityBundleEntry), fNext);
							case 'MapJoin':
								this.mapJoin(tmpEntityBundleEntry, this.prepareState(tmpState, tmpEntityBundleEntry));
								return fNext();
							case 'ProjectDataset':
								this.projectDataset(tmpEntityBundleEntry, this.prepareState(tmpState, tmpEntityBundleEntry));
								return fNext();
							// This is the default case, for a meadow entity set or single entity
							case 'MeadowEntityCount':
								return this.gatherEntitySetCount(tmpEntityBundleEntry, this.prepareState(tmpState, tmpEntityBundleEntry), fNext);
							case 'MeadowEntity':
							default:
								return this.gatherEntitySet(tmpEntityBundleEntry, this.prepareState(tmpState, tmpEntityBundleEntry), fNext);
						}
					}
					catch (pError)
					{
						this.log.error(`EntityBundleRequest error gathering entity set: ${pError}`, { Stack: pError.stack });
						return fNext();
					}
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
			Bundle: this.fable.Bundle,
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

	/**
	 * For a given list of objects, cache connected entity records.
	 * @param {Array} pRecordSet - An array of objects to check cache on joined records for, and, get/cache the records as needed.
	 * @param {Array} pIDListToCache - An array of property strings that are the ID fields to cache connected records for.
	 * @param {Array} pEntityListToCache - An array of entity names, which can override the speculative entity name derived from the ID field name.
	 * @param {boolean} pLiteRecords - If true, only cache lite records (ID and Name fields).
	 * @returns 
	 */
	cacheConnectedEntityRecords(pRecordSet, pIDListToCache, pEntityListToCache, pLiteRecords, fCallback)
	{
		if (!Array.isArray(pRecordSet) || pRecordSet.length < 1)
		{
			return fCallback();
		}

		if (!Array.isArray(pIDListToCache) || pIDListToCache.length < 1)
		{
			return fCallback();
		};

		const tmpAnticipate = this.fable.newAnticipate();

		const tmpEntityListToCache = pEntityListToCache || [];

		for (let i = 0; i < pIDListToCache.length; i++)
		{
			const tmpEntityIDSourceField = pIDListToCache[i];
			// If an entity name override is provided, use it, otherwise speculate the joined entity name ID field from the source ID field name.
			const tmpEntityName = tmpEntityListToCache[i] || tmpEntityIDSourceField.replace(/^ID/, '');
			const tmpIDField = `ID${tmpEntityName}`;

			// Make a set of IDs to fetch for this entity.
			const tmpEntityIDsToFetch = new Set();

			// Initialize the cache
			this.initializeCache(tmpEntityName);

			// First pass: gather IDs to fetch
			for (const tmpRecord of pRecordSet)
			{
				const tmpIDValue = tmpRecord[tmpEntityIDSourceField];
				if (tmpIDValue)
				{
					const tmpCachedRecord = this.recordCache[tmpEntityName].read(tmpIDValue);
					if (!tmpCachedRecord)
					{
						tmpEntityIDsToFetch.add(tmpIDValue);
					}
				}
			}

			// Now if there are records to fetch, do the request.
			if (tmpEntityIDsToFetch.size > 0)
			{
				tmpAnticipate.anticipate(
					function (fRequestComplete)
					{
						const tmpIDRecordsArray = Array.from(tmpEntityIDsToFetch);
						const tmpMeadowFilterExpression = `FBL~ID${tmpEntityName}~INN~${tmpIDRecordsArray.join(',')}`;

						this.getEntitySet(tmpEntityName, tmpMeadowFilterExpression,
							(pError, pEntitySet) =>
							{
								if (pError)
								{
									this.log.error(`cacheConnectedEntityRecords error getting connected entity records for [${tmpEntityName}] with IDs [${tmpIDRecordsArray.join(',')}]: ${pError}`, { Stack: pError.stack });
									return fRequestComplete(pError);
								}
								// The method automagically cached them for us!  Just move on to the next...
								return fRequestComplete();
							});
					}.bind(this));
			}
		}

		tmpAnticipate.wait(
			(pError) =>
			{
				if (pError)
				{
					this.log.error(`cacheConnectedEntityRecords error gathering connected entity records: ${pError}`, { Stack: pError.stack });
					return fCallback(pError);
				}
				return fCallback();
			});
	}

	/**
	 * Cache an array of records, likely from a meadow endpoint
	 * 
	 * @param {string} pEntity - The entity to cache individual records for
	 * @param {*} pRecordSet - An array of records to cache
	 */
	cacheIndividualEntityRecords(pEntity, pRecordSet)
	{
		this.initializeCache(pEntity);
		
		const tmpEntitySet = pRecordSet;

		if ((typeof(tmpEntitySet) == 'object') && Array.isArray(tmpEntitySet) && (tmpEntitySet.length > 0))
		{
			// Cache each record individually.
			// This code is here because the downstream getEntitySet function uses this to load records, so both are covered here.
			let tmpSpeculativeRecordIDColumn = `ID${pEntity}`;
			if (tmpSpeculativeRecordIDColumn in tmpEntitySet[0])
			{
				for (let i = 0; i < tmpEntitySet.length; i++)
				{
					const tmpRecord = tmpEntitySet[i];
					const tmpIDRecord = tmpRecord[tmpSpeculativeRecordIDColumn];
					if (tmpIDRecord)
					{
						this.recordCache[pEntity].put(tmpRecord, tmpIDRecord);
					}
				}
			}
		}
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
					this.log.error(`Error getting entity set of [${pEntity}] filtered to [${pMeadowFilterExpression}] [${pRecordStartCursor}/${pRecordCount}] from url [${tmpURL}]: ${pDownloadResponse.statusCode} ${pDownloadResponse.statusMessage}`);
					return fCallback(new Error(`Error getting entity set of [${pEntity}] filtered to [${pMeadowFilterExpression}] [${pRecordStartCursor}/${pRecordCount}] from url [${tmpURL}]: ${pDownloadResponse.statusCode} ${JSON.stringify(pDownloadBody || {})}`));
				}

				this.cacheIndividualEntityRecords(pEntity, pDownloadBody);

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

	getEntitySetWithAutoCaching(pEntity, pMeadowFilterExpression, fCallback)
	{
		let tmpAnticipate = this.fable.newAnticipate();

		let tmpRequestState = {Entity: pEntity, MeadowFilterExpression: pMeadowFilterExpression, EntitySet: null};

		tmpAnticipate.anticipate(
			function(fNext)
			{
				this.getEntitySet(pEntity, pMeadowFilterExpression,
					(pError, pEntitySet) =>
					{
						if (pError)
						{
							this.log.error(`getEntitySetWithAutoCaching error getting entity set for [${pEntity}] filtered to [${pMeadowFilterExpression}]: ${pError}`, { Stack: pError.stack });
							return fNext(pError);
						}
						tmpRequestState.EntitySet = pEntitySet;
						return fNext();
					});
			}.bind(this));
		
		tmpAnticipate.anticipate(
			function(fNext)
			{
				// Now see if we can infer some entities from this set to cache individual records for.
				if ((typeof(tmpRequestState.EntitySet) == 'object') && Array.isArray(tmpRequestState.EntitySet) && (tmpRequestState.EntitySet.length > 0))
				{
					// Look at each column and if it starts with `ID` and is longer than `ID` then speculate it is an entity join.
					const tmpFirstRecord = tmpRequestState.EntitySet[0];
					const tmpIDColumnsToCache = [];
					const tmpEntityNamesToCache = [];
					for (const tmpColumnName of Object.keys(tmpFirstRecord))
					{
						if ((tmpColumnName.startsWith('ID')) && (tmpColumnName.length > 2))
						{
							// Speculate this is an entity join.
							tmpIDColumnsToCache.push(tmpColumnName);
							const tmpSpeculatedEntityName = tmpColumnName.substring(2);
							tmpEntityNamesToCache.push(tmpSpeculatedEntityName);
						}
						// Mutate any `CreatingIDUser`, `UpdatingIDUser`, `DeletingIDUser` to the proper entiity
						else if (tmpColumnName in this.entityColumnTranslations)
						{
							tmpIDColumnsToCache.push(tmpColumnName);
							tmpEntityNamesToCache.push(this.entityColumnTranslations[tmpColumnName]);
						}
					}

					if (tmpIDColumnsToCache.length > 0)
					{
						return this.cacheConnectedEntityRecords(
							tmpRequestState.EntitySet,
							tmpIDColumnsToCache,
							tmpEntityNamesToCache,
							false,
							(pError) =>
							{
								if (pError)
								{
									this.log.error(`getEntitySetWithAutoCaching error caching connected entity records for [${pEntity}] filtered to [${pMeadowFilterExpression}]: ${pError}`, { Stack: pError.stack });
									return fNext(pError);
								}
								return fNext();
							});
					}
					else
					{
						return fNext();
					}
				}
				else
				{
					return fNext();
				}
			}.bind(this));
		
		tmpAnticipate.wait(
			function (pError)
			{
				if (pError)
				{
					this.log.error(`getEntitySetWithAutoCaching error gathering entity set for [${pEntity}] filtered to [${pMeadowFilterExpression}]: ${pError}`, { Stack: pError.stack });
					return fCallback(pError);
				}
				return fCallback(null, tmpRequestState.EntitySet);
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

								this.cacheIndividualEntityRecords(pEntity, tmpEntitySet);

								return fCallback(pFullDownloadError, tmpEntitySet);
							})
					});
			}.bind(this));
	}
}

module.exports = PictMeadowEntityProvider;
