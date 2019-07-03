import * as THREE from 'three';
export declare class Cursor {
    onTouchStart: Function;
    onTouchMove: Function;
    onTouchEnd: Function;
    onHover: Function;
    onWheel: Function;
    attenuation: number;
    private _touchDown;
    _position: THREE.Vector2;
    _delta: THREE.Vector2;
    _hoverPosition: THREE.Vector2;
    _hoverDelta: THREE.Vector2;
    hoverMode: boolean;
    readonly position: THREE.Vector2;
    readonly delta: THREE.Vector2;
    readonly hoverPosition: THREE.Vector2;
    readonly hoverDelta: THREE.Vector2;
    constructor();
    getRelativePosition(elm: HTMLElement, normalize?: boolean): THREE.Vector2;
    private setPos;
    private _TouchStart;
    private _TouchMove;
    private _TouchEnd;
    private wheel;
    update(): void;
}
