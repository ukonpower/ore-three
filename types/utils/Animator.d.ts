import { EasingSet } from "./Easings";
import { LerpFunc } from "./Lerps";
import { Uniforms } from "../shaders/shader";
declare interface AnimatorVariable<T> {
    time: number;
    duration?: number;
    value: T;
    startValue: T;
    goalValue: T;
    onAnimationFinished?: Function;
    lerpFunc: LerpFunc<T>;
    easing: EasingSet;
}
export declare interface AnimatorValiableParams<T> {
    name: string;
    initValue: T;
    easing?: EasingSet;
    customLerpFunc?: LerpFunc<T>;
}
export declare class Animator {
    private variables;
    private _isAnimating;
    private animatingCount;
    private dispatchEvents;
    constructor();
    get isAnimating(): boolean;
    add<T>(params: AnimatorValiableParams<T>): void;
    setEasing(name: string, easing: EasingSet): void;
    animate<T>(name: string, goalValue: T, duration?: number, callback?: Function): void;
    setValue<T>(name: string, value: T): any;
    get<T>(name: string): T;
    getVariableObject<T>(name: string): AnimatorVariable<T>;
    applyToUniforms(uniforms: Uniforms): void;
    update(deltaTime?: number): void;
}
export {};
