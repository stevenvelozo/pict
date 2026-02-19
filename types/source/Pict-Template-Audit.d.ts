export = PictTemplateAudit;
declare class PictTemplateAudit {
    /**
     * @param {Object} pFable - The Fable Framework instance
     * @param {Object} pOptions - The options for the service
     * @param {String} pServiceHash - The hash of the service
     */
    constructor(pFable: any, pOptions: any, pServiceHash: string);
    /** @type {any} */
    log: any;
    /** @type {string} */
    UUID: string;
    /** @type {string} */
    Hash: string;
    serviceType: string;
    auditLog: any[];
    prepareAuditing(): void;
    /**
     * Install audit wrappers around the 6 parseTemplate* methods on the Pict instance.
     * Each wrapper checks this.fable.TemplateDebug and delegates to the original when disabled.
     *
     * @private
     */
    private _installWrappers;
    _originalParseTemplate: any;
    _originalParseTemplateByHash: any;
    _originalParseTemplateSet: any;
    _originalParseTemplateSetByHash: any;
    _originalParseTemplateSetWithPayload: any;
    _originalParseTemplateSetWithPayloadByHash: any;
    unwrapTemplateFunctions(): void;
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
    beginAudit(pState: any, pTemplateIdentifier: string, pEntrypoint: string, pData: any): object | null;
    /**
     * End an audit node for template processing.
     *
     * @param {any} pState - The state object threading through template processing
     * @param {object} pAuditContext - The object returned by beginAudit
     */
    endAudit(pState: any, pAuditContext: object): void;
    /**
     * Prepare pState for auditing, auto-creating if needed.
     * Also consumes any _TemplateAuditHashHint to resolve the identifier.
     *
     * @param {any} pState - The current state object (may be null/undefined)
     * @param {string} pFallbackIdentifier - Fallback identifier if no hash hint is set
     *
     * @return {{ state: any, identifier: string }} The prepared state and resolved identifier
     */
    prepareState(pState: any, pFallbackIdentifier: string): {
        state: any;
        identifier: string;
    };
    /**
     * Set a hash hint on pState so the next audit node uses the hash name.
     *
     * @param {any} pState - The current state object (may be null/undefined)
     * @param {string} pHash - The template hash to use as the identifier
     *
     * @return {any} The state object (auto-created if needed)
     */
    setHashHint(pState: any, pHash: string): any;
    /**
     * Clear the audit log.
     */
    clear(): void;
    /**
     * Get a summary of the audit log.
     *
     * @return {object} Summary statistics
     */
    getSummary(): object;
}
declare namespace PictTemplateAudit {
    let default_configuration: Record<string, any>;
}
//# sourceMappingURL=Pict-Template-Audit.d.ts.map