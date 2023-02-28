import * as THREE from 'three';
export interface GPUComputationKernel {
    material: THREE.RawShaderMaterial;
    uniforms: any;
}
export interface GPUcomputationData {
    buffer: THREE.WebGLRenderTarget;
}
export declare class GPUComputationController {
    protected renderer: THREE.WebGLRenderer;
    dataSize: THREE.Vector2;
    protected uniforms: any;
    protected scene: THREE.Scene;
    protected camera: THREE.Camera;
    protected mesh: THREE.Mesh;
    protected materials: THREE.ShaderMaterial[];
    protected tempDataLinear: GPUcomputationData;
    protected tempDataNear: GPUcomputationData;
    private renderTargets;
    get isSupported(): boolean;
    constructor(renderer: THREE.WebGLRenderer, dataSize: THREE.Vector2);
    createInitializeTexture(): THREE.DataTexture;
    createData(): GPUcomputationData;
    createData(initializeTexture: THREE.DataTexture): GPUcomputationData;
    createData(textureParam: THREE.WebGLRenderTargetOptions): GPUcomputationData;
    createData(initializeTexture: THREE.DataTexture, textureParam: THREE.WebGLRenderTargetOptions): GPUcomputationData;
    createKernel(param: THREE.ShaderMaterialParameters): GPUComputationKernel;
    compute(kernel: GPUComputationKernel, data: GPUcomputationData, camera?: THREE.Camera): void;
    protected swapBuffers(b1: GPUcomputationData, b2: GPUcomputationData): void;
    dispose(): void;
    resizeData(dataSize: THREE.Vector2): void;
}
//# sourceMappingURL=index.d.ts.map