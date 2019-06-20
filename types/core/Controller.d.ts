import * as THREE from 'three';
import * as ORE from '../scene/BaseScene';
export interface OreControllerParam extends THREE.WebGLRendererParameters {
    retina?: boolean;
}
export declare class Controller {
    private currentScene;
    renderer: THREE.WebGLRenderer;
    /**
    * parameter extends THREE.WebGLRendererParameters.
    * and it has retina option.
    */
    constructor(parameter: OreControllerParam);
    private animate;
    setScene(scene: ORE.BaseScene): any;
    setScene(scene: typeof ORE.BaseScene): any;
    private onWindowResize;
    private onOrientationDevice;
}
