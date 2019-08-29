import * as THREE from 'three';
import { PageScrollerSection } from './PageScrollerSection';
export declare interface PageScrollerEasing {
    func: Function;
    variables: number[];
}
export declare interface PageScrollerMoveToParam {
    target: HTMLElement | string;
    duration?: number;
    callback?: Function;
    bottom?: boolean;
    lock?: boolean;
}
export interface ScrollPercentages {
    [key: string]: number;
}
export declare class PageScroller {
    private element;
    private rect;
    private _velocity;
    private _pageOffset;
    private _pageOffsetMem;
    velocityAttenuation: number;
    private x;
    private duration;
    private baseOffset;
    private scrollDistance;
    private onAutoMoveFinished;
    private isAutoMoving;
    private autoMovingLock;
    sections: PageScrollerSection[];
    sectionScrollPercentages: ScrollPercentages;
    currentSectionNum: number;
    private easingPos;
    private easingRot;
    private easingAutoMove;
    threePosition: THREE.Vector3;
    threeRotation: THREE.Quaternion;
    private isStop;
    private stopSection;
    readonly pageOffset: number;
    readonly scrollVel: number;
    readonly scrollPercentage: number;
    constructor(element: HTMLElement);
    private initEasings;
    addVelocity(scrollVelocity: number): void;
    setVelocity(scrollVelocity: number): void;
    private checkUnlockStopScroll;
    setEasingPos(easingFunction: Function, ...variables: number[]): void;
    setEasingRot(easingFunction: Function, ...variables: number[]): void;
    setEasingAutoMove(easingFunction: Function, ...variables: number[]): void;
    moveto(param: PageScrollerMoveToParam): void;
    update(deltaTime?: number): void;
    private updateScroll;
    private manualScroll;
    private autoScroll;
    private applyPageOffset;
    private checkThrowSection;
    private onThrowSection;
    private setPageOffsetToSection;
    getSection(name: string): PageScrollerSection;
    private getCurrentSection;
    private calcScrollPercentage;
    private calcThreePosition;
    private calcThreeRotation;
    private calcThreeEasings;
    registerSection(section: PageScrollerSection): void;
    private sortSections;
    resize(): void;
}
