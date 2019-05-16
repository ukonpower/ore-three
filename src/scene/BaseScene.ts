import * as THREE from 'three';
import { Cursor } from '../core/Cursor';

export class BaseScene {
    public name: string
    public renderer: THREE.WebGLRenderer;
    public scene: THREE.Scene;
    public clock: THREE.Clock;
    public camera: THREE.PerspectiveCamera;
    public time: number = 0;
    public deltaTime: number = 0;
    public cursor: Cursor;

    constructor(renderer) {
        this.renderer = renderer;
        this.name = name;
        this.scene = new THREE.Scene();
        this.clock = new THREE.Clock();
        this.camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 1000);


        this.cursor = new Cursor();
        this.cursor.onTouchStart = this.onTouchStart.bind(this);
        this.cursor.onTouchMove = this.onTouchMove.bind(this);
        this.cursor.onTouchEnd = this.onTouchEnd.bind(this);
        this.cursor.onWheel = this.onWheel.bind(this);
    }

    public tick() {
        this.deltaTime = this.clock.getDelta();
        this.time += this.deltaTime;
        this.animate();
    }

    public animate() { }

    public onResize(width: number, height: number) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

    public onTouchStart(e: MouseEvent) { }

    public onTouchMove(e: MouseEvent) { }

    public onTouchEnd(e: MouseEvent) { }

    public onWheel(e: WheelEvent) { }
}