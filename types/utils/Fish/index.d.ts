import * as THREE from 'three';
export declare class Fish extends THREE.Object3D {
    private renderer;
    private gcController;
    private kernels;
    private positionData;
    private velocityData;
    private num;
    private length;
    private uni;
    private fragment;
    constructor(renderer: THREE.WebGLRenderer, num: number, length: number, customComputeShader?: string);
    initPosition(tex: THREE.DataTexture): void;
    createTrails(): void;
    update(time: any): void;
    dispose(): void;
}
