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

	constructor( renderer: THREE.WebGLRenderer, ppParam: PPParam, customGeometry?: THREE.BufferGeometry ) {

		this.renderer = renderer;
		this.scene = new THREE.Scene();
		this.camera = new THREE.OrthographicCamera( - 1.0, 1.0, 1.0, - 1.0 );

		this.screen = new THREE.Mesh( customGeometry || new THREE.PlaneGeometry( 2, 2 ) );
		this.scene.add( this.screen );

		ppParam.vertexShader = ppParam.vertexShader || passThrowVert;
		ppParam.uniforms = ppParam.uniforms || {};
		ppParam.uniforms.resolution = {
			value: new THREE.Vector2()
		};

		this.effect = {
			material: new THREE.ShaderMaterial( ppParam ),
		};

	}

	public render( inputRenderTargets: InputRenderTarget | null, renderTarget: THREE.WebGLRenderTarget | null = null ) {

		const renderTargetMem = this.renderer.getRenderTarget();

		const effect = this.effect;
		const material = effect.material;
		const uniforms = material.uniforms;

		if ( inputRenderTargets ) {

			const keys = Object.keys( inputRenderTargets );

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
