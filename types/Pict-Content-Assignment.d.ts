export = PictContentAssignment;
/**
 * Class for moving content around in the DOM.
 */
declare class PictContentAssignment {
    /**
     * @param {object} pFable - The Fable library instance.
     * @param {object} pOptions - The options for the service.
     * @param {object} pServiceHash - The hash of services.
     */
    constructor(pFable: object, pOptions: object, pServiceHash: object);
    serviceType: string;
    inBrowser: boolean;
    hasDocument: boolean;
    hasJquery: boolean;
    jQuery: boolean;
    /**
     * Set this to override the default mechanism for setting the content of a DOM element.
     *
     * @type {Function}
     * @param {string} pAddress - The address of the element. (a CSS selector)
     * @param {string} pContent - The content to set.
     */
    customAssignFunction: Function;
    /**
     * Set this to override the default mechanism for prepend content to a DOM element.
     *
     * @type {Function}
     * @param {string} pAddress - The address of the element. (a CSS selector)
     * @param {string} pContent - The content to prepend.
     */
    customPrependFunction: Function;
    /**
     * Set this to override the default mechanism for appending content to a DOM element.
     *
     * @type {Function}
     * @param {string} pAddress - The address of the element. (a CSS selector)
     * @param {string} pContent - The content to append.
     */
    customAppendFunction: Function;
    /**
     * Set this to override the default mechanism for reading content from the DOM.
     *
     * @type {Function}
     * @param {string} pAddress - The address of the element. (a CSS selector)
     * @return {string} - The content of the element.
     */
    customReadFunction: Function;
    /**
     * Set this to override the default mechanism for getting elements.
     *
     * @type {Function}
     * @param {string} pAddress - The address of the element.
     * @return {Array<any>} - The matched elements.
     */
    customGetElementFunction: Function;
    customReadAttributeFunction: boolean;
    customSetAttributeFunction: boolean;
    customRemoveAttributeFunction: boolean;
    customReadClassFunction: boolean;
    customSetClassFunction: boolean;
    customRemoveClassFunction: boolean;
    /**
     * Get an element from the DOM.
     *
     * @param {string} pAddress - The address of the element.
     * @return {Array<any>} - The matched elements.
     */
    getElement(pAddress: string): Array<any>;
    assignContent(pAddress: any, pContent: any): any;
    /**
     * Append content to an element.
     *
     * @param {string} pAddress - The address of the element. (a CSS selector)
     * @param {string} pContent - The content to append.
     */
    appendContent(pAddress: string, pContent: string): any;
    /**
     * Prepend content to an element.
     *
     * @param {string} pAddress - The address of the element. (a CSS selector)
     * @param {string} pContent - The content to prepend.
     */
    prependContent(pAddress: string, pContent: string): any;
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
    projectContent(pRenderMethod: string, pDestinationAddress: string, pContent: string, pTestAddress: string): any;
    /**
     * Read content from an element.
     *
     * @param {string} pAddress - The address of the element. (a CSS selector)
     *
     * @return {string} - The content of the element.
     */
    readContent(pAddress: string): string;
    /**
     * Add a class to an element.
     *
     * @param {string} pAddress - The address of the element. (a CSS selector)
     * @param {string} pClass - The class to add.
     */
    addClass(pAddress: string, pClass: string): any;
    /**
     * Remove a class from an element.
     *
     * @param {string} pAddress - The address of the element. (a CSS selector)
     * @param {string} pClass - The class to remove.
     */
    removeClass(pAddress: string, pClass: string): any;
    /**
     * Read an attribute from an element.
     *
     * @param {string} pAddress - The address of the element. (a CSS selector)
     * @param {string} pAttribute - The attribute name to read.
     */
    readAttribute(pAddress: string, pAttribute: string): any;
    /**
     * Set an attribute on an element.
     *
     * @param {string} pAddress - The address of the element. (a CSS selector)
     * @param {string} pAttribute - The attribute name to set.
     * @param {string} pValue - The value to set.
     */
    setAttribute(pAddress: string, pAttribute: string, pValue: string): any;
    /**
     * Remove an attribute from an element.
     *
     * @param {string} pAddress - The address of the element. (a CSS selector)
     * @param {string} pAttribute - The attribute name to remove.
     */
    removeAttribute(pAddress: string, pAttribute: string): any;
    /**
     * Check if an element has a class.
     *
     * @param {string} pAddress - The address of the element. (a CSS selector)
     * @param {string} pClass - The class to check for.
     *
     * @return {boolean} - Whether the element has the class. If multiple elements are matched, returns true if any have the class.
     */
    hasClass(pAddress: string, pClass: string): boolean;
}
//# sourceMappingURL=Pict-Content-Assignment.d.ts.map