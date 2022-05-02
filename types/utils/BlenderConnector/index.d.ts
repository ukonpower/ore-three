import * as THREE from 'three';
import EventEmitter from "wolfy87-eventemitter";
import { AnimationAction } from "../Animation/AnimationAction";
import { FCurveGroup } from '../Animation/FCurveGroup';
import { FCurveInterpolation } from "../Animation/FCurveKeyFrame";
export declare type BCMessage = BCSyncSceneMessage | BCSyncFrameMessage;
export declare type BCAnimationCurveAxis = 'x' | 'y' | 'z' | 'w' | 'scalar';
export declare type BCSyncSceneMessage = {
    type: "sync/scene";
    data: BCSceneData;
};
export declare type BCSceneData = {
    fcurves: BCAnimationCurveParam[];
    actions: BCAnimationActionParam[];
    objects: BCSceneObjectData[];
};
export declare type BCAnimationActionParam = {
    name: string;
    fcurves: string[];
};
export declare type BCAnimationCurveParam = {
    name: string;
    keyframes: BCAnimationCurveKeyFrameParam[];
    axis: BCAnimationCurveAxis;
};
export declare type BCAnimationCurveKeyFrameParam = {
    c: THREE.Vec2;
    h_l: THREE.Vec2;
    h_r: THREE.Vec2;
    e: string;
    i: FCurveInterpolation;
};
export declare type BCSceneObjectData = {
    name: string;
    actions: string[];
};
export declare type BCSyncFrameMessage = {
    type: "sync/timeline";
    data: BCFrameData;
};
export declare type BCFrameData = {
    start: number;
    end: number;
    current: number;
};
export declare class BlenderConnector extends EventEmitter {
    private url?;
    private ws?;
    connected: boolean;
    frameCurrent: number;
    frameStart: number;
    frameEnd: number;
    objects: BCSceneObjectData[];
    actions: AnimationAction[];
    fcurveGroupList: {
        [name: string]: FCurveGroup;
    };
    private uniforms;
    constructor(url?: string);
    connect(url: string): void;
    syncJsonScene(jsonPath: string): void;
    private onSyncScene;
    private onSyncFrame;
    private onOpen;
    private onMessage;
    private onClose;
    getActionNameList(objectName: string): string[];
    getAction(actionName: string): AnimationAction | null;
    getActionList(objectName: string): AnimationAction[];
    getValue<T>(propertyName: string): T | null;
    getValueAsScalar(propertyName: string): number;
    getValueAsVector2(propertyName: string): THREE.Vector2;
    getValueAsVector3(propertyName: string): THREE.Vector3;
    getValueAsVector4(propertyName: string): THREE.Vector4 | undefined;
    getValueAsEuler(propertyName: string): THREE.Euler;
    getUniform<T>(propertyName: string, initialValue: T): THREE.IUniform<any>;
    setFrame(current: number, start?: number, end?: number): void;
    dispose(): void;
    disposeWS(): void;
}
