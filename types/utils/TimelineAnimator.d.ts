import { EasingSet } from './Easings';
import { LerpFunc } from './Lerps';
export declare interface TimelineAnimatorKeyFrame<T> {
    time: number;
    value: T;
    easing?: EasingSet;
}
export declare interface TimelineAnimatorVariable<T> {
    keyframes: TimelineAnimatorKeyFrame<T>[];
    lerpFunc: LerpFunc<T>;
    value: T;
    easing?: EasingSet;
}
export declare interface TimelineAnimatorAddParams<T> {
    name: string;
    keyframes: TimelineAnimatorKeyFrame<T>[];
    customLerp?: LerpFunc<T>;
    easing?: EasingSet;
}
export declare class TimelineAnimator {
    protected variables: {
        [name: string]: TimelineAnimatorVariable<any>;
    };
    protected time: number;
    defaultEasing: EasingSet;
    constructor();
    add<T>(params: TimelineAnimatorAddParams<T>): string;
    get<T>(name: string): T;
    getVariableObject<T>(name: string): TimelineAnimatorVariable<T>;
    update(time: number): void;
    protected calc(): void;
}
