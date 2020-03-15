import * as THREE from 'three';
import { Cursor } from './Cursor';
import { BaseScene, ResizeArgs } from '../scene/BaseScene';
export declare interface ControllerParam extends THREE.WebGLRendererParameters {
    retina?: boolean;
    silent?: boolean;
}
export declare interface GlobalProperties {
    renderer: THREE.WebGLRenderer;
    cursor: Cursor;
    resizeArgs: ResizeArgs;
}
export declare class Controller {
    currentScene: BaseScene;
    renderer: THREE.WebGLRenderer;
    cursor: Cursor;
    clock: THREE.Clock;
    gProps: GlobalProperties;
    constructor(parameter: ControllerParam);
    private tick;
    bindScene(scene: BaseScene): void;
    unbindScene(): void;
    private onWindowResize;
    private onOrientationDevice;
    onTouchStart(e: MouseEvent): void;
    onTouchMove(e: MouseEvent): void;
    onTouchEnd(e: MouseEvent): void;
    onHover(): void;
    private memDelta;
    private max;
    private lethargy;
    onWheel(e: WheelEvent): void;
}
