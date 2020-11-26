import * as THREE from "three";
export declare class Pointer extends THREE.EventDispatcher {
    protected isSP: boolean;
    protected isTouching: boolean;
    position: THREE.Vector2;
    delta: THREE.Vector2;
    constructor();
    getNormalizePosition(windowSize: THREE.Vector2): THREE.Vector2;
    getRelativePosition(elm: HTMLElement, normalize?: boolean): THREE.Vector2;
    protected setPos(x: number, y: number): void;
    protected touchEvent(type: string, e: PointerEvent): void;
    update(): void;
    protected trackpadMemDelta: number;
    protected trackpadMax: boolean;
    protected lethargy: any;
    protected wheel(e: WheelEvent): void;
}
