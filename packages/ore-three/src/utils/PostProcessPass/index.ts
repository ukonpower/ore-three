import * as THREE from 'three';

import quadVert from './shaders/quad.vs';
import outFrag from './shaders/out.fs';

import { UniformsLib } from '../Uniforms';

export interface PostProcessPassParam extends THREE.ShaderMaterialParameters {
	renderTarget?: THREE.WebGLRenderTarget | null,
	clearColor?: THREE.Color;
	clearDepth?: number;
	resolutionRatio?: number;
	passThrough?: boolean,
}

export class PostProcessPass extends THREE.ShaderMaterial {

	public renderTarget: THREE.WebGLRenderTarget | null;

	public clearColor: THREE.Color | null;
	public clearDepth: number | null;

	public passThrough: boolean;

	public resolution: THREE.Vector2;
	public resolutionInv: THREE.Vector2;
	public resolutionRatio: number;

	constructor( param?: PostProcessPassParam ) {

		param = param || {};

		const { renderTarget, resolutionRatio, passThrough, ...materialParam } = param;

		const uniforms = UniformsLib.mergeUniforms( materialParam.uniforms, {
			uResolution: {
				value: new THREE.Vector2()
			},
			uResolutionInv: {
				value: new THREE.Vector2()
			},
		} );

		super( {
			...materialParam,
			vertexShader: param.vertexShader ?? quadVert,
			fragmentShader: param.fragmentShader ?? outFrag,
			uniforms
		} );

		if ( renderTarget === undefined ) {

			this.renderTarget = new THREE.WebGLRenderTarget( 1, 1 );

		} else {

			this.renderTarget = renderTarget;

		}

		this.clearColor = param.clearColor ?? null;
		this.clearDepth = param.clearDepth ?? null;
		this.passThrough = passThrough || false;

		// resolution

		this.resolution = uniforms.uResolution.value;
		this.resolutionInv = uniforms.uResolutionInv.value;
		this.resolutionRatio = resolutionRatio || 1;

	}

	public resize( resolution: THREE.Vector2 ) {

		this.resolution.copy( resolution ).multiplyScalar( this.resolutionRatio ).floor();
		this.resolutionInv.set( 1.0, 1.0 ).divide( this.resolution );

		if ( this.renderTarget ) {

			this.renderTarget.setSize( this.resolution.x, this.resolution.y );

		}

	}

	public setRendertarget( renderTarget: THREE.WebGLRenderTarget ) {

		this.renderTarget = renderTarget;

		if ( this.renderTarget && ( this.renderTarget.width != this.resolution.x || this.renderTarget.height != this.resolution.y ) ) {

			this.resize( this.resolution );

		}

	}


}
