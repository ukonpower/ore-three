import * as THREE from 'three';
export declare interface Transform {
    position?: THREE.Vector3;
    rotation?: THREE.Quaternion;
    scale?: number;
}
export declare class SPLayoutController {
    protected obj: THREE.Object3D;
    protected baseTransform: Transform;
    protected baseScale: THREE.Vector3;
    protected spTransform: Transform;
    constructor(object: THREE.Object3D, spTransform: Transform, isAbsolutePosition?: boolean);
    updateTransform(spWeight: number): void;
}