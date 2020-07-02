import { PageScroller } from '.';
export declare interface PageScrollerEventArgs {
    scroller: PageScroller;
    section: PageScrollerSection;
    scrollMode: string;
    scrollDelta: number;
    scrollPower: number;
}
declare interface PageScrollerEvent {
    common?: (args: PageScrollerEventArgs) => void | boolean;
    up?: (args: PageScrollerEventArgs) => void | boolean;
    down?: (args: PageScrollerEventArgs) => void | boolean;
}
declare interface PageScrollerEvents {
    onStartScroll?: PageScrollerEvent;
    onArrivals?: {
        percentage: number;
        event: PageScrollerEvent;
    }[];
}
export declare interface PageScrollerSectionParams {
    name: string;
    element: HTMLElement;
    events?: PageScrollerEvents;
    stop?: boolean;
    startScrollUp?: number;
    startScrollDown?: number;
    bottom?: boolean;
}
declare interface PageScrollerSectionRect {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare class PageScrollerSection {
    name: string;
    element: HTMLElement;
    rect: PageScrollerSectionRect;
    stop: boolean;
    startScrollUp: number;
    startScrollDown: number;
    events: PageScrollerEvents;
    bottom: boolean;
    timelinePercentage: number;
    constructor(params: PageScrollerSectionParams);
    get isPageScrollerSection(): boolean;
    updateRect(scrollPos: number): void;
    getScrollPercentage(offsetPos?: number): number;
}
export {};
