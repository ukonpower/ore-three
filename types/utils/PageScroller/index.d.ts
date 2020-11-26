import { PageScrollerSection } from './PageScrollerSection';
import { EasingSet } from '../Easings';
import { Animator } from '../Animator';
export declare interface PageScrollerAutoMoveParam {
    target: string | number | PageScrollerSection;
    duration?: number;
    easing?: EasingSet;
    callBack?: Function;
    bottom?: boolean;
}
export declare class PageScroller {
    protected animator: Animator;
    protected isAutoMove: boolean;
    protected parentElement: HTMLElement;
    protected parentElementHeight: number;
    protected sections: PageScrollerSection[];
    delaySpeed: number;
    dragDelaySpeed: number;
    protected isTouching: boolean;
    protected deltaMem: number;
    protected scrollReady: boolean;
    protected sumDelta: number;
    protected _scrollPos: number;
    protected _scrollPosMem: number;
    protected _scrollPercentage: number;
    protected _scrollPosDelay: number;
    protected _scrollPercentageDelay: number;
    protected caughtSection: PageScrollerSection;
    protected dragStop: boolean;
    protected dragUnlockReady: boolean;
    constructor(parentElement: HTMLElement);
    protected initAnimator(): void;
    get scrollPos(): number;
    get scrollPosDelay(): number;
    get scrollPercentage(): number;
    get scrollPercentageDelay(): number;
    get scrollTimelinePercentage(): number;
    add(section: PageScrollerSection): void;
    sortSections(): void;
    get(name: string): PageScrollerSection;
    update(deltaTime: number): void;
    protected updateScrollPos(deltaTime: number): void;
    protected updateAutoMove(deltaTime: any): void;
    protected addScrollPos(): void;
    protected checkUnlockStopScroll(scrollDelta: number): boolean;
    protected checkThrow(scrollDelta: number): number;
    protected checkThrowSectionEvents(section: PageScrollerSection, scrollDelta: number): number;
    protected checkThrowLine(a: number, b: number, line: number): 1 | 2 | 0 | -1;
    protected calcScrollProperties(deltaTime: any): void;
    protected scrollPosToPerecntage(scrollPos: number): number;
    protected updateParentElement(): void;
    protected applyParentElementTransform(): void;
    scroll(delta: number): void;
    catch(): void;
    drag(delta: number): void;
    release(snap?: number): void;
    autoMove(param: PageScrollerAutoMoveParam): void;
}
