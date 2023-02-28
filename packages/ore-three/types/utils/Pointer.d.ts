import * as THREE from "three";
export declare class Pointer extends THREE.EventDispatcher {
    protected isSP: boolean;
    protected isTouching: boolean;
    element: HTMLElement | null;
    position: THREE.Vector2;
    delta: THREE.Vector2;
    protected lethargy: any;
    protected memDelta: number;
    protected riseDelta: boolean;
    protected trackpadMemDelta: number;
    protected trackpadMax: boolean;
    constructor();
    registerElement(elm: HTMLElement): void;
    unregisterElement(elm: HTMLElement): void;
    getScreenPosition(windowSize: THREE.Vector2): THREE.Vector2;
    getRelativePosition(elm: HTMLElement, screen?: boolean): THREE.Vector2;
    protected setPos(x: number, y: number): void;
    protected onTouch(type: string, e: TouchEvent): void;
    protected onPointer(type: string, e: PointerEvent | DragEvent): void;
    protected touchEventHandler(posX: number, posY: number, type: string, e: TouchEvent | PointerEvent | DragEvent): void;
    update(): void;
    protected wheelOptimized(event: WheelEvent): void;
    wheel(event: WheelEvent): void;
}
//# sourceMappingURL=Pointer.d.ts.map