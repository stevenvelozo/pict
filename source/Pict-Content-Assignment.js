const libFableServiceBase = require('fable').ServiceProviderBase;

/**
 * Class for moving content around in the DOM.
 */
class PictContentAssignment extends libFableServiceBase
{
	/**
	 * @param {import('fable')} pFable - The Fable library instance.
	 * @param {any} [pOptions] - The options for the service.
	 * @param {string} [pServiceHash] - The hash of services.
	 */
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		/** @type {any} */
		this.log;

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
		this.customAssignFunction = null;
		/**
		 * Set this to override the default mechanism for prepend content to a DOM element.
		 *
		 * @type {Function}
		 * @param {string} pAddress - The address of the element. (a CSS selector)
		 * @param {string} pContent - The content to prepend.
		 */
		this.customPrependFunction = null;
		/**
		 * Set this to override the default mechanism for appending content to a DOM element.
		 *
		 * @type {Function}
		 * @param {string} pAddress - The address of the element. (a CSS selector)
		 * @param {string} pContent - The content to append.
		 */
		this.customAppendFunction = null;

		/**
		 * Set this to override the default mechanism for reading content from the DOM.
		 *
		 * @type {Function}
		 * @param {string} pAddress - The address of the element. (a CSS selector)
		 * @return {string} - The content of the element.
		 */
		this.customReadFunction = null;
		/**
		 * Set this to override the default mechanism for getting elements.
		 *
		 * @type {Function}
		 * @param {string} pAddress - The address of the element.
		 * @return {Array<any>} - The matched elements.
		 */
		this.customGetElementFunction = null;

		// API Consumers can also craft their own attribute read function
		this.customReadAttributeFunction = null;
		// API Consumers can also craft their own attribute set function
		this.customSetAttributeFunction = null;
		// API Consumers can also craft their own attribute remove function
		this.customRemoveAttributeFunction = null;

