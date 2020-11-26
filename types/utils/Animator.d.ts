import { EasingSet } from "./Easings";
import { LerpFunc, Lerps } from "./Lerps";
import { Uniforms } from "./Uniforms";
export declare interface AnimatorVariable<T> {
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
        goalValue: any;
        easing: EasingSet;
        lerpFunc: typeof Lerps.number | typeof Lerps.numberArray | typeof Lerps.THREEVectors | typeof Lerps.THREEQuaternion | typeof Lerps.THREEEuler | LerpFunc<T>;
    };
    setEasing(name: string, easing: EasingSet): void;
    animate<T>(name: string, goalValue: T, duration?: number, callback?: Function, easing?: EasingSet): Promise<unknown>;
    cancelAnimate(name: string): void;
    setValue<T>(name: string, value: T): any;
    get<T>(name: string): T;
    getVariableObject<T>(name: string, mute?: boolean): AnimatorVariable<T>;
    applyToUniforms(uniforms: Uniforms): void;
    update(deltaTime?: number): void;
}
