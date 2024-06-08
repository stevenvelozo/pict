export = PictCSS;
declare class PictCSS {
    constructor(pFable: any, pOptions: any, pServiceHash: any);
    inlineCSSMap: {};
    addCSS(pHash: any, pContent: any, pPriority: any, pProvider: any): void;
    removeCSS(pHash: any): void;
    generateCSS(): string;
    injectCSS(): void;
}
//# sourceMappingURL=Pict-CSS.d.ts.map