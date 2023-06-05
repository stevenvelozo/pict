const libFableServiceBase = require('fable').ServiceProviderBase;

class PictContentAssignment extends libFableServiceBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		this.serviceType = 'PictContentAssignment';

		// Check to see if we are running in a browser
		this.inBrowser = false;
		this.hasDocument = false;
		if (typeof (window) == 'object')
		{
			this.inBrowser = true;
			// Now check that the browser has a document object
			if ((typeof (window.document) != 'undefined') && (typeof (window.document.querySelectorAll) == 'function'))
			{
				this.hasDocument = true;
			}
		}

		// If we're in a browser, check to see if jQuery is available.
		this.hasJquery = false;
		this.jQuery = false;
		if (this.inBrowser && typeof (window.jQuery) !== 'undefined')
		{
			this.hasJquery = true;
		}

		// API Consumers can also craft their own assign function
		this.customAssignFunction = false;

		// API Consumers can also craft their own append function
		this.customAppendFunction = false;

		// API Consumers can also craft their own read function
		this.customReadFunction = false;

		// API Consumers can even craft their own get element function.
		this.customGetElementFunction = false;
	}

	getElement(pAddress)
	{
		if (this.customGetElementFunction)
		{
			return this.customGetElementFunction(pAddress);
		}
		else if (this.hasJquery)
		{
			let tmpElements = window.jQuery(pAddress);
			if (tmpElements.length == 0)
			{
				return [];
			}
			else
			{
				// TODO: This isn't the most efficient method, but it is the most compatible.
				let tmpElementSet = [];
				for (let i = 0; i < tmpElements.length; i++)
				{
					tmpElementSet.push(tmpElements[0]);
				}
				return tmpElementSet;
			}
		}
		else if (this.inBrowser && this.hasDocument)
		{
			return window.document.querySelectorAll(pAddress);
		}
		else
		{
			// Just log it out for now
			this.log.trace(`PICT Content GET ELEMENT for [${pAddress}] will return empty because none of the browser methods are available`);
			return [];
		}
	}

	assignContent(pAddress, pContent)
	{
		if (this.customAssignFunction)
		{
			return this.customAssignFunction(pAddress, pContent);
		}
		else if (this.hasJquery)
		{
			// Get the element
			let tmpTargetElement = window.jQuery(pAddress);

			// Should we ensure we matched 1 and exactly 1 element?
			//if (tmpTargetElement && tmpTargetElement.length == 1)
			//{
			// Set the content
			tmpTargetElement.html(pContent);
			//}
		}
		else if (this.inBrowser && this.hasDocument)
		{
			let tmpTargetElementSet = window.document.querySelectorAll(pAddress);

			for (let i = 0; i < tmpTargetElementSet.length; i++)
			{
				tmpTargetElementSet[i].innerHTML = pContent;
			}
		}
		else
		{
			// Just log it out for now
			this.log.trace(`PICT Content ASSIGN to [${pAddress}]:`, pContent);
		}
	}

	appendContent(pAddress, pContent)
	{
		if (this.customAppendFunction)
		{
			return this.customAppendFunction(pAddress, pContent);
		}
		else if (this.hasJquery)
		{
			let tmpTargetElement = window.jQuery(pAddress);
			tmpTargetElement.append(pContent);
		}
		else if (this.inBrowser && this.hasDocument)
		{
			let tmpTargetElementSet = window.document.querySelectorAll(pAddress);
			for (let i = 0; i < tmpTargetElementSet.length; i++)
			{
				tmpTargetElementSet[i].insertAdjacentHTML("beforeend", pContent);
			}
		}
		else
		{
			// Just log it out for now -- nothing browser in our mix.
			this.log.trace(`PICT Content APPEND to [${pAddress}]:`, pContent);
		}
	}

	prependContent(pAddress, pContent)
	{
		if (this.customAppendFunction)
		{
			return this.customAppendFunction(pAddress, pContent);
		}
		else if (this.hasJquery)
		{
			let tmpTargetElement = window.jQuery(pAddress);
			tmpTargetElement.prepend(pContent);
		}
		else if (this.inBrowser && this.hasDocument)
		{
			let tmpTargetElementSet = window.document.querySelectorAll(pAddress);
			for (let i = 0; i < tmpTargetElementSet.length; i++)
			{
				tmpTargetElementSet[i].insertAdjacentHTML("afterbegin", pContent);
			}
		}
		else
		{
			// Just log it out for now -- nothing browser in our mix.
			this.log.trace(`PICT Content PREPEND in [${pAddress}]:`, pContent);
		}
	}

	readContent(pAddress, pContentType)
	{
		let tmpContentType = (typeof (pContentType) == 'string') ? pContentType : 'value';

		if (this.customReadFunction)
		{
			return this.customReadFunction(pAddress, pContentType);
		}
		else if (this.hasJquery)
		{
			let tmpTargetElement = window.jQuery(pAddress);
			return tmpTargetElement.html();
		}
		else if (this.inBrowser && this.hasDocument)
		{
			let tmpTargetElementSet = window.document.querySelectorAll(pAddress);
			if (tmpTargetElementSet.length < 1)
			{
				return '';
			}
			else if (tmpTargetElementSet.length == 1)
			{
				return tmpTargetElementSet[0].innerHTML;
			}
		}
		else
		{
			// Just log it out for now -- nothing browser in our mix.
			this.log.trace(`PICT Content READ from [${pAddress}] type [${tmpContentType}]...`);
			return '';
		}
	}
}

module.exports = PictContentAssignment;