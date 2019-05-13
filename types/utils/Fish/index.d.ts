import * as ORE from '../..';
import * as THREE from 'three';
export declare class Fish extends ORE.BaseObject {
    private renderer;
    private computeRenderer;
    private num;
    private length;
    private comTexs;
    private uni;
    private fragment;
    constructor(renderer: THREE.WebGLRenderer, num: number, length: number, customComputeShader?: string);
    initComputeRenderer(): boolean;
    initPosition(tex: any): void;
    createTrails(): void;
    update(time: any): void;
    setAvoidObje(pos: any, scale: any): void;
    setCamY(pos: any): void;
}
