import * as THREE from 'three';
import * as CANNON from 'cannon';
export declare interface CannonWorldParam {
    gravity: THREE.Vector3;
    iterations: number;
}
declare interface CannonPhysicsObjects {
    threeObj: THREE.Object3D;
    body: CANNON.Body;
}
export declare class CannonAdapter {
    world: CANNON.World;
    scene: THREE.Scene;
    cannonGroup: THREE.Group;
    objs: CannonPhysicsObjects[];
    constructor(scene: THREE.Scene, worldParam?: CannonWorldParam);
    add(obj: THREE.Object3D, param?: CANNON.IBodyOptions): CANNON.Body;
    private createShape;
    update(deltaTime: number): void;
}
export {};
