import * as THREE from 'three';
import * as ORE from '@ore-three-ts';
export declare class SMAAFilter {
    protected renderer: THREE.WebGLRenderer;
    protected sceneRenderTarget: THREE.WebGLRenderTarget;
    protected smaa: ORE.PostProcessing;
    inputTextures: ORE.Uniforms;
    protected commonUniforms: ORE.Uniforms;
    constructor(renderer: THREE.WebGLRenderer);
    protected init(): void;
    protected loadTextures(): void;
    render(scene: THREE.Scene, camera: THREE.Camera): void;
    resize(mainSceneRenderRes: THREE.Vector2): void;
    private getAreaTexture;
    private getSearchTexture;
}
