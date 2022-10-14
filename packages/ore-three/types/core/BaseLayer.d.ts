import * as THREE from 'three';
import { Uniforms } from '../utils/Uniforms';
import { PointerEventArgs } from './Controller';
export declare interface LayerParam extends THREE.WebGLRendererParameters {
    name: string;
    canvas?: HTMLCanvasElement;
    aspectSetting?: AspectSetting;
    wrapperElement?: HTMLElement | null;
    wrapperElementRect?: DOMRect | null;
    pixelRatio?: number;
}
export declare interface LayerInfo extends LayerParam {
    size: LayerSize;
    aspectSetting: AspectSetting;
    canvas: HTMLCanvasElement;
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
    event: PointerEvent | TouchEvent;
    position: THREE.Vector2;
    delta: THREE.Vector2;
    screenPosition: THREE.Vector2;
    windowPosition: THREE.Vector2;
}
export declare class BaseLayer extends THREE.EventDispatcher {
    info: LayerInfo;
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    time: number;
    commonUniforms: Uniforms;
    protected readyAnimate: boolean;
    constructor(param: LayerParam);
    tick(deltaTime: number): void;
    animate(deltaTime: number): void;
    onBind(): void;
    onUnbind(): void;
    protected removeChildrens(object: THREE.Object3D): void;
    setWrapperElement(wrapperElm: HTMLElement | null, dispatchResize?: boolean): void;
    onResize(): void;
    pointerEvent(e: PointerEventArgs): void;
    onTouchStart(args: TouchEventArgs): void;
    onTouchMove(args: TouchEventArgs): void;
    onTouchEnd(args: TouchEventArgs): void;
    onHover(args: TouchEventArgs): void;
    onWheel(event: WheelEvent): void;
    onWheelOptimized(event: WheelEvent): void;
}
//# sourceMappingURL=BaseLayer.d.ts.map