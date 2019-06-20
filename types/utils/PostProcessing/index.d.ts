import * as THREE from 'three';
export interface PPParam {
    fragmentShader: string;
    uniforms?: any;
}
export interface EffectMaterial {
    material: THREE.ShaderMaterial;
    uniforms: any;
}
export declare class PostProcessing {
    private renderer;
    private scene;
    private camera;
    private screenMesh;
    private readBuffer;
    private writeBuffer;
    resultBuffer: THREE.WebGLRenderTarget;
    resolution: THREE.Vector2;
    private effectMaterials;
    constructor(renderer: THREE.WebGLRenderer, parameter: PPParam[], resolution?: number);
    private initRenderTargets;
    createRenderTarget(): THREE.WebGLRenderTarget;
    private swapBuffers;
    render(offScreenRendering: boolean): any;
    render(srcTexture?: THREE.Texture, offScreenRendering?: boolean): any;
    render(scene: THREE.Scene, camera: THREE.Camera, offScreenRendering?: boolean): any;
    getResultTexture(): THREE.Texture;
    resize(width: number, height: number): void;
}
