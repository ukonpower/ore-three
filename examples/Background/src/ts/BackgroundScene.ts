import * as THREE from 'three';
import * as ORE from '@ore-three-ts';

import backgroundFrag from './shaders/background.fs';

export class BackgroundScene extends ORE.BaseLayer {

	private box: THREE.Mesh;
	private background: ORE.Background;
	private uniforms: ORE.Uniforms;

	constructor() {

		super();

	}

	public onBind( gProps: ORE.LayerInfo ) {

		super.onBind( gProps );

		this.camera.position.set( 0, 1.5, 4 );
		this.camera.lookAt( 0, 0, 0 );

		this.box = new THREE.Mesh( new THREE.BoxGeometry(), new THREE.MeshNormalMaterial() );
		this.scene.add( this.box );

		this.uniforms = {
			time: {
				value: 0
			},
		};

		this.background = new ORE.Background( {
			fragmentShader: backgroundFrag,
			uniforms: this.uniforms
		} );

		this.scene.add( this.background );

	}

	public animate( deltaTime: number ) {

		this.box.rotateY( 1.0 * deltaTime );

		this.uniforms.time.value = this.time;

		this.renderer.render( this.scene, this.camera );

	}

	public onResize() {

		super.onResize();

		this.background.resize( this.info.size );

	}

}
