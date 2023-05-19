import * as THREE from 'three';

import quadVert from './shaders/quad.vs';

export interface PostProcessPassParam extends THREE.ShaderMaterialParameters {
	input?: ( THREE.Texture | null )[],
	renderTarget: THREE.WebGLRenderTarget | null,
	clearColor?: THREE.Color;
	clearDepth?: number;
}

export class PostProcessPass extends THREE.ShaderMaterial {

	public input: ( THREE.Texture | null )[];
	public renderTarget: THREE.WebGLRenderTarget | null;

	public clearColor: THREE.Color | null;
	public clearDepth: number | null;

	constructor( param: PostProcessPassParam ) {

		const input = param.input;
		const rt = param.renderTarget;

		delete param.input;
		delete ( param as any ).renderTarget;

		super( { ...param, vertexShader: param.vertexShader || quadVert, glslVersion: THREE.GLSL3 } );

		this.renderTarget = rt;
		this.input = input || [];
		this.uniforms = this.uniforms || {};

		this.clearColor = param.clearColor ?? null;
		this.clearDepth = param.clearDepth ?? null;

	}

}
