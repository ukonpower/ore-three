import * as THREE from 'three';
export declare class Cursor {
    onTouchStart: Function;
    onTouchMove: Function;
    onTouchEnd: Function;
    onHover: Function;
    onWheel: Function;
    attenuation: number;
    private _touchDown;
    private _position;
    private _delta;
    private _hoverPosition;
    private _hoverDelta;
    get position(): THREE.Vector2;
    get delta(): THREE.Vector2;
    get hoverPosition(): THREE.Vector2;
    get hoverDelta(): THREE.Vector2;
    constructor();
    getRelativePosition(elm: HTMLElement, normalize?: boolean): THREE.Vector2;
    private setPos;
    private _MouseEvent;
    private wheel;
    update(): void;
}
