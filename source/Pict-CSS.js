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

		// No merging of options necessary
		if (typeof(this.options.CSSElementAddress) === 'undefined')
		{
			this.options.CSSElementAddress = defaultConfiguration.CSSElementAddress;
		}

		this.inlineCSSMap = {};
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