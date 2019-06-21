import * as THREE from 'three';
export declare class Cursor {
    onTouchStart: Function;
    onTouchMove: Function;
    onTouchEnd: Function;
    onWheel: Function;
    private _touchDown;
    position: THREE.Vector2;
    delta: THREE.Vector2;
    hoverPosition: THREE.Vector2;
    hoverDelta: THREE.Vector2;
    constructor();
    private setPos;
    private _TouchStart;
    private _TouchMove;
    private _TouchEnd;
    private wheel;
    update(): void;
}
