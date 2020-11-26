import * as THREE from 'three';
declare type InputRenderTarget = {
    [key: string]: THREE.Texture | THREE.Texture[];
};
export interface PPParam extends THREE.ShaderMaterialParameters {
    inputRenderTargets?: string;
}
export declare class PostProcessing {
    private renderer;
    private scene;
    private camera;
    private screen;
    effect: {
        material: THREE.ShaderMaterial;
    };
    constructor(renderer: THREE.WebGLRenderer, material: PPParam);
    private createMaterials;
    render(inputRenderTargets: InputRenderTarget, renderTarget: THREE.WebGLRenderTarget): void;
}
export {};
