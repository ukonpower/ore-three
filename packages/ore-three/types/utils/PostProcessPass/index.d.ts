import * as THREE from 'three';
export interface PostProcessPassParam extends THREE.ShaderMaterialParameters {
    renderTarget?: THREE.WebGLRenderTarget | null;
    clearColor?: THREE.Color;
    clearDepth?: number;
    resolutionRatio?: number;
    passThrough?: boolean;
}
export declare class PostProcessPass extends THREE.ShaderMaterial {
    renderTarget: THREE.WebGLRenderTarget | null;
    clearColor: THREE.Color | null;
    clearDepth: number | null;
    passThrough: boolean;
    resolution: THREE.Vector2;
    resolutionInv: THREE.Vector2;
    resolutionRatio: number;
    constructor(param?: PostProcessPassParam);
    resize(resolution: THREE.Vector2): void;
    setRendertarget(renderTarget: THREE.WebGLRenderTarget): void;
}
//# sourceMappingURL=index.d.ts.map