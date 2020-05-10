import * as THREE from 'three';
import { PostProcessing } from '../../utils/PostProcessing';
import { Uniforms } from '../../utils/Uniforms';
export declare class BloomFilter {
    scene: THREE.Scene;
    camera: THREE.Camera;
    protected _brightPP: PostProcessing;
    protected _blurPP: PostProcessing;
    protected _bloomPP: PostProcessing;
    protected renderer: THREE.WebGLRenderer;
    protected sceneRenderTarget: THREE.WebGLRenderTarget;
    private _blurRange;
    sceneTex: THREE.IUniform;
    protected commonUniforms: Uniforms;
    renderCount: number;
    protected resolution: THREE.Vector2;
    protected lowResolution: THREE.Vector2;
    protected blurResolution: THREE.Vector2;
    protected textureResolutionRatio: number;
    constructor(renderer: THREE.WebGLRenderer, textureResolutionRatio?: number, customResolution?: THREE.Vector2);
    set blurRange(value: number);
    set threshold(value: number);
    set brightness(value: number);
    protected init(): void;
    render(srcTexture: THREE.Texture, offscreenRendering?: boolean): any;
    render(scene: THREE.Scene, camera: THREE.Camera, offscreenRendering?: boolean): any;
    resize(resolution?: THREE.Vector2): void;
}
