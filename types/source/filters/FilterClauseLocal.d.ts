export = FilterClauseLocal;
/**
 * Manage filter state for a filter that only works on fields local to the table.
 */
declare class FilterClauseLocal extends libFilterClauseBase {
    /** @type {string} */
    filterByColumn: string;
    /** @type {boolean?} */
    exactMatch: boolean | null;
    /** @type {boolean?} */
    startExclusive: boolean | null;
    /** @type {boolean?} */
    endExclusive: boolean | null;
}
import libFilterClauseBase = require("./FilterClauseBase.js");
//# sourceMappingURL=FilterClauseLocal.d.ts.map