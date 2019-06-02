import * as THREE from 'three';

export declare interface AudioPlayerParam{
	src?: string;
	listener?: THREE.AudioListener;
	bufferSize?: number;
} 

export class AudioPlayer {

	public audio: THREE.Audio;
	public listener: THREE.AudioListener;
	private analyser: THREE.AudioAnalyser;
	private bufferSize: number;
	private onLoad: Function;
	private isLoaded: boolean = false;
	private soundData: THREE.DataTexture;

	get isPlaying(){
		
		if(this.audio){

			return this.audio.isPlaying;

		}else{

			return false;

		}

	}

	constructor(parameter:AudioPlayerParam) {

		this.listener = parameter.listener ? parameter.listener : new THREE.AudioListener();

		this.audio = new THREE.Audio(this.listener);

		this.bufferSize = parameter.bufferSize ? parameter.bufferSize : 128;

		if(parameter.src){

			this.load(parameter.src);
			
		}
		
	}

	public load(src){

		let loader = new THREE.AudioLoader();

		loader.load(src,

			(buffer: THREE.AudioBuffer) => {

				this.audio.setBuffer(buffer);
				this.audio.setLoop(true);
				this.audio.setVolume(0.5);

				this.analyser = new THREE.AudioAnalyser(this.audio, this.bufferSize);
				this.soundData = new THREE.DataTexture(this.analyser.data,this.bufferSize / 2,1,THREE.LuminanceFormat);

				this.isLoaded = true;

				if (this.onLoad) {

					this.onLoad();

				}

			},

			(xhr) => {

				console.log((xhr.loaded / xhr.total * 100) + '% loaded');

			},

			(err) => {

				console.log('An error happened: ' + err);

			}
		);

	}

	public play() {

		if (this.isLoaded) {

			this.audio.play();

		} else {

			this.onLoad = () => {

				this.audio.play();

			}
		}

	}

	public pause() {

		if (this.audio.isPlaying) {

			this.audio.pause();

		}

	}

	public registerUniforms(uniforms: any[]) {

		uniforms.forEach((uni) => {

			uni.soundData = {

				value: this.soundData

			}

		})

	}

}