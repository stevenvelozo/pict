const libPictProvider = require('pict-provider');
const libFilter = require('../filters/Filter.js');

/** @type {Record<string, any>} */
const _DEFAULT_PROVIDER_CONFIGURATION =
{
	ProviderIdentifier: 'Pict-RecordSet-FilterManager',

	AutoInitialize: true,
	AutoInitializeOrdinal: 0
}

class PictRecordSetFilterManager extends libPictProvider
{
	constructor(pFable, pOptions, pServiceHash)
	{
		let tmpOptions = Object.assign({}, _DEFAULT_PROVIDER_CONFIGURATION, pOptions);
		super(pFable, tmpOptions, pServiceHash);

		/** @type {Record<string, any>} */
		this.options;
		/** @type {import('../Pict.js')} */
		this.pict;

		this.filters = {};
		this.filterCriteria = {};
	}

	/**
	 * @param {string} pFilterHash
	 * @param {Record<string, any>} pFilterConfig
	 *
	 * @return {void}
	 */
	addFilter(pFilterHash, pFilterConfig)
	{
		if (!pFilterHash || typeof pFilterHash !== 'string')
		{
			this.log.error('Invalid filter hash provided. It must be a non-empty string.');
			return;
		}
		if (!pFilterConfig || typeof pFilterConfig !== 'object' || !pFilterConfig.Type)
		{
			this.log.error('Invalid filter configuration provided. It must be an object with a Type property.');
			return;
		}
		const tmpFilterConfig = JSON.parse(JSON.stringify(pFilterConfig));
		if (tmpFilterConfig.Hash && tmpFilterConfig.Hash !== pFilterHash)
		{
			this.log.warn(`Filter configuration hash mismatch: provided ${tmpFilterConfig.Hash}, expected ${pFilterHash}. Overriding with provided hash.`);
		}
		tmpFilterConfig.Hash = pFilterHash;
		this.filters[tmpFilterConfig.Hash] = tmpFilterConfig;
	}

	/**
	 * @param {string} pFilterCriteriaHash
	 * @param {Record<string, any>} pFilterCriteriaConfig
	 *
	 * @return {void}
	 */
	addFilterCriteria(pFilterCriteriaHash, pFilterCriteriaConfig)
	{
		if (!pFilterCriteriaHash || typeof pFilterCriteriaHash !== 'string')
		{
			this.log.error('Invalid filter criteria hash provided. It must be a non-empty string.');
			return;
		}
		if (!pFilterCriteriaConfig || !Array.isArray(pFilterCriteriaConfig))
		{
			this.log.error('Invalid filter criteria configuration provided. It must be an array of filter clauses.');
			return;
		}
		const tmpFilterCriteriaConfig = JSON.parse(JSON.stringify(pFilterCriteriaConfig));
		this.filterCriteria[pFilterCriteriaHash] = tmpFilterCriteriaConfig;
	}

	/**
	 * @param {string} pFilterHash
	 * @return {Record<string, any> | undefined}
	 */
	getFilter(pFilterHash)
	{
		return this.filters[pFilterHash];
	}

	/**
	 * @param {string} pFilterCriteriaHash
	 * @return {Record<string, any> | undefined}
	 */
	getFilterCriteria(pFilterCriteriaHash)
	{
		return this.filterCriteria[pFilterCriteriaHash];
	}

	/**
	 * Run a filter configuration against a filter experience and return ALL matched records.
	 *
	 * @param {Array<Record<string, any>>} pFilterConfiguration
	 * @param {Record<string, any>} pFilterExperience
	 * @param {(pError?: Error) => void} fCallback
	 */
	loadRecordsByFilter(pFilterConfiguration, pFilterExperience, fCallback)
	{
		return this.loadRecordsByFilterUsingProvider(this.pict.EntityProvider, pFilterConfiguration, pFilterExperience, fCallback);
	}

