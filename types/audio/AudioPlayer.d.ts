import * as THREE from 'three';
export interface AudioPlayerParam {
    src?: string;
    listener?: THREE.AudioListener;
    bufferSize?: number;
}
export declare class AudioPlayer {
    audio: THREE.Audio;
    listener: THREE.AudioListener;
    analyser: THREE.AudioAnalyser;
    private bufferSize;
    private onLoad;
    private isLoaded;
    soundData: THREE.DataTexture;
    volume: number;
    private uniforms;
    readonly isPlaying: boolean;
    constructor(parameter: AudioPlayerParam);
    load(src: any): void;
    play(): void;
    pause(): void;
    registerUniforms(uniform: any): void;
    private setUniformData;
    update(): void;
}
