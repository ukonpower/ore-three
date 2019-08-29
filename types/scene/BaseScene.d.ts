import * as THREE from 'three';
import { Cursor } from '../core/Cursor';
import { GlobalProperties } from '../core/Controller';
export declare interface ResizeArgs {
    aspectRatio: number;
    pixelRatio: number;
    windowSize: THREE.Vector2;
    windowPixelSize: THREE.Vector2;
}
export declare class BaseScene {
    gProps: GlobalProperties;
    name: string;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    time: number;
    constructor();
    tick(deltaTime: number): void;
    animate(deltaTime: number): void;
    onBind(gProps: GlobalProperties): void;
    onUnbind(): void;
    private removeChildrens;
    onResize(args: ResizeArgs): void;
    onTouchStart(cursor: Cursor, event: MouseEvent): void;
    onTouchMove(cursor: Cursor, event: MouseEvent): void;
    onTouchEnd(cursor: Cursor, event: MouseEvent): void;
    onHover(cursor: Cursor): void;
    onWheel(event: WheelEvent): void;
}
