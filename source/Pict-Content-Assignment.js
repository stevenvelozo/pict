const libFableServiceBase = require('fable').ServiceProviderBase;

/**
 * Class for moving content around in the DOM.
 */
class PictContentAssignment extends libFableServiceBase
{
	/**
	 * @param {object} pFable - The Fable library instance.
	 * @param {object} pOptions - The options for the service.
	 * @param {object} pServiceHash - The hash of services.
	 */
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

		/**
		 * Set this to override the default mechanism for setting the content of a DOM element.
		 *
		 * @type {Function}
		 * @param {string} pAddress - The address of the element. (a CSS selector)
		 * @param {string} pContent - The content to set.
		 */
		this.customAssignFunction = false;
		/**
		 * Set this to override the default mechanism for prepend content to a DOM element.
		 *
		 * @type {Function}
		 * @param {string} pAddress - The address of the element. (a CSS selector)
		 * @param {string} pContent - The content to prepend.
		 */
		this.customPrependFunction = false;
		/**
		 * Set this to override the default mechanism for appending content to a DOM element.
		 *
		 * @type {Function}
		 * @param {string} pAddress - The address of the element. (a CSS selector)
		 * @param {string} pContent - The content to append.
		 */
		this.customAppendFunction = false;

		/**
		 * Set this to override the default mechanism for reading content from the DOM.
		 *
		 * @type {Function}
		 * @param {string} pAddress - The address of the element. (a CSS selector)
		 * @return {string} - The content of the element.
		 */
		this.customReadFunction = false;
		/**
		 * Set this to override the default mechanism for getting elements.
		 *
		 * @type {Function}
		 * @param {string} pAddress - The address of the element.
		 * @return {Array<any>} - The matched elements.
		 */
		this.customGetElementFunction = false;

		// API Consumers can also craft their own attribute read function
		this.customReadAttributeFunction = false;
		// API Consumers can also craft their own attribute set function
		this.customSetAttributeFunction = false;
		// API Consumers can also craft their own attribute remove function
		this.customRemoveAttributeFunction = false;

