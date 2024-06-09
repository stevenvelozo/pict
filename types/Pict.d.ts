export = Pict;
/**
 * Pict management object.
 */
declare class Pict {
    /**
     * @param {Object} pSettings - The settings for the Pict instance.
     */
    constructor(pSettings: any);
    isBrowser: Function;
    /**
     * The templateProvider provides a basic key->template mapping with default fallback capabilities
     *
     * @type {PictTemplateProvider}
     */
    TemplateProvider: PictTemplateProvider;
    /**
     * The meadow entity provider.
     *
     * @type {PictMeadowEntityProvider}
     */
    EntityProvider: PictMeadowEntityProvider;
    /**
     * The data provider.
     *
     * @type {PictDataProvider}
     */
    DataProvider: PictDataProvider;
    /**
     * The content assignment module.
     *
     * @type {PictContentAssignment}
     */
    ContentAssignment: PictContentAssignment;
    /**
     * The CSS module.
     *
     * @type {PictCSS}
     * @public
     */
    public CSSMap: PictCSS;
    manifest: any;
    AppData: {};
    Bundle: {};
    LogNoisiness: number;
    LogControlFlow: boolean;
    LogControlFlowWatchAddressList: any[];
    _DefaultPictTemplatesInitialized: boolean;
    views: any;
    providers: any;
    /**
     * Load manifests in as Hashed services
     *
     * @param {Object} pManifestSet - The manifest set to load.
     */
    loadManifestSet(pManifestSet: any): boolean;
    /**
     * Just passing an options will construct one for us.
     * Passing a hash will set the hash.
     * Passing a prototype will use that!
     *
     * @param {String} pViewHash - The hash of the view.
     * @param {Object} pOptions - The options for the view.
     * @param {Object} pViewPrototype - The prototype for the view.
     */
    addView(pViewHash: string, pOptions: any, pViewPrototype: any): any;
    addProvider(pProviderHash: any, pOptions: any, pProviderPrototype: any): any;
    /**
     * Just passing an options will construct one for us.
     * Passing a hash will set the hash.
     * Passing a prototype will use that!
     *
     * @param {String} pApplicationHash - The hash of the application.
     * @param {Object} pOptions - The options for the application.
     * @param {Object} pApplicationPrototype - The prototype for the application.
     */
    addApplication(pApplicationHash: string, pOptions: any, pApplicationPrototype: any): any;
    /**
     * Attach the default template engine renderers.
     *
     * @private
     */
    private initializePictTemplateEngine;
    /**
     * Read a value from a nested object using a dot notation string.
     *
     * @param {string} pAddress - The address to resolve
     * @param {object} pRecord - The record to resolve
     * @param {Array<any>} pContextArray - The context array to resolve
     *
     * @returns {any} The value at the given address, or undefined
     */
    resolveStateFromAddress(pAddress: string, pRecord: object, pContextArray: Array<any>): any;
    /**
     * Parse a template.
     *
     * @param {String} pTemplateString - The template string to parse
     * @param {Object} pData - The data to use in the template
     * @param {Function} fCallback - The callback to call when the template is parsed
     * @param {Array<any>} pContextArray - The context array to use in the template
     */
    parseTemplate(pTemplateString: string, pData: any, fCallback: Function, pContextArray: Array<any>): any;
    /**
     * Parse a template by hash.
     *
     * @param {String} pTemplateHash - The hash of the template to parse
     * @param {Object} pData - The data to use in the template
     * @param {Function} fCallback - The callback to call when the template is parsed
     * @param {Array<any>} pContextArray - The context array to use in the template
     */
    parseTemplateByHash(pTemplateHash: string, pData: any, fCallback: Function, pContextArray: Array<any>): any;
    /**
     * Parse a template set.
     *
     * @param {String} pTemplateString - The template string to parse
     * @param {Array|Object} pDataSet - The data set to use in the template
     * @param {Function} fCallback - The callback to call when the template is parsed
     * @param {Array<any>} pContextArray - The context array to use in the template
     */
    parseTemplateSet(pTemplateString: string, pDataSet: any[] | any, fCallback: Function, pContextArray: Array<any>): any;
    /**
     * Parse a template set by hash.
     *
     * @param {String} pTemplateHash - The hash of the template to parse
     * @param {Array|Object} pDataSet - The data set to use in the template
     * @param {Function} fCallback - The callback to call when the template is parsed
     * @param {Array<any>} pContextArray - The context array to use in the template
     */
    parseTemplateSetByHash(pTemplateHash: string, pDataSet: any[] | any, fCallback: Function, pContextArray: Array<any>): any;
}
declare namespace Pict {
    export { PictApplicationClass, PictViewClass, PictProviderClass, EnvironmentLog, EnvironmentObject, isBrowser, safeOnDocumentReady, safeLoadPictApplication };
}
import PictTemplateProvider = require("./Pict-Template-Provider.js");
import PictMeadowEntityProvider = require("./Pict-Meadow-EntityProvider.js");
import PictDataProvider = require("./Pict-DataProvider.js");
import PictContentAssignment = require("./Pict-Content-Assignment.js");
import PictCSS = require("./Pict-CSS.js");
declare const PictApplicationClass: any;
declare const PictViewClass: any;
declare const PictProviderClass: any;
declare const EnvironmentLog: typeof import("./environments/Pict-Environment-Log.js");
declare const EnvironmentObject: typeof import("./environments/Pict-Environment-Object.js");
declare const isBrowser: Function;
declare const safeOnDocumentReady: (fCallback: Function) => void;
declare const safeLoadPictApplication: (pPictApplication: any, pLogNoisiness: number) => void;
//# sourceMappingURL=Pict.d.ts.map