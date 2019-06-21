import * as THREE from 'three';
import { Cursor } from '../core/Cursor';
export declare class BaseScene {
    name: string;
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    clock: THREE.Clock;
    time: number;
    deltaTime: number;
    cursor: Cursor;
    width: number;
    heigth: number;
    constructor(renderer: any);
    tick(): void;
    animate(): void;
    onResize(width: number, height: number): void;
    onTouchStart(e: MouseEvent): void;
    onTouchMove(e: MouseEvent): void;
    onTouchEnd(e: MouseEvent): void;
    onWheel(e: WheelEvent): void;
}
