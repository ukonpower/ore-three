import * as THREE from 'three';
import * as ORE from '../scene/BaseScene';
export declare class Controller {
    private canvas;
    private currentScene;
    renderer: THREE.WebGLRenderer;
    constructor(canvas: any, retina: boolean);
    private animate;
    setScene(scene: ORE.BaseScene): void;
    private onWindowResize;
    private onOrientationDevice;
}
