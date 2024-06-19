const libPictTemplate = require('pict-template');

class PictTemplateProviderLogValueTree extends libPictTemplate
{
	/**
	 * @param {Object} pFable - The Fable Framework instance
	 * @param {Object} pOptions - The options for the service
	 * @param {String} pServiceHash - The hash of the service
	 */
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
		this.addPattern('{~LogValueTree:', '~}');
		this.addPattern('{~LVT:', '~}');
	}

	render(pTemplateHash, pRecord, pContextArray)
	{
		let tmpData = (typeof (pRecord) === 'object') ? pRecord : {};
		tmpData.TemplateHash = pTemplateHash.trim();

		tmpData.ValueTreeParameters = tmpData.TemplateHash.split('^');
		if (tmpData.ValueTreeParameters.length < 1)
		{
			return '';
		}
		tmpData.ResolvedValue = this.resolveStateFromAddress(tmpData.ValueTreeParameters[0], tmpData, pContextArray);
		tmpData.ResolvedValueType = typeof (tmpData.ResolvedValue);


		try
		{
			tmpData.TreeMaxDepth = (tmpData.ValueTreeParameters.length < 2) ? 1 : parseInt(tmpData.ValueTreeParameters[1]);
		}
		catch
		{
			tmpData.TreeMaxDepth = 1;
		}

		if (tmpData.ResolvedValueType == 'object')
		{
			this.logValueTreeObjectSet(tmpData.ResolvedValue, tmpData.ValueTreeParameters[0], tmpData.ResolvedValue, 0, tmpData.TreeMaxDepth);
		}
		else
		{
			this.log.trace(`PICT Template Log Value Tree: [${tmpData.TemplateHash}] resolved data is not an object.`, tmpData.ResolvedValue);
		}

		return '';
	}
	logValueTreeObjectSet = (pObject, pBaseAddress, pRootObject, pCurrentDepth, pMaxDepth) =>
	{
		let tmpTemplateResult = '';

		if (typeof (pObject) !== 'object')
		{
			return tmpTemplateResult;
		}

		let tmpObjectValueKeys = Object.keys(pObject);

		for (let i = 0; i < tmpObjectValueKeys.length; i++)
		{
			let tmpBranchType = typeof (pObject[tmpObjectValueKeys[i]]);
			let tmpBranchValue = '';

			switch (tmpBranchType)
			{
				case 'object':
					tmpBranchValue = '...';
					break;

				default:
					tmpBranchValue = pObject[tmpObjectValueKeys[i]];
					break;
			}
			this.log.trace(`[${pBaseAddress}.${tmpObjectValueKeys[i]}] (${tmpBranchType}):  ${tmpBranchValue}`);

			if (pCurrentDepth + 1 > pMaxDepth)
			{
				return '';
			}
			else if (tmpBranchType == 'object')
			{
				tmpBranchValue = this.logValueTreeObjectSet(pObject[tmpObjectValueKeys[i]], `${pBaseAddress}.${tmpObjectValueKeys[i]}`, pRootObject, pCurrentDepth + 1, pMaxDepth);
			}
		}

		return '';
	};
}

module.exports = PictTemplateProviderLogValueTree;
