export = FilterClauseBase;
/**
 * @typedef {{
 *    Type: 'None'
 * } | {
 *    Type: 'Match' | 'StringMatch' | 'DateMatch' | 'NumericMatch',
 *    Values: string[] | number[],
 *    ExactMatch?: boolean,
 *    FilterByColumn: string,
 * } | {
 *    Type: 'Range' | 'StringRange' | 'DateRange' | 'NumericRange',
 *    Values: { Start?: string | number, End?: string | number },
 *    StartExclusive?: boolean,
 *    EndExclusive?: boolean,
 *    FilterByColumn: string,
 * } | {
 *    Type: 'InternalJoinMatch' | 'InternalJoinStringMatch' | 'InternalJoinNumericMatch' | 'InternalJoinDateMatch',
 *    Values: string[] | number[],
 *    ExactMatch?: boolean,
 *    RemoteTable: string,
 *    ExternalFilterByColumn?: string,
 *    ExternalFilterByColumns?: string[],
 *    JoinExternalConnectionColumn: string,
 *    JoinInternalConnectionColumn: string,
 * } | {
 *    Type: 'InternalJoinSelectedValue' | 'InternalJoinSelectedValueList',
 *    Values: string[] | number[],
 *    ExactMatch?: boolean,
 *    RemoteTable: string,
 *    ExternalFilterByColumn?: string,
 *    ExternalFilterByColumns?: string[],
 *    ExternalFilterTableLookupColumn?: string,
 *    JoinExternalConnectionColumn: string,
 *    JoinInternalConnectionColumn: string,
 * } | {
 *    Type: 'InternalJoinRange' | 'InternalJoinStringRange' | 'InternalJoinNumericRange' | 'InternalJoinDateRange',
 *    Values: { Start?: string | number, End?: string | number },
 *    StartExclusive?: boolean,
 *    EndExclusive?: boolean,
 *    RemoteTable: string,
 *    ExternalFilterByColumn?: string,
 *    ExternalFilterByColumns?: string[],
 *    JoinExternalConnectionColumn: string,
 *    JoinInternalConnectionColumn: string,
 * } | {
 *    Type: 'ExternalJoinMatch' | 'ExternalJoinStringMatch' | 'ExternalJoinNumericMatch' | 'ExternalJoinDateMatch',
 *    Values: string[] | number[],
 *    ExactMatch?: boolean,
 *    ExternalFilterByColumn?: string,
 *    ExternalFilterByColumns?: string[],
 *    CoreConnectionColumn: string,
 *    JoinTable: string,
 *    JoinTableExternalConnectionColumn: string,
 *    JoinTableCoreConnectionColumn: string,
 *    ExternalFilterByTable: string,
 *    ExternalFilterByTableConnectionColumn: string,
 * } | {
 *    Type: 'ExternalJoinRange' | 'ExternalJoinStringRange' | 'ExternalJoinNumericRange' | 'ExternalJoinDateRange',
 *    Values: { Start?: string | number, End?: string | number },
 *    StartExclusive?: boolean,
 *    EndExclusive?: boolean,
 *    ExternalFilterByColumn?: string,
 *    ExternalFilterByColumns?: string[],
 *    CoreConnectionColumn: string,
 *    JoinTable: string,
 *    JoinTableExternalConnectionColumn: string,
 *    JoinTableCoreConnectionColumn: string,
 *    ExternalFilterByTable: string,
 *    ExternalFilterByTableConnectionColumn: string,
 * } | {
 *    Type: 'ExternalJoinSelectedValue' | 'ExternalJoinSelectedValueList',
 *    Values: { Start?: string | number, End?: string | number },
 *    StartExclusive?: boolean,
 *    EndExclusive?: boolean,
 *    ExternalFilterByColumn?: string,
 *    ExternalFilterByColumns?: string[],
 *    CoreConnectionColumn: string,
 *    JoinTable: string,
 *    JoinTableExternalConnectionColumn: string,
 *    JoinTableCoreConnectionColumn: string,
 *    ExternalFilterByTable: string,
 *    ExternalFilterTableLookupColumn?: string,
 *    ExternalFilterByTableConnectionColumn: string,
 * }} FilterClauseConfig
 */
