import * as THREE from 'three';
export declare class StableFluids {
    private renderer;
    private gcConroller;
    private resolution;
    private kernels;
    private fluidData;
    solverIteration: number;
    attenuation: number;
    alpha: number;
    beta: number;
    viscosity: number;
    forceRadius: number;
    forceCoefficient: number;
    autoforceCoefficient: number;
    private time;
    constructor(renderer: THREE.WebGLRenderer, resolution: THREE.Vector2);
    update(deltaTime: number): void;
    setPointer(position: THREE.Vector2, vector: THREE.Vector2): void;
    getTexture(): THREE.Texture;
}