	/**
	 * Run a filter configuration against a filter experience and return ALL matched records.
	 *
	 * @param {import('../Pict-Meadow-EntityProvider.js')} pEntityProvider
	 * @param {Array<Record<string, any>>} pFilterConfiguration
	 * @param {Record<string, any>} pFilterExperience
	 * @param {(pError?: Error) => void} fCallback
	 */
	loadRecordsByFilterUsingProvider(pEntityProvider, pFilterConfiguration, pFilterExperience, fCallback)
	{
		if (!pEntityProvider || typeof pEntityProvider.gatherDataFromServer !== 'function')
		{
			return fCallback(new Error('loadRecordsByFilter: Missing or invalid EntityProvider.'));
		}
		/** @type {import('../filters/Filter.js').FilterState} */
		const tmpState = JSON.parse(JSON.stringify(pFilterExperience));
		tmpState.Mode = 'Records';
		tmpState.FilterConfiguration = pFilterConfiguration;
		const tmpFilter = new libFilter(this.pict);
		tmpFilter.generateMeadowFilterStanzas(tmpState);
		tmpFilter.linkPreparedFilters(tmpState);
		tmpFilter.normalizeMeadowFilterStanzas(tmpState);
		tmpFilter.compileMeadowFilterStanzas(tmpState);
		pEntityProvider.gatherDataFromServer(tmpState.BundleConfig, fCallback);
	}

	/**
	 * Run a filter configuration against a filter experience and return a page of records.
	 *
	 * @param {Array<Record<string, any>>} pFilterConfiguration
	 * @param {Record<string, any>} pFilterExperience
	 * @param {number | string | ((pError?: Error) => void)} pRecordOffset
	 * @param {number | string | ((pError?: Error) => void)} pPageSize
	 * @param {(pError?: Error) => void} fCallback
	 */
	loadRecordPageByFilter(pFilterConfiguration, pFilterExperience, pRecordOffset, pPageSize, fCallback)
	{
		return this.loadRecordPageByFilterUsingProvider(this.pict.EntityProvider, pFilterConfiguration, pFilterExperience, pRecordOffset, pPageSize, fCallback);
	}

	/**
	 * Run a filter configuration against a filter experience and return a page of records.
	 *
	 * @param {import('../Pict-Meadow-EntityProvider.js')} pEntityProvider
	 * @param {Array<Record<string, any>>} pFilterConfiguration
	 * @param {Record<string, any>} pFilterExperience
	 * @param {number | string | ((pError?: Error) => void)} pRecordOffset
	 * @param {number | string | ((pError?: Error) => void)} pPageSize
	 * @param {(pError?: Error) => void} fCallback
	 */
	loadRecordPageByFilterUsingProvider(pEntityProvider, pFilterConfiguration, pFilterExperience, pRecordOffset, pPageSize, fCallback)
	{
		if (!pEntityProvider || typeof pEntityProvider.gatherDataFromServer !== 'function')
		{
			return fCallback(new Error('loadRecordPageByFilter: Missing or invalid EntityProvider.'));
		}
		const tmpCallback = typeof pRecordOffset === 'function' ? pRecordOffset : typeof pPageSize === 'function' ? pPageSize : fCallback;
		let tmpRecordOffset = typeof pRecordOffset === 'function' ? 0 : parseInt(String(pRecordOffset));
		if (isNaN(tmpRecordOffset) || tmpRecordOffset < 0)
		{
			tmpRecordOffset = 0;
		}
		let tmpPageSize = typeof pPageSize === 'function' ? 0 : parseInt(String(pPageSize));
		if (isNaN(tmpPageSize) || tmpPageSize < 0)
		{
			//TODO: this is a safety measure to try and not break things when we release this pict version; should be a lower value
			tmpPageSize = 10000;
		}
		/** @type {import('../filters/Filter.js').FilterState} */
		const tmpState = JSON.parse(JSON.stringify(pFilterExperience));
		tmpState.Mode = 'Records';
		tmpState.RecordOffset = tmpRecordOffset;
		tmpState.PageSize = tmpPageSize;
		tmpState.FilterConfiguration = pFilterConfiguration;
		const tmpFilter = new libFilter(this.pict);
		tmpFilter.generateMeadowFilterStanzas(tmpState);
		tmpFilter.linkPreparedFilters(tmpState);
		tmpFilter.normalizeMeadowFilterStanzas(tmpState);
		tmpFilter.compileMeadowFilterStanzas(tmpState);
		pEntityProvider.gatherDataFromServer(tmpState.BundleConfig, tmpCallback);
	}

	/**
	 * Run a filter configuration against a filter experience and return the count of records.
	 *
	 * @param {Array<Record<string, any>>} pFilterConfiguration
	 * @param {Record<string, any>} pFilterExperience
	 * @param {(pError?: Error) => void} fCallback
	 */
	countRecordsByFilter(pFilterConfiguration, pFilterExperience, fCallback)
	{
		return this.countRecordsByFilterUsingProivider(this.pict.EntityProvider, pFilterConfiguration, pFilterExperience, fCallback);
	}

	/**
	 * Run a filter configuration against a filter experience and return the count of records.
	 *
	 * @param {import('../Pict-Meadow-EntityProvider.js')} pEntityProvider
	 * @param {Array<Record<string, any>>} pFilterConfiguration
	 * @param {Record<string, any>} pFilterExperience
	 * @param {(pError?: Error) => void} fCallback
	 */
	countRecordsByFilterUsingProivider(pEntityProvider, pFilterConfiguration, pFilterExperience, fCallback)
	{
		/** @type {import('../filters/Filter.js').FilterState} */
		const tmpState = JSON.parse(JSON.stringify(pFilterExperience));
		tmpState.Mode = 'Count';
		tmpState.FilterConfiguration = pFilterConfiguration;
		const tmpFilter = new libFilter(this.pict);
		tmpFilter.generateMeadowFilterStanzas(tmpState);
		tmpFilter.linkPreparedFilters(tmpState);
		tmpFilter.normalizeMeadowFilterStanzas(tmpState);
		tmpFilter.compileMeadowFilterStanzas(tmpState);
		pEntityProvider.gatherDataFromServer(tmpState.BundleConfig, fCallback);
	}

	/**
	 * @param {string} pFilterConfigurationAddress
	 * @param {string} pFilterExperienceAddress
	 * @param {(pError?: Error) => void} fCallback
	 *
	 * @return {void}
	 */
	executeFilter(pFilterConfigurationAddress, pFilterExperienceAddress, fCallback)
	{
		return this.executeFilterUsingProvider(this.pict.EntityProvider, pFilterConfigurationAddress, pFilterExperienceAddress, fCallback);
	}

	/**
	 * @param {import('../Pict-Meadow-EntityProvider.js')} pEntityProvider
	 * @param {string} pFilterConfigurationAddress
	 * @param {string} pFilterExperienceAddress
	 * @param {(pError?: Error) => void} fCallback
	 *
	 * @return {void}
	 */
	executeFilterUsingProvider(pEntityProvider, pFilterConfigurationAddress, pFilterExperienceAddress, fCallback)
	{
		if (!pEntityProvider || typeof pEntityProvider.gatherDataFromServer !== 'function')
		{
			return fCallback(new Error('executeFilter: Missing or invalid EntityProvider.'));
		}
		const tmpFilterConfiguration = this.pict.resolveStateFromAddress(pFilterConfigurationAddress);
		if (!Array.isArray(tmpFilterConfiguration))
		{
			return fCallback(new Error(`Filter configuration at address ${pFilterConfigurationAddress} is not an array.`));
		}
		const tmpFilterExperience = this.pict.resolveStateFromAddress(pFilterExperienceAddress);
		if (!tmpFilterExperience || typeof tmpFilterExperience !== 'object')
		{
			return fCallback(new Error(`Filter experience at address ${pFilterExperienceAddress} is not an object.`));
		}
		return this.loadRecordsByFilterUsingProvider(pEntityProvider, tmpFilterConfiguration, tmpFilterExperience, fCallback);
	}

