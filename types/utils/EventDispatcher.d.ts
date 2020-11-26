export declare interface Event {
    type: string;
    [key: string]: any;
}
export declare interface EventListener {
    type: string;
    listener: (e: Event) => void;
}
export declare class EventDispatcher {
    private events;
    constructor();
    addEventListener(type: string, listener: (e: Event) => void): void;
    dispatchEvent(event: Event): void;
    removeEventListener(type: string, listener: Function): void;
}
