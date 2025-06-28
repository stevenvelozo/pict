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
		/** @type {import('../filters/Filter.js').FilterState} */
		const tmpState = JSON.parse(JSON.stringify(pFilterExperience));
		tmpState.Mode = 'Records';
		tmpState.FilterConfiguration = pFilterConfiguration;
		const tmpFilter = new libFilter(this.pict);
		tmpFilter.generateMeadowFilterStanzas(tmpState);
		tmpFilter.linkPreparedFilters(tmpState);
		tmpFilter.normalizeMeadowFilterStanzas(tmpState);
		tmpFilter.compileMeadowFilterStanzas(tmpState);
		this.pict.EntityProvider.gatherDataFromServer(tmpState.BundleConfig, fCallback);
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
		const tmpCallback = typeof pRecordOffset === 'function' ? pRecordOffset : typeof pPageSize === 'function' ? pPageSize : fCallback;
		let tmpRecordOffset = typeof pRecordOffset === 'function' ? 0 : parseInt(String(pRecordOffset));
		if (isNaN(tmpRecordOffset) || tmpRecordOffset < 0)
		{
			tmpRecordOffset = 0;
		}
		let tmpPageSize = typeof pPageSize === 'function' ? 0 : parseInt(String(pPageSize));
		if (isNaN(tmpPageSize) || tmpPageSize < 0)
		{
			tmpPageSize = 0;
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
		this.pict.EntityProvider.gatherDataFromServer(tmpState.BundleConfig, tmpCallback);
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
		/** @type {import('../filters/Filter.js').FilterState} */
		const tmpState = JSON.parse(JSON.stringify(pFilterExperience));
		tmpState.Mode = 'Count';
		tmpState.FilterConfiguration = pFilterConfiguration;
		const tmpFilter = new libFilter(this.pict);
		tmpFilter.generateMeadowFilterStanzas(tmpState);
		tmpFilter.linkPreparedFilters(tmpState);
		tmpFilter.normalizeMeadowFilterStanzas(tmpState);
		tmpFilter.compileMeadowFilterStanzas(tmpState);
		this.pict.EntityProvider.gatherDataFromServer(tmpState.BundleConfig, fCallback);
	}

	executeFilter(pFilterConfigurationAddress, pFilterExperienceAddress, fCallback)
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
		return this.loadRecordsByFilter(tmpFilterConfiguration, tmpFilterExperience, fCallback);
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
		return this.loadRecordPageByFilter(tmpFilterConfiguration, tmpFilterExperience, pRecordOffset, pPageSize, fCallback);
	}

	executeFilterCount(pFilterConfigurationAddress, pFilterExperienceAddress, fCallback)
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
		return this.countRecordsByFilter(tmpFilterConfiguration, tmpFilterExperience, fCallback);
	}
}

module.exports = PictRecordSetFilterManager;
module.exports.default_configuration = _DEFAULT_PROVIDER_CONFIGURATION;
