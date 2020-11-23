import * as THREE from 'three';

import { PostProcessing, PPParam } from '../../utils/PostProcessing';
import { Uniforms, UniformsLib } from '../../utils/Uniforms';

import bright from './shaders/bloom_bright.fs';
import blur from './shaders/bloom_blur.fs';
import composite from './shaders/bloom_composite.fs';
export class BloomFilter {

	//PostProcessings
	protected bright: PostProcessing;
	protected blur: PostProcessing[] = [];
	protected composite: PostProcessing;
	protected smaa: PostProcessing;

	protected renderer: THREE.WebGLRenderer;
	protected sceneRenderTarget: THREE.WebGLRenderTarget;

	//uniforms
	public inputTextures: Uniforms;
	protected commonUniforms: Uniforms;

	//parameters
	public renderCount: number = 5;
	protected noPPRenderRes: THREE.Vector2;
	protected bloomResolution: THREE.Vector2;
	protected bloomResolutionRatio: number;

	constructor( renderer: THREE.WebGLRenderer, bloomResolutionRatio: number = 0.5, renderCount: number = 3 ) {

		this.renderer = renderer;
		this.bloomResolutionRatio = bloomResolutionRatio;
		let resolution = this.renderer.getSize( new THREE.Vector2() ).multiplyScalar( this.renderer.getPixelRatio() );

		//uniforms
		this.commonUniforms = {
			threshold: {
				value: 0.5,
			},
			brightness: {
				value: 0.7
			},
			blurRange: {
				value: 1.0
			},
			renderCount: {
				value: this.renderCount
			},
			count: {
				value: 0
			},
			SMAA_RT_METRICS: {
				value: new THREE.Vector4( 1 / resolution.x, 1 / resolution.y, resolution.x, resolution.y )
			}
		};

		this.inputTextures = {
			sceneTex: {
				value: null
			},
			blurTex: {
				value: []
			},
			areaTex: {
				value: null
			},
			searchTex: {
				value: null
			}
		};

		this.init();
		this.resize( resolution );

		this.renderCount = renderCount;
		this.brightness = 0.3;
		this.blurRange = 2.0;
		this.threshold = 0.1;

	}

	public set blurRange( value: number ) {

		this.commonUniforms.blurRange.value = value;

	}

	public set threshold( value: number ) {

		this.commonUniforms.threshold.value = value;

	}

	public set brightness( value: number ) {

		this.commonUniforms.brightness.value = value;

	}

	protected init() {

		/*------------------------
			bright
		------------------------*/

		let brightParam: PPParam[] = [ {
			fragmentShader: bright,
			uniforms: UniformsLib.CopyUniforms( {
			}, this.commonUniforms ),
		} ];

		this.bright = new PostProcessing( this.renderer, brightParam, null, {
			depthBuffer: false,
			stencilBuffer: false,
			generateMipmaps: false
		} );

		/*------------------------
			blur
		------------------------*/

		let blurParam: PPParam[] = [ {
			fragmentShader: blur,
			uniforms: UniformsLib.CopyUniforms( {
				direction: { value: true },
			}, this.commonUniforms )
		},
		{
			fragmentShader: blur,
			uniforms: UniformsLib.CopyUniforms( {
				direction: { value: false },
			}, this.commonUniforms )
		} ];

		for ( let i = 0; i < this.renderCount; i ++ ) {

			this.blur.push( new PostProcessing( this.renderer, blurParam, null, {
				depthBuffer: false,
				stencilBuffer: false,
				generateMipmaps: false
			} ) );
			this.inputTextures.blurTex.value[ i ] = null;

		}

		/*------------------------
			composite
		------------------------*/

		let compositeParam:PPParam[] = [ {
			fragmentShader: composite,
			uniforms: UniformsLib.CopyUniforms( {
				sceneTex: this.inputTextures.sceneTex,
				blurTex: this.inputTextures.blurTex,
			}, this.commonUniforms ),
			defines: {
				RENDER_COUNT: this.renderCount.toString()
			}
		} ];

		this.composite = new PostProcessing( this.renderer, compositeParam, null, {
			depthBuffer: false,
			stencilBuffer: false,
			generateMipmaps: false
		} );

		this.sceneRenderTarget = this.composite.createRenderTarget();

	}

	public render( scene: THREE.Scene, camera: THREE.Camera ) {

		//render main scene
		this.renderer.setRenderTarget( this.sceneRenderTarget );
		this.renderer.render( scene, camera );
		this.inputTextures.sceneTex.value = this.sceneRenderTarget.texture;

		//render birightness part
		this.bright.render( this.inputTextures.sceneTex.value, true );

		//render blur
		let tex = this.bright.getResultTexture();
		for ( let i = 0; i < this.renderCount; i ++ ) {

			this.commonUniforms.count.value = i;

			this.blur[ i ].render( tex, true );
			tex = this.blur[ i ].getResultTexture();
			this.inputTextures.blurTex.value[ i ] = tex;

		}

		//composition bloom
		this.composite.render( this.inputTextures.sceneTex.value );

	}

	public resize( mainSceneRenderRes: THREE.Vector2 ) {

		this.sceneRenderTarget.setSize( mainSceneRenderRes.x, mainSceneRenderRes.y );

		this.bloomResolution = mainSceneRenderRes.clone().multiplyScalar( this.bloomResolutionRatio );
		this.bright.resize( this.bloomResolution );

		for ( let i = 0; i < this.blur.length; i ++ ) {

			this.blur[ i ].resize( this.bloomResolution.clone().divideScalar( i + 1 ) );

		}

		this.composite.resize( mainSceneRenderRes );

	}

}
