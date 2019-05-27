import * as THREE from 'three';
import { Cursor } from './Cursor';
import * as ORE from '../scene/BaseScene';
const VERSION = require("../../package.json").version;

export declare interface OreControllerParam {
    canvas: HTMLCanvasElement;
    retina?: boolean;
    alpha?: boolean;
}

export class Controller {
    private canvas: HTMLCanvasElement;
    private currentScene: ORE.BaseScene;
    public renderer: THREE.WebGLRenderer;

    // constructor(canvas, retina: boolean, ) {
    constructor(parameter: OreControllerParam) {
        console.log("%c- Welcome to Ore-Three " + VERSION + " -", 'padding: 5px 10px ;background-color: black; color: white;font-size:11px');
        console.log("%c↓↓ THANKS TO THIS POWERFULL ENGINE!!", 'padding: 2px 2px ;background-color: black; color: white; font-size:5px');

        this.currentScene;
        this.canvas = parameter.canvas;

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha:  parameter.alpha ? parameter.alpha : false
        });

        this.renderer.debug.checkShaderErrors = true;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(option.retina ? window.devicePixelRatio : 1);

        window.addEventListener('orientationchange', this.onOrientationDevice.bind(this));
        window.addEventListener('resize', this.onWindowResize.bind(this));

        this.animate();
    }

    private animate() {
        if (this.currentScene) {
            this.currentScene.tick();
        }
        requestAnimationFrame(this.animate.bind(this));
    }

    public setScene(scene: ORE.BaseScene) {
        this.currentScene = scene;
        // console.log('%cORE:"SetScene" ' + scene.name, 'padding: 2px 5px ;background-color: black; color: white;');
    }

    private onWindowResize() {
        let width = window.innerWidth;
        let height = window.innerHeight;
        this.renderer.setSize(width, height);

        if (this.currentScene) {
            this.currentScene.onResize(width, height);
        }
    }

    private onOrientationDevice() {
        this.onWindowResize();
    }
}