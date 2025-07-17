const libPictTemplateIf = require('./Pict-Template-TemplateIf-Base.js');

class PictTemplateProviderTemplateIf extends libPictTemplateIf
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

		this.addPattern('{~TemplateIf:', '~}');
		this.addPattern('{~TIf:', '~}');
	}

	/**
	 * Render a template expression, returning a string with the resulting content.
	 *
	 * @param {string} pTemplateHash - The hash contents of the template (what's between the template start and stop tags)
	 * @param {any} pRecord - The json object to be used as the Record for the template render
	 * @param {Array<any>} pContextArray - An array of context objects accessible from the template; safe to leave empty
	 * @param {any} [pScope] - A sticky scope that can be used to carry state and simplify template
	 * @param {any} [pState] - A catchall state object for plumbing data through template processing.
	 *
	 * @return {string} The rendered template
	 */
	render(pTemplateHash, pRecord, pContextArray, pScope, pState)
	{
		let tmpHash = pTemplateHash.trim();
		let tmpData = (typeof (pRecord) === 'object') ? pRecord : {};

		if (this.pict.LogNoisiness > 4)
		{
			this.log.trace(`PICT Template [fTemplateIfAbsoluteValueRender]::[${tmpHash}] with tmpData:`, tmpData);
		}
		else if (this.pict.LogNoisiness > 0)
		{
			this.log.trace(`PICT Template [fTemplateIfAbsoluteValueRender]::[${tmpHash}]`);
		}

		let tmpTemplateHash;
		let tmpAddressOfData;
		let tmpComparisonOperation;

		let tmpHashParts = tmpHash.split(':');

		if (tmpHashParts.length < 3)
		{
			this.log.warn(`Pict: Template If Absolute Value Render: TemplateHash not complete for [${tmpHash}]`);
			return '';
		}

		tmpTemplateHash = tmpHashParts[0];
		tmpAddressOfData = tmpHashParts[1];
		tmpComparisonOperation = tmpHashParts[2];

		// No template hash
		if (!tmpTemplateHash)
		{
			this.log.warn(`Pict: Template Render: TemplateHash not resolved for [${tmpHash}]`);
			return '';
		}
		// No comparison operation
		if (!tmpComparisonOperation)
		{
			this.log.warn(`Pict: Template Render: Comparison Operation not resolved for [${tmpHash}]`);
			return '';
		}

		// Now try to break the comparison into three parts...
		let tmpComparisonParts = tmpComparisonOperation.split('^');
		if (tmpComparisonParts.length < 3)
		{
			this.log.warn(`Pict: Template Render: Comparison Operation not complete (three parts expected) for [${tmpHash}]`);
			return '';
		}

		// Now look up the data at the comparison location
		try
		{
			let tmpComparisonResult = this.compareValues(
				this.resolveStateFromAddress(tmpComparisonParts[0], tmpData, pContextArray, null, pScope, pState),
				tmpComparisonParts[1],
				this.resolveStateFromAddress(tmpComparisonParts[2], tmpData, pContextArray, null, pScope, pState));

			if (!tmpComparisonResult)
			{
				return '';
			}
			if (!tmpAddressOfData)
			{
				// No address was provided, just render the template with what this template has.
				return this.pict.parseTemplateByHash(tmpTemplateHash, pRecord, null, pContextArray, pScope, pState);
			}
			else
			{
				return this.pict.parseTemplateByHash(tmpTemplateHash, this.resolveStateFromAddress(tmpAddressOfData, tmpData, pContextArray, null, pScope, pState), null, pContextArray, pScope, pState);
			}
		}
		catch (pError)
		{
			this.log.error(`Pict: Template Render: Error looking up comparison data for [${tmpHash}]: ${pError}`, pError);
			return '';
		}
	}

	/**
	 * Render a template expression, deliver a string with the resulting content to a callback function.
	 *
	 * @param {string} pTemplateHash - The hash contents of the template (what's between the template start and stop tags)
	 * @param {any} pRecord - The json object to be used as the Record for the template render
	 * @param {(error?: Error, content?: String) => void} fCallback - callback function invoked with the rendered template, or an error
	 * @param {Array<any>} pContextArray - An array of context objects accessible from the template; safe to leave empty
	 * @param {any} [pScope] - A sticky scope that can be used to carry state and simplify template
	 * @param {any} [pState] - A catchall state object for plumbing data through template processing.
	 *
	 * @return {void}
	 */
	renderAsync(pTemplateHash, pRecord, fCallback, pContextArray, pScope, pState)
	{
		let tmpHash = pTemplateHash.trim();
		let tmpData = (typeof (pRecord) === 'object') ? pRecord : {};
		let tmpCallback = (typeof (fCallback) === 'function') ? fCallback : () => { return ''; };

		if (this.pict.LogNoisiness > 4)
		{
			this.log.trace(`PICT Template [fTemplateIfAbsoluteValueRender]::[${tmpHash}] with tmpData:`, tmpData);
		}
		else if (this.pict.LogNoisiness > 0)
		{
			this.log.trace(`PICT Template [fTemplateIfAbsoluteValueRender]::[${tmpHash}]`);
		}

		let tmpTemplateHash;
		let tmpAddressOfData;
		let tmpComparisonOperation;

		let tmpHashParts = tmpHash.split(':');

		if (tmpHashParts.length < 3)
		{
			this.log.warn(`Pict: Template If Absolute Value Render: TemplateHash not complete for [${tmpHash}]`);
			return tmpCallback(null, '');
		}

		tmpTemplateHash = tmpHashParts[0];
		tmpAddressOfData = tmpHashParts[1];
		tmpComparisonOperation = tmpHashParts[2];

		// No template hash
		if (!tmpTemplateHash)
		{
			this.log.warn(`Pict: Template Render: TemplateHash not resolved for [${tmpHash}]`);
			return tmpCallback(null, '');
		}
		// No comparison operation
		if (!tmpComparisonOperation)
		{
			this.log.warn(`Pict: Template Render: Comparison Operation not resolved for [${tmpHash}]`);
			return tmpCallback(null, '');
		}

		// Now try to break the comparison into three parts...
		let tmpComparisonParts = tmpComparisonOperation.split('^');
		if (tmpComparisonParts.length < 3)
		{
			this.log.warn(`Pict: Template Render: Comparison Operation not complete (three parts expected) for [${tmpHash}]`);
			return tmpCallback(null, '');
		}

		// Now look up the data at the comparison location
		try
		{
			// This is the only thing that's different from the absolute value function above.  Collapse these.
			let tmpComparisonResult = this.compareValues(
				this.resolveStateFromAddress(tmpComparisonParts[0], tmpData, pContextArray, null, pScope, pState),
				tmpComparisonParts[1],
				this.resolveStateFromAddress(tmpComparisonParts[2], tmpData, pContextArray, null, pScope, pState));

			if (!tmpComparisonResult)
			{
				return tmpCallback(null, '');
			}
			if (!tmpAddressOfData)
			{
				this.pict.parseTemplateByHash(tmpTemplateHash, pRecord,
					(pError, pValue) =>
					{
						if (pError)
						{
							return tmpCallback(pError, '');
						}
						return tmpCallback(null, pValue);
					}, pContextArray, pScope, pState);
			}
			else
			{
				this.pict.parseTemplateByHash(tmpTemplateHash, this.resolveStateFromAddress(tmpAddressOfData, tmpData, pContextArray, null, pScope, pState),
					(pError, pValue) =>
					{
						if (pError)
						{
							return tmpCallback(pError, '');
						}
						return tmpCallback(null, pValue);
					}, pContextArray, pScope, pState);
			}
		}
		catch (pError)
		{
			this.log.error(`Pict: Template Render: Error looking up comparison data for [${tmpHash}]: ${pError}`, pError);
			return tmpCallback(pError, '');
		}
	}
}

module.exports = PictTemplateProviderTemplateIf;
