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
	 * @return {string} - The address of the marshal destination.
	 */
	get marshalDestination()
	{
		return this._marshalDestination;
	}

	/**
	 * @param {string} pMarshalDestinationAddress - The address of the marshal destination.
	 */
	set marshalDestination(pMarshalDestinationAddress)
	{
		this._marshalDestination = pMarshalDestinationAddress;
	}

	/**
	 * @return {Record<string, any>} - The marshal destination object.
	 */
	get marshalDestinationObject()
	{
		const tmpMarshalDestinationAddress = this.marshalDestination;
		if (!tmpMarshalDestinationAddress)
		{
			throw new Error(`Attempt to access marshal destination object with no marshal destination set.`);
		}
		//TODO: figure out a clean way to cache this object that sanely invalidates if the destination changes
		let tmpMarshalDestinationObject = this.pict.resolveStateFromAddress(tmpMarshalDestinationAddress);
		if (!tmpMarshalDestinationObject)
		{
			this.log.error(`Data Broker bootstrapping missing object at marshal destination address: ${tmpMarshalDestinationAddress}`);
			this.pict.setStateValueAtAddress(tmpMarshalDestinationAddress, null, {});
			tmpMarshalDestinationObject = this.pict.resolveStateFromAddress(tmpMarshalDestinationAddress);
			if (!tmpMarshalDestinationObject)
			{
				throw new Error(`Attempt to access marshal destination object with no marshal destination set.`);
			}
		}
		return tmpMarshalDestinationObject;
	}

	getMarshalDestinationObject()
	{
		return this.marshalDestinationObject;
	}

	/**
	 * @param {string} [pOverrideMarshalDestination] - Optional override for the marshal destination address.
	 */
	resolveMarshalDestinationObject(pOverrideMarshalDestination)
	{
		const tmpMarshalDestinationAddress = pOverrideMarshalDestination || this.marshalDestination;
		if (!tmpMarshalDestinationAddress)
		{
			throw new Error(`Attempt to resolve marshal destination object with no marshal destination set.`);
		}
		let tmpMarshalDestinationObject;
		if (pOverrideMarshalDestination)
		{
			tmpMarshalDestinationObject = this.pict.resolveStateFromAddress(pOverrideMarshalDestination);
			if (!tmpMarshalDestinationObject)
			{
				this.log.error(`Data Broker bootstrapping missing object at marshal destination address: ${tmpMarshalDestinationAddress}`);
				this.pict.setStateValueAtAddress(tmpMarshalDestinationAddress, null, {});
			}
		}
		else
		{
			tmpMarshalDestinationObject = this.getMarshalDestinationObject();
		}
		return tmpMarshalDestinationObject;
	}
}

module.exports = PictDataBrokerProvider;
module.exports.default_configuration = _DEFAULT_PROVIDER_CONFIGURATION;
