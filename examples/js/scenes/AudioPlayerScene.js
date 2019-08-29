import * as ORE from '../../../src/';
import * as THREE from 'three';

import vert from './glsl/audioVisualize.vs';

export default class AudioPlayerScene extends ORE.BaseScene {

	constructor() {

		super();

		this.name = "AudioPlayerScene";
		
	}

	onBind( gProps ) {

		super.onBind( gProps );

		this.renderer = this.gProps.renderer;

		this.soundNum = 0;

		this.camera.position.set( 0, 1.5, 3 );
		this.camera.lookAt( 0, 0.5, 0 );

		this.light = new THREE.DirectionalLight();
		this.scene.add( this.light );

		this.audioPlayer = new ORE.AudioPlayer( {

			src: '../sounds/376737_Skullbeatz___Bad_Cat_Maste.mp3',
			bufferSize: 256

		} );

		let cUni  = {
			audioVolume: { value: 0 },
			audioSpectrum: { value: null },
		};

		this.uni = THREE.UniformsUtils.merge( [ cUni, THREE.ShaderLib.basic.uniforms ] );

		let geo = new THREE.PlaneGeometry( 1, 0.05, 128, 128 );

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

		this.audioPlayer.update();
		
		if( this.audioPlayer.isLoaded ){

			this.uni.audioVolume.value = this.audioPlayer.volume;
			
			this.uni.audioSpectrum.value = this.audioPlayer.spectrumData;
			
		}

		this.renderer.render( this.scene, this.camera );

	}

	onResize( args ) {

		super.onResize( args );

	}

	onTouchStart( cursor, e ) {

		if ( e.button == 0 ) {

			if ( this.audioPlayer.isPlaying ) {

				this.audioPlayer.pause();

			} else {

				this.audioPlayer.play();

			}

		} else {

			if ( this.soundNum == 0 ) {

				this.audioPlayer.load( '../sounds/358232_j_s_song.mp3' );
				this.audioPlayer.play();
				this.soundNum = 1;

			} else {

				this.audioPlayer.load( '../sounds/376737_Skullbeatz___Bad_Cat_Maste.mp3' );
				this.audioPlayer.play();
				this.soundNum = 0;

			}

		}

		e.preventDefault();

	}

}
