export declare class PageScroller {
    private element;
    private rect;
    private _pageOffset;
    private baseOffset;
    private scrollVel;
    private x;
    private isAutoMoving;
    private duration;
    private scrollDistance;
    private onAutoMoved;
    readonly pageOffset: number;
    constructor(element: HTMLElement);
    resize(): void;
    moveto(target: HTMLElement, duration?: number, callback?: Function): void;
    setScrollVelocity(velocity: number): void;
    update(deltaTime?: number): void;
    private sigmoid;
}
