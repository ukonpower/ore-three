import * as THREE from 'three';
import { Cursor } from '../utils/Cursor';
import { GlobalProperties, ResizeArgs } from '../core/Controller';
export declare class BaseScene {
    gProps: GlobalProperties;
    name: string;
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    time: number;
    constructor();
    tick(deltaTime: number): void;
    animate(deltaTime: number): void;
    onBind(gProps: GlobalProperties): void;
    onUnbind(): void;
    protected removeChildrens(object: THREE.Object3D): void;
    onResize(args: ResizeArgs): void;
    onTouchStart(cursor: Cursor, event: MouseEvent): void;
    onTouchMove(cursor: Cursor, event: MouseEvent): void;
    onTouchEnd(cursor: Cursor, event: MouseEvent): void;
    onHover(cursor: Cursor): void;
    onWheel(event: WheelEvent, trackpadDelta: number): void;
}
