import * as ORE from '../../../src/';
import * as THREE from 'three';

import vert from './glsl/audioVisualize.vs';

export default class AudioPlayerScene extends ORE.BaseScene {
	
	constructor(renderer) {

		super(renderer);
		this.name = "AudioPlayerScene";
		this.init();

	}

	init() {

		this.camera.position.set(0, 1.5, 3);
		this.camera.lookAt(0, 0, 0);

		this.audioPlayer = new ORE.AudioPlayer({

			src: '../sounds/sound.mp3',
			
		});

		this.uni = {};

		let geo = new THREE.PlaneGeometry(1,1,128,128);

		let mat = new THREE.ShaderMaterial({

			vertexShader: vert,
			fragmentShader: THREE.ShaderLib.normal.fragmentShader,
			uniforms: this.uni

		});

		this.plane = new THREE.Mesh(geo,mat);

		this.scene.add(this.plane);

		this.audioPlayer.registerUniforms([this.uni]);

	}

	animate() {

		this.renderer.render(this.scene, this.camera);

	}

	onResize(width, height) {

		super.onResize(width, height);

	}

	onTouchStart(e) {

		if(this.audioPlayer.isPlaying){

			this.audioPlayer.pause();

		}else{

			this.audioPlayer.play();

		}

	}

	onTouchMove(e) {

	}

	onTouchEnd(e) {

	}

	onWheel(e){

	}
}