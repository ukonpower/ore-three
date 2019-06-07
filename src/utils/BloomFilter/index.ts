import * as THREE from 'three';
import pp1 from './glsl/pp1.fs'
import pp2 from './glsl/pp2.fs'
import { PostProcessing } from '../PostProcessing';

export class BloomFilter {

	public gaussVar: any;
	public sceneTex: any;
	public scene: THREE.Scene;
	public camera: THREE.Camera
	private pp1: PostProcessing;
	private pp2: PostProcessing;

	private renderer: THREE.WebGLRenderer;
	
	private sceneRenderTarget: THREE.WebGLRenderTarget;

	constructor( renderer ) {
	
		this.renderer = renderer;
	
		this.init();
	
	}

	private init() {
	
		var boxGeo = new THREE.SphereGeometry( 0.8, 30, 20 );
	
		var boXMat = new THREE.MeshStandardMaterial( {
			color: new THREE.Color( 0xffffff ),
			roughness: 0.2
		} )

		boXMat.flatShading = true;
		
		this.gaussVar = {
			value: 500
		}
		
		this.sceneTex = {
			value: null
		}

		let pp1Param = [{
			fragmentShader: pp1,
			uniforms: {
				threshold: {
					value: 0.8
				}
			}
		}]

		let pp2Param = [{
			fragmentShader: pp2,
			uniforms: {
				v: {
					value: false,
				},
				gaussVar: this.gaussVar,
			}
		},
		{
			fragmentShader: pp2,
			uniforms: {
				v: {
					value: true,
				},
				gaussVar: this.gaussVar,
				sceneTex: this.sceneTex
			}
		} ]

		this.pp1 = new PostProcessing( this.renderer, pp1Param );
		this.pp2 = new PostProcessing( this.renderer, pp2Param );

		this.sceneRenderTarget = this.pp1.createRenderTarget();

	}

	public render( scene:THREE.Scene,camera:THREE.Camera ) {

		this.renderer.setRenderTarget( this.sceneRenderTarget );
		this.renderer.render( scene, camera );


		this.pp1.render( this.sceneRenderTarget.texture, true );

		let pp1result = this.pp1.getResultTexture();

		this.sceneTex.value = this.sceneRenderTarget.texture;

		this.pp2.render( pp1result, false );

	}

}