declare global {
    export interface Window {
        _Pict: import('./Pict.js');
        PictApplicaton: import('pict-application');
        jQuery: typeof import('jquery');
    }
    var Pict: typeof import('./Pict.js');
    var _Pict: import('./Pict.js');
}

export {}
