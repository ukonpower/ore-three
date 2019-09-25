import * as THREE from 'three';
import { Uniforms } from '../../shaders/shader';
export interface PPParam {
    defines?: any;
    linewidth?: number;
    wireframe?: boolean;
    wireframeLinewidth?: number;
    lights?: boolean;
    clipping?: boolean;
    skinning?: boolean;
    morphTargets?: boolean;
    morphNormals?: boolean;
    fragmentShader: string;
    uniforms?: Uniforms;
    transparent?: boolean;
    blending?: THREE.Blending;
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
    resolutionRatio: number;
    private effectMaterials;
    constructor(renderer: THREE.WebGLRenderer, parameter: PPParam[], resolutionRatio?: number);
    private initRenderTargets;
    createRenderTarget(): THREE.WebGLRenderTarget;
    private swapBuffers;
    render(offScreenRendering: boolean): any;
    render(srcTexture?: THREE.Texture, offScreenRendering?: boolean): any;
    render(scene: THREE.Scene, camera: THREE.Camera, offScreenRendering?: boolean): any;
    getResultTexture(): THREE.Texture;
    resize(windowPixelSize: THREE.Vector2): void;
}