declare class FilterClauseBase {
    /**
     * @param {import('../Pict.js')} pFable
     */
    constructor(pFable: import("../Pict.js"));
    fable: import("../Pict.js");
    pict: import("../Pict.js");
    log: any;
    /** @type {import('./Filter.js').FilterType} */
    _type: import("./Filter.js").FilterType;
    /** @type {string[] | number[] | { Start?: string | number, End?: string | number }} */
    values: string[] | number[] | {
        Start?: string | number;
        End?: string | number;
    };
    /**
     * @param {import('./Filter.js').FilterType} pType
     */
    set type(pType: import("./Filter.js").FilterType);
    /**
     * @return {import('./Filter.js').FilterType}
     */
    get type(): import("./Filter.js").FilterType;
    /**
     * @return {FilterClauseConfig}
     */
    generateFilterClauseConfig(): FilterClauseConfig;
}
declare namespace FilterClauseBase {
    export { FilterClauseConfig };
}
type FilterClauseConfig = {
    Type: "None";
} | {
    Type: "Match" | "StringMatch" | "DateMatch" | "NumericMatch";
    Values: string[] | number[];
    ExactMatch?: boolean;
    FilterByColumn: string;
} | {
    Type: "Range" | "StringRange" | "DateRange" | "NumericRange";
    Values: {
        Start?: string | number;
        End?: string | number;
    };
    StartExclusive?: boolean;
    EndExclusive?: boolean;
    FilterByColumn: string;
} | {
    Type: "InternalJoinMatch" | "InternalJoinStringMatch" | "InternalJoinNumericMatch" | "InternalJoinDateMatch";
    Values: string[] | number[];
    ExactMatch?: boolean;
    RemoteTable: string;
    ExternalFilterByColumn?: string;
    ExternalFilterByColumns?: string[];
    JoinExternalConnectionColumn: string;
    JoinInternalConnectionColumn: string;
} | {
    Type: "InternalJoinSelectedValue" | "InternalJoinSelectedValueList";
    Values: string[] | number[];
    ExactMatch?: boolean;
    RemoteTable: string;
    ExternalFilterByColumn?: string;
    ExternalFilterByColumns?: string[];
    ExternalFilterTableLookupColumn?: string;
    JoinExternalConnectionColumn: string;
    JoinInternalConnectionColumn: string;
} | {
    Type: "InternalJoinRange" | "InternalJoinStringRange" | "InternalJoinNumericRange" | "InternalJoinDateRange";
    Values: {
        Start?: string | number;
        End?: string | number;
    };
    StartExclusive?: boolean;
    EndExclusive?: boolean;
    RemoteTable: string;
    ExternalFilterByColumn?: string;
    ExternalFilterByColumns?: string[];
    JoinExternalConnectionColumn: string;
    JoinInternalConnectionColumn: string;
} | {
    Type: "ExternalJoinMatch" | "ExternalJoinStringMatch" | "ExternalJoinNumericMatch" | "ExternalJoinDateMatch";
    Values: string[] | number[];
    ExactMatch?: boolean;
    ExternalFilterByColumn?: string;
    ExternalFilterByColumns?: string[];
    CoreConnectionColumn: string;
    JoinTable: string;
    JoinTableExternalConnectionColumn: string;
    JoinTableCoreConnectionColumn: string;
    ExternalFilterByTable: string;
    ExternalFilterByTableConnectionColumn: string;
} | {
    Type: "ExternalJoinRange" | "ExternalJoinStringRange" | "ExternalJoinNumericRange" | "ExternalJoinDateRange";
    Values: {
        Start?: string | number;
        End?: string | number;
    };
    StartExclusive?: boolean;
    EndExclusive?: boolean;
    ExternalFilterByColumn?: string;
    ExternalFilterByColumns?: string[];
    CoreConnectionColumn: string;
    JoinTable: string;
    JoinTableExternalConnectionColumn: string;
    JoinTableCoreConnectionColumn: string;
    ExternalFilterByTable: string;
    ExternalFilterByTableConnectionColumn: string;
} | {
    Type: "ExternalJoinSelectedValue" | "ExternalJoinSelectedValueList";
    Values: {
        Start?: string | number;
        End?: string | number;
    };
    StartExclusive?: boolean;
    EndExclusive?: boolean;
    ExternalFilterByColumn?: string;
    ExternalFilterByColumns?: string[];
    CoreConnectionColumn: string;
    JoinTable: string;
    JoinTableExternalConnectionColumn: string;
    JoinTableCoreConnectionColumn: string;
    ExternalFilterByTable: string;
    ExternalFilterTableLookupColumn?: string;
    ExternalFilterByTableConnectionColumn: string;
};
//# sourceMappingURL=FilterClauseBase.d.ts.map