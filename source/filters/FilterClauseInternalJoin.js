
const libFilterClauseBase = require('./FilterClauseBase.js');

/**
 * Manage filter state for a filter that works on a one level of indirect direct join.
 */
class FilterClauseInternalJoin extends libFilterClauseBase
{
	/**
	 * @param {import('../Pict.js')} pFable
	 */
	constructor(pFable)
	{
		super(pFable);

		/** @type {import('./Filter.js').FilterType} */
		this.type = 'None';
		/** @type {string[] | number[] | { Start?: string | number, End?: string | number }} */
		this.values = [];
		/** @type {boolean?} */
		this.exactMatch;
		/** @type {boolean?} */
		this.startExclusive;
		/** @type {boolean?} */
		this.endExclusive;
		/** @type {string} */
		this.remoteTable = '';
		/** @type {string?} */
		this.externalFilterByColumn;
		/** @type {string[]?} */
		this.externalFilterByColumns;
		/** @type {string} */
		this.joinExternalConnectionColumn = '';
		/** @type {string} */
		this.joinInternalConnectionColumn = '';
	}

	/**
	 * @return {import('./FilterClauseBase.js').FilterClauseConfig}
	 */
	generateFilterClauseConfig()
	{
		switch (this._type)
		{
			case 'InternalJoinMatch':
			case 'InternalJoinStringMatch':
			case 'InternalJoinDateMatch':
			case 'InternalJoinNumericMatch':
				return {
					Type: this._type,
					Values: Array.isArray(this.values) ? this.values : [],
					ExactMatch: this.exactMatch,
					RemoteTable: this.remoteTable,
					ExternalFilterByColumn: this.externalFilterByColumn,
					ExternalFilterByColumns: this.externalFilterByColumns,
					JoinExternalConnectionColumn: this.joinExternalConnectionColumn,
					JoinInternalConnectionColumn: this.joinInternalConnectionColumn,
				};
			case 'InternalJoinRange':
			case 'InternalJoinStringRange':
			case 'InternalJoinDateRange':
			case 'InternalJoinNumericRange':
				return {
					Type: this._type,
					Values: Array.isArray(this.values) ? { Start: undefined, End: undefined } : Object.assign({}, this.values),
					StartExclusive: this.startExclusive,
					EndExclusive: this.endExclusive,
					RemoteTable: this.remoteTable,
					ExternalFilterByColumn: this.externalFilterByColumn,
					ExternalFilterByColumns: this.externalFilterByColumns,
					JoinExternalConnectionColumn: this.joinExternalConnectionColumn,
					JoinInternalConnectionColumn: this.joinInternalConnectionColumn,
				};
			default:
				throw new Error(`Unsupported filter type: ${this.type}`);
		}
	}
}

module.exports = FilterClauseInternalJoin;
