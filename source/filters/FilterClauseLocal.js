
const libFilterClauseBase = require('./FilterClauseBase.js');

/**
 * Manage filter state for a filter that only works on fields local to the table.
 */
class FilterClauseLocal extends libFilterClauseBase
{
	/**
	 * @param {import('../Pict.js')} pFable
	 */
	constructor(pFable)
	{
		super(pFable);

		/** @type {import('./Filter.js').FilterType} */
		this._type = 'Match';
		/** @type {string} */
		this.filterByColumn;
		/** @type {boolean?} */
		this.exactMatch;
		/** @type {boolean?} */
		this.startExclusive;
		/** @type {boolean?} */
		this.endExclusive;
	}

	/**
	 * @return {import('./FilterClauseBase.js').FilterClauseConfig}
	 */
	generateFilterClauseConfig()
	{
		switch (this._type)
		{
			case 'Match':
			case 'StringMatch':
			case 'DateMatch':
			case 'NumericMatch':
				return {
					Type: this._type,
					Values: Array.isArray(this.values) ? this.values : [],
					ExactMatch: this.exactMatch,
					FilterByColumn: this.filterByColumn,
				};
			case 'Range':
			case 'StringRange':
			case 'DateRange':
			case 'NumericRange':
				return {
					Type: this._type,
					Values: Array.isArray(this.values) ? { Start: undefined, End: undefined } : Object.assign({}, this.values),
					StartExclusive: this.startExclusive,
					EndExclusive: this.endExclusive,
					FilterByColumn: this.filterByColumn,
				};
			default:
				throw new Error(`Unsupported filter type: ${this.type}`);
		}
	}
}

module.exports = FilterClauseLocal;
