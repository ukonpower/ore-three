import * as THREE from 'three';
import { ShaderMaterialParameters } from 'three';
import { Uniforms } from '../../shaders/shader';
export declare class DomGLSL extends THREE.Mesh {
    private uni;
    private dom;
    private domPos;
    private domSize;
    private windowSize;
    constructor(element: HTMLElement, parameter: ShaderMaterialParameters);
    readonly uniforms: Uniforms;
    updateDom(): void;
}
