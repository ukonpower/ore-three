export interface Uniforms {
    [key: string]: THREE.IUniform;
}
export declare namespace UniformsLib {
    function CopyUniforms(uni1: Uniforms, uni2: Uniforms): Uniforms;
}
