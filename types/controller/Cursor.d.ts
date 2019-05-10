export declare class Cursor {
    onTouchStart: Function;
    onTouchMove: Function;
    onTouchEnd: Function;
    private _x;
    private _y;
    private _touchDown;
    private _deltaX;
    private _deltaY;
    scrollVel: number;
    constructor();
    x: any;
    y: any;
    readonly deltaX: number;
    readonly deltaY: number;
    private _TouchStart;
    private _TouchMove;
    private _TouchEnd;
    private onScroll;
    update(): void;
}
