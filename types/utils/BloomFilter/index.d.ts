import * as THREE from 'three';
export declare class BloomFilter {
    gaussVar: any;
    sceneTex: any;
    scene: THREE.Scene;
    camera: THREE.Camera;
    private pp1;
    private pp2;
    private renderer;
    private sceneRenderTarget;
    constructor(renderer: any);
    private init;
    render(scene: THREE.Scene, camera: THREE.Camera): void;
}
