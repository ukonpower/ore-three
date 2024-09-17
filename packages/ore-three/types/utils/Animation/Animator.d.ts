import * as THREE from 'three';
import { EasingFunc } from "./Easings";
import { LerpFunc } from '../Lerps';
export type AnimatorVariableType = number | number[] | THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | THREE.Quaternion | THREE.Euler;
export declare interface AnimatorVariable<T> {
    isAnimating: boolean;
    isAnimatingReseve: boolean;
    time: number;
    duration: number;
    value: T;
    startValue: T;
    goalValue: T;
    onAnimationFinished?: (() => void) | null;
    onAnimationCanceled?: (() => void) | null;
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
    protected variables: {
        [key: string]: AnimatorVariable<AnimatorVariableType>;
    };
    protected dispatchEvents: Function[];
    protected _isAnimating: boolean;
    constructor();
    add<T extends AnimatorVariableType>(params: AnimatorVariableParams<T>): AnimatorVariable<T>;
    setEasing(name: string, easing: EasingFunc): void;
    setValue<T extends AnimatorVariableType>(name: string, value: T, easing?: EasingFunc): null | undefined;
    animate<T extends AnimatorVariableType>(name: string, goalValue: T, duration?: number): Promise<unknown>;
    cancelAnimate(name: string): void;
    get<T extends AnimatorVariableType>(name: string): T | null;
    getVariableObject<T extends AnimatorVariableType>(name: string, mute?: boolean): AnimatorVariable<T> | null;
    isAnimating(variableName?: string): boolean;
    wait(t: number): Promise<void>;
    update(deltaTime?: number): void;
    updateDataBase(name?: string): void;
}
//# sourceMappingURL=Animator.d.ts.map