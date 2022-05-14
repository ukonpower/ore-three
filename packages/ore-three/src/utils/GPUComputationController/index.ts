import * as THREE from 'three';

import vert from './shaders/passThrough.vs';
import passThroughFrag from './shaders/passThrough.fs';
import { Uniforms, UniformsLib } from '../Uniforms';

export interface GPUComputationKernel{
    material: THREE.RawShaderMaterial,
    uniforms: any,
}

export interface GPUcomputationData{
    buffer: THREE.WebGLRenderTarget
}

export class GPUComputationController {

	protected renderer: THREE.WebGLRenderer;
	public dataSize: THREE.Vector2;
	protected uniforms: any;

	protected scene: THREE.Scene;
	protected camera: THREE.Camera;

	protected mesh: THREE.Mesh;
	protected materials: THREE.ShaderMaterial[];

	protected tempDataLinear: GPUcomputationData;
	protected tempDataNear: GPUcomputationData;

	private renderTargets: THREE.WebGLRenderTarget[] = [];

	public get isSupported() : boolean {

    	return this.renderer.extensions.get( "OES_texture_float" );

	}

	constructor( renderer: THREE.WebGLRenderer, dataSize: THREE.Vector2 ) {

    	this.renderer = renderer;
    	this.dataSize = dataSize.clone();

    	this.uniforms = {
    		dataSize: {
    			value: this.dataSize
    		}
    	};

    	this.tempDataLinear = this.createData( {
    		minFilter: THREE.LinearFilter,
    		magFilter: THREE.LinearFilter
    	} );

    	this.tempDataNear = this.createData( {
    		minFilter: THREE.NearestFilter,
    		magFilter: THREE.NearestFilter
    	} );

    	this.scene = new THREE.Scene();
    	this.camera = new THREE.Camera();

    	this.materials = [];
    	this.mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ) );
    	this.scene.add( this.mesh );

	}

	public createInitializeTexture() {

    	let a = new Float32Array( this.uniforms.dataSize.value.x * this.uniforms.dataSize.value.y * 4 );
    	let texture = new THREE.DataTexture( a, this.uniforms.dataSize.value.x, this.uniforms.dataSize.value.y, THREE.RGBAFormat, THREE.FloatType );
    	texture.needsUpdate = true;

    	return texture;

	}

	public createData(): GPUcomputationData;

	public createData( initializeTexture: THREE.DataTexture ): GPUcomputationData;

	public createData( textureParam: THREE.WebGLRenderTargetOptions ): GPUcomputationData;

	public createData( initializeTexture: THREE.DataTexture, textureParam: THREE.WebGLRenderTargetOptions ): GPUcomputationData;

	public createData( initTex_texParam?: any, textureParam? : THREE.WebGLRenderTargetOptions ): GPUcomputationData {

    	let userAgent = navigator.userAgent;
    	let isiOS = userAgent.indexOf( 'iPhone' ) >= 0 || userAgent.indexOf( 'iPad' ) >= 0 || navigator.platform == "iPad" || ( navigator.platform == "MacIntel" && navigator.userAgent.indexOf( "Safari" ) != - 1 && navigator.userAgent.indexOf( "Chrome" ) == - 1 && ( navigator as any ).standalone !== undefined );

    	let param: THREE.WebGLRenderTargetOptions = {
    		wrapS: THREE.ClampToEdgeWrapping,
    		wrapT: THREE.ClampToEdgeWrapping,
    		minFilter: THREE.NearestFilter,
    		magFilter: THREE.NearestFilter,
    		format: THREE.RGBAFormat,
    		type: isiOS ? THREE.HalfFloatType : THREE.FloatType,
    		stencilBuffer: false,
    		depthBuffer: false
    	};
    	let initTex: THREE.DataTexture | null = null;
    	let customParam: THREE.WebGLRenderTargetOptions | null = null;

    	if ( initTex_texParam ) {

    		if ( initTex_texParam.isDataTexture ) {

    			initTex = initTex_texParam;

    			if ( textureParam ) {

    				customParam = textureParam;

    			}

    		} else {

    			customParam = initTex_texParam;

    		}

    	}

    	if ( customParam ) {

    		param.wrapS = customParam.wrapS || param.wrapS;
    		param.wrapT = customParam.wrapT || param.wrapT;
    		param.minFilter = customParam.minFilter || param.minFilter;
    		param.magFilter = customParam.magFilter || param.magFilter;
    		param.format = customParam.format || param.format;
    		param.type = customParam.type || param.type;
    		param.stencilBuffer = customParam.stencilBuffer || param.stencilBuffer;
    		param.depthBuffer = customParam.depthBuffer || param.depthBuffer;

    	}

    	let buf = new THREE.WebGLRenderTarget( this.uniforms.dataSize.value.x, this.uniforms.dataSize.value.y, param );

		let data = { buffer: buf };

		this.renderTargets.push( buf );

    	if ( initTex ) {

    		let initKernel = this.createKernel( {
				fragmentShader: passThroughFrag,
				uniforms: {
					tex: {
						value: initTex
					}
				}
			} );

    		this.compute( initKernel, data );

    	}

    	return data;

	}

	public createKernel( param: THREE.ShaderMaterialParameters ): GPUComputationKernel {

    	let uni: Uniforms = UniformsLib.mergeUniforms( param.uniforms, this.uniforms );

		param.uniforms = uni;
		param.vertexShader = param.vertexShader || vert;

    	let mat = new THREE.ShaderMaterial( param );

    	this.materials.push( mat );

    	let kernel: GPUComputationKernel = {
    		material: mat,
    		uniforms: param.uniforms
    	};

    	return kernel;

	}

	public compute( kernel: GPUComputationKernel, data: GPUcomputationData, camera?: THREE.Camera ) {

    	let temp: GPUcomputationData;

    	if ( data.buffer.texture.magFilter == THREE.LinearFilter ) {

    		temp = this.tempDataLinear;

    	} else {

    		temp = this.tempDataNear;

    	}

    	this.mesh.material = kernel.material;

    	let currentRenderTarget = this.renderer.getRenderTarget();

    	this.renderer.setRenderTarget( temp.buffer );

    	this.renderer.render( this.scene, camera || this.camera );

    	this.swapBuffers( data, temp );

    	this.renderer.setRenderTarget( currentRenderTarget );

	}

	protected swapBuffers( b1: GPUcomputationData, b2: GPUcomputationData ) {

    	let tmp = b1.buffer;
    	b1.buffer = b2.buffer;
    	b2.buffer = tmp;

	}

	public dispose() {

    	let geo = this.mesh.geometry;
    	geo.dispose();

    	for ( let i = 0; i < this.materials.length; i ++ ) {

    		this.materials[ i ].dispose();

    	}

    	this.scene.remove( this.mesh );

    	this.tempDataLinear.buffer.dispose();
    	this.tempDataNear.buffer.dispose();

	}

	public resizeData( dataSize: THREE.Vector2 ) {

		this.dataSize.copy( dataSize );

		for ( let i = 0; i < this.renderTargets.length; i ++ ) {

			let target = this.renderTargets[ i ];

			target.setSize( dataSize.x, dataSize.y );

		}

	}

}
