import * as THREE from 'three';
export interface PPParam extends THREE.ShaderMaterialParameters {
}
export interface EffectMaterial {
    material: THREE.ShaderMaterial;
    uniforms: any;
}
export declare class PostProcessing {
    protected renderer: THREE.WebGLRenderer;
    protected scene: THREE.Scene;
    protected camera: THREE.Camera;
    protected screenMesh: THREE.Mesh;
    protected renderTargetOptions: THREE.WebGLRenderTargetOptions;
    protected readBuffer: THREE.WebGLRenderTarget;
    protected writeBuffer: THREE.WebGLRenderTarget;
    resultBuffer: THREE.WebGLRenderTarget;
    resolution: THREE.Vector2;
    protected effectMaterials: [EffectMaterial];
    constructor(renderer: THREE.WebGLRenderer, parameter: PPParam[], resolution?: THREE.Vector2, bufferOptions?: THREE.WebGLRenderTargetOptions);
    protected initRenderTargets(): void;
    createRenderTarget(options?: THREE.WebGLRenderTargetOptions): THREE.WebGLRenderTarget;
    protected swapBuffers(): void;
    render(offScreenRendering: boolean): any;
    render(srcTexture?: THREE.Texture, offScreenRendering?: boolean): any;
    render(scene: THREE.Scene, camera: THREE.Camera, offScreenRendering?: boolean): any;
    getResultTexture(): THREE.Texture;
    resize(resolution?: THREE.Vector2): void;
}
