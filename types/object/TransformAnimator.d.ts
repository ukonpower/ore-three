import * as THREE from 'three';
export declare class TransformAnimator {
    private objPos;
    private objRot;
    private basePos;
    private goalPos;
    private distancePos;
    private baseRot;
    private goalRot;
    private distanceRot;
    private x;
    private duration;
    private isMoving;
    private onFinish;
    force: boolean;
    constructor(obj: THREE.Object3D);
    private setBaseTransform;
    move(position?: THREE.Vector3, rotation?: THREE.Euler, duration?: number, callback?: Function): boolean;
    update(deltaTime?: number): void;
    private sigmoid;
}
