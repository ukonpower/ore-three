import * as THREE from 'three';

export interface AudioPlayerParam{
	src?: string;
	listener?: THREE.AudioListener;
	bufferSize?: number;
} 

export class AudioPlayer {

	public audio: THREE.Audio;
	public listener: THREE.AudioListener;
	public analyser: THREE.AudioAnalyser;
	private bufferSize: number;
	private onLoad: Function;
	private isLoaded: boolean = false;
	public soundData: THREE.DataTexture;
	public volume: number;
	private uniforms: any[];

	get isPlaying(){
		
		if( this.audio ){

			return this.audio.isPlaying;

		}else{

			return false;

		}

	}

	constructor( parameter: AudioPlayerParam ) {

		this.listener = parameter.listener ? parameter.listener : new THREE.AudioListener();

		this.audio = new THREE.Audio( this.listener );

		this.bufferSize = parameter.bufferSize ? parameter.bufferSize : 128;

		this.uniforms = [];

		if( parameter.src ){

			this.load( parameter.src );
			
		}
		
	}

	public load( src ){

		if( this.audio.buffer ){

			this.audio.stop();

		}

		let loader = new THREE.AudioLoader();

		this.isLoaded = false;

		this.onLoad = null;

		loader.load( src,

			( buffer: THREE.AudioBuffer ) => {

				this.audio.setBuffer( buffer );
				this.audio.setLoop( true );
				this.audio.setVolume( 0.5 );

				this.analyser = new THREE.AudioAnalyser( this.audio, this.bufferSize );
				this.soundData = new THREE.DataTexture( this.analyser.data,this.bufferSize / 2,1,THREE.LuminanceFormat );
				this.soundData.needsUpdate = true;
				this.isLoaded = true;

				this.setUniformData( this.uniforms );

				if ( this.onLoad) {

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

	public registerUniforms(uniform) {

		this.uniforms.push(uniform);

		this.setUniformData([uniform]);

	}

	private setUniformData(uniforms:any[]){

		uniforms.forEach((uni)=>{

			uni.audioSpectrum = {

				value: this.soundData

			},

			uni.audioVolume = {

				value: this.volume

			}

		})

	}

	public update(){

		if(this.analyser){

			this.analyser.getFrequencyData();
			this.volume = this.analyser.getAverageFrequency();

			this.uniforms.forEach((uni)=>{

				uni.audioSpectrum.value.needsUpdate = true;
				uni.audioVolume.value = this.volume;

			})
		
		}

	}

}