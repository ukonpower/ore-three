import * as THREE from 'three';
import { Pointer } from '../utils/Pointer';
import { BaseLayer, LayerBindParam } from './BaseLayer';
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
    getLayer(layerName: string): BaseLayer | null;
    addLayer(layer: BaseLayer, layerInfo: LayerBindParam): void;
    removeLayer(layerNmae: string): void;
    protected onWindowResize(): void;
    protected onOrientationDevice(): void;
    protected pointerEvent(e: THREE.Event): void;
    protected onWheel(e: THREE.Event): void;
}
