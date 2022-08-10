import * as THREE from 'three';
export interface Uniforms {
    [key: string]: THREE.IUniform;
}
export declare namespace UniformsLib {
    function mergeUniforms(...uniforms: (Uniforms | undefined)[]): Uniforms;
}
//# sourceMappingURL=Uniforms.d.ts.map