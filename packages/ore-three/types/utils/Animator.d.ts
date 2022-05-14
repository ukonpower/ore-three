import * as THREE from 'three';
import { EasingFunc } from "./Easings";
import { LerpFunc, Lerps } from "./Lerps";
import { Uniforms } from "./Uniforms";
export declare interface AnimatorVariable<T> {
    time: number;
    duration?: number;
    value: T;
    startValue: T;
    goalValue: T;
    onAnimationFinished?: Function | null;
    lerpFunc?: LerpFunc<T>;
    easing: EasingFunc;
}
export declare interface AnimatorValiableParams<T> {
    name: string;
    initValue: T;
    easing?: EasingFunc;
    customLerpFunc?: LerpFunc<T>;
}
export declare class Animator extends THREE.EventDispatcher {
    protected variables: {
        [key: string]: AnimatorVariable<any>;
    };
    protected _isAnimating: boolean;
    protected animatingCount: number;
    protected dispatchEvents: Function[];
    constructor();
    get isAnimating(): boolean;
    add<T>(params: AnimatorValiableParams<T>): {
        time: number;
        value: T;
        startValue: T;
        goalValue: null;
        easing: EasingFunc;
        lerpFunc: typeof Lerps.number | typeof Lerps.numberArray | typeof Lerps.THREEVectors | typeof Lerps.THREEQuaternion | typeof Lerps.THREEEuler | LerpFunc<T> | undefined;
    };
    setEasing(name: string, easing: EasingFunc): void;
    animate<T>(name: string, goalValue: T, duration?: number, callback?: Function, easing?: EasingFunc): Promise<unknown>;
    cancelAnimate(name: string): void;
    setValue<T>(name: string, value: T): null | undefined;
    get<T>(name: string): T | null;
    getVariableObject<T>(name: string, mute?: boolean): AnimatorVariable<T> | null;
    isAnimatingVariable(name: string, mute?: boolean): boolean | null;
    applyToUniforms(uniforms: Uniforms): void;
    update(deltaTime?: number): void;
    wait(t: number): Promise<void>;
}
