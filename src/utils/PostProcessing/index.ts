import * as THREE from 'three';

import passThrowVert from './shaders/passThrow.vs';

type InputRenderTarget = { [key:string]: THREE.Texture | THREE.Texture[] };

export interface PPParam extends THREE.ShaderMaterialParameters{
	inputRenderTargets?: string
}

export class PostProcessing {

	private renderer: THREE.WebGLRenderer;
	private scene: THREE.Scene;
	private camera: THREE.OrthographicCamera;
	private screen: THREE.Mesh;

	public effect: {
		material: THREE.ShaderMaterial,
	};

	constructor( renderer: THREE.WebGLRenderer, material: PPParam ) {

		this.renderer = renderer;
		this.scene = new THREE.Scene();
		this.camera = new THREE.OrthographicCamera( - 1.0, 1.0, 1.0, - 1.0 );

		this.screen = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ) );
		this.scene.add( this.screen );

		this.createMaterials( material );

	}

	private createMaterials( params: PPParam ) {

		let param = params;

		param.vertexShader = param.vertexShader || passThrowVert;
		param.uniforms = param.uniforms || {};
		param.uniforms.resolution = {
			value: new THREE.Vector2()
		};

		this.effect = {
			material: new THREE.ShaderMaterial( param ),
		};

	}

	public render( inputRenderTargets: InputRenderTarget, renderTarget: THREE.WebGLRenderTarget ) {

		let renderTargetMem = this.renderer.getRenderTarget();

		let effect = this.effect;
		let material = effect.material;
		let uniforms = material.uniforms;

		if ( inputRenderTargets ) {

			let keys = Object.keys( inputRenderTargets );

			for ( let j = 0; j < keys.length; j ++ ) {

				if ( uniforms[ keys[ j ] ] ) {

					uniforms[ keys[ j ] ].value = inputRenderTargets[ keys[ j ] ];

				} else {

					uniforms[ keys[ j ] ] = { value: inputRenderTargets[ keys[ j ] ] };

					effect.material.needsUpdate = true;

					effect.material.uniforms = uniforms;

				}

			}

		}

		if ( renderTarget ) {

			uniforms.resolution.value.set( renderTarget.width, renderTarget.height );

		} else {

			this.renderer.getSize( uniforms.resolution.value );

		}

		this.screen.material = material;

		this.renderer.setRenderTarget( renderTarget );

		this.renderer.render( this.scene, this.camera );

		this.renderer.setRenderTarget( renderTargetMem );

	}

}
