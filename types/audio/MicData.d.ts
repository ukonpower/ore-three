export declare class MicData {
    private navigator;
    private context;
    private analyzer;
    private bufferSize;
    private bufferArray;
    private spectrumData;
    volume: number;
    constructor(navigator: Navigator, bufferSize: number);
    private onGetUserMesia;
    private onProcess;
    private calcVolume;
}
