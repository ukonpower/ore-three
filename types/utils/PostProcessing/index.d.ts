import * as THREE from 'three';
declare interface PPParam {
    fragment: string;
    uniforms: any;
}
export declare class PostProcessing {
    private renderer;
    private scene;
    private camera;
    private screenMesh;
    private readBuffer;
    private writeBuffer;
    private effectMaterials;
    constructor(renderer: THREE.WebGLRenderer, parameter: [PPParam]);
    private initRenderTargets;
    private swapBuffers;
    render(scene: THREE.Scene, camera: THREE.Camera): void;
}
export {};
