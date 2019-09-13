import * as THREE from 'three';

export interface AudioPlayerParam{
	src?: string;
	listener?: THREE.AudioListener;
	bufferSize?: number;
} 

export class AudioPlayer {

	private loadingManager: THREE.LoadingManager;

	public audio: THREE.Audio;
	public listener: THREE.AudioListener;
	public analyser: THREE.AudioAnalyser;
	private bufferSize: number;
	private onLoad: Function;
	private isLoaded: boolean = false;

	public spectrumData: THREE.DataTexture;
	public volume: number;
	
	private uniforms: any[];

	get isPlaying(){
		
		if( this.audio ){

			return this.audio.isPlaying;

		}else{

			return false;

		}

	}

	constructor( parameter: AudioPlayerParam, loadingManager?: THREE.LoadingManager ) {

		this.loadingManager = loadingManager;
		
		this.listener = parameter.listener ? parameter.listener : new THREE.AudioListener();

		this.audio = new THREE.Audio( this.listener );

		this.bufferSize = parameter.bufferSize ? parameter.bufferSize : 128;

		if( parameter.src ){

			this.load( parameter.src );
			
		}
		
	}

	public load( src ){

		if( this.audio.buffer ){

			this.audio.stop();

		}

		let loader = new THREE.AudioLoader( this.loadingManager );

		this.isLoaded = false;

		loader.load( src,

			( buffer: THREE.AudioBuffer ) => {

				this.audio.setBuffer( buffer );
				this.audio.setLoop( true );
				this.audio.setVolume( 0.5 );

				this.analyser = new THREE.AudioAnalyser( this.audio, this.bufferSize );
				this.spectrumData = new THREE.DataTexture( this.analyser.data,this.bufferSize / 2,1,THREE.LuminanceFormat );
				
				this.spectrumData.needsUpdate = true;
				this.isLoaded = true;

				if ( this.onLoad) {

					this.onLoad();

					this.onLoad = null;

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

	public stop(){

		this.audio.stop();

	}
	
	public update(){

		if(this.analyser){

			this.analyser.getFrequencyData();
			this.volume = this.analyser.getAverageFrequency();

			if( this.spectrumData ){
			
				this.spectrumData.needsUpdate = true;
			
			}

		}

	}

}