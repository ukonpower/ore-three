import * as THREE from 'three';
export interface DomGLSLParam {
    dom: any;
    uniforms: any;
    fragmentShader: string;
}
export declare class DomGLSL extends THREE.Object3D {
    private uni;
    private frag;
    private dom;
    private domPos;
    private domSize;
    private windowSize;
    constructor(parameter: DomGLSLParam);
    createMesh(): void;
    updateDom(): void;
}