	/**
	 * Run a filter configuration against a filter experience and return a page of records.
	 *
	 * @param {string} pFilterConfigurationAddress
	 * @param {string} pFilterExperienceAddress
	 * @param {number | ((pError?: Error) => void)} pRecordOffset
	 * @param {number | ((pError?: Error) => void)} pPageSize
	 * @param {(pError?: Error) => void} fCallback
	 */
	executeFilterPage(pFilterConfigurationAddress, pFilterExperienceAddress, pRecordOffset, pPageSize, fCallback)
	{
		return this.executeFilterPageUsingProvider(this.pict.EntityProvider, pFilterConfigurationAddress, pFilterExperienceAddress, pRecordOffset, pPageSize, fCallback);
	}

	/**
	 * Run a filter configuration against a filter experience and return a page of records.
	 *
	 * @param {import('../Pict-Meadow-EntityProvider.js')} pEntityProvider
	 * @param {string} pFilterConfigurationAddress
	 * @param {string} pFilterExperienceAddress
	 * @param {number | ((pError?: Error) => void)} pRecordOffset
	 * @param {number | ((pError?: Error) => void)} pPageSize
	 * @param {(pError?: Error) => void} fCallback
	 */
	executeFilterPageUsingProvider(pEntityProvider, pFilterConfigurationAddress, pFilterExperienceAddress, pRecordOffset, pPageSize, fCallback)
	{
		const tmpCallback = typeof pRecordOffset === 'function' ? pRecordOffset : typeof pPageSize === 'function' ? pPageSize : fCallback;
		const tmpFilterConfiguration = this.pict.resolveStateFromAddress(pFilterConfigurationAddress);
		if (!Array.isArray(tmpFilterConfiguration))
		{
			return tmpCallback(new Error(`Filter configuration at address ${pFilterConfigurationAddress} is not an array.`));
		}
		const tmpFilterExperience = this.pict.resolveStateFromAddress(pFilterExperienceAddress);
		if (!tmpFilterExperience || typeof tmpFilterExperience !== 'object')
		{
			return tmpCallback(new Error(`Filter experience at address ${pFilterExperienceAddress} is not an object.`));
		}
		return this.loadRecordPageByFilterUsingProvider(pEntityProvider, tmpFilterConfiguration, tmpFilterExperience, pRecordOffset, pPageSize, fCallback);
	}

	/**
	 * @param {string} pFilterConfigurationAddress
	 * @param {string} pFilterExperienceAddress
	 * @param {(pError?: Error) => void} fCallback
	 *
	 * @return {void}
	 */
	executeFilterCount(pFilterConfigurationAddress, pFilterExperienceAddress, fCallback)
	{
		return this.executeFilterCountUsingProvider(this.pict.EntityProvider, pFilterConfigurationAddress, pFilterExperienceAddress, fCallback);
	}

	/**
	 * @param {import('../Pict-Meadow-EntityProvider.js')} pEntityProvider
	 * @param {string} pFilterConfigurationAddress
	 * @param {string} pFilterExperienceAddress
	 * @param {(pError?: Error) => void} fCallback
	 *
	 * @return {void}
	 */
	executeFilterCountUsingProvider(pEntityProvider, pFilterConfigurationAddress, pFilterExperienceAddress, fCallback)
	{
		const tmpFilterConfiguration = this.pict.resolveStateFromAddress(pFilterConfigurationAddress);
		if (!Array.isArray(tmpFilterConfiguration))
		{
			return fCallback(new Error(`Filter configuration at address ${pFilterConfigurationAddress} is not an array.`));
		}
		const tmpFilterExperience = this.pict.resolveStateFromAddress(pFilterExperienceAddress);
		if (!tmpFilterExperience || typeof tmpFilterExperience !== 'object')
		{
			return fCallback(new Error(`Filter experience at address ${pFilterExperienceAddress} is not an object.`));
		}
		return this.countRecordsByFilterUsingProivider(pEntityProvider, tmpFilterConfiguration, tmpFilterExperience, fCallback);
	}
}

module.exports = PictRecordSetFilterManager;
module.exports.default_configuration = _DEFAULT_PROVIDER_CONFIGURATION;
