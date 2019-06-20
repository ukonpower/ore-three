/**
 *
 * GPUComputationRenderer by yomboprime
 * https://github.com/yomboprime
 *
 * customized to typescript by ukonpower
 *
*/
import * as THREE from 'three';
export interface ComputeRendererVariable {
    name: string;
    initialValueTexture: THREE.Texture;
    material: THREE.ShaderMaterial;
    dependencies: any;
    renderTargets: THREE.WebGLRenderTarget[];
    wrapS: THREE.Wrapping;
    wrapT: THREE.Wrapping;
    minFilter: THREE.TextureFilter;
    magFilter: THREE.TextureFilter;
}
export declare class GPUComputationRenderer {
    private variables;
    private currentTextureIndex;
    private renderer;
    private scene;
    private camera;
    private mesh;
    private sizeX;
    private sizeY;
    private passThruUniforms;
    private passThruShader;
    constructor(sizeX: number, sizeY: number, renderer: THREE.WebGLRenderer);
    addVariable(variableName: string, computeFragmentShader: string, initialValueTexture: THREE.Texture): ComputeRendererVariable;
    setVariableDependencies(variable: any, dependencies: any): void;
    init(): boolean;
    compute(): void;
    getCurrentRenderTarget(variable: ComputeRendererVariable): THREE.WebGLRenderTarget;
    getAlternateRenderTarget(variable: ComputeRendererVariable): THREE.WebGLRenderTarget;
    addResolutionDefine(materialShader: THREE.ShaderMaterial): void;
    createShaderMaterial(computeFragmentShader: string, uniforms?: any): THREE.ShaderMaterial;
    createRenderTarget(sizeXTexture: number, sizeYTexture: number, wrapS: THREE.Wrapping, wrapT: THREE.Wrapping, minFilter: THREE.TextureFilter, magFilter: THREE.TextureFilter): THREE.WebGLRenderTarget;
    createTexture(): THREE.DataTexture;
    renderTexture(input: THREE.RenderTarget, output: THREE.RenderTarget): void;
    doRenderTarget(material: THREE.ShaderMaterial, output: THREE.RenderTarget): void;
    private getPassThroughVertexShader;
    private getPassThroughFragmentShader;
}
