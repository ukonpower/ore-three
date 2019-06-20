/**
 * @author yomboprime https://github.com/yomboprime
 *
 * GPUComputationRenderer, based on SimulationRenderer by zz85
 *
 * The GPUComputationRenderer uses the concept of variables. These variables are RGBA float textures that hold 4 floats
 * for each compute element (texel)
 *
 * Each variable has a fragment shader that defines the computation made to obtain the variable in question.
 * You can use as many variables you need, and make dependencies so you can use textures of other variables in the shader
 * (the sampler uniforms are added automatically) Most of the variables will need themselves as dependency.
 *
 * The renderer has actually two render targets per variable, to make ping-pong. Textures from the current frame are used
 * as inputs to render the textures of the next frame.
 *
 * The render targets of the variables can be used as input textures for your visualization shaders.
 *
 * Variable names should be valid identifiers and should not collide with THREE GLSL used identifiers.
 * a common approach could be to use 'texture' prefixing the variable name; i.e texturePosition, textureVelocity...
 *
 * The size of the computation (sizeX * sizeY) is defined as 'resolution' automatically in the shader. For example:
 * #DEFINE resolution vec2( 1024.0, 1024.0 )
 *
 * -------------
 *
 * Basic use:
 *
 * // Initialization...
 *
 * // Create computation renderer
 * var gpuCompute = new GPUComputationRenderer( 1024, 1024, renderer );
 *
 * // Create initial state float textures
 * var pos0 = gpuCompute.createTexture();
 * var vel0 = gpuCompute.createTexture();
 * // and fill in here the texture data...
 *
 * // Add texture variables
 * var velVar = gpuCompute.addVariable( "textureVelocity", fragmentShaderVel, pos0 );
 * var posVar = gpuCompute.addVariable( "texturePosition", fragmentShaderPos, vel0 );
 *
 * // Add variable dependencies
 * gpuCompute.setVariableDependencies( velVar, [ velVar, posVar ] );
 * gpuCompute.setVariableDependencies( posVar, [ velVar, posVar ] );
 *
 * // Add custom uniforms
 * velVar.material.uniforms.time = { value: 0.0 };
 *
 * // Check for completeness
 * var error = gpuCompute.init();
 * if ( error !== null ) {
 *		console.error( error );
  * }
 *
 *
 * // In each frame...
 *
 * // Compute!
 * gpuCompute.compute();
 *
 * // Update texture uniforms in your visualization materials with the gpu renderer output
 * myMaterial.uniforms.myTexture.value = gpuCompute.getCurrentRenderTarget( posVar ).texture;
 *
 * // Do your rendering
 * renderer.render( myScene, myCamera );
 *
 * -------------
 *
 * Also, you can use utility functions to create ShaderMaterial and perform computations (rendering between textures)
 * Note that the shaders can have multiple input textures.
 *
 * var myFilter1 = gpuCompute.createShaderMaterial( myFilterFragmentShader1, { theTexture: { value: null } } );
 * var myFilter2 = gpuCompute.createShaderMaterial( myFilterFragmentShader2, { theTexture: { value: null } } );
 *
 * var inputTexture = gpuCompute.createTexture();
 *
 * // Fill in here inputTexture...
 *
 * myFilter1.uniforms.theTexture.value = inputTexture;
 *
 * var myRenderTarget = gpuCompute.createRenderTarget();
 * myFilter2.uniforms.theTexture.value = myRenderTarget.texture;
 *
 * var outputRenderTarget = gpuCompute.createRenderTarget();
 *
 * // Now use the output texture where you want:
 * myMaterial.uniforms.map.value = outputRenderTarget.texture;
 *
 * // And compute each frame, before rendering to screen:
 * gpuCompute.doRenderTarget( myFilter1, myRenderTarget );
 * gpuCompute.doRenderTarget( myFilter2, outputRenderTarget );
 *
 *
 *
 * @param {int} sizeX Computation problem size is always 2d: sizeX * sizeY elements.
 * @param {int} sizeY Computation problem size is always 2d: sizeX * sizeY elements.
 * @param {WebGLRenderer} renderer The renderer
  */
import * as THREE from 'three';
export declare interface ComputeVariable {
    name: string;
    initialValueTexture: THREE.Texture;
    material: THREE.ShaderMaterial;
    dependencies: any;
    renderTargets: THREE.RenderTarget[];
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
    addVariable(variableName: string, computeFragmentShader: string, initialValueTexture: THREE.Texture): ComputeVariable;
    setVariableDependencies(variable: any, dependencies: any): void;
    init(): boolean;
    compute(): void;
    getCurrentRenderTarget(variable: ComputeVariable): THREE.RenderTarget;
    getAlternateRenderTarget(variable: ComputeVariable): THREE.RenderTarget;
    addResolutionDefine(materialShader: THREE.ShaderMaterial): void;
    createShaderMaterial(computeFragmentShader: string, uniforms?: any): THREE.ShaderMaterial;
    createRenderTarget(sizeXTexture: number, sizeYTexture: number, wrapS: THREE.Wrapping, wrapT: THREE.Wrapping, minFilter: THREE.TextureFilter, magFilter: THREE.TextureFilter): THREE.WebGLRenderTarget;
    createTexture(): THREE.DataTexture;
    renderTexture(input: THREE.RenderTarget, output: THREE.RenderTarget): void;
    doRenderTarget(material: THREE.ShaderMaterial, output: THREE.RenderTarget): void;
    private getPassThroughVertexShader;
    private getPassThroughFragmentShader;
}
