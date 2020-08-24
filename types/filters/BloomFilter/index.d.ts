import * as THREE from 'three';
import * as ORE from '@ore-three-ts';
export declare class BloomFilter {
    protected bright: ORE.PostProcessing;
    protected blur: ORE.PostProcessing[];
    protected composite: ORE.PostProcessing;
    protected smaa: ORE.PostProcessing;
    protected renderer: THREE.WebGLRenderer;
    protected sceneRenderTarget: THREE.WebGLRenderTarget;
    inputTextures: ORE.Uniforms;
    protected commonUniforms: ORE.Uniforms;
    renderCount: number;
    protected noPPRenderRes: THREE.Vector2;
    protected bloomResolution: THREE.Vector2;
    protected bloomResolutionRatio: number;
    constructor(renderer: THREE.WebGLRenderer, bloomResolutionRatio?: number, renderCount?: number);
    set blurRange(value: number);
    set threshold(value: number);
    set brightness(value: number);
    protected init(): void;
    render(scene: THREE.Scene, camera: THREE.Camera): void;
    resize(mainSceneRenderRes: THREE.Vector2): void;
}
