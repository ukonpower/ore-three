import * as THREE from 'three';
export interface Uniforms {
    [key: string]: THREE.IUniform;
}
export declare namespace UniformsLib {
    function mergeUniforms(...uniforms: Uniforms[]): Uniforms;
}
