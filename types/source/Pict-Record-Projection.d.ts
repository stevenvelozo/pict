export = PictRecordProvider;
declare class PictRecordProvider {
    constructor(pFable: any, pOptions: any, pServiceHash: any);
    /** @type {import('fable') & import('./Pict')} */
    fable: any & import("./Pict");
    serviceType: string;
    project(pRecord: any, pManifest: any, pProjection: any): boolean;
}
//# sourceMappingURL=Pict-Record-Projection.d.ts.map