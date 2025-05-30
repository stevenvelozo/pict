const libPictTemplate = require('pict-template');

class PictTemplateProviderEntity extends libPictTemplate
{
	/**
	 * @param {Object} pFable - The Fable Framework instance
	 * @param {Object} pOptions - The options for the service
	 * @param {String} pServiceHash - The hash of the service
	 */
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		/** @type {any} */
		this.log;

		this.addPattern('{~E:', '~}');
		this.addPattern('{~Entity:', '~}');
	}

	/**
	 * Render a template expression, returning a string with the resulting content.
	 *
	 * @param {string} pTemplateHash - The hash contents of the template (what's between the template start and stop tags)
	 * @param {any} pRecord - The json object to be used as the Record for the template render
	 * @param {Array<any>} pContextArray - An array of context objects accessible from the template; safe to leave empty
	 *
	 * @return {string} The rendered template
	 */
	render(pTemplateHash, pRecord, pContextArray)
	{
		// TODO: Better messaging
		this.log.error(`Pict: Entity Render [${pTemplateHash}]: Render called in a non-asynchronous fashion.  This should not happen.`);
		return '';
	}

	/**
	 * Render a template expression, deliver a string with the resulting content to a callback function.
	 *
	 * @param {string} pTemplateHash - The hash contents of the template (what's between the template start and stop tags)
	 * @param {any} pRecord - The json object to be used as the Record for the template render
	 * @param {Array<any>} pContextArray - An array of context objects accessible from the template; safe to leave empty
	 * @param {(error?: Error, content?: String) => void} fCallback - callback function invoked with the rendered template, or an error
	 *
	 * @return {void}
	 */
	renderAsync(pTemplateHash, pRecord, fCallback, pContextArray)
	{
		let tmpHash = pTemplateHash.trim();
		let tmpData = (typeof (pRecord) === 'object') ? pRecord : {};
		let tmpCallback = (typeof (fCallback) === 'function') ? fCallback : () => { return ''; };

		if (this.pict.LogNoisiness > 4)
		{
			this.log.trace(`PICT Template [fEntityRender]::[${tmpHash}] with tmpData:`, tmpData);
		}
		else if (this.pict.LogNoisiness > 0)
		{
			this.log.trace(`PICT Template [fEntityRender]::[${tmpHash}]`);
		}

		let tmpEntity;
		/** @type {string|number} */
		let tmpEntityID = '';
		let tmpEntityTemplate;

		// This expression requires 2 parts -- a third is optional, and, if present, is the template to render to.
		let tmpAddressParts = tmpHash.split('^');

		if (tmpAddressParts.length < 2)
		{
			this.log.warn(`Pict: Entity Render: Entity or entity ID not resolved for [${tmpHash}]`);
			return tmpCallback(null, '');
		}

		tmpEntity = tmpAddressParts[0].trim();
		tmpEntityID = tmpAddressParts[1].trim();
		tmpEntityTemplate = tmpAddressParts[2].trim();

		if (!isNaN(Number(tmpEntityID)))
		{
			try
			{
				tmpEntityID = parseInt(String(tmpEntityID));
			}
			catch
			{
				this.log.warn(`Pict: Entity Render: Could not parse entity ID.`);
				tmpEntityID = 0;
			}
		}
		else
		{
			// This is an address, so we need to get the value at the address
			tmpEntityID = this.resolveStateFromAddress(String(tmpEntityID), tmpData, pContextArray);
		}

		// No Entity or EntityID
		if (!tmpEntity || !tmpEntityID)
		{
			this.log.warn(`Pict: Entity Render: Entity or entity ID not resolved for [${tmpHash}]  Entity: ${tmpEntity} ID: ${tmpEntityID}`);
			return tmpCallback(null, '');
		}

		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`Pict: Entity Render: Entity [${tmpEntity}] with ID [${tmpEntityID}] as template [${tmpEntityTemplate}] from [${tmpHash}]`);
		}

		// Now try to get the entity
		this.pict.EntityProvider.getEntity(tmpEntity, tmpEntityID,
			function (pError, pRecord)
			{
				if (pError)
				{
					this.log.error(`Pict: Entity Render: Error getting entity [${tmpEntity}] with ID [${tmpEntityID}] for [${tmpHash}]: ${pError}`, pError);
					return tmpCallback(pError, '');
				}

				// Now render the template
				if (tmpEntityTemplate)
				{
					this.pict.parseTemplateByHash(tmpEntityTemplate, pRecord, tmpCallback, pContextArray);
				}
				else
				{
					tmpCallback(null, '');
				}
			}.bind(this));
	}
}

module.exports = PictTemplateProviderEntity;