		// API Consumers can also craft their own class read function
		this.customReadClassFunction = false;
		// API Consumers can also craft their own class set function
		this.customSetClassFunction = false;
		// API Consumers can also craft their own class remove function
		this.customRemoveClassFunction = false;
	}

	/**
	 * Get an element from the DOM.
	 *
	 * @param {string} pAddress - The address of the element.
	 * @return {Array<any>} - The matched elements.
	 */
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
					tmpElementSet.push(tmpElements[i]);
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
			// Get the element(s)
			let tmpTargetElementSet = window.jQuery(pAddress);

			for (let i = 0; i < tmpTargetElementSet.length; i++)
			{
				switch (tmpTargetElementSet[i].tagName)
				{
					case 'INPUT':
						if (tmpTargetElementSet[i].type == 'checkbox')
						{
							tmpTargetElementSet[i].checked = pContent;
						}
					case 'SELECT':
					case 'TEXTAREA':
						tmpTargetElementSet[i].value = pContent;
						break;
					case 'SCRIPT':
						tmpTargetElementSet[i].text = pContent;
						break;
					default:
						tmpTargetElementSet[i].innerHTML = pContent;
				}
			}
		}
		else if (this.inBrowser && this.hasDocument)
		{
			// Get the element(s)
			let tmpTargetElementSet = window.document.querySelectorAll(pAddress);

			for (let i = 0; i < tmpTargetElementSet.length; i++)
			{
				switch (tmpTargetElementSet[i].tagName)
				{
					case 'INPUT':
						if (tmpTargetElementSet[i].type == 'checkbox')
						{
							tmpTargetElementSet[i].checked = pContent;
						}
					case 'SELECT':
					case 'TEXTAREA':
						tmpTargetElementSet[i].value = pContent;
						break;
					case 'SCRIPT':
						tmpTargetElementSet[i].text = pContent;
						break;
					default:
						tmpTargetElementSet[i].innerHTML = pContent;
				}
			}
		}
		else
		{
			// Just log it out for now
			this.log.trace(`PICT Content ASSIGN to [${pAddress}]:`, pContent);
		}
	}

	/**
	 * Append content to an element.
	 *
	 * @param {string} pAddress - The address of the element. (a CSS selector)
	 * @param {string} pContent - The content to append.
	 */
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

	/**
	 * Prepend content to an element.
	 *
	 * @param {string} pAddress - The address of the element. (a CSS selector)
	 * @param {string} pContent - The content to prepend.
	 */
	prependContent(pAddress, pContent)
	{
		if (this.customAppendFunction)
		{
			return this.customPrependFunction(pAddress, pContent);
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

	/**
	 * Read content from an element.
	 *
	 * @param {string} pAddress - The address of the element. (a CSS selector)
	 *
	 * @return {string} - The content of the element.
	 */
	readContent(pAddress)
	{
		if (this.customReadFunction)
		{
			return this.customReadFunction(pAddress);
		}
		else if (this.hasJquery)
		{
			let tmpTargetElement = window.jQuery(pAddress);
			switch (tmpTargetElement.prop('tagName'))
				{
					case 'INPUT':
						if (tmpTargetElement.attr('type') == 'checkbox')
						{
							return tmpTargetElement.prop('checked');
						}
					case 'SELECT':
					case 'TEXTAREA':
						return tmpTargetElement.val();
					case 'SCRIPT':
						return tmpTargetElement.text();
					default:
						return tmpTargetElement.html();
				}
		}
		else if (this.inBrowser && this.hasDocument)
		{
			let tmpTargetElementSet = window.document.querySelectorAll(pAddress);
			if (tmpTargetElementSet.length < 1)
			{
				return null;
			}
			else if (tmpTargetElementSet.length == 1)
			{
				switch (tmpTargetElementSet[0].tagName)
				{
					case 'INPUT':
						if (tmpTargetElementSet[0].type == 'checkbox')
						{
							return tmpTargetElementSet[0].checked;
						}
					case 'SELECT':
					case 'TEXTAREA':
						return tmpTargetElementSet[0].value;
					case 'SCRIPT':
						return tmpTargetElementSet[0].text;
					default:
						return tmpTargetElementSet[0].innerHTML;
				}
			}
		}
		else
		{
			// Just log it out for now -- nothing browser in our mix.
			this.log.trace(`PICT Content READ from [${pAddress}]...`);
			return '';
		}
	}

	/**
	 * Add a class to an element.
	 *
	 * @param {string} pAddress - The address of the element. (a CSS selector)
	 * @param {string} pClass - The class to add.
	 */
	addClass(pAddress, pClass)
	{
		if (this.customSetClassFunction)
		{
			return this.customSetClassFunction(pAddress, pClass);
		}
		else if (this.hasJquery)
		{
			// Get the element
			let tmpTargetElement = window.jQuery(pAddress);
			tmpTargetElement.addClass(pClass);
		}
		else if (this.inBrowser && this.hasDocument)
		{
			let tmpTargetElementSet = window.document.querySelectorAll(pAddress);

			for (let i = 0; i < tmpTargetElementSet.length; i++)
			{
				tmpTargetElementSet[i].classList.add(pClass);
			}
		}
		else
		{
			this.log.trace(`PICT Content ADDCLASS to [${pAddress}]:`, pClass);
		}
	}

	/**
	 * Remove a class from an element.
	 *
	 * @param {string} pAddress - The address of the element. (a CSS selector)
	 * @param {string} pClass - The class to remove.
	 */
	removeClass(pAddress, pClass)
	{
		if (this.customRemoveClassFunction)
		{
			return this.customRemoveClassFunction(pAddress, pClass);
		}
		else if (this.hasJquery)
		{
			// Get the element
			let tmpTargetElement = window.jQuery(pAddress);
			tmpTargetElement.removeClass(pClass);
		}
		else if (this.inBrowser && this.hasDocument)
		{
			let tmpTargetElementSet = window.document.querySelectorAll(pAddress);

			for (let i = 0; i < tmpTargetElementSet.length; i++)
			{
				tmpTargetElementSet[i].classList.remove(pClass);
			}
		}
		else
		{
			this.log.trace(`PICT Content REMOVECLASS from [${pAddress}]:`, pClass);
		}
	}

	/**
	 * Read an attribute from an element.
	 *
	 * @param {string} pAddress - The address of the element. (a CSS selector)
	 * @param {string} pAttribute - The attribute name to read.
	 */
	readAttribute(pAddress, pAttribute)
	{
		if (this.customReadAttributeFunction)
		{
			return this.customReadAttributeFunction(pAddress, pAttribute);
		}
		else if (this.hasJquery)
		{
			let tmpTargetElement = window.jQuery(pAddress);
			return tmpTargetElement.attr(pAttribute);
		}
		else if (this.inBrowser && this.hasDocument)
		{
			let tmpTargetElementSet = window.document.querySelectorAll(pAddress);

			for (let i = 0; i < tmpTargetElementSet.length; i++)
			{
				tmpTargetElementSet[i].getAttribute(pAttribute);
			}
			return tmpTargetElementSet;
		}
		else
		{
			this.log.trace(`PICT Content READATTRIBUTE from [${pAddress}]:`, pAttribute);
		}
	}

	/**
	 * Set an attribute on an element.
	 *
	 * @param {string} pAddress - The address of the element. (a CSS selector)
	 * @param {string} pAttribute - The attribute name to set.
	 * @param {string} pValue - The value to set.
	 */
	setAttribute(pAddress, pAttribute, pValue)
	{
		if (this.customSetAttributeFunction)
		{
			return this.customSetAttributeFunction(pAddress, pAttribute, pValue);
		}
		else if (this.hasJquery)
		{
			let tmpTargetElement = window.jQuery(pAddress);
			tmpTargetElement.attr(pAttribute, pValue);
		}
		else if (this.inBrowser && this.hasDocument)
		{
			let tmpTargetElementSet = window.document.querySelectorAll(pAddress);

			for (let i = 0; i < tmpTargetElementSet.length; i++)
			{
				tmpTargetElementSet[i].setAttribute(pAttribute, pValue);
			}
		}
		else
		{
			this.log.trace(`PICT Content SETATTRIBUTE for [${pAddress}] ATTRIBUTE [${pAttribute}]:`, pValue);
		}
	}

	/**
	 * Remove an attribute from an element.
	 *
	 * @param {string} pAddress - The address of the element. (a CSS selector)
	 * @param {string} pAttribute - The attribute name to remove.
	 */
	removeAttribute(pAddress, pAttribute)
	{
		if (this.customRemoveAttributeFunction)
		{
			return this.customRemoveAttributeFunction(pAddress, pAttribute);
		}
		else if (this.hasJquery)
		{
			let tmpTargetElement = window.jQuery(pAddress);
			tmpTargetElement.removeAttr(pAttribute);
		}
		else if (this.inBrowser && this.hasDocument)
		{
			let tmpTargetElementSet = window.document.querySelectorAll(pAddress);

			for (let i = 0; i < tmpTargetElementSet.length; i++)
			{
				tmpTargetElementSet[i].removeAttribute(pAttribute);
			}
		}
		else
		{
			this.log.trace(`PICT Content REMOVEATTRIBUTE for [${pAddress}] ATTRIBUTE [${pAttribute}]`);
		}
	}

	/**
	 * Check if an element has a class.
	 *
	 * @param {string} pAddress - The address of the element. (a CSS selector)
	 * @param {string} pClass - The class to check for.
	 *
	 * @return {boolean} - Whether the element has the class. If multiple elements are matched, returns true if any have the class.
	 */
	hasClass(pAddress, pClass)
	{
		if (this.customReadClassFunction)
		{
			return this.customReadClassFunction(pAddress, pClass);
		}
		if (this.hasJquery)
		{
			let tmpTargetElement = window.jQuery(pAddress);
			return tmpTargetElement.hasClass(pClass);
		}
		else if (this.inBrowser && this.hasDocument)
		{
			let tmpTargetElementSet = window.document.querySelectorAll(pAddress);

			for (let i = 0; i < tmpTargetElementSet.length; i++)
			{
				if (tmpTargetElementSet[i].classList.contains(pClass))
				{
					return true;
				}
			}
			return false;
		}
		else
		{
			this.log.trace(`PICT Content HASCLASS for [${pAddress}] CLASS [${pClass}]:`);
		}
	}
}

module.exports = PictContentAssignment;
