export = PictCSS;
declare class PictCSS {
    constructor(pFable: any, pOptions: any, pServiceHash: any);
    /** @type {any} */
    options: any;
    /** @type {{ ContentAssignment: import('./Pict-Content-Assignment') }} */
    services: {
        ContentAssignment: import("./Pict-Content-Assignment");
    };
    inlineCSSMap: {};
    addCSS(pHash: any, pContent: any, pPriority: any, pProvider: any): void;
    removeCSS(pHash: any): void;
    createCssColorRGBFromNumeric(pRed: any, pGreen: any, pBlue: any): string;
    generateCSS(): string;
    injectCSS(): void;
}
//# sourceMappingURL=Pict-CSS.d.ts.map