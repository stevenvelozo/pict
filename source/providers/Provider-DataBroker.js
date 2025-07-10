const libPictProvider = require('pict-provider');

/** @type {Record<string, any>} */
const _DEFAULT_PROVIDER_CONFIGURATION =
{
	ProviderIdentifier: 'Pict-Provider-DataBroker',

	AutoInitialize: true,
	AutoInitializeOrdinal: 0
}

class PictDataBrokerProvider extends libPictProvider
{
	constructor(pFable, pOptions, pServiceHash)
	{
		let tmpOptions = Object.assign({}, _DEFAULT_PROVIDER_CONFIGURATION, pOptions);
		super(pFable, tmpOptions, pServiceHash);

		/** @type {Record<string, any>} */
		this.options;
		/** @type {import('../Pict.js')} */
		this.pict;

		this.marshalDestination = 'AppData';
	}

	/**
	 * @param {string} pHash - The hash of the value to retrieve.
	 */
	getValue(pHash)
	{
		return this.getValueByHash(pHash);
	}

	/**
	 * @param {string} pHash - The hash of the value to retrieve.
	 */
	getValueByHash(pHash)
	{
		return this.pict.manifest.getValueByHash(this.getMarshalDestinationObject(), pHash);
	}

	/**
	 * @param {string} pHash - The hash of the value to retrieve.
	 * @param {any} pValue - The value to set.
	 */
	setValue(pHash, pValue)
	{
		return this.setValueByHash(pHash, pValue);
	}

	/**
	 * @param {string} pHash - The hash of the value to retrieve.
	 * @param {any} pValue - The value to set.
	 */
	setValueByHash(pHash, pValue)
	{
		return this.pict.manifest.setValueByHash(this.getMarshalDestinationObject(), pHash, pValue);
	}

	/**
	 * @param {string} pMarshalDestinationAddress - The address of the marshal destination.
	 */
	set marshalDestination(pMarshalDestinationAddress)
	{
		this._marshalDestination = pMarshalDestinationAddress;
		this._marshalDestinationObject = this.pict.resolveStateFromAddress(pMarshalDestinationAddress);
		if (!this._marshalDestinationObject)
		{
			throw new Error(`Invalid marshal destination address: ${pMarshalDestinationAddress}`);
		}
	}

	/**
	 * @return {Record<string, any>} - The marshal destination object.
	 */
	get marshalDestinationObject()
	{
		return this._marshalDestinationObject;
	}

	getMarshalDestinationObject()
	{
		return this.marshalDestinationObject;
	}
}

module.exports = PictDataBrokerProvider;
module.exports.default_configuration = _DEFAULT_PROVIDER_CONFIGURATION;
