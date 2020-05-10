import * as THREE from 'three';
import * as ORE from '@ore-three-ts';

import postprocess from './glsl/postprocess.fs';

export class PostProcessing {

	public scene: THREE.Scene;
	public camera: THREE.Camera

	//ORE.PostProcessings
	protected pp: ORE.PostProcessing;

	protected renderer: THREE.WebGLRenderer;

	protected sceneRenderTarget: THREE.WebGLRenderTarget;

	//uniforms
	protected commonUniforms: ORE.Uniforms;

	//parameters
	protected resolution: THREE.Vector2;

	constructor( renderer: THREE.WebGLRenderer, parentUniforms: ORE.Uniforms, textureResolutionRatio?: number, customResolution?: THREE.Vector2 ) {

		this.renderer = renderer;

		this.resolution = new THREE.Vector2();

		//uniforms
		this.commonUniforms = ORE.UniformsLib.CopyUniforms( {
		}, parentUniforms );

		this.init();
		this.resize( customResolution );

	}

	protected init() {

		let ppParam = [ {
			fragmentShader: postprocess,
			uniforms: this.commonUniforms
		} ];

		this.pp = new ORE.PostProcessing( this.renderer, ppParam );
		this.sceneRenderTarget = this.pp.createRenderTarget();

	}

	public render( srcTexture: THREE.Texture, offscreenRendering?: boolean );

	public render( scene: THREE.Scene, camera: THREE.Camera, offscreenRendering?: boolean );

	public render( tex_scene: THREE.Texture | THREE.Scene = null, offscreen_camera: boolean | THREE.Camera = false, offscreenRendering: boolean = false ) {

		//render scene
		if ( 'isScene' in tex_scene ) {

			this.renderer.setRenderTarget( this.sceneRenderTarget );
			this.renderer.render( tex_scene as THREE.Scene, offscreen_camera as THREE.Camera );

		} else if ( 'isTexture' in tex_scene ) {

			this.resolution.set( tex_scene.image.width, tex_scene.image.height );

		}

		//composition bloom
		this.renderer.setRenderTarget( null );
		this.pp.render( this.sceneRenderTarget.texture );

	}

	public resize( resolution?: THREE.Vector2 ) {

		let res = new THREE.Vector2();

		if ( resolution ) {

			res.copy( resolution );

		} else {

			res.set( window.innerWidth, window.innerHeight );
			res.multiplyScalar( this.renderer.getPixelRatio() );

		}

		this.resolution.copy( res );

		this.sceneRenderTarget.setSize( this.resolution.x, this.resolution.y );

		this.pp.resize( this.resolution );

	}

}
