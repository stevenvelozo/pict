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

		this.addPattern('{~TemplateIf:', '~}');
		this.addPattern('{~TIf:', '~}');
	}

	render(pTemplateHash, pRecord, pContextArray)
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

		let tmpTemplateHash = false;
		let tmpAddressOfData = false;
		let tmpComparisonOperation = false;

		let tmpHashParts = tmpHash.split(':');

		if (tmpHashParts.length < 3)
		{
			this.log.warn(`Pict: Template If Absolute Value Render: TemplateHash not complete for [${tmpHash}]`);
			return `Pict: Template If Absolute Value Render: TemplateHash not complete for [${tmpHash}]`;
		}

		tmpTemplateHash = tmpHashParts[0];
		tmpAddressOfData = tmpHashParts[1];
		tmpComparisonOperation = tmpHashParts[2];

		// No template hash
		if (!tmpTemplateHash)
		{
			this.log.warn(`Pict: Template Render: TemplateHash not resolved for [${tmpHash}]`);
			return `Pict: Template Render: TemplateHash not resolved for [${tmpHash}]`;
		}
		// No comparison operation
		if (!tmpComparisonOperation)
		{
			this.log.warn(`Pict: Template Render: Comparison Operation not resolved for [${tmpHash}]`);
			return `Pict: Template Render: Comparison Operation not resolved for [${tmpHash}]`;
		}

		// Now try to break the comparison into three parts...
		let tmpComparisonParts = tmpComparisonOperation.split('^');
		if (tmpComparisonParts.length < 3)
		{
			this.log.warn(`Pict: Template Render: Comparison Operation not complete (three parts expected) for [${tmpHash}]`);
			return `Pict: Template Render: Comparison Operation not complete (three parts expected) for [${tmpHash}]`;
		}

		// Now look up the data at the comparison location
		try
		{
			let tmpComparisonResult = this.compareValues(
				this.resolveStateFromAddress(tmpComparisonParts[0], tmpData, pContextArray),
				tmpComparisonParts[1],
				this.resolveStateFromAddress(tmpComparisonParts[2], tmpData, pContextArray));

			if (!tmpComparisonResult)
			{
				return '';
			}
			else
			{
				if (!tmpAddressOfData)
				{
					// No address was provided, just render the template with what this template has.
					return this.pict.parseTemplateByHash(tmpTemplateHash, pRecord, null, pContextArray);
				}
				else
				{
					return this.pict.parseTemplateByHash(tmpTemplateHash, this.resolveStateFromAddress(tmpAddressOfData, tmpData, pContextArray), null, pContextArray);
				}
			}
		}
		catch (pError)
		{
			this.log.error(`Pict: Template Render: Error looking up comparison data for [${tmpHash}]: ${pError}`, pError);
			return `Pict: Template Render: Error looking up comparison data for [${tmpHash}]: ${pError}`;
		}
	}

	renderAsync(pTemplateHash, pRecord, fCallback, pContextArray)
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

		let tmpTemplateHash = false;
		let tmpAddressOfData = false;
		let tmpComparisonOperation = false;

		let tmpHashParts = tmpHash.split(':');

		if (tmpHashParts.length < 3)
		{
			this.log.warn(`Pict: Template If Absolute Value Render: TemplateHash not complete for [${tmpHash}]`);
			return tmpCallback(new Error(`Pict: Template If Absolute Value Render: TemplateHash not complete for [${tmpHash}]`));
		}

		tmpTemplateHash = tmpHashParts[0];
		tmpAddressOfData = tmpHashParts[1];
		tmpComparisonOperation = tmpHashParts[2];

		// No template hash
		if (!tmpTemplateHash)
		{
			this.log.warn(`Pict: Template Render: TemplateHash not resolved for [${tmpHash}]`);
			return tmpCallback(new Error(`Pict: Template Render: TemplateHash not resolved for [${tmpHash}]`));
		}
		// No comparison operation
		if (!tmpComparisonOperation)
		{
			this.log.warn(`Pict: Template Render: Comparison Operation not resolved for [${tmpHash}]`);
			return tmpCallback(new Error(`Pict: Template Render: Comparison Operation not resolved for [${tmpHash}]`));
		}

		// Now try to break the comparison into three parts...
		let tmpComparisonParts = tmpComparisonOperation.split('^');
		if (tmpComparisonParts.length < 3)
		{
			this.log.warn(`Pict: Template Render: Comparison Operation not complete (three parts expected) for [${tmpHash}]`);
			return tmpCallback(new Error(`Pict: Template Render: Comparison Operation not complete (three parts expected) for [${tmpHash}]`));
		}

		// Now look up the data at the comparison location
		try
		{
			// This is the only thing that's different from the absolute value function above.  Collapse these.
			let tmpComparisonResult = this.compareValues(
				this.resolveStateFromAddress(tmpComparisonParts[0], tmpData, pContextArray),
				tmpComparisonParts[1],
				this.resolveStateFromAddress(tmpComparisonParts[2], tmpData, pContextArray));

			if (!tmpComparisonResult)
			{
				return tmpCallback(null, '');
			}
			else
			{
				if (!tmpAddressOfData)
				{
					return this.pict.parseTemplateByHash(tmpTemplateHash, pRecord,
						(pError, pValue) =>
						{
							if (pError)
							{
								return tmpCallback(pError, '');
							}
							return tmpCallback(null, pValue);
						}, pContextArray);
				}
				else
				{
					return this.pict.parseTemplateByHash(tmpTemplateHash, this.resolveStateFromAddress(tmpAddressOfData, tmpData, pContextArray),
						(pError, pValue) =>
						{
							if (pError)
							{
								return tmpCallback(pError, '');
							}
							return tmpCallback(null, pValue);
						}, pContextArray);
				}
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
