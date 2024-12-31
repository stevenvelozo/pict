export = PictEnvironmentObject;
/**
* Pict browser shim loader with Object statefulness for the environement
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
declare class PictEnvironmentObject {
    /**
     * @typedef {import('../Pict')} Pict
     */
    /**
     * @param {Pict} pPict - The pict object to attach the custom read/write functions to.q
     * @param {Object<String, any>} pContentMap - The content map to use for custom reads.
     */
    constructor(pPict: import("../Pict"), pContentMap: any);
    contentMap: any;
    pict: import("../Pict");
    truncateContentLength: number;
    storeEventLog: boolean;
    eventLog: {};
    createEventLogEntry(pAddress: any, pContent: any): {
        TimeStamp: any;
        Hash: any;
        Content: any;
    };
    customGetElementFunction(pAddress: any): string;
    customReadFunction(pAddress: any): any;
    customAppendFunction(pAddress: any, pContent: any): string;
    customPrependFunction(pAddress: any, pContent: any): string;
    customAssignFunction(pAddress: any, pContent: any): string;
    initializeAttributeMapLocation(pAddress: any, pAttribute: any): void;
    initializeClassMapLocation(pAddress: any): void;
    customReadAttributeFunction(pAddress: any, pAttribute: any): any;
    customSetAttributeFunction(pAddress: any, pAttribute: any, pValue: any): any;
    customRemoveAttributeFunction(pAddress: any, pAttribute: any): boolean;
    customReadClassFunction(pAddress: any, pClass: any): boolean;
    customSetClassFunction(pAddress: any, pClass: any): any;
    customRemoveClassFunction(pAddress: any, pClass: any): any;
}
//# sourceMappingURL=Pict-Environment-Object.d.ts.map