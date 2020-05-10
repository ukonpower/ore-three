import * as THREE from 'three';
import { Uniforms } from '../../';
export interface GPUComputationKernel {
    material: THREE.RawShaderMaterial;
    uniforms: Uniforms;
}
export interface GPUcomputationData {
    buffer: THREE.WebGLRenderTarget;
}
export declare class GPUComputationController {
    protected renderer: THREE.WebGLRenderer;
    protected uniforms: Uniforms;
    protected scene: THREE.Scene;
    protected camera: THREE.Camera;
    protected mesh: THREE.Mesh;
    protected materials: THREE.ShaderMaterial[];
    protected tempDataLinear: GPUcomputationData;
    protected tempDataNear: GPUcomputationData;
    get isSupported(): boolean;
    constructor(renderer: THREE.WebGLRenderer, dataSize: THREE.Vector2);
    createInitializeTexture(): THREE.DataTexture;
    createData(): GPUcomputationData;
    createData(initializeTexture: THREE.DataTexture): GPUcomputationData;
    createData(textureParam: THREE.WebGLRenderTargetOptions): GPUcomputationData;
    createData(initializeTexture: THREE.DataTexture, textureParam: THREE.WebGLRenderTargetOptions): GPUcomputationData;
    createKernel(shader: string, uniforms?: Uniforms): GPUComputationKernel;
    compute(kernel: GPUComputationKernel, data: GPUcomputationData): void;
    protected swapBuffers(b1: GPUcomputationData, b2: GPUcomputationData): void;
    dispose(): void;
}
