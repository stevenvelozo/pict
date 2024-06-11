const libPictTemplate = require('../../Pict-Template.js');

class PictTemplateProviderDataValueTree extends libPictTemplate
{
	/**
	 * @param {Object} pFable - The Fable Framework instance
	 * @param {Object} pOptions - The options for the service
	 * @param {String} pServiceHash - The hash of the service
	 */
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		this.addPattern('{~DataTree:', '~}');
		this.addPattern('{~DT:', '~}');
	}

	render(pHash, pData, pContextArray)
	{
		let tmpData = (typeof (pData) === 'object') ? pData : {};
		tmpData.TemplateHash = pHash.trim();

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

		let tmpPictObjectWrapTemplate = this.pict.TemplateProvider.getTemplate('PICT-Object-Wrap');
		if (!tmpPictObjectWrapTemplate)
		{
			// This template is here because it is a default template.  Users can override this template by providing their own as PICT-Object-Wrap
			tmpPictObjectWrapTemplate = `<div class="PICT PICTObjectSet">{~D:Record.ObjectValueTree~}</div>`;
		}

		if (tmpData.ResolvedValueType == 'object')
		{
			tmpData.ObjectValueTree = this.dataValueTreeObjectSet(tmpData.ResolvedValue, tmpData.ResolvedValue, 0, tmpData.TreeMaxDepth, pContextArray);
		}
		else
		{
			this.log.trace(`PICT Template Log Value Tree: [${tmpData.TemplateHash}] resolved data is not an object.`, tmpData.ResolvedValue);
			tmpData.ObjectValueTree = tmpData.ResolveValue;
		}

		return this.pict.parseTemplate(tmpPictObjectWrapTemplate, tmpData, null, pContextArray);
	}
	dataValueTreeObjectSet(pObject, pRootObject, pCurrentDepth, pMaxDepth, pContextArray)
	{
		let tmpTemplateResult = '';

		if (typeof (pObject) !== 'object')
		{
			return tmpTemplateResult;
		}

		let tmpObjectValueKeys = Object.keys(pObject);

		let tmpPictObjectBranchTemplate = this.pict.TemplateProvider.getTemplate('PICT-Object-Branch');
		if (!tmpPictObjectBranchTemplate)
		{
			// This template is here because it is a default template.  Users can override this template by providing their own as PICT-Object-Branch
			tmpPictObjectBranchTemplate = `
<div class="PICTObjectBranchDepth_{~D:Record.CurrentDepth~}"><div class="PICTObjectBranch">{~D:Record.BranchKey~}</div><div class="PICTObjectBranchValue">{~D:Record.BranchValue~}</div></div>
`
		}

		for (let i = 0; i < tmpObjectValueKeys.length; i++)
		{
			let tmpBranchType = typeof (pObject[tmpObjectValueKeys[i]]);

			let tmpBranchValue = '';

			switch (tmpBranchType)
			{
				case 'object':
					if (pCurrentDepth + 1 > pMaxDepth)
					{
						tmpBranchValue = '...';
					}
					else
					{
						tmpBranchValue = this.dataValueTreeObjectSet(pObject[tmpObjectValueKeys[i]], pRootObject, pCurrentDepth + 1, pMaxDepth, pContextArray);
					}
					break;

				default:
					tmpBranchValue = pObject[tmpObjectValueKeys[i]];
					break;
			}

			let tmpDataValue =
			{
				AppData: this.AppData,
				Bundle: this.Bundle,

				RootContainer: pRootObject,

				Container: pObject,
				BranchEntryCount: tmpObjectValueKeys.length,

				BranchIndex: i,
				BranchKey: tmpObjectValueKeys[i],
				BranchValue: tmpBranchValue,
				BranchDataType: tmpBranchType,

				CurrentDepth: pCurrentDepth,
				MaxDepth: pMaxDepth
			};
			tmpTemplateResult += this.pict.parseTemplate(tmpPictObjectBranchTemplate, tmpDataValue, null, pContextArray);
		}

		return tmpTemplateResult;
	}
}

module.exports = PictTemplateProviderDataValueTree;
