import * as THREE from 'three';
export interface DomGLSLParam extends THREE.ShaderMaterialParameters {
    dom: any;
}
export declare class DomGLSL extends THREE.Mesh {
    private uni;
    private frag;
    private dom;
    private domPos;
    private domSize;
    private windowSize;
    constructor(parameter: DomGLSLParam);
    updateDom(): void;
}
