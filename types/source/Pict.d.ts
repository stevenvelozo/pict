export = Pict;
declare const Pict_base: new (...args: any[]) => Fable;
/**
 * Pict management object.
 */
declare class Pict extends Pict_base {
    /**
     * @param {Object<String, any>} pSettings - The settings for the Pict instance.
     */
    constructor(pSettings: any);
    isBrowser: Function;
    /** @type {Object} */
    _PackageFable: any;
    _Package: {
        name: string;
        version: string;
        description: string;
        main: string;
        scripts: {
            start: string;
            test: string;
            tests: string;
            coverage: string;
            build: string;
            "docker-dev-build": string;
            "docker-dev-run": string;
            "docker-dev-shell": string;
            lint: string;
            types: string;
        };
        types: string;
        mocha: {
            diff: boolean;
            extension: string[];
            package: string;
            reporter: string;
            slow: string;
            timeout: string;
            ui: string;
            "watch-files": string[];
            "watch-ignore": string[];
        };
        repository: {
            type: string;
            url: string;
        };
        author: string;
        license: string;
        bugs: {
            url: string;
        };
        homepage: string;
        devDependencies: {
            "@eslint/js": string;
            "@types/jquery": string;
            eslint: string;
            globals: string;
            quackage: string;
        };
        dependencies: {
            cachetrax: string;
            fable: string;
            "pict-application": string;
            "pict-provider": string;
            "pict-template": string;
            "pict-view": string;
            typescript: string;
        };
    };
    browserAddress: any;
    children: any[];
    /** @type {import('pict-application')} */
    PictApplication: any;
    /** @type {any} */
    log: any;
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
    AppData: any;
    Bundle: {};
    LogNoisiness: number;
    LogControlFlow: boolean;
    LogControlFlowWatchAddressList: any[];
    _DefaultPictTemplatesInitialized: boolean;
    providers: any;
    views: any;
    /**
     * Load manifests in as Hashed services
     *
     * @param {Object<String, String>} pManifestSet - The manifest set to load.
     */
    loadManifestSet(pManifestSet: any): void;
    /**
     * Add a template expression to the template engine from the PictTemplate service.
     *
     * @template {new (...args: any[]) => any} T
     * @param {T} pTemplatePrototype - The prototype class for the template expression
     *
     * @return {InstanceType<T>} the service instance, or null if the prototype was invalid
     */
    addTemplate<T extends new (...args: any[]) => any>(pTemplatePrototype: T): InstanceType<T>;
    /**
     * Just passing an options will construct one for us.
     * Passing a hash will set the hash.
     * Passing a prototype will use that!
     *
     * @template {new (...args: any[]) => any} [T=typeof import('pict-view')]
     * @param {String} pViewHash - The hash of the view.
     * @param {Object<String, any>} [pOptions] - The options for the view.
     * @param {T} [pViewPrototype] - The prototype for the view.
     *
     * @return {InstanceType<T>} The view instance.
     */
    addView<T extends new (...args: any[]) => any = typeof import("pict-view")>(pViewHash: string, pOptions?: any, pViewPrototype?: T): InstanceType<T>;
    /**
     * Add a provider unless one already exists, then return that one.
     *
     * Just passing an options will construct one for us.
     * Passing a hash will set the hash.
     * Passing a prototype will use that!
     *
     * @param {String} pProviderHash - The hash of the provider.
     * @param {Object<String, any>} [pOptions] - The options for the provider.
     * @param {any} [pProviderPrototype] - The prototype for the provider.
     *
     * FIXME: refer to PictProvider here once it has a type definition
     *
     * @return {any} The provider instance.
     */
    addProviderSingleton(pProviderHash: string, pOptions?: any, pProviderPrototype?: any): any;
    /**
     * Just passing an options will construct one for us.
     * Passing a hash will set the hash.
     * Passing a prototype will use that!
     *
     * @param {String} pProviderHash - The hash of the provider.
     * @param {Object<String, any>} [pOptions] - The options for the provider.
     * @param {any} [pProviderPrototype] - The prototype for the provider.
     *
     * FIXME: refer to PictProvider here once it has a type definition
     *
     * @return {any} The provider instance.
     */
    addProvider(pProviderHash: string, pOptions?: any, pProviderPrototype?: any): any;
    /**
     * Just passing an options will construct one for us.
     * Passing a hash will set the hash.
     * Passing a prototype will use that!
     *
     * @param {String} pApplicationHash - The hash of the application.
     * @param {Object} [pOptions] - The options for the application.
     * @param {any} [pApplicationPrototype] - The prototype for the application.
     *
     * FIXME: refer to PictApplication here once it has a type definition
     *
     * @return {any} The application instance.
     */
    addApplication(pApplicationHash: string, pOptions?: any, pApplicationPrototype?: any): any;
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
     * @param {any} pRecord - The record to resolve
     * @param {Array<any>} [pContextArray] - The context array to resolve
     *
     * @return {any} The value at the given address, or undefined
     */
    resolveStateFromAddress(pAddress: string, pRecord: any, pContextArray?: Array<any>): any;
    /**
     * Parse a template.
     *
     * @param {String} pTemplateString - The template string to parse
     * @param {Object} pData - The data to use in the template
     * @param {Function} [fCallback] - The callback to call when the template is parsed
     * @param {Array<any>} [pContextArray] - The context array to use in the template
     *
     * @return {String?} The parsed template string, or undefined if a callback was provided
     */
    parseTemplate(pTemplateString: string, pData: any, fCallback?: Function, pContextArray?: Array<any>): string | null;
    /**
     * Parse a template by hash.
     *
     * @param {String} pTemplateHash - The hash of the template to parse
     * @param {Object} pData - The data to use in the template
     * @param {Function} [fCallback] - The callback to call when the template is parsed
     * @param {Array<any>} [pContextArray] - The context array to use in the template
     *
     * @return {String?} The parsed template string, or undefined if a callback was provided
     */
    parseTemplateByHash(pTemplateHash: string, pData: any, fCallback?: Function, pContextArray?: Array<any>): string | null;
    /**
     * Parse a template set.
     *
     * @param {String} pTemplateString - The template string to parse
     * @param {Array<any>|Object} pDataSet - The data set to use in the template
     * @param {Function} [fCallback] - The callback to call when the template set is parsed
     * @param {Array<any>} [pContextArray] - The context array to use in the template
     *
     * @return {String?} The parsed template string, or undefined if a callback was provided
     */
    parseTemplateSet(pTemplateString: string, pDataSet: Array<any> | any, fCallback?: Function, pContextArray?: Array<any>): string | null;
    /**
     * Parse a template set by hash.
     *
     * @param {String} pTemplateHash - The hash of the template to parse
     * @param {Array<any>|Object} pDataSet - The data set to use in the template
     * @param {Function} [fCallback] - The callback to call when the template is parsed
     * @param {Array<any>} [pContextArray] - The context array to use in the template
     *
     * @return {String?} The parsed template string, or undefined if a callback was provided
     */
    parseTemplateSetByHash(pTemplateHash: string, pDataSet: Array<any> | any, fCallback?: Function, pContextArray?: Array<any>): string | null;
}
declare namespace Pict {
    export { PictApplicationClass, PictViewClass, PictProviderClass, PictTemplateClass, EnvironmentLog, EnvironmentObject, isBrowser, safeOnDocumentReady, safeLoadPictApplication, Fable };
}
import PictTemplateProvider = require("./Pict-Template-Provider.js");
import PictMeadowEntityProvider = require("./Pict-Meadow-EntityProvider.js");
import PictDataProvider = require("./Pict-DataProvider.js");
import PictContentAssignment = require("./Pict-Content-Assignment.js");
import PictCSS = require("./Pict-CSS.js");
declare const PictApplicationClass: any;
declare const PictViewClass: typeof import("pict-view");
declare const PictProviderClass: any;
declare const PictTemplateClass: typeof import("pict-template");
declare const EnvironmentLog: typeof import("./environments/Pict-Environment-Log.js");
declare const EnvironmentObject: typeof import("./environments/Pict-Environment-Object.js");
declare const isBrowser: Function;
declare const safeOnDocumentReady: (fCallback: Function) => void;
declare const safeLoadPictApplication: (pPictApplication?: any, pLogNoisiness?: number) => void;
type Fable = {
    UUID: string;
    settings: any;
    fable: Fable;
    servicesMap: any;
    addAndInstantiateServiceType: (hash: string, prototype: any) => any;
    addServiceType: (hash: string, prototype: any) => any;
    instantiateServiceProvider: (hash: string, options?: any, prototype?: any) => any;
    instantiateServiceProviderFromPrototype: (pServiceType: string, pOptions?: any, pCustomServiceHash?: string, pServicePrototype?: any) => any;
    getUUID: () => string;
    Utility: {
        extend: (pObject: any, ...pExtension: any[]) => any;
        eachLimit: (pArray: any[], pLimit: number, pIterator: (pRecord: any, fRecordCallback: () => void) => void, fCallback: (pError: any) => void) => void;
    };
    MetaTemplate: any;
};
//# sourceMappingURL=Pict.d.ts.map