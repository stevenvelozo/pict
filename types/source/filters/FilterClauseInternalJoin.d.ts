export = FilterClauseInternalJoin;
/**
 * Manage filter state for a filter that works on a one level of indirect direct join.
 */
declare class FilterClauseInternalJoin extends libFilterClauseBase {
    /** @type {boolean?} */
    exactMatch: boolean | null;
    /** @type {boolean?} */
    startExclusive: boolean | null;
    /** @type {boolean?} */
    endExclusive: boolean | null;
    /** @type {string} */
    remoteTable: string;
    /** @type {string?} */
    externalFilterByColumn: string | null;
    /** @type {string[]?} */
    externalFilterByColumns: string[] | null;
    /** @type {string?} */
    externalFilterTableLookupColumn: string | null;
    /** @type {string} */
    joinExternalConnectionColumn: string;
    /** @type {string} */
    joinInternalConnectionColumn: string;
}
import libFilterClauseBase = require("./FilterClauseBase.js");
//# sourceMappingURL=FilterClauseInternalJoin.d.ts.map