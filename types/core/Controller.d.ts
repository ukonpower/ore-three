import * as THREE from 'three';
import { Cursor } from '../utils/Cursor';
import { BaseScene } from '../core/BaseScene';
export declare interface ControllerParam extends THREE.WebGLRendererParameters {
    retina?: boolean;
    silent?: boolean;
}
export declare interface ResizeArgs {
    aspectRatio: number;
    pixelRatio: number;
    windowSize: THREE.Vector2;
    windowPixelSize: THREE.Vector2;
    portraitWeight: number;
    wideWeight: number;
}
export declare interface aspectInfo {
    mainAspect: number;
    portraitAspect: number;
    wideAspect: number;
}
export declare interface GlobalProperties {
    renderer: THREE.WebGLRenderer;
    cursor: Cursor;
    resizeArgs: ResizeArgs;
    aspectInfo: aspectInfo;
}
export declare class Controller {
    currentScene: BaseScene;
    renderer: THREE.WebGLRenderer;
    cursor: Cursor;
    clock: THREE.Clock;
    gProps: GlobalProperties;
    constructor(parameter: ControllerParam);
    protected tick(): void;
    bindScene(scene: BaseScene): void;
    unbindScene(): void;
    protected onWindowResize(): void;
    onOrientationDevice(): void;
    onTouchStart(e: MouseEvent): void;
    onTouchMove(e: MouseEvent): void;
    onTouchEnd(e: MouseEvent): void;
    onHover(): void;
    protected trackpadMemDelta: number;
    protected trackpadMax: boolean;
    protected lethargy: any;
    onWheel(e: WheelEvent): void;
}
