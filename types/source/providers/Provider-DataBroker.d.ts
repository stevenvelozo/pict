export = PictDataBrokerProvider;
declare class PictDataBrokerProvider extends libPictProvider {
    constructor(pFable: any, pOptions: any, pServiceHash: any);
    /** @type {import('../Pict.js')} */
    pict: import("../Pict.js");
    /**
     * @param {string} pMarshalDestinationAddress - The address of the marshal destination.
     */
    set marshalDestination(pMarshalDestinationAddress: string);
    /**
     * @return {string} - The address of the marshal destination.
     */
    get marshalDestination(): string;
    /**
     * @param {string} pHash - The hash of the value to retrieve.
     */
    getValue(pHash: string): any;
    /**
     * @param {string} pHash - The hash of the value to retrieve.
     */
    getValueByHash(pHash: string): any;
    /**
     * @param {string} pHash - The hash of the value to retrieve.
     * @param {any} pValue - The value to set.
     */
    setValue(pHash: string, pValue: any): any;
    /**
     * @param {string} pHash - The hash of the value to retrieve.
     * @param {any} pValue - The value to set.
     */
    setValueByHash(pHash: string, pValue: any): any;
    _marshalDestination: string;
    /**
     * @return {Record<string, any>} - The marshal destination object.
     */
    get marshalDestinationObject(): Record<string, any>;
    getMarshalDestinationObject(): Record<string, any>;
    /**
     * @param {string} [pOverrideMarshalDestination] - Optional override for the marshal destination address.
     */
    resolveMarshalDestinationObject(pOverrideMarshalDestination?: string): any;
}
declare namespace PictDataBrokerProvider {
    export { _DEFAULT_PROVIDER_CONFIGURATION as default_configuration };
}
import libPictProvider = require("pict-provider");
/** @type {Record<string, any>} */
declare const _DEFAULT_PROVIDER_CONFIGURATION: Record<string, any>;
//# sourceMappingURL=Provider-DataBroker.d.ts.map