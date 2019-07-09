import * as ORE from '../../../src/';
import * as THREE from 'three';

import vert from './glsl/micdata.vs';

export default class MicDataScene extends ORE.BaseScene {

	constructor() {

		super();

		this.name = "MicDataScene";
		
	}

	onBind( gProps ) {

		super.onBind( gProps );

		this.renderer = this.gProps.renderer;

		this.soundNum = 0;

		this.micData = new ORE.MicData( window.navigator, 256 );

		this.camera.position.set( 0, 1.5, 3 );
		this.camera.lookAt( 0, 0, 0 );

		this.uni = {
			buff: { value: new Uint8Array(256) },
			volume: { value: 0 },
		};

		let geo = new THREE.PlaneGeometry( 1, 1, 256, 1 );
		let mat = new THREE.ShaderMaterial( {

			vertexShader: vert,
			fragmentShader: THREE.ShaderLib.normal.fragmentShader,
			uniforms: this.uni,
			flatShading: true,
			side: THREE.DoubleSide

		} );

		this.plane = new THREE.Mesh( geo, mat );
		this.plane.rotation.x = ( - Math.PI / 2 );

		this.scene.add( this.plane );

	}

	animate( deltaTime ) {

		this.uni.buff = this.micData.bufferArray;
		this.uni.volume = this.micData.volume;

		this.renderer.render( this.scene, this.camera );

	}

	onResize( width, height ) {

		super.onResize( width, height );

	}

}
