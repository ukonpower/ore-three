import * as THREE from 'three';
import * as ORE from '../scene/BaseScene';
export declare interface OreControllerParam {
    canvas: HTMLCanvasElement;
    retina?: boolean;
    alpha?: boolean;
}
export declare class Controller {
    private canvas;
    private currentScene;
    renderer: THREE.WebGLRenderer;
    constructor(parameter: OreControllerParam);
    private animate;
    setScene(scene: ORE.BaseScene): void;
    private onWindowResize;
    private onOrientationDevice;
}
