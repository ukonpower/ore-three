import * as THREE from 'three';
export declare interface AudioPlayerParam {
    src?: string;
    listener?: THREE.AudioListener;
    bufferSize?: number;
}
export declare class AudioPlayer {
    audio: THREE.Audio;
    listener: THREE.AudioListener;
    private analyser;
    private bufferSize;
    private onLoad;
    private isLoaded;
    private soundData;
    constructor(parameter: AudioPlayerParam);
    load(src: any): void;
    play(): void;
    pause(): void;
    registerUniforms(uniforms: any[]): void;
}
