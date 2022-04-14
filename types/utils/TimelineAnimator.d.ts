import { EasingFunc } from './Easings';
import { LerpFunc } from './Lerps';
export declare interface TimelineAnimatorKeyFrame<T> {
    time: number;
    value: T;
    easing?: EasingFunc;
}
export declare interface TimelineAnimatorVariable<T> {
    keyframes: TimelineAnimatorKeyFrame<T>[];
    lerpFunc?: LerpFunc<T>;
    value: T;
    easing?: EasingFunc;
}
export declare interface TimelineAnimatorAddParams<T> {
    name: string;
    keyframes: TimelineAnimatorKeyFrame<T>[];
    customLerp?: LerpFunc<T>;
    easing?: EasingFunc;
}
export declare class TimelineAnimator {
    protected variables: {
        [name: string]: TimelineAnimatorVariable<any>;
    };
    protected time: number;
    defaultEasing?: EasingFunc;
    constructor();
    add<T>(params: TimelineAnimatorAddParams<T>): string | undefined;
    get<T>(name: string): T | null;
    getVariableObject<T>(name: string): TimelineAnimatorVariable<T> | null;
    update(time: number): void;
    protected calc(): void;
}
