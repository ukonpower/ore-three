import * as THREE from 'three';
export declare class MouseVertexRotator {
    target: THREE.Object3D;
    scrollVel: THREE.Vector2;
    rotate: THREE.Quaternion;
    rotMat: THREE.Matrix4;
    private uniform;
    constructor(target: THREE.Object3D, uniform: any);
    update(): void;
    addVelocity(scrollDelta: THREE.Vector2): void;
}
