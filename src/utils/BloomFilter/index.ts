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
	public blurRange: number = 10.0;
	private blurTextureResolutionRatio: number;

	constructor(renderer: THREE.WebGLRenderer, blurTextureResolutionRatio?: number ) {

		this.renderer = renderer;

		this.blurTextureResolutionRatio = blurTextureResolutionRatio ? blurTextureResolutionRatio : 0.1;

		this.resolution = new THREE.Vector2();
		this.renderer.getSize( this.resolution );
		this.resolution.multiplyScalar( this.renderer.getPixelRatio() );		

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
		
	}

	public render( srcTexture: THREE.Texture, offscreenRendering?: boolean );

	public render( scene: THREE.Scene, camera: THREE.Camera, offscreenRendering: boolean  );

	public render( tex_scene: THREE.Texture | THREE.Scene = null, offscreen_camera: boolean | THREE.Camera = false, offscreenRendering: boolean = false) {

		//apply uniforms
		this._brightUni.threshold.value = this.threshold;
		this._bloomUni.brightness.value = this.brightness;

		this.blurResolution.copy( this.resolution.clone().divideScalar( this.blurRange ) );
		
		let isInputedTexture: boolean = true;
		let offsc = offscreen_camera as boolean;
		
		//render scene
		if( ( tex_scene as THREE.Scene ).isScene ) {
			
			isInputedTexture = false;
			offsc = offscreenRendering;
			
			this.renderer.setRenderTarget( this.sceneRenderTarget );			
			this.renderer.render( tex_scene as THREE.Scene, offscreen_camera as THREE.Camera );

		}

		this.sceneTex.value = isInputedTexture ? tex_scene : this.sceneRenderTarget.texture;

		//render birightness part
		this._brightPP.render( isInputedTexture ? tex_scene as THREE.Texture : this.sceneRenderTarget.texture, true );
		let tex = this._brightPP.getResultTexture();

		//render blur
		for( let i = 0; i < this.renderCount; i++ ){

			this._blurPP.render( tex, true );
			tex = this._blurPP.getResultTexture();
		
		}

		//composition bloom
		this._bloomPP.render( tex, offsc );

		return offsc ? this._bloomPP.getResultTexture() : null;
	}

	public resize( windowPixelSize: THREE.Vector2){

		this.resolution.copy( windowPixelSize );

		this.blurResolution.copy( this.resolution.clone().divideScalar( this.blurRange ) );

		this.sceneRenderTarget.setSize( windowPixelSize.x, windowPixelSize.y );

		this._brightPP.resize( windowPixelSize );

		this._blurPP.resize( windowPixelSize );

		this._bloomPP.resize( windowPixelSize );

	}
}