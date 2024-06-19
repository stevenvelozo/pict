const libPictTemplate = require('pict-template');

class PictTemplateProviderTemplateIfBase extends libPictTemplate
{
	/**
	 * @param {Object} pFable - The Fable Framework instance
	 * @param {Object} pOptions - The options for the service
	 * @param {String} pServiceHash - The hash of the service
	 */
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
	}

	compareValues (pValueLeft, pOperator, pValueRight)
	{
		switch(pOperator)
		{
			case 'TRUE':
				return (pValueLeft === true);
			case 'FALSE':
				return (pValueLeft === false);
			case 'LNGT':
			case 'LENGTH_GREATER_THAN':
				switch(typeof(pValueLeft))
				{
					case 'string':
						return (pValueLeft.length > pValueRight);
					case 'object':
						return (pValueLeft.length > pValueRight);
					default:
						return false;
				}
			case 'LNLT':
			case 'LENGTH_LESS_THAN':
				switch(typeof(pValueLeft))
				{
					case 'string':
						return (pValueLeft.length < pValueRight);
					case 'object':
						return (pValueLeft.length < pValueRight);
					default:
						return false;
				}
			case '!=':
				return (pValueLeft != pValueRight);
			case '<':
				return (pValueLeft < pValueRight);
			case '>':
				return (pValueLeft > pValueRight);
			case '<=':
				return (pValueLeft <= pValueRight);
			case '>=':
				return (pValueLeft >= pValueRight);
			case '===':
				return (pValueLeft === pValueRight);
			case '==':
				return (pValueLeft == pValueRight);
			default:
				return false;
		}
	}
}

module.exports = PictTemplateProviderTemplateIfBase;