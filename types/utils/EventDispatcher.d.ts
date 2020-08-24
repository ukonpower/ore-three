export declare class EventDispatcher {
    private events;
    constructor();
    addEventListener(type: string, listener: Function): void;
    dispatchEvent(event: Event): void;
    removeEventListener(type: string, listener: Function): void;
}
