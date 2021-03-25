import * as THREE from 'three';
import { Pointer } from '../utils/Pointer';
import { BaseLayer, LayerInfo } from './BaseLayer';
export declare interface PointerEventArgs {
    pointerEvent: PointerEvent;
    pointerEventType: string;
    position: THREE.Vector2;
    delta: THREE.Vector2;
}
export declare interface ControllerParam {
    silent?: boolean;
}
export declare class Controller extends THREE.EventDispatcher {
    pointer: Pointer;
    clock: THREE.Clock;
    protected layers: BaseLayer[];
    constructor(parameter?: ControllerParam);
    protected tick(): void;
    getLayer(layerName: string): BaseLayer;
    addLayer(layer: BaseLayer, layerInfo: LayerInfo): void;
    removeLayer(layerNmae: string): void;
    protected onWindowResize(): void;
    protected onOrientationDevice(): void;
    protected pointerEvent(e: PointerEventArgs): void;
    protected onWheel(e: {
        wheelEvent: WheelEvent;
        trackpadDelta: number;
    }): void;
}
