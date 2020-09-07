import * as THREE from 'three';
export declare interface Transform {
    position?: THREE.Vector3;
    rotation?: THREE.Quaternion;
    scale?: number;
}
export declare class LayoutController {
    protected obj: THREE.Object3D;
    protected baseTransform: Transform;
    protected baseScale: THREE.Vector3;
    protected transform: Transform;
    constructor(object: THREE.Object3D, transform: Transform, isAbsolutePosition?: boolean);
    updateTransform(weight: number): void;
}
