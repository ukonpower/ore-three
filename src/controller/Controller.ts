import * as THREE from 'three';
import { Cursor } from './Cursor';
import * as ORE from '../scene/BaseScene';

export class Controller {
    private canvas;
    private currentScene: ORE.BaseScene;
    public renderer: THREE.WebGLRenderer;
    
    constructor(canvas, retina: boolean, ) {
        console.log("%c- Welcome to Ore-Three v0.0.3 -",'padding: 5px 10px ;background-color: black; color: white;font-size:11px');
        console.log("%c↓↓ THANKS TO THIS POWERFULL ENGINE!!",'padding: 2px 2px ;background-color: black; color: white; font-size:5px');

        this.currentScene;
        this.canvas = canvas;

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(retina ? window.devicePixelRatio : 1);
        
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

    public setScene(scene : ORE.BaseScene) {
        this.currentScene = scene;
        // console.log('%cORE:"SetScene" ' + scene.name, 'padding: 2px 5px ;background-color: black; color: white;');
    }

    private onWindowResize() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        this.renderer.setSize(width, height);

        if (this.currentScene) {
            this.currentScene.onResize(width, height);
        }
    }

    private onOrientationDevice() {
        this.onWindowResize();
    }
}