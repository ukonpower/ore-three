import * as THREE from 'three';
export declare class MouseRotator {
    target: THREE.Object3D;
    scrollVel: THREE.Vector2;
    constructor(objs: THREE.Object3D);
    update(): void;
    addVelocity(scrollDelta: THREE.Vector2): void;
}
