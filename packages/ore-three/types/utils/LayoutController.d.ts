import * as THREE from 'three';
export declare interface Transform {
    position?: THREE.Vector3;
    rotation?: THREE.Quaternion;
    scale?: number;
}
export declare interface BaseTransform {
    position: THREE.Vector3;
    rotation: THREE.Quaternion;
    scale: THREE.Vector3;
}
export declare class LayoutController {
    protected obj: THREE.Object3D;
    protected baseTransform: BaseTransform;
    protected transform: Transform;
    constructor(object: THREE.Object3D, transform: Transform, isAbsolutePosition?: boolean);
    updateTransform(weight: number): void;
}
//# sourceMappingURL=LayoutController.d.ts.map