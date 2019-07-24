import * as THREE from 'three';
import bright from './glsl/bright.fs'
import blur from './glsl/blur.fs'
import bloom from './glsl/bloom.fs'
import { PostProcessing } from '../PostProcessing';

export class BloomFilter {

	public scene: THREE.Scene;
	public camera: THREE.Camera

	//postprocessings
	private _brightPP: PostProcessing;
	private _blurPP: PostProcessing;
	private _bloomPP: PostProcessing;

	private renderer: THREE.WebGLRenderer;
	
	private sceneRenderTarget: THREE.WebGLRenderTarget;

	//uniforms
	public sceneTex: any;
	private blurResolution: THREE.Vector2;
	private resolution: THREE.Vector2;

	private _brightUni: any;
	private _blurUni1: any;
 	private _blurUni2: any;
	private _bloomUni: any;

	//parameters
	public renderCount: number = 5;
	public threshold: number = 0.9
	public brightness: number = 0.9;
	public blurRange: number = 5.0;
	private blurTextureResolutionRatio: number;

	constructor(renderer: THREE.WebGLRenderer, blurTextureResolutionRatio?: number ) {

		this.renderer = renderer;

		this.blurTextureResolutionRatio = blurTextureResolutionRatio ? blurTextureResolutionRatio : 0.1;

		this.resolution = new THREE.Vector2( window.innerWidth, window.innerHeight );

		this.init();

	}

	private init() {

		this.sceneTex = {
			value: null
		}

		this.blurResolution = new THREE.Vector2().copy( this.resolution.clone().divideScalar( this.blurRange ) );

		//uniforms
		this._brightUni = {
			threshold: { value: this.threshold }
		}

		this._blurUni1 = {
			direction: {
				value: true,
			},
			resolution: {
				value: this.blurResolution
			}
		}

		this._blurUni2 = {
			direction: {
				value: false,
			},
			resolution: {
				value: this.blurResolution
			}
		}

		this._bloomUni = {
			sceneTex: this.sceneTex,
			brightness: { value: this.brightness },
		}
		
		//postprocess params
		let brightParam = [{
			fragmentShader: bright,
			uniforms: this._brightUni
		}]

		let blurParam = [{
			fragmentShader: blur,
			uniforms: this._blurUni1
		},
		{
			fragmentShader: blur,
			uniforms: this._blurUni2
		}]

		let bloomParam = [{
			fragmentShader: bloom,
			uniforms: this._bloomUni
		}]

		//create post processings
		this._brightPP = new PostProcessing( this.renderer, brightParam, this.blurTextureResolutionRatio );
		this._blurPP = new PostProcessing( this.renderer, blurParam, this.blurTextureResolutionRatio );
		this._bloomPP = new PostProcessing( this.renderer, bloomParam );
		this.sceneRenderTarget = this._bloomPP.createRenderTarget();

		this.resize();

	}

	public render( scene: THREE.Scene, camera: THREE.Camera ) {

		//apply uniforms
		this._brightUni.threshold.value = this.threshold;
		this._bloomUni.brightness.value = this.brightness;

		this.blurResolution.copy( this.resolution.clone().divideScalar( this.blurRange ) );
		
		//render scene
		this.renderer.setRenderTarget( this.sceneRenderTarget );
		this.renderer.render( scene, camera );

		this.sceneTex.value = this.sceneRenderTarget.texture;

		//render birightness part
		this._brightPP.render( this.sceneRenderTarget.texture, true );
		let tex = this._brightPP.getResultTexture();

		//render blur
		for( let i = 0; i < this.renderCount; i++ ){

			this._blurPP.render( tex, true );
			tex = this._blurPP.getResultTexture();
		
		}

		//composition bloom
		this._bloomPP.render( tex, false );
	}

	public resize( width?: number, height?: number ){

		let w = width ? width : window.innerWidth;
		let h = height ? height : window.innerHeight;
		
		this.resolution.set( width, height );

		this.blurResolution.copy( this.resolution.clone().divideScalar( this.blurRange ) );

		this.sceneRenderTarget.setSize( w * this.renderer.getPixelRatio(), h * this.renderer.getPixelRatio());

		this._brightPP.resize( w, h );
		this._blurPP.resize( w, h );
		this._bloomPP.resize( w, h );

	}
}