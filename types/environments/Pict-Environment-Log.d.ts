export = PictEnvironmentLog;
/**
* Pict browser shim loader
* @author <steven@velozo.com>
*
* This was born after writing about 10 views and copying basically the same
* mock environment read/write functions into the test harnesses.  It allows
* mocks or other types of communications back-and-forth to be configured
* as an environment for views and applications.
*
* To use this:
*
* 1. Construct a pict object in your favorite fashion:
*        let _Pict = new libPict({...Environment})
* 2. Require this; it's exported as a static subobject of the pict library,
*    so you can do:
*        const libPictEnvironmentLog = require('pict').EnvironmentLog;
* 3. Create an object that is your custom read data.  Any key that is requested
*    but missing will return empty.
*        const tmpContentMap = { '#SomeElement': 'SomeValue' };
* 4. Pass your pict through this to get the custom functions mapped into the ContentAssignment service:
*        let tmpMockEnvironment = new libPictEnvironmentLog(_Pict, tmpContentMap);
* 5. Now you can use your pict as normal, and it will log all of the read/write events out and keep a log of when they occurred.
*/
declare class PictEnvironmentLog {
    /**
     * @typedef {import('../Pict')} Pict
     */
    /**
     * @param {Pict} pPict - The pict object to attach the custom read/write functions to.
     * @param {Map<String, any>} pContentMap - The content map to use for custom reads.
     */
    constructor(pPict: import("../Pict"), pContentMap: Map<string, any>);
    contentMap: any;
    pict: import("../Pict");
    truncateContentLength: number;
    storeEventLog: boolean;
    eventLog: {};
    /**
     * Create an event log entry.
     *
     * @param {string} pAddress - The address of the event.
     * @param {string} pContent - The content of the event.
     */
    createEventLogEntry(pAddress: string, pContent: string): {
        TimeStamp: any;
        Hash: string;
        Content: string;
    };
    /**
     * Custom GetElement function.
     *
     * @param {string} pAddress - The address of the element.
     */
    customGetElementFunction(pAddress: string): string;
    /**
     * Custom Read function.
     *
     * @param {string} pAddress - The address of the element.
     */
    customReadFunction(pAddress: string): any;
    /**
     * Custom Append function.
     *
     * @param {string} pAddress - The address of the element.
     * @param {string} pContent - The content to append.
     */
    customAppendFunction(pAddress: string, pContent: string): string;
    /**
     * Custom Prepend function.
     *
     * @param {string} pAddress - The address of the element.
     * @param {string} pContent - The content to prepend.
     */
    customPrependFunction(pAddress: string, pContent: string): string;
    /**
     * Custom Assign function.
     *
     * @param {string} pAddress - The address of the element.
     * @param {string} pContent - The content to assign.
     */
    customAssignFunction(pAddress: string, pContent: string): string;
    /**
     * Custom Read Attribute function.
     *
     * @param {string} pAddress - The address of the element.
     * @param {string} pAttribute - The attribute to read.
     */
    customReadAttributeFunction(pAddress: string, pAttribute: string): string;
    /**
     * Custom Set Attribute function.
     *
     * @param {string} pAddress - The address of the element.
     * @param {string} pAttribute - The attribute to set.
     */
    customSetAttributeFunction(pAddress: string, pAttribute: string, pContent: any): string;
}
//# sourceMappingURL=Pict-Environment-Log.d.ts.map