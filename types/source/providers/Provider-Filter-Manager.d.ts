export = PictRecordSetFilterManager;
declare class PictRecordSetFilterManager extends libPictProvider {
    constructor(pFable: any, pOptions: any, pServiceHash: any);
    /** @type {import('../Pict.js')} */
    pict: import("../Pict.js");
    filters: {};
    filterCriteria: {};
    /**
     * @param {string} pFilterHash
     * @param {Record<string, any>} pFilterConfig
     *
     * @return {void}
     */
    addFilter(pFilterHash: string, pFilterConfig: Record<string, any>): void;
    /**
     * @param {string} pFilterCriteriaHash
     * @param {Record<string, any>} pFilterCriteriaConfig
     *
     * @return {void}
     */
    addFilterCriteria(pFilterCriteriaHash: string, pFilterCriteriaConfig: Record<string, any>): void;
    /**
     * @param {string} pFilterHash
     * @return {Record<string, any> | undefined}
     */
    getFilter(pFilterHash: string): Record<string, any> | undefined;
    /**
     * @param {string} pFilterCriteriaHash
     * @return {Record<string, any> | undefined}
     */
    getFilterCriteria(pFilterCriteriaHash: string): Record<string, any> | undefined;
    /**
     * Run a filter configuration against a filter experience and return ALL matched records.
     *
     * @param {Array<Record<string, any>>} pFilterConfiguration
     * @param {Record<string, any>} pFilterExperience
     * @param {(pError?: Error) => void} fCallback
     */
    loadRecordsByFilter(pFilterConfiguration: Array<Record<string, any>>, pFilterExperience: Record<string, any>, fCallback: (pError?: Error) => void): void;
    /**
     * Run a filter configuration against a filter experience and return a page of records.
     *
     * @param {Array<Record<string, any>>} pFilterConfiguration
     * @param {Record<string, any>} pFilterExperience
     * @param {number | string | ((pError?: Error) => void)} pRecordOffset
     * @param {number | string | ((pError?: Error) => void)} pPageSize
     * @param {(pError?: Error) => void} fCallback
     */
    loadRecordPageByFilter(pFilterConfiguration: Array<Record<string, any>>, pFilterExperience: Record<string, any>, pRecordOffset: number | string | ((pError?: Error) => void), pPageSize: number | string | ((pError?: Error) => void), fCallback: (pError?: Error) => void): void;
    /**
     * Run a filter configuration against a filter experience and return the count of records.
     *
     * @param {Array<Record<string, any>>} pFilterConfiguration
     * @param {Record<string, any>} pFilterExperience
     * @param {(pError?: Error) => void} fCallback
     */
    countRecordsByFilter(pFilterConfiguration: Array<Record<string, any>>, pFilterExperience: Record<string, any>, fCallback: (pError?: Error) => void): void;
    executeFilter(pFilterConfigurationAddress: any, pFilterExperienceAddress: any, fCallback: any): any;
    /**
     * Run a filter configuration against a filter experience and return a page of records.
     *
     * @param {string} pFilterConfigurationAddress
     * @param {string} pFilterExperienceAddress
     * @param {number | ((pError?: Error) => void)} pRecordOffset
     * @param {number | ((pError?: Error) => void)} pPageSize
     * @param {(pError?: Error) => void} fCallback
     */
    executeFilterPage(pFilterConfigurationAddress: string, pFilterExperienceAddress: string, pRecordOffset: number | ((pError?: Error) => void), pPageSize: number | ((pError?: Error) => void), fCallback: (pError?: Error) => void): void;
    executeFilterCount(pFilterConfigurationAddress: any, pFilterExperienceAddress: any, fCallback: any): any;
}
declare namespace PictRecordSetFilterManager {
    export { _DEFAULT_PROVIDER_CONFIGURATION as default_configuration };
}
import libPictProvider = require("pict-provider");
/** @type {Record<string, any>} */
declare const _DEFAULT_PROVIDER_CONFIGURATION: Record<string, any>;
//# sourceMappingURL=Provider-Filter-Manager.d.ts.map