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
    constructor(renderer: THREE.WebGLRenderer, ppParam: PPParam, customGeometry?: THREE.BufferGeometry);
    render(inputRenderTargets: InputRenderTarget | null, renderTarget?: THREE.WebGLRenderTarget | null): void;
}
export {};
//# sourceMappingURL=index.d.ts.map