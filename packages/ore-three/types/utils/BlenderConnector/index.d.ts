import * as THREE from 'three';
import EventEmitter from "wolfy87-eventemitter";
import { AnimationAction } from "../Animation/AnimationAction";
import { FCurveInterpolation } from "../Animation/FCurveKeyFrame";
export declare type BCMessage = BCSyncSceneMessage | BCSyncFrameMessage;
export declare type BCAnimationCurveAxis = 'x' | 'y' | 'z' | 'w' | 'scalar';
export declare type BCSyncSceneMessage = {
    type: "sync/scene";
    data: BCSceneData;
};
export declare type BCSceneData = {
    actions: BCAnimationActionParam[];
    objects: BCSceneObjectData[];
};
export declare type BCAnimationActionParam = {
    name: string;
    fcurve_groups: {
        [key: string]: BCAnimationCurveParam[];
    };
};
export declare type BCAnimationCurveParam = {
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
    data: BCTimelineData;
};
export declare type BCTimelineData = {
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
    constructor(url?: string);
    connect(url: string): void;
    syncJsonScene(jsonPath: string): void;
    private onSyncScene;
    private onSyncTimeline;
    private onOpen;
    private onMessage;
    private onClose;
    getActionNameList(objectName: string): string[];
    getAction(actionName: string): AnimationAction | null;
    getActionList(objectName: string): AnimationAction[];
    getActionContainsAccessor(accessor: string): AnimationAction | null;
    setTimeline(current: number, start?: number, end?: number): void;
    dispose(): void;
    disposeWS(): void;
}
//# sourceMappingURL=index.d.ts.map