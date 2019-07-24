import * as THREE from 'three';
export declare class MicData {
    private navigator;
    private context;
    private analyzer;
    private processor;
    private bufferSize;
    private bufferArray;
    spectrumData: THREE.DataTexture;
    volume: number;
    constructor(navigator: Navigator, bufferSize: number);
    private onGetUserMedia;
    private onProcess;
    private calcVolume;
}
