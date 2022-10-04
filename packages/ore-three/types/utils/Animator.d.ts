import * as THREE from 'three';
import { EasingFunc } from "./Easings";
import { LerpFunc } from "./Lerps";
import { Uniforms } from "./Uniforms";
export declare type AnimatorVariableType = number | number[] | THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | THREE.Quaternion | THREE.Euler;
export declare interface AnimatorVariable<T> {
    time: number;
    duration?: number;
    value: T;
    startValue: T;
    goalValue: T;
    onAnimationFinished?: Function | null;
    lerpFunc?: LerpFunc<T>;
    easing: EasingFunc;
    userData?: any;
}
export declare interface AnimatorVariableParams<T> {
    name: string;
    initValue: T;
    easing?: EasingFunc;
    customLerpFunc?: LerpFunc<T>;
    userData?: any;
}
export declare class Animator extends THREE.EventDispatcher {
    dataBase: {
        [key: string]: AnimatorVariableType;
    };
    isAnimating: boolean;
    protected variables: {
        [key: string]: AnimatorVariable<AnimatorVariableType>;
    };
    protected animatingCount: number;
    protected dispatchEvents: Function[];
    constructor();
    add<T extends AnimatorVariableType>(params: AnimatorVariableParams<T>): AnimatorVariable<T>;
    setEasing(name: string, easing: EasingFunc): void;
    setValue<T extends AnimatorVariableType>(name: string, value: T): null | undefined;
    animate<T extends AnimatorVariableType>(name: string, goalValue: T, duration?: number, callback?: Function, easing?: EasingFunc): Promise<unknown>;
    cancelAnimate(name: string): void;
    get<T extends AnimatorVariableType>(name: string): T | null;
    getVariableObject<T extends AnimatorVariableType>(name: string, mute?: boolean): AnimatorVariable<T> | null;
    applyToUniforms(uniforms: Uniforms): void;
    isAnimatingVariable(name: string, mute?: boolean): boolean | null;
    private getValueClone;
    wait(t: number): Promise<void>;
    update(deltaTime?: number): void;
    updateDataBase(target?: string): void;
}
//# sourceMappingURL=Animator.d.ts.map