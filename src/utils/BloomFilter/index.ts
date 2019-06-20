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
	private resolution: any;

	private _brightUni: any;
	private _blurUni1: any;
 	private _blurUni2: any;
	private _bloomUni: any;

	//parameters
	public renderCount: number = 5;
	public threshold: number = 0.9
	public brightness: number = 0.9;

	constructor(renderer) {

		this.renderer = renderer;

		this.init();

	}

	private init() {

		this.sceneTex = {
			value: null
		}

		this.resolution = {
			value: new THREE.Vector2()
		}

		this.resize();

		//uniforms
		this._brightUni = {
			threshold: { value: this.threshold }
		}

		this._blurUni1 = {
			direction: {
				value: true,
			},
			resolution: this.resolution
		}

		this._blurUni2 = {
			direction: {
				value: false,
			},
			resolution: this.resolution
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
		this._brightPP = new PostProcessing( this.renderer, brightParam,0.1 );
		this._blurPP = new PostProcessing( this.renderer, blurParam,0.1) ;
		this._bloomPP = new PostProcessing( this.renderer, bloomParam );
		this.sceneRenderTarget = this._bloomPP.createRenderTarget();
	}

	public render( scene: THREE.Scene, camera: THREE.Camera ) {

		//apply uniforms
		this._brightUni.threshold.value = this.threshold;
		this._bloomUni.brightness.value = this.brightness;
		
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
		
		this.resolution.value.x = ( width ? width : window.innerWidth ) / 20.0;
		this.resolution.value.y = ( height ? height : window.innerHeight ) / 20.0;

	}
}