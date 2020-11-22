import * as THREE from 'three';
import * as ORE from '@ore-three-ts';

import pp1Frag from './shaders/pp1.fs';
import pp2Frag from './shaders/pp2.fs';

export class PostProcessingScene extends ORE.BaseLayer {

	private postProcessing: ORE.PostProcessing;
	private ppUniforms: ORE.Uniforms;

	private box: THREE.Mesh;

	constructor() {

		super();

	}

	public onBind( gProps: ORE.LayerInfo ) {

		super.onBind( gProps );

		this.camera.position.set( 0, 1.5, 4 );
		this.camera.lookAt( 0, 0, 0 );

		this.box = new THREE.Mesh( new THREE.BoxGeometry(), new THREE.MeshNormalMaterial() );
		this.scene.add( this.box );

		this.ppUniforms = {
			time: {
				value: 0
			}
		};

		this.postProcessing = new ORE.PostProcessing( this.renderer, [
			{
				fragmentShader: pp1Frag,
				uniforms: this.ppUniforms
			},
			{
				fragmentShader: pp2Frag,
				uniforms: this.ppUniforms
			}
		] );

	}

	public animate( deltaTime: number ) {

		this.ppUniforms.time.value = this.time;

		this.box.rotateY( 1.0 * deltaTime );

		this.postProcessing.render( this.scene, this.camera );

	}

	public onResize( args: ORE.LayerSize ) {

		super.onResize( args );

		this.postProcessing.resize( args.windowPixelSize );

	}

}
