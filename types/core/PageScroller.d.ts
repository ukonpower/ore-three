import * as THREE from 'three';
declare interface CustomRect {
    width: number;
    height: number;
    top: number;
    bottom: number;
}
export declare interface PageScrollerSection {
    element: HTMLElement;
    rect: CustomRect;
    bottom?: Boolean;
    position?: THREE.Vector3;
}
export declare class PageScroller {
    private element;
    private rect;
    private scrollVel;
    private _pageOffset;
    velocityAttenuation: number;
    private x;
    private isAutoMoving;
    private duration;
    private baseOffset;
    private scrollDistance;
    private onAutoMoved;
    sections: PageScrollerSection[];
    threePosition: THREE.Vector3;
    readonly pageOffset: number;
    constructor(element: HTMLElement);
    resize(): void;
    registerSections(element: HTMLElement, position: THREE.Vector3, bottom?: boolean): any;
    registerSections(section: PageScrollerSection): any;
    private sortSections;
    moveto(target: HTMLElement, duration?: number, callback?: Function): void;
    setScrollVelocity(velocity: number): void;
    update(deltaTime?: number): void;
    private sigmoid;
}
export {};
