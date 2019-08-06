import * as THREE from 'three';
declare interface CustomRect {
    width: number;
    height: number;
    top: number;
    bottom: number;
}
export declare interface PageScrollerSectionParam {
    name: string;
    element: HTMLElement;
    bottom?: Boolean;
    threePosition?: THREE.Vector3;
    stop?: boolean;
    onStartDownScroll?: Function;
    onStartUpScroll?: Function;
    onArrivalDownScroll?: Function;
    onArrivalUpScroll?: Function;
}
export declare interface PageScrollerSection {
    name: string;
    element: HTMLElement;
    rect: CustomRect;
    bottom?: Boolean;
    threePosition?: THREE.Vector3;
    stop: boolean;
    onStartDownScroll?: Function;
    onStartUpScroll?: Function;
    onArrivalDownScroll?: Function;
    onArrivalUpScroll?: Function;
}
export interface ScrollPercentages {
    [key: string]: number;
}
export declare class PageScroller {
    private element;
    private rect;
    private _scrollVel;
    private _pageOffset;
    velocityAttenuation: number;
    private x;
    private isAutoMoving;
    private duration;
    private baseOffset;
    private scrollDistance;
    private onAutoMoved;
    sections: PageScrollerSection[];
    scrollPercentages: ScrollPercentages;
    private currentSection;
    private easing;
    private easingVariables;
    private scrollLock;
    threePosition: THREE.Vector3;
    readonly pageOffset: number;
    readonly scrollVel: number;
    constructor(element: HTMLElement);
    resize(): void;
    registerSections(param: PageScrollerSectionParam): void;
    private sortSections;
    moveto(target: HTMLElement, duration?: number, callback?: Function): void;
    setScrollVelocity(velocity: number): void;
    update(deltaTime?: number): void;
    private calcScrollPercentage;
    private calcThreePosition;
    getSection(name: string): PageScrollerSection;
    private getCurrentSection;
    setEasing(easing: Function, ...variables: number[]): void;
    unLockScroll(): void;
}
export {};
