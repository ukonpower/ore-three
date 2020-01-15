import * as THREE from 'three';
export interface AudioPlayerParam {
    src?: string;
    listener?: THREE.AudioListener;
    bufferSize?: number;
}
export declare class AudioPlayer {
    private loadingManager;
    audio: THREE.Audio;
    listener: THREE.AudioListener;
    analyser: THREE.AudioAnalyser;
    private bufferSize;
    private onLoad;
    private isLoaded;
    spectrumData: THREE.DataTexture;
    volume: number;
    private uniforms;
    get isPlaying(): boolean;
    constructor(parameter: AudioPlayerParam, loadingManager?: THREE.LoadingManager);
    load(src: any): void;
    play(): void;
    pause(): void;
    stop(): void;
    update(): void;
}
