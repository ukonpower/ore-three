import * as THREE from 'three';
export declare class Background extends THREE.Object3D {
    private uni;
    private frag;
    constructor(fragmentShader: string, uniforms: any);
    createMesh(): void;
}
