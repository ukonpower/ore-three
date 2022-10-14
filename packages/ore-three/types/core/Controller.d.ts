import * as THREE from 'three';
import { Pointer } from '../utils/Pointer';
import { BaseLayer } from './BaseLayer';
export declare interface PointerEventArgs {
    pointerEvent: PointerEvent;
    pointerEventType: string;
    position: THREE.Vector2;
    delta: THREE.Vector2;
}
export declare interface ControllerParam {
    silent?: boolean;
    pointerEventElement?: HTMLElement;
}
export declare class Controller extends THREE.EventDispatcher {
    pointer: Pointer;
    clock: THREE.Clock;
    protected layers: BaseLayer[];
    protected pointerEventElement?: HTMLElement;
    constructor(parameter?: ControllerParam);
    protected tick(): void;
    protected onWindowResize(): void;
    protected onOrientationDevice(): void;
    protected pointerEvent(e: THREE.Event): void;
    protected onWheel(e: THREE.Event): void;
    protected onWheelOptimized(e: THREE.Event): void;
    addLayer(layer: BaseLayer): void;
    getLayer(layerName: string): BaseLayer | null;
    removeLayer(layerNmae: string): void;
    setPointerEventElement(elm: HTMLElement): void;
    dispose(): void;
}
//# sourceMappingURL=Controller.d.ts.map