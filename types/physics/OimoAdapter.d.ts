import * as THREE from 'three';
import * as OIMO from 'oimo';
export declare interface OimoWorldParam {
    timestep: number;
    iterations: number;
    broadphase: number;
    worldscale: number;
    random: true;
    info: false;
    gravity: THREE.Vector3;
}
export declare interface OimoObjectParam {
    type: string;
    size: number[];
    pos: number[];
    rot: number[];
    move: true;
    density: number;
    friction: number;
    restitution: number;
    belongsTo: number;
    collidesWith: number;
}
declare interface OimoPhysicsObject {
    threeObj: THREE.Object3D;
    body: OIMO.Body;
}
export declare class OimoAdapter {
    world: OIMO.World;
    scene: THREE.Scene;
    oimoGroup: THREE.Group;
    objs: OimoPhysicsObject[];
    constructor(scene: THREE.Scene, worldParam?: OimoWorldParam);
    add(obj: THREE.Object3D, param?: OimoObjectParam): any;
    private createParam;
    update(deltaTime: number): void;
}
export {};
