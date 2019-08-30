import * as THREE from 'three';
export declare class BloomFilter {
    scene: THREE.Scene;
    camera: THREE.Camera;
    private _brightPP;
    private _blurPP;
    private _bloomPP;
    private renderer;
    private sceneRenderTarget;
    sceneTex: any;
    private blurResolution;
    private resolution;
    private _brightUni;
    private _blurUni1;
    private _blurUni2;
    private _bloomUni;
    renderCount: number;
    threshold: number;
    brightness: number;
    blurRange: number;
    private blurTextureResolutionRatio;
    constructor(renderer: THREE.WebGLRenderer, blurTextureResolutionRatio?: number);
    private init;
    render(scene: THREE.Scene, camera: THREE.Camera): void;
    resize(windowPixelSize: THREE.Vector2): void;
}
