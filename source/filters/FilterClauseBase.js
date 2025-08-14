
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

class FilterClauseBase
{
	/**
	 * @param {import('../Pict.js')} pFable
	 */
	constructor(pFable)
	{
		this.fable = pFable;
		this.pict = pFable;
		this.log = pFable.log;

		/** @type {import('./Filter.js').FilterType} */
		this._type = 'None';
		/** @type {string[] | number[] | { Start?: string | number, End?: string | number }} */
		this.values = [];
	}


	/**
	 * @param {import('./Filter.js').FilterType} pType
	 */
	set type(pType)
	{
		this._type = pType;
		if (pType.includes('Range'))
		{
			if (typeof this.values !== 'object' || this.values === null || Array.isArray(this.values))
			{
				this.values = { Start: undefined, End: undefined };
			}
		}
		else
		{
			if (!Array.isArray(this.values))
			{
				this.values = [];
			}
		}
	}

	/**
	 * @return {import('./Filter.js').FilterType}
	 */
    get type()
    {
        return this._type;
    }

	/**
	 * @return {FilterClauseConfig}
	 */
	generateFilterClauseConfig()
	{
		return { Type: 'None' };
	}
}

module.exports = FilterClauseBase;
