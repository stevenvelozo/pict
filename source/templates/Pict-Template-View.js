const libPictTemplate = require('pict-template');

class PictTemplateProviderView extends libPictTemplate
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

		this.addPattern('{~V:', '~}');
		this.addPattern('{~View:', '~}');


		if (!('__TemplateOutputCache' in this.pict))
		{
			this.pict.__TemplateOutputCache = {};
		}
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
		const tmpViewHash = pTemplateHash.trim();
		if (!(tmpViewHash in this.pict.views))
		{
			this.log.warn(`Pict: View Template Render: View not found for [${tmpViewHash}]`);
			return '';
		}

		let tmpRenderGUID = this.pict.getUUID();

		const tmpView = this.pict.views[tmpViewHash];

		tmpView.render('__Virtual', `__TemplateOutputCache.${tmpRenderGUID}`, pRecord);

		let tmpResult = this.pict.__TemplateOutputCache[tmpRenderGUID];
		// TODO: Uncomment this when we like how it's working
		//delete this.pict.__TemplateOutputCache[tmpRenderGUID];

		return tmpResult;
	}

	renderAsync(pTemplateHash, pRecord, fCallback, pContextArray)
	{
		const tmpViewHash = pTemplateHash.trim();
		if (!(tmpViewHash in this.pict.views))
		{
			this.log.warn(`Pict: View Template Render: View not found for [${tmpViewHash}]`);
			return '';
		}

		let tmpRenderGUID = this.pict.getUUID();

		const tmpView = this.pict.views[tmpViewHash];

		return tmpView.renderAsync('__Virtual', `__TemplateOutputCache.${tmpRenderGUID}`, pRecord,
			(pError, pResult) =>
			{
				if (pError)
				{
					this.log.warn(`Pict: View Template Render: Error rendering view [${tmpViewHash}]`, pError);
					return fCallback(pError, '');
				}

				let tmpResult = this.pict.__TemplateOutputCache[tmpRenderGUID];
				// TODO: Uncomment this when we like how it's working
				//delete this.pict.__TemplateOutputCache[tmpRenderGUID];

				return fCallback(null, tmpResult);
			});
	}
}

module.exports = PictTemplateProviderView;
