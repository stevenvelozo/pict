export = FilterClauseExternalJoin;
/**
 * Manage filter state for a filter that works on a one level of indirect direct join.
 */
declare class FilterClauseExternalJoin extends libFilterClauseBase {
    /** @type {boolean?} */
    exactMatch: boolean | null;
    /** @type {boolean?} */
    startExclusive: boolean | null;
    /** @type {boolean?} */
    endExclusive: boolean | null;
    /** @type {string?} */
    externalFilterByColumn: string | null;
    /** @type {string[]?} */
    externalFilterByColumns: string[] | null;
    /** @type {string} */
    coreConnectionColumn: string;
    /** @type {string} */
    joinTable: string;
    /** @type {string} */
    joinTableExternalConnectionColumn: string;
    /** @type {string} */
    joinTableCoreConnectionColumn: string;
    /** @type {string} */
    externalFilterByTable: string;
    /** @type {string} */
    externalFilterTableLookupColumn: string;
    /** @type {string} */
    externalFilterByTableConnectionColumn: string;
}
import libFilterClauseBase = require("./FilterClauseBase.js");
//# sourceMappingURL=FilterClauseExternalJoin.d.ts.map