import * as THREE from 'three';
import { Cursor } from '../controller/Cursor';
export declare class BaseScene {
    name: string;
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    clock: THREE.Clock;
    camera: THREE.PerspectiveCamera;
    time: number;
    cursor: Cursor;
    constructor(renderer: any);
    tick(): void;
    animate(): void;
    onResize(width: number, height: number): void;
    onTouchStart(e: MouseEvent): void;
    onTouchMove(e: MouseEvent): void;
    onTouchEnd(e: MouseEvent): void;
}