		// API Consumers can also craft their own class read function
		this.customReadClassFunction = null;
		// API Consumers can also craft their own class set function
		this.customSetClassFunction = null;
		// API Consumers can also craft their own class remove function
		this.customRemoveClassFunction = null;
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
			// TODO: This isn't the most efficient method, but it is the most compatible.
			let tmpElementSet = [];
			for (let i = 0; i < tmpElements.length; i++)
			{
				tmpElementSet.push(tmpElements[i]);
			}
			return tmpElementSet;
		}
		else if (this.inBrowser && this.hasDocument)
		{
			// convert from NodeList to Array for consistent return type
			const tmpElements = window.document.querySelectorAll(pAddress);
			let tmpElementSet = [];
			for (let i = 0; i < tmpElements.length; i++)
			{
				tmpElementSet.push(tmpElements[i]);
			}
			return tmpElementSet;
		}
		else
		{
			// Just log it out for now
			this.log.trace(`PICT Content GET ELEMENT for [${pAddress}] will return empty because none of the browser methods are available`);
			return [];
		}
	}

	/**
	 * @param {string} pAddress - The address of the element. (a CSS selector)
	 * @param {string|boolean} pContent - The content to assign.
	 * @return {void}
	 */
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
				const tmpElement = tmpTargetElementSet[i];
				switch (tmpElement.tagName)
				{
					case 'INPUT':
						if (tmpElement instanceof HTMLInputElement && tmpElement.type == 'checkbox')
						{
							tmpElement.checked = Boolean(pContent);
						}
						/* falls through */
					case 'SELECT':
					case 'TEXTAREA':
						if (tmpElement instanceof HTMLInputElement || tmpElement instanceof HTMLSelectElement || tmpElement instanceof HTMLTextAreaElement)
						{
							tmpElement.value = String(pContent);
						}
						break;
					case 'SCRIPT':
						if (tmpElement instanceof HTMLScriptElement)
						{
							tmpElement.text = String(pContent);
						}
						break;
					default:
						tmpElement.innerHTML = String(pContent);
				}
			}
		}
		else if (this.inBrowser && this.hasDocument)
		{
			// Get the element(s)
			let tmpTargetElementSet = window.document.querySelectorAll(pAddress);

			for (let i = 0; i < tmpTargetElementSet.length; i++)
			{
				const tmpElement = tmpTargetElementSet[i];
				switch (tmpTargetElementSet[i].tagName)
				{
					case 'INPUT':
						if (tmpElement instanceof HTMLInputElement && tmpElement.type == 'checkbox')
						{
							tmpElement.checked = Boolean(pContent);
						}
						/* falls through */
					case 'SELECT':
					case 'TEXTAREA':
						if (tmpElement instanceof HTMLInputElement || tmpElement instanceof HTMLSelectElement || tmpElement instanceof HTMLTextAreaElement)
						{
							tmpElement.value = String(pContent);
						}
						break;
					case 'SCRIPT':
						if (tmpElement instanceof HTMLScriptElement)
						{
							tmpElement.text = String(pContent);
						}
						break;
					default:
						tmpElement.innerHTML = String(pContent);
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
	 * Project content into a destination address based on a render method -- as the views do.
	 * Valid render methods are:
	 * - append: Append the content to the destination address.
	 * - prepend: Prepend the content to the destination address.
	 * - append_once: Append the content to the destination address only if it doesn't already exist in the test address.
	 * - replace: Replace the content of the destination address with the new content.
	 * @param {string} pRenderMethod
	 * @param {string} pDestinationAddress
	 * @param {string} pContent
	 * @param {string} pTestAddress
	 * @returns Result of the content assignment.
	 */
	projectContent(pRenderMethod, pDestinationAddress, pContent, pTestAddress)
	{
		// Assign the content to the destination address
		switch(pRenderMethod)
		{
			case 'append':
				return this.appendContent(pDestinationAddress, pContent);
			case 'prepend':
				return this.prependContent(pDestinationAddress, pContent);
			case 'append_once':
			{
				// Try to find the content in either the test address or the destination address
				let tmpTestAddress = (typeof(pTestAddress) == 'string') ? pTestAddress : pDestinationAddress;
				let tmpExistingContent = this.getElement(tmpTestAddress);
				if (tmpExistingContent.length < 1)
				{
					return this.appendContent(pDestinationAddress, pContent);
				}
				break;
			}
			case 'replace':
				// TODO: Should this be the default?
				/* falls through */
			default:
				return this.assignContent(pDestinationAddress, pContent);
		}
	}

	/**
	 * Read content from an element.
	 *
	 * @param {string} pAddress - The address of the element. (a CSS selector)
	 *
	 * @return {boolean|string|number|string[]} - The content of the element.
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
						/* falls through */
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
				const tmpElement = tmpTargetElementSet[0];
				switch (tmpElement.tagName)
				{
					case 'INPUT':
						if (tmpElement instanceof HTMLInputElement && tmpElement.type == 'checkbox')
						{
							return tmpElement.checked;
						}
						/* falls through */
					case 'SELECT':
					case 'TEXTAREA':
						if (tmpElement instanceof HTMLInputElement || tmpElement instanceof HTMLSelectElement || tmpElement instanceof HTMLTextAreaElement)
						{
							return tmpElement.value;
						}
						/* falls through */
					case 'SCRIPT':
						if (tmpElement instanceof HTMLScriptElement)
						{
							return tmpElement.text;
						}
						/* falls through */
					default:
						return tmpElement.innerHTML;
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
	 * @param {string|string[]} pClass - The class to add.
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
				if (Array.isArray(pClass))
				{
					for (const tmpClass of pClass)
					{
						tmpTargetElementSet[i].classList.add(tmpClass);
					}
				}
				else
				{
					tmpTargetElementSet[i].classList.add(pClass);
				}
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
	 * @param {string|string[]} pClass - The class to remove.
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
				if (Array.isArray(pClass))
				{
					for (const tmpClass of pClass)
					{
						tmpTargetElementSet[i].classList.remove(tmpClass);
					}
				}
				else
				{
					tmpTargetElementSet[i].classList.remove(pClass);
				}
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
			return false;
		}
	}
}

module.exports = PictContentAssignment;
