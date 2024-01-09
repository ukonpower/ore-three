import * as THREE from 'three';
import * as ORE from '@ore-three';

import pp1Frag from './shaders/pp1.fs';
import pp2Frag from './shaders/pp2.fs';

export class PostProcessingScene extends ORE.BaseLayer {

	private renderTargets: { [ key: string ]: THREE.WebGLRenderTarget };

	private postProcess: ORE.PostProcess;

	private box: THREE.Mesh;

	constructor( param: ORE.LayerParam ) {

		super( param );

		this.renderTargets = {
			rt1: new THREE.WebGLRenderTarget( 1, 1, {
				stencilBuffer: false,
				generateMipmaps: false,
				depthBuffer: true,
				minFilter: THREE.LinearFilter,
				magFilter: THREE.LinearFilter,
			} ),
		};

		this.commonUniforms = ORE.UniformsLib.mergeUniforms( this.commonUniforms, {
		} );

		/*-------------------------------
			Scene
		-------------------------------*/

		this.camera.position.set( 0, 1.5, 4 );
		this.camera.lookAt( 0, 0, 0 );

		this.box = new THREE.Mesh( new THREE.BoxGeometry(), new THREE.MeshNormalMaterial() );
		this.scene.add( this.box );

		/*-------------------------------
			PostProcessing
		-------------------------------*/

		const pass1 = new ORE.PostProcessPass( {
			fragmentShader: pp1Frag,
			uniforms: ORE.UniformsLib.mergeUniforms( this.commonUniforms, {
			} )
		} );

		const pass2 = new ORE.PostProcessPass( {
			fragmentShader: pp2Frag,
			uniforms: ORE.UniformsLib.mergeUniforms( this.commonUniforms, {
			} ),
		} );

		const outPass = new ORE.PostProcessPass( { renderTarget: null } );

		this.postProcess = new ORE.PostProcess( {
			renderer: this.renderer,
			passes: [
				pass1,
				pass2,
				outPass
			],
		} );

	}

	public animate( deltaTime: number ) {

		this.box.rotateY( deltaTime );

		this.renderer.setRenderTarget( this.renderTargets.rt1 );
		this.renderer.render( this.scene, this.camera );

		this.postProcess.render( this.renderTargets.rt1.texture );


	}

	public onResize() {

		super.onResize();

		this.renderTargets.rt1.setSize( this.info.size.canvasPixelSize.x, this.info.size.canvasPixelSize.y );

		this.postProcess.resize( this.info.size.canvasPixelSize );

	}


}
