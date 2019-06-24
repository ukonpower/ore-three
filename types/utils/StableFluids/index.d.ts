import * as THREE from 'three';
export interface StableFluidsParam {
    solverIteration: number;
    attenuation: number;
    alpha: number;
    beta: number;
    viscosity: number;
    screenAspect: number;
    pointerSize: number;
}
export declare class StableFluids {
    parameter: StableFluidsParam;
    private gcConroller;
    private resolution;
    private kernels;
    private fluidData;
    private time;
    private renderer;
    constructor(renderer: THREE.WebGLRenderer, resolution: THREE.Vector2);
    update(deltaTime: number): void;
    setPointer(position: THREE.Vector2, vector: THREE.Vector2): void;
    getTexture(): THREE.Texture;
    resize(width: number, height: number): void;
}
