import * as THREE from 'three';
import bright from './shaders/bright.fs';
import blur from './shaders/blur.fs';
import bloom from './shaders/bloom.fs';
import { PostProcessing } from '../../utils/PostProcessing';
import { Uniforms, UniformsLib } from '../../utils/Uniforms';

export class BloomFilter {

	public scene: THREE.Scene;
	public camera: THREE.Camera

	//postprocessings
	protected _brightPP: PostProcessing;
	protected _blurPP: PostProcessing;
	protected _bloomPP: PostProcessing;

	protected renderer: THREE.WebGLRenderer;

	protected sceneRenderTarget: THREE.WebGLRenderTarget;

	//uniforms
	private _blurRange: number = 2;
	public sceneTex: THREE.IUniform;
	protected commonUniforms: Uniforms;

	//parameters
	public renderCount: number = 5;
	protected resolution: THREE.Vector2;
	protected lowResolution: THREE.Vector2;
	protected blurResolution: THREE.Vector2;
	protected textureResolutionRatio: number;

	constructor( renderer: THREE.WebGLRenderer, textureResolutionRatio?: number, customResolution?: THREE.Vector2 ) {

		this.renderer = renderer;

		this.textureResolutionRatio = textureResolutionRatio ? textureResolutionRatio : 0.1;

		this.resolution = new THREE.Vector2();
		this.blurResolution = new THREE.Vector2();

		this.init();
		this.resize( customResolution );

	}

	public set blurRange( value: number ) {

		this._blurRange = value;

		this.blurResolution.copy( this.lowResolution.clone().divideScalar( this._blurRange ) );

	}

	public set threshold( value: number ) {

		this.commonUniforms.threshold.value = value;

	}

	public set brightness( value: number ) {

		this.commonUniforms.brightness.value = value;

	}

	protected init() {

		this.sceneTex = {
			value: null
		};

		//uniforms
		this.commonUniforms = {
			resolution: {
				value: this.blurResolution
			},
			threshold: {
				value: 0.5,
			},
			brightness: {
				value: 0.7
			},
		};

		//postprocess params
		let brightParam = [ {
			fragmentShader: bright,
			uniforms: this.commonUniforms,
		} ];

		let blurParam = [ {
			fragmentShader: blur,
			uniforms: UniformsLib.CopyUniforms( {
				direction: { value: true }
			}, this.commonUniforms )
		},
		{
			fragmentShader: blur,
			uniforms: UniformsLib.CopyUniforms( {
				direction: { value: false }
			}, this.commonUniforms )
		} ];

		let bloomParam = [ {
			fragmentShader: bloom,
			uniforms: UniformsLib.CopyUniforms( {
				sceneTex: this.sceneTex,
			}, this.commonUniforms )
		} ];

		//create post processings
		this._brightPP = new PostProcessing( this.renderer, brightParam );
		this._blurPP = new PostProcessing( this.renderer, blurParam );
		this._bloomPP = new PostProcessing( this.renderer, bloomParam );
		this.sceneRenderTarget = this._bloomPP.createRenderTarget();

	}

	public render( srcTexture: THREE.Texture, offscreenRendering?: boolean );

	public render( scene: THREE.Scene, camera: THREE.Camera, offscreenRendering?: boolean );

	public render( tex_scene: THREE.Texture | THREE.Scene = null, offscreen_camera: boolean | THREE.Camera = false, offscreenRendering: boolean = false ) {

		let isInputedTexture: boolean = true;
		let offsc = offscreen_camera as boolean;

		//render scene
		if ( 'isScene' in tex_scene ) {

			isInputedTexture = false;
			offsc = offscreenRendering;

			this.renderer.setRenderTarget( this.sceneRenderTarget );
			this.renderer.render( tex_scene as THREE.Scene, offscreen_camera as THREE.Camera );

		} else if ( 'isTexture' in tex_scene ) {

			this.resolution.set( tex_scene.image.width, tex_scene.image.height );

		}

		this.sceneTex.value = isInputedTexture ? tex_scene : this.sceneRenderTarget.texture;

		//render birightness part
		this._brightPP.render( isInputedTexture ? tex_scene as THREE.Texture : this.sceneRenderTarget.texture, true );
		let tex = this._brightPP.getResultTexture();

		//render blur
		for ( let i = 0; i < this.renderCount; i ++ ) {

			this._blurPP.render( tex, true );
			tex = this._blurPP.getResultTexture();

		}

		//composition bloom
		this._bloomPP.render( tex, offsc );

		return offsc ? this._bloomPP.getResultTexture() : null;

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

		this.lowResolution = this.resolution.clone().multiplyScalar( this.textureResolutionRatio );

		this.sceneRenderTarget.setSize( this.resolution.x, this.resolution.y );

		this._brightPP.resize( this.lowResolution );

		this._blurPP.resize( this.lowResolution );

		this._bloomPP.resize( this.resolution );

		this.blurRange = this._blurRange;

	}

}
