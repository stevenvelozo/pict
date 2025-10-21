export = PictContentAssignment;
/**
 * Class for moving content around in the DOM.
 */
declare class PictContentAssignment {
    /**
     * @param {import('fable')} pFable - The Fable library instance.
     * @param {any} [pOptions] - The options for the service.
     * @param {string} [pServiceHash] - The hash of services.
     */
    constructor(pFable: any, pOptions?: any, pServiceHash?: string);
    /** @type {any} */
    log: any;
    /** @type {any} */
    fable: any;
    serviceType: string;
    manifest: any;
    inBrowser: boolean;
    hasDocument: boolean;
    hasJquery: boolean;
    jQuery: boolean;
    /**
     * Set this to override the default mechanism for setting the content of a DOM element.
     *
     * @type {Function}
     * @param {string|HTMLElement} pAddress - The address of the element (a CSS selector), or the element itself.
     * @param {string} pContent - The content to set.
     */
    customAssignFunction: Function;
    /**
     * Set this to override the default mechanism for prepend content to a DOM element.
     *
     * @type {Function}
     * @param {string|HTMLElement} pAddress - The address of the element (a CSS selector), or the element itself.
     * @param {string} pContent - The content to prepend.
     */
    customPrependFunction: Function;
    /**
     * Set this to override the default mechanism for appending content to a DOM element.
     *
     * @type {Function}
     * @param {string|HTMLElement} pAddress - The address of the element (a CSS selector), or the element itself.
     * @param {string} pContent - The content to append.
     */
    customAppendFunction: Function;
    /**
     * Set this to override the default mechanism for appending content to a DOM element.
     *
     * @type {(pBeforeAddress: string|HTMLElement, pContent: string) => void}
     * @param {string|HTMLElement} pBeforeAddress - The address of the element (a CSS selector), or the element itself.
     * @param {string} pContent - The content to append.
     */
    customInsertBeforeFunction: (pBeforeAddress: string | HTMLElement, pContent: string) => void;
    /**
     * Set this to override the default mechanism for appending content to a DOM element.
     *
     * @type {(pAfterAddress: string|HTMLElement, pContent: string) => void}
     * @param {string|HTMLElement} pAfterAddress - The address of the element (a CSS selector), or the element itself.
     * @param {string} pContent - The content to append.
     */
    customInsertAfterFunction: (pAfterAddress: string | HTMLElement, pContent: string) => void;
    /**
     * Set this to override the default mechanism for reading content from the DOM.
     *
     * @type {Function}
     * @param {string|HTMLElement} pAddress - The address of the element (a CSS selector), or the element itself.
     * @return {string} - The content of the element.
     */
    customReadFunction: Function;
    /**
     * Set this to override the default mechanism for getting elements.
     *
     * @type {Function}
     * @param {string|HTMLElement} pAddress - The address of the element (a CSS selector), or the element itself.
     * @return {Array<any>} - The matched elements.
     */
    customGetElementFunction: Function;
    customReadAttributeFunction: any;
    customSetAttributeFunction: any;
    customRemoveAttributeFunction: any;
    customReadClassFunction: any;
    customSetClassFunction: any;
    customRemoveClassFunction: any;
    /**
     * Get an element from the DOM.
     *
     * @param {string} pAddress - The address of the element.
     * @return {Array<any>} - The matched elements.
     */
    getElement(pAddress: string): Array<any>;
    /**
     * @param {string|HTMLElement} pAddress - The address of the element (a CSS selector), or the element itself.
     * @param {string|boolean} pContent - The content to assign.
     * @return {void}
     */
    assignContent(pAddress: string | HTMLElement, pContent: string | boolean): void;
    /**
     * Append content to an element.
     *
     * @param {string|HTMLElement} pAddress - The address of the element (a CSS selector), or the element itself.
     * @param {string} pContent - The content to append.
     */
    appendContent(pAddress: string | HTMLElement, pContent: string): any;
    /**
     * Insert content before an element. The new content will be a sibling of the target element.
     *
     * @param {string|HTMLElement} pBeforeAddress - The address of the element (a CSS selector), or the element itself.
     * @param {string} pContent - The content to insert.
     */
    insertContentBefore(pBeforeAddress: string | HTMLElement, pContent: string): void;
    /**
     * Insert content after an element. The new content will be a sibling of the target element.
     *
     * @param {string|HTMLElement} pAfterAddress - The address of the element (a CSS selector), or the element itself.
     * @param {string} pContent - The content to insert.
     */
    insertContentAfter(pAfterAddress: string | HTMLElement, pContent: string): void;
    /**
     * Prepend content to an element.
     *
     * @param {string|HTMLElement} pAddress - The address of the element (a CSS selector), or the element itself.
     * @param {string} pContent - The content to prepend.
     */
    prependContent(pAddress: string | HTMLElement, pContent: string): any;
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
     * @param {string|HTMLElement} pAddress - The address of the element (a CSS selector), or the element itself.
     *
     * TODO: return {boolean|string|number|string[]} - The content of the element.
     * @return {string|boolean} - The content of the element.
     */
    readContent(pAddress: string | HTMLElement): string | boolean;
    /**
     * Add a class to an element.
     *
     * @param {string|HTMLElement} pAddress - The address of the element (a CSS selector), or the element itself.
     * @param {string|string[]} pClass - The class to add.
     */
    addClass(pAddress: string | HTMLElement, pClass: string | string[]): any;
    /**
     * Remove a class from an element.
     *
     * @param {string|HTMLElement} pAddress - The address of the element (a CSS selector), or the element itself.
     * @param {string|string[]} pClass - The class to remove.
     */
    removeClass(pAddress: string | HTMLElement, pClass: string | string[]): any;
    /**
     * Read an attribute from an element.
     *
     * @param {string|HTMLElement} pAddress - The address of the element (a CSS selector), or the element itself.
     * @param {string} pAttribute - The attribute name to read.
     */
    readAttribute(pAddress: string | HTMLElement, pAttribute: string): any;
    /**
     * Set an attribute on an element.
     *
     * @param {string|HTMLElement} pAddress - The address of the element (a CSS selector), or the element itself.
     * @param {string} pAttribute - The attribute name to set.
     * @param {string} pValue - The value to set.
     */
    setAttribute(pAddress: string | HTMLElement, pAttribute: string, pValue: string): any;
    /**
     * Remove an attribute from an element.
     *
     * @param {string|HTMLElement} pAddress - The address of the element (a CSS selector), or the element itself.
     * @param {string} pAttribute - The attribute name to remove.
     */
    removeAttribute(pAddress: string | HTMLElement, pAttribute: string): any;
    /**
     * Check if an element has a class.
     *
     * @param {string|HTMLElement} pAddress - The address of the element (a CSS selector), or the element itself.
     * @param {string} pClass - The class to toggle.
     *
     * @return {boolean} - Whether the element has the class. If multiple elements are matched, returns true if any have the class.
     */
    hasClass(pAddress: string | HTMLElement, pClass: string): boolean;
    /**
     * Toggle a class on or off an element
     *
     * @param {string|HTMLElement} pAddress - The address of the element (a CSS selector), or the element itself.
     * @param {string} pClass - The class to check for.
     */
    toggleClass(pAddress: string | HTMLElement, pClass: string): void;
}
//# sourceMappingURL=Pict-Content-Assignment.d.ts.map