import * as THREE from 'three';
import { Uniforms } from '../utils/Uniforms';
import { PointerEventArgs } from './Controller';
export declare interface LayerBindParam extends THREE.WebGLRendererParameters {
    name: string;
    canvas?: HTMLCanvasElement;
    aspectSetting?: AspectSetting;
    wrapperElement?: HTMLElement;
    wrapperElementRect?: DOMRect;
    pixelRatio?: number;
}
export declare interface LayerInfo extends LayerBindParam {
    size: LayerSize;
    aspectSetting: AspectSetting;
}
export declare interface LayerSize {
    canvasAspectRatio: number;
    windowSize: THREE.Vector2;
    windowAspectRatio: number;
    canvasSize: THREE.Vector2;
    canvasPixelSize: THREE.Vector2;
    pixelRatio: number;
    portraitWeight: number;
    wideWeight: number;
}
export declare interface AspectSetting {
    mainAspect: number;
    portraitAspect: number;
    wideAspect: number;
}
export declare interface TouchEventArgs {
    event: PointerEvent;
    position: THREE.Vector2;
    delta: THREE.Vector2;
    normalizedPosition: THREE.Vector2;
    windowPosition: THREE.Vector2;
}
export declare class BaseLayer extends THREE.EventDispatcher {
    info: LayerInfo;
    renderer?: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    protected readyAnimate: boolean;
    time: number;
    commonUniforms: Uniforms;
    constructor();
    tick(deltaTime: number): void;
    animate(deltaTime: number): void;
    onBind(layerInfo: LayerBindParam): void;
    onUnbind(): void;
    protected removeChildrens(object: THREE.Object3D): void;
    onResize(): void;
    pointerEvent(e: PointerEventArgs): void;
    onTouchStart(args: TouchEventArgs): void;
    onTouchMove(args: TouchEventArgs): void;
    onTouchEnd(args: TouchEventArgs): void;
    onHover(args: TouchEventArgs): void;
    onWheel(event: WheelEvent, trackpadDelta: number): void;
}
