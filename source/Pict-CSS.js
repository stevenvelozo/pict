
const libFableServiceBase = require('fable').ServiceProviderBase;

const defaultConfiguration = (
	{
		// This is the address for the <script /> tag that contains the CSS.
		CSSElementAddress: '#PICT-CSS'
	}
)

class PictCSS extends libFableServiceBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		/** @type {any} */
		this.options;
		/** @type {{ ContentAssignment: import('./Pict-Content-Assignment') }} */
		this.services;

		// No merging of options necessary
		if (typeof(this.options.CSSElementAddress) === 'undefined')
		{
			this.options.CSSElementAddress = defaultConfiguration.CSSElementAddress;
		}

		this.inlineCSSMap = {};

		this.fable.addSolverFunction(this.fable.expressionParser, 'createcsscolorrgbfromnumeric', this.createCssColorRGBFromNumeric.bind(this), 'Create a CSS color from RGB components');
	}

	// Add a CSS fragment to the CSS map (each view can have its own CSS fragment)
	// Hash is shared across all views, so if 10 views all load the "My-Table-View" fragment, it will only be loaded once.
	addCSS(pHash, pContent, pPriority, pProvider)
	{
		let tmpPriority = (typeof(pPriority) !== 'undefined') ? pPriority : 1000;
		let tmpProvidor = (typeof(pProvider) === 'string') ? pProvider : 'Unknown';
		this.inlineCSSMap[pHash] = { Hash: pHash, Content: pContent, Provider: tmpProvidor, Priority:tmpPriority };
	}

	removeCSS(pHash)
	{
		delete this.inlineCSSMap[pHash];
	}

	createCssColorRGBFromNumeric(pRed, pGreen, pBlue)
	{
		// 1. cast red, green and blue to floating point numbers
		// 2. If the numbers are all three less than or equal to 1.0, multiply each by 255 and round to the nearest integer.
		// 2a. If any of the numbers are greater than 1.0, round each to the nearest integer and make sure it's less than or equal to 255.
		// 3. Return a #RRGGBB string.
		let tmpRed = parseFloat(pRed);
		let tmpGreen = parseFloat(pGreen);
		let tmpBlue = parseFloat(pBlue);
		if (isNaN(tmpRed) || isNaN(tmpGreen) || isNaN(tmpBlue))
		{
			return '#000000';
		}
		if (tmpRed <= 1.0 && tmpGreen <= 1.0 && tmpBlue <= 1.0)
		{
			tmpRed = Math.round(tmpRed * 255);
			tmpGreen = Math.round(tmpGreen * 255);
			tmpBlue = Math.round(tmpBlue * 255);
		}
		// If they are less than or equal to 255, cast them to integers and round them.
		else if (tmpRed <= 255 && tmpGreen <= 255 && tmpBlue <= 255)
		{
			tmpRed = Math.round(tmpRed);
			tmpGreen = Math.round(tmpGreen);
			tmpBlue = Math.round(tmpBlue);
		}
		// Otherwise get the maximum of the three and quantize them to 255
		else
		{
			let tmpMax = Math.max(Math.max(tmpRed, tmpGreen), tmpBlue);
			tmpRed = Math.round((tmpRed / tmpMax) * 255);
			tmpGreen = Math.round((tmpGreen / tmpMax) * 255);
			tmpBlue = Math.round((tmpBlue / tmpMax) * 255);
		}
		tmpRed = Math.abs(tmpRed);
		tmpGreen = Math.abs(tmpGreen);
		tmpBlue = Math.abs(tmpBlue);
		let tmpRedHex = tmpRed.toString(16).padStart(2, '0');
		let tmpGreenHex = tmpGreen.toString(16).padStart(2, '0');
		let tmpBlueHex = tmpBlue.toString(16).padStart(2, '0');
		return `#${tmpRedHex}${tmpGreenHex}${tmpBlueHex}`;
	}

	generateCSS()
	{
		let tmpCSS = '';
		let tmpCSSHashes = Object.keys(this.inlineCSSMap);
		// Sort the hashes by Priority
		tmpCSSHashes.sort((a, b) => { return this.inlineCSSMap[a].Priority - this.inlineCSSMap[b].Priority; });
		for (let i = 0; i < tmpCSSHashes.length; i++)
		{
			let tmpCSSFragment = this.inlineCSSMap[tmpCSSHashes[i]];
			let tmpCSSComment = tmpCSSFragment.Hash;
			if (tmpCSSFragment.Hash != tmpCSSFragment.Provider)
			{
				tmpCSSComment = `${tmpCSSComment} from ${tmpCSSFragment.Provider}`;
			}
			tmpCSS += `/* ${tmpCSSComment} */\n${tmpCSSFragment.Content}\n`;
		}
		return tmpCSS;
	}

	// Inject the CSS into the magic DOM element for it
	injectCSS()
	{
		this.services.ContentAssignment.assignContent(this.options.CSSElementAddress, this.generateCSS());
	}
}

module.exports = PictCSS;
