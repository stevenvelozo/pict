const libPictTemplate = require('pict-template');

class PictTemplateProviderSolveByReference extends libPictTemplate
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

		this.addPattern('{~SolveByReference:', '~}');
		this.addPattern('{~SBR:', '~}');
	}

	/**
	 * Render a template expression, returning a string with the resulting content.
	 *
	 * @param {string} pSolveParams - The solver parameters.
	 * @param {any} pRecord - The json object to be used as the Record for the template render
	 * @param {Array<any>} pContextArray - An array of context objects accessible from the template; safe to leave empty
	 * @param {any} [pScope] - A sticky scope that can be used to carry state and simplify template
	 * @param {any} [pState] - A catchall state object for plumbing data through template processing.
	 *
	 * @return {string} The rendered template
	 */
	render(pSolveParams, pRecord, pContextArray, pScope, pState)
	{
		// {~SBR:AppData.Equation:AppData.HomeworkRectangleSize:AppData.HomeworkManifest~}
		const [ tmpEquationAddress, tmpRecordAddress, tmpManifestAddress ] = pSolveParams.trim().split(':', 3);
		const tmpContextualRecord = (typeof (pRecord) === 'object') ? pRecord : {};

		if (this.pict.LogNoisiness > 4)
		{
			this.log.trace(`PICT SolveByReference [fTemplateRender]::[${pSolveParams}] with tmpData:`, tmpContextualRecord);
		}
		else if (this.pict.LogNoisiness > 0)
		{
			this.log.trace(`PICT SolveByReference [fTemplateRender]::[${pSolveParams}]`);
		}

		const tmpEquation = this.pict.resolveStateFromAddress(tmpEquationAddress, tmpContextualRecord, pContextArray, null, pScope, pState);
		if (!tmpEquation)
		{
			if (this.pict.LogNoisiness > 2)
			{
				this.log.warn(`Pict: SolveByReference: Equation not found for [${tmpEquationAddress}]`);
			}
			return '';
		}
		const tmpRecord = (tmpRecordAddress && this.pict.resolveStateFromAddress(tmpRecordAddress, tmpContextualRecord, pContextArray, null, pScope, pState)) || tmpContextualRecord;
		const tmpManifest = (tmpManifestAddress && this.pict.resolveStateFromAddress(tmpManifestAddress, tmpContextualRecord, pContextArray, null, pScope, pState)) || this.pict.manifest;
		const expressionParser = this.fable.instantiateServiceProviderIfNotExists('ExpressionParser');
		const tmpResultObject = { };
		return expressionParser.solve(tmpEquation, tmpRecord, tmpResultObject, tmpManifest, tmpRecord);
	}
}

module.exports = PictTemplateProviderSolveByReference;
