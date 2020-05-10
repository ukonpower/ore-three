import * as THREE from "three";
export declare class Cursor {
    onTouchStart: Function;
    onTouchMove: Function;
    onTouchEnd: Function;
    onHover: Function;
    onWheel: Function;
    attenuation: number;
    protected isSP: boolean;
    protected _touchDown: boolean;
    protected _position: THREE.Vector2;
    protected _delta: THREE.Vector2;
    get position(): THREE.Vector2;
    get delta(): THREE.Vector2;
    constructor();
    getNormalizePosition(windowSize: THREE.Vector2): THREE.Vector2;
    getRelativePosition(elm: HTMLElement, normalize?: boolean): THREE.Vector2;
    protected setPos(x: number, y: number): void;
    protected _MouseEvent(type: string, event: MouseEvent | TouchEvent): void;
    protected wheel(e: MouseWheelEvent): void;
    update(): void;
}
