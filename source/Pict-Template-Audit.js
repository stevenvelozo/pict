const libFableServiceBase = require('fable').ServiceProviderBase;

class PictTemplateAudit extends libFableServiceBase
{
	/**
	 * @param {import('pict')} pFable - The Fable Framework instance
	 * @param {Record<string, any>} [pOptions] - The options for the service
	 * @param {string} [pServiceHash] - The hash of the service
	 */
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		/** @type {any} */
		this.log;
		/** @type {string} */
		this.UUID;
		/** @type {string} */
		this.Hash;

		this.serviceType = 'PictTemplateAudit';

		/** @type {import('pict') & { TemplateDebug?: boolean, TemplateDebugStack?: boolean }} */
		this.fable;

		// Array of root-level audit trees
		this.auditLog = [];
	}

	prepareAuditing()
	{
		// Install method wrappers on the Pict instance
		this._installWrappers();
	}

	/**
	 * Install audit wrappers around the 6 parseTemplate* methods on the Pict instance.
	 * Each wrapper checks this.fable.TemplateDebug and delegates to the original when disabled.
	 *
	 * @private
	 */
	_installWrappers()
	{
		let tmpPict = this.fable;
		let tmpAudit = this;

		// Save references to original methods
		this._originalParseTemplate = tmpPict.parseTemplate.bind(tmpPict);
		this._originalParseTemplateByHash = tmpPict.parseTemplateByHash.bind(tmpPict);
		this._originalParseTemplateSet = tmpPict.parseTemplateSet.bind(tmpPict);
		this._originalParseTemplateSetByHash = tmpPict.parseTemplateSetByHash.bind(tmpPict);
		this._originalParseTemplateSetWithPayload = tmpPict.parseTemplateSetWithPayload.bind(tmpPict);
		this._originalParseTemplateSetWithPayloadByHash = tmpPict.parseTemplateSetWithPayloadByHash.bind(tmpPict);

		// -- parseTemplate wrapper --
		tmpPict.parseTemplate = function _auditParseTemplate(pTemplateString, pData, fCallback, pContextArray, pScope, pState)
		{
			if (!tmpPict.TemplateDebug)
			{
				return tmpAudit._originalParseTemplate(pTemplateString, pData, fCallback, pContextArray, pScope, pState);
			}

			let tmpAuditPrep = tmpAudit.prepareState(pState, pTemplateString.substring(0, 80));
			let tmpState = tmpAuditPrep.state;
			let tmpAuditContext = tmpAudit.beginAudit(tmpState, tmpAuditPrep.identifier, 'parseTemplate', pData);

			if (typeof fCallback === 'function')
			{
				let tmpWrappedCallback = function _auditCallback(pError, pResult)
				{
					tmpAudit.endAudit(tmpState, tmpAuditContext);
					return fCallback(pError, pResult);
				};
				return tmpAudit._originalParseTemplate(pTemplateString, pData, tmpWrappedCallback, pContextArray, pScope, tmpState);
			}
			else
			{
				let tmpResult = tmpAudit._originalParseTemplate(pTemplateString, pData, null, pContextArray, pScope, tmpState);
				tmpAudit.endAudit(tmpState, tmpAuditContext);
				return tmpResult;
			}
		};

		// -- parseTemplateByHash wrapper --
		tmpPict.parseTemplateByHash = function _auditParseTemplateByHash(pTemplateHash, pData, fCallback, pContextArray, pScope, pState)
		{
			if (!tmpPict.TemplateDebug)
			{
				return tmpAudit._originalParseTemplateByHash(pTemplateHash, pData, fCallback, pContextArray, pScope, pState);
			}

			let tmpState = tmpAudit.setHashHint(pState, pTemplateHash);
			return tmpAudit._originalParseTemplateByHash(pTemplateHash, pData, fCallback, pContextArray, pScope, tmpState);
		};

		// -- parseTemplateSet wrapper --
		tmpPict.parseTemplateSet = function _auditParseTemplateSet(pTemplateString, pDataSet, fCallback, pContextArray, pScope, pState)
		{
			if (!tmpPict.TemplateDebug)
			{
				return tmpAudit._originalParseTemplateSet(pTemplateString, pDataSet, fCallback, pContextArray, pScope, pState);
			}

			let tmpAuditPrep = tmpAudit.prepareState(pState, pTemplateString.substring(0, 80));
			let tmpState = tmpAuditPrep.state;
			let tmpAuditContext = tmpAudit.beginAudit(tmpState, tmpAuditPrep.identifier, 'parseTemplateSet', pDataSet);

			if (typeof fCallback === 'function')
			{
				let tmpWrappedCallback = function _auditSetCallback(pError, pResult)
				{
					tmpAudit.endAudit(tmpState, tmpAuditContext);
					return fCallback(pError, pResult);
				};
				return tmpAudit._originalParseTemplateSet(pTemplateString, pDataSet, tmpWrappedCallback, pContextArray, pScope, tmpState);
			}
			else
			{
				let tmpResult = tmpAudit._originalParseTemplateSet(pTemplateString, pDataSet, null, pContextArray, pScope, tmpState);
				tmpAudit.endAudit(tmpState, tmpAuditContext);
				return tmpResult;
			}
		};

		// -- parseTemplateSetByHash wrapper --
		tmpPict.parseTemplateSetByHash = function _auditParseTemplateSetByHash(pTemplateHash, pDataSet, fCallback, pContextArray, pScope, pState)
		{
			if (!tmpPict.TemplateDebug)
			{
				return tmpAudit._originalParseTemplateSetByHash(pTemplateHash, pDataSet, fCallback, pContextArray, pScope, pState);
			}

			let tmpState = tmpAudit.setHashHint(pState, pTemplateHash);
			return tmpAudit._originalParseTemplateSetByHash(pTemplateHash, pDataSet, fCallback, pContextArray, pScope, tmpState);
		};

		// -- parseTemplateSetWithPayload wrapper --
		tmpPict.parseTemplateSetWithPayload = function _auditParseTemplateSetWithPayload(pTemplateString, pDataSet, pPayload, fCallback, pContextArray, pScope, pState)
		{
			if (!tmpPict.TemplateDebug)
			{
				return tmpAudit._originalParseTemplateSetWithPayload(pTemplateString, pDataSet, pPayload, fCallback, pContextArray, pScope, pState);
			}

			let tmpAuditPrep = tmpAudit.prepareState(pState, pTemplateString.substring(0, 80));
			let tmpState = tmpAuditPrep.state;
			let tmpAuditContext = tmpAudit.beginAudit(tmpState, tmpAuditPrep.identifier, 'parseTemplateSetWithPayload', pDataSet);

			if (typeof fCallback === 'function')
			{
				let tmpWrappedCallback = function _auditSetPayloadCallback(pError, pResult)
				{
					tmpAudit.endAudit(tmpState, tmpAuditContext);
					return fCallback(pError, pResult);
				};
				return tmpAudit._originalParseTemplateSetWithPayload(pTemplateString, pDataSet, pPayload, tmpWrappedCallback, pContextArray, pScope, tmpState);
			}
			else
			{
				let tmpResult = tmpAudit._originalParseTemplateSetWithPayload(pTemplateString, pDataSet, pPayload, null, pContextArray, pScope, tmpState);
				tmpAudit.endAudit(tmpState, tmpAuditContext);
				return tmpResult;
			}
		};

		// -- parseTemplateSetWithPayloadByHash wrapper --
		tmpPict.parseTemplateSetWithPayloadByHash = function _auditParseTemplateSetWithPayloadByHash(pTemplateHash, pDataSet, pPayload, fCallback, pContextArray, pScope, pState)
		{
			if (!tmpPict.TemplateDebug)
			{
				return tmpAudit._originalParseTemplateSetWithPayloadByHash(pTemplateHash, pDataSet, pPayload, fCallback, pContextArray, pScope, pState);
			}

			let tmpState = tmpAudit.setHashHint(pState, pTemplateHash);
			return tmpAudit._originalParseTemplateSetWithPayloadByHash(pTemplateHash, pDataSet, pPayload, fCallback, pContextArray, pScope, tmpState);
		};
	}

	unwrapTemplateFunctions()
	{
		let tmpPict = this.fable;

		if (this._originalParseTemplate && typeof(this._originalParseTemplate) === 'function')
		{
			tmpPict.parseTemplate = this._originalParseTemplate;
			this._originalParseTemplate = null;
		}

		if (this._originalParseTemplateByHash && typeof(this._originalParseTemplateByHash) === 'function')
		{
			tmpPict.parseTemplateByHash = this._originalParseTemplateByHash;
			this._originalParseTemplateByHash = null;
		}

		if (this._originalParseTemplateSet && typeof(this._originalParseTemplateSet) === 'function')
		{
			tmpPict.parseTemplateSet = this._originalParseTemplateSet;
			this._originalParseTemplateSet = null;
		}

		if (this._originalParseTemplateSetByHash && typeof(this._originalParseTemplateSetByHash) === 'function')
		{
			tmpPict.parseTemplateSetByHash = this._originalParseTemplateSetByHash;
			this._originalParseTemplateSetByHash = null;
		}

		if (this._originalParseTemplateSetWithPayload && typeof(this._originalParseTemplateSetWithPayload) === 'function')
		{
			tmpPict.parseTemplateSetWithPayload = this._originalParseTemplateSetWithPayload;
			this._originalParseTemplateSetWithPayload = null;
		}
	}

	/**
	 * Begin an audit node for template processing.
	 *
	 * @param {any} pState - The state object threading through template processing
	 * @param {string} pTemplateIdentifier - Hash or preview of the template
	 * @param {string} pEntrypoint - Name of the entry function
	 * @param {any} pData - The data passed to the template
	 *
	 * @return {object|null} The audit context, or null if auditing is disabled
	 */
	beginAudit(pState, pTemplateIdentifier, pEntrypoint, pData)
	{
		if (!this.fable.TemplateDebug)
		{
			return null;
		}

		let tmpAuditNode =
		{
			TemplateHash: pTemplateIdentifier,
			Entrypoint: pEntrypoint,
			StartTime: Date.now(),
			FinishTime: null,
			Duration: null,
			DataSize: (typeof pData === 'object' && pData !== null) ? JSON.stringify(pData).length : 0,
			StackTrace: null,
			ChildTemplates: []
		};

		if (this.fable.TemplateDebugStack)
		{
			tmpAuditNode.StackTrace = new Error().stack;
		}

		if (pState && pState._TemplateAuditParent)
		{
			// Child template -- append to parent
			pState._TemplateAuditParent.ChildTemplates.push(tmpAuditNode);
		}
		else
		{
			// Root-level template call
			this.auditLog.push(tmpAuditNode);
		}

		let tmpPreviousParent = (pState && pState._TemplateAuditParent) ? pState._TemplateAuditParent : null;
		if (pState)
		{
			pState._TemplateAuditParent = tmpAuditNode;
		}

		return { AuditNode: tmpAuditNode, PreviousParent: tmpPreviousParent };
	}

	/**
	 * End an audit node for template processing.
	 *
	 * @param {any} pState - The state object threading through template processing
	 * @param {object} pAuditContext - The object returned by beginAudit
	 */
	endAudit(pState, pAuditContext)
	{
		if (!pAuditContext)
		{
			return;
		}
		pAuditContext.AuditNode.FinishTime = Date.now();
		pAuditContext.AuditNode.Duration = pAuditContext.AuditNode.FinishTime - pAuditContext.AuditNode.StartTime;

		if (pState)
		{
			pState._TemplateAuditParent = pAuditContext.PreviousParent;
		}
	}

	/**
	 * Prepare pState for auditing, auto-creating if needed.
	 * Also consumes any _TemplateAuditHashHint to resolve the identifier.
	 *
	 * @param {any} pState - The current state object (may be null/undefined)
	 * @param {string} pFallbackIdentifier - Fallback identifier if no hash hint is set
	 *
	 * @return {{ state: any, identifier: string }} The prepared state and resolved identifier
	 */
	prepareState(pState, pFallbackIdentifier)
	{
		let tmpState = pState;
		if (this.fable.TemplateDebug && !tmpState)
		{
			tmpState = {};
		}

		let tmpIdentifier = pFallbackIdentifier;
		if (tmpState && tmpState._TemplateAuditHashHint)
		{
			tmpIdentifier = tmpState._TemplateAuditHashHint;
			delete tmpState._TemplateAuditHashHint;
		}

		return { state: tmpState, identifier: tmpIdentifier };
	}

	/**
	 * Set a hash hint on pState so the next audit node uses the hash name.
	 *
	 * @param {any} pState - The current state object (may be null/undefined)
	 * @param {string} pHash - The template hash to use as the identifier
	 *
	 * @return {any} The state object (auto-created if needed)
	 */
	setHashHint(pState, pHash)
	{
		let tmpState = pState;
		if (this.fable.TemplateDebug)
		{
			if (!tmpState) { tmpState = {}; }
			tmpState._TemplateAuditHashHint = pHash;
		}
		return tmpState;
	}

	/**
	 * Clear the audit log.
	 */
	clear()
	{
		this.auditLog = [];
	}

	/**
	 * Get a summary of the audit log.
	 *
	 * @return {object} Summary statistics
	 */
	getSummary()
	{
		let tmpTotalCalls = 0;
		let tmpTotalDuration = 0;
		let tmpMaxDepth = 0;

		let fWalkNode = (pNode, pDepth) =>
		{
			tmpTotalCalls++;
			tmpTotalDuration += (pNode.Duration || 0);
			if (pDepth > tmpMaxDepth)
			{
				tmpMaxDepth = pDepth;
			}
			for (let i = 0; i < pNode.ChildTemplates.length; i++)
			{
				fWalkNode(pNode.ChildTemplates[i], pDepth + 1);
			}
		};

		for (let i = 0; i < this.auditLog.length; i++)
		{
			fWalkNode(this.auditLog[i], 0);
		}

		return {
			RootCalls: this.auditLog.length,
			TotalCalls: tmpTotalCalls,
			TotalDuration: tmpTotalDuration,
			MaxDepth: tmpMaxDepth
		};
	}
}

module.exports = PictTemplateAudit;

/** @type {Record<string, any>} */
PictTemplateAudit.default_configuration = {};
