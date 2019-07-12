import * as ORE from '../../../src/';
import * as THREE from 'three';

import vert from './glsl/audioVisualize.vs';

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
		this.camera.lookAt( 0, 0.5, 0 );

		let cUni = {
			audioSpectrum: { value: this.micData.spectrumData },
			audioVolume: { value: 0 },
		};

		this.uni = THREE.UniformsUtils.merge( [ cUni, THREE.ShaderLib.basic.uniforms ] );

		let geo = new THREE.PlaneGeometry( 2, 0.05, 256, 1 );
		let mat = new THREE.ShaderMaterial( {

			vertexShader: vert,
			fragmentShader: THREE.ShaderLib.basic.fragmentShader,
			uniforms: this.uni,
			flatShading: true,
			side: THREE.DoubleSide

		} );

		this.uni.diffuse.value = new THREE.Color( 0xFFFFFF );

		this.plane = new THREE.Mesh( geo, mat );
		this.plane.rotation.x = ( - Math.PI / 2 );

		this.scene.add( this.plane );

	}

	animate( deltaTime ) {

		this.uni.audioSpectrum.value = this.micData.spectrumData;
		this.uni.audioVolume.value = this.micData.volume;
		this.renderer.render( this.scene, this.camera );

	}

	onResize( width, height ) {

		super.onResize( width, height );

	}

}
