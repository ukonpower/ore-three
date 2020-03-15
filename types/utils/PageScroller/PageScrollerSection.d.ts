import * as THREE from 'three';
import { PageScroller } from '.';
import { EasingSet } from '../Easings';
export declare interface PageScrollerSectionParam {
    name: string;
    bottom?: Boolean;
    element: Element | string;
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
    onStartScroll?: (args: ScrollEventArgs) => boolean;
    onArrivals?: onArrivalEvent[];
}
declare interface ScrollEventArgs {
    scroller: PageScroller;
    section: PageScrollerSection;
    scrollVelocity: number;
    scrollMode: string;
}
export declare interface ScrollerSectionEasings {
    position?: EasingSet;
    rotation?: EasingSet;
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
    scrollPosition: number;
    private _selector;
    private _name;
    private _element;
    private _events;
    private _rect;
    get name(): string;
    get element(): HTMLElement;
    get events(): PageScrollerEvents;
    get rect(): PageScrollerSectionRect;
    get selector(): string;
    constructor(param: PageScrollerSectionParam);
    resize(pageOffset: number): void;
    addArrivalEvent(...customEvents: onArrivalEvent[]): void;
}
export {};
