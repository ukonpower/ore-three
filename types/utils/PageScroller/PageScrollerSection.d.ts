import * as THREE from 'three';
import { PageScrollerEasing, PageScroller } from '.';
export declare interface PageScrollerSectionParam {
    name: string;
    bottom?: Boolean;
    element: HTMLElement;
    events?: PageScrollerEvents;
    stop?: boolean;
    sectionEasings?: ScrollerSectionEasings;
    threePosition?: THREE.Vector3;
    threeRotation?: THREE.Quaternion;
}
export declare interface onArrivalEvent {
    percentage: number;
    event: (args: ScrollEventArgs) => void;
}
export declare interface PageScrollerEvents {
    onStartScroll?: (args: StartScrollEventArgs) => boolean;
    onArrivals?: onArrivalEvent[];
}
declare interface ScrollEventArgs {
    scroller: PageScroller;
    section: PageScrollerSection;
    scrollVelocity: number;
}
declare interface StartScrollEventArgs extends ScrollEventArgs {
    scrollMode: string;
}
export declare interface ScrollerSectionEasings {
    position?: PageScrollerEasing;
    rotation?: PageScrollerEasing;
}
declare interface PageScrollerSectionRect {
    width: number;
    height: number;
    top: number;
    bottom: number;
}
export declare class PageScrollerSection {
    threePosition?: THREE.Vector3;
    threeRotation?: THREE.Quaternion;
    sectionEasings?: ScrollerSectionEasings;
    stop?: boolean;
    bottom?: Boolean;
    num: number;
    private _name;
    private _element;
    private _events;
    private _rect;
    readonly name: string;
    readonly element: HTMLElement;
    readonly events: PageScrollerEvents;
    readonly rect: PageScrollerSectionRect;
    constructor(param: PageScrollerSectionParam);
    resize(pageOffset: number): void;
    addArrivalEvent(...customEvents: onArrivalEvent[]): void;
}
export {};
