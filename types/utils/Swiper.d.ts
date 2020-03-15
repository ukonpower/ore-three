import { EasingSet } from "./Easings";
export declare interface SwiperParams {
    items: number;
    loop?: boolean;
}
export declare class Swiper {
    itemCount: number;
    private _activeNum;
    private _value;
    attenuation: number;
    private isLoopMode;
    private swipeVelocity;
    private isTouching;
    private value_mem;
    private pos;
    private pos_mem;
    private pos_start;
    private weight;
    private animator;
    private isAutoSlide;
    constructor(param: SwiperParams);
    get value(): number;
    get activeNum(): number;
    addVelocity(vel: number): void;
    setVelocity(vel: number): void;
    catch(pos: number): void;
    move(pos: number, weight?: number): void;
    release(): void;
    select(num: number, callback?: Function, duration?: number, easing?: EasingSet): void;
    next(callback?: Function, duration?: number, easing?: EasingSet): void;
    prev(callback?: Function, duration?: number, easing?: EasingSet): void;
    update(deltaTime?: number): void;
    private getDirection;
}
