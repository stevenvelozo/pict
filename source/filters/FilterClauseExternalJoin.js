
const libFilterClauseBase = require('./FilterClauseBase.js');

/**
 * Manage filter state for a filter that works on a one level of indirect direct join.
 */
class FilterClauseExternalJoin extends libFilterClauseBase
{
	/**
	 * @param {import('../Pict.js')} pFable
	 */
	constructor(pFable)
	{
		super(pFable);

		/** @type {import('./Filter.js').FilterType} */
		this.type = 'ExternalJoinMatch';
		/** @type {string[] | number[] | { Start?: string | number, End?: string | number }} */
		this.values = [];
		/** @type {boolean?} */
		this.exactMatch;
		/** @type {boolean?} */
		this.startExclusive;
		/** @type {boolean?} */
		this.endExclusive;
		/** @type {string?} */
		this.externalFilterByColumn;
		/** @type {string[]?} */
		this.externalFilterByColumns;
		/** @type {string} */
		this.coreConnectionColumn = '';
		/** @type {string} */
		this.joinTable = '';
		/** @type {string} */
		this.joinTableExternalConnectionColumn = '';
		/** @type {string} */
		this.joinTableCoreConnectionColumn = '';
		/** @type {string} */
		this.externalFilterByTable = '';
		/** @type {string} */
		this.externalFilterTableLookupColumn = '';
		/** @type {string} */
		this.externalFilterByTableConnectionColumn = '';
	}

	/**
	 * @return {import('./FilterClauseBase.js').FilterClauseConfig}
	 */
	generateFilterClauseConfig()
	{
		switch (this.type)
		{
			case 'ExternalJoinMatch':
			case 'ExternalJoinStringMatch':
			case 'ExternalJoinDateMatch':
			case 'ExternalJoinNumericMatch':
				return {
					Type: this.type,
					Values: Array.isArray(this.values) ? this.values : [],
					ExactMatch: this.exactMatch,
					ExternalFilterByColumn: this.externalFilterByColumn,
					ExternalFilterByColumns: this.externalFilterByColumns,
					CoreConnectionColumn: this.coreConnectionColumn,
					JoinTable: this.joinTable,
					JoinTableExternalConnectionColumn: this.joinTableExternalConnectionColumn,
					JoinTableCoreConnectionColumn: this.joinTableCoreConnectionColumn,
					ExternalFilterByTable: this.externalFilterByTable,
					ExternalFilterByTableConnectionColumn: this.externalFilterByTableConnectionColumn,
				};
			case 'ExternalJoinRange':
			case 'ExternalJoinStringRange':
			case 'ExternalJoinDateRange':
			case 'ExternalJoinNumericRange':
				return {
					Type: this.type,
					Values: Array.isArray(this.values) ? { Start: undefined, End: undefined } : Object.assign({}, this.values),
					StartExclusive: this.startExclusive,
					EndExclusive: this.endExclusive,
					ExternalFilterByColumn: this.externalFilterByColumn,
					ExternalFilterByColumns: this.externalFilterByColumns,
					CoreConnectionColumn: this.coreConnectionColumn,
					JoinTable: this.joinTable,
					JoinTableExternalConnectionColumn: this.joinTableExternalConnectionColumn,
					JoinTableCoreConnectionColumn: this.joinTableCoreConnectionColumn,
					ExternalFilterByTable: this.externalFilterByTable,
					ExternalFilterByTableConnectionColumn: this.externalFilterByTableConnectionColumn,
				};
			case 'ExternalJoinSelectedValue':
			case 'ExternalJoinSelectedValueList':
				return {
					Type: this.type,
					Values: Array.isArray(this.values) ? { Start: undefined, End: undefined } : Object.assign({}, this.values),
					StartExclusive: this.startExclusive,
					EndExclusive: this.endExclusive,
					ExternalFilterByColumn: this.externalFilterByColumn,
					ExternalFilterByColumns: this.externalFilterByColumns,
					CoreConnectionColumn: this.coreConnectionColumn,
					JoinTable: this.joinTable,
					JoinTableExternalConnectionColumn: this.joinTableExternalConnectionColumn,
					JoinTableCoreConnectionColumn: this.joinTableCoreConnectionColumn,
					ExternalFilterByTable: this.externalFilterByTable,
					ExternalFilterTableLookupColumn: this.externalFilterTableLookupColumn,
					ExternalFilterByTableConnectionColumn: this.externalFilterByTableConnectionColumn,
				};
			default:
				throw new Error(`Unsupported filter type: ${this.type}`);
		}
	}
}

module.exports = FilterClauseExternalJoin;
