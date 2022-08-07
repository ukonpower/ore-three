import * as THREE from 'three';
import * as ORE from '@ore-three';

import pp1Frag from './shaders/pp1.fs';
import pp2Frag from './shaders/pp2.fs';

export class PostProcessingScene extends ORE.BaseLayer {

	private renderTargets: { [ key: string ]: THREE.WebGLRenderTarget };
	private pass1?: ORE.PostProcessing;
	private pass2?: ORE.PostProcessing;

	private box?: THREE.Mesh;

	constructor() {

		super();

		this.renderTargets = {
			rt1: new THREE.WebGLRenderTarget( 0, 0, {
				stencilBuffer: false,
				generateMipmaps: false,
				depthBuffer: true,
				minFilter: THREE.LinearFilter,
				magFilter: THREE.LinearFilter,
			} ),
			rt2: new THREE.WebGLRenderTarget( 0, 0, {
				stencilBuffer: false,
				generateMipmaps: false,
				depthBuffer: false,
				minFilter: THREE.LinearFilter,
				magFilter: THREE.LinearFilter
			} ),
		};

	}

	public onBind( info: ORE.LayerInfo ) {

		super.onBind( info );

		this.commonUniforms = ORE.UniformsLib.mergeUniforms( this.commonUniforms, {
		} );

		this.initScene();

		this.initPostProcessing();

	}

	private initPostProcessing() {

		if ( this.renderer == null ) return;



		this.pass1 = new ORE.PostProcessing( this.renderer, {
			fragmentShader: pp1Frag,
			uniforms: ORE.UniformsLib.mergeUniforms( this.commonUniforms, {
			} )
		} );

		this.pass2 = new ORE.PostProcessing( this.renderer, {
			fragmentShader: pp2Frag,
			uniforms: ORE.UniformsLib.mergeUniforms( this.commonUniforms, {
			} )
		} );

	}

	private initScene() {

		this.camera.position.set( 0, 1.5, 4 );
		this.camera.lookAt( 0, 0, 0 );

		this.box = new THREE.Mesh( new THREE.BoxGeometry(), new THREE.MeshNormalMaterial() );
		this.scene.add( this.box );

	}

	public animate( deltaTime: number ) {

		if ( this.renderer == null ) return;

		if ( this.box ) {

			this.box.rotateY( deltaTime );

		}

		this.renderer.setRenderTarget( this.renderTargets.rt1 );
		this.renderer.render( this.scene, this.camera );

		if ( this.pass1 && this.pass2 ) {

			this.pass1.render( {
				sceneTex: this.renderTargets.rt1.texture
			}, this.renderTargets.rt2 );

			this.pass2.render( {
				backbuffer: this.renderTargets.rt2.texture
			}, null );

		}

	}

	public onResize() {

		super.onResize();

		this.resizeRenderTargets();

	}

	private resizeRenderTargets() {

		const keys = Object.keys( this.renderTargets );

		for ( let i = 0; i < keys.length; i ++ ) {

			this.renderTargets[ keys[ i ] ].setSize( this.info.size.canvasPixelSize.x, this.info.size.canvasPixelSize.y );

		}

	}

}
