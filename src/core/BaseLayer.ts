import * as THREE from 'three';
import { Pointer } from '../utils/Pointer';
import { Controller } from './Controller';

export declare interface AspectInfo {
	mainAspect: number;
	portraitAspect: number;
	wideAspect: number;
}

export declare interface LayerSize {
	aspectRatio: number;
	windowSize: THREE.Vector2;
	canvasSize: THREE.Vector2;
	canvasPixelSize: THREE.Vector2;
	portraitWeight: number;
	wideWeight: number;
}

export declare interface LayerInfo extends THREE.WebGLRendererParameters {
	name: string;
	canvas: HTMLCanvasElement;
	size?: LayerSize;
	aspect?: AspectInfo;
}

export class BaseLayer extends THREE.EventDispatcher {

	public info: LayerInfo;

	public renderer: THREE.WebGLRenderer;
	public scene: THREE.Scene;
	public camera: THREE.PerspectiveCamera;

	public time: number = 0;

	constructor() {

		super();

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( 50, innerWidth / innerHeight, 0.1, 1000 );

	}

	public tick( deltaTime: number ) {

		this.time += deltaTime;

		this.animate( deltaTime );

	}

	public animate( deltaTime: number ) {}

	public onBind( layerInfo: LayerInfo ) {

		this.info = layerInfo;

		this.renderer = new THREE.WebGLRenderer( this.info );
    	this.renderer.debug.checkShaderErrors = true;
    	this.renderer.setSize( window.innerWidth, window.innerHeight );

	}

	public onUnbind() {

		this.removeChildrens( this.scene );

	}

	protected removeChildrens( object: THREE.Object3D ) {

		const length = object.children.length;

		for ( let i = length - 1; i >= 0; i -- ) {

			this.removeChildrens( object.children[ i ] );

			let geo: THREE.Geometry | THREE.BufferGeometry;
			let mat: THREE.Material;

			if ( ( object.children[ i ] as THREE.Mesh ).isMesh ) {

				geo = ( object.children[ i ] as THREE.Mesh ).geometry;
				mat = ( ( object.children[ i ] as THREE.Mesh ).material as THREE.Material );

			}

			object.remove( ( object.children[ i ] ) );

			if ( geo ) {

				geo.dispose();

			}

			if ( mat ) {

				mat.dispose();

			}

		}

	}

	public onResize( args: LayerSize ) {

		this.renderer.setSize( args.windowSize.x, args.windowSize.y );

		this.camera.aspect = args.aspectRatio;
		this.camera.updateProjectionMatrix();

	}

	public touchEvent( e: any ) {

		// console.log( e );

	}

	public onTouchStart( cursor: Pointer, event: MouseEvent ) { }

	public onTouchMove( cursor: Pointer, event: MouseEvent ) { }

	public onTouchEnd( cursor: Pointer, event: MouseEvent ) { }

	public onHover( cursor: Pointer ) { }

	public onWheel( event: WheelEvent, trackpadDelta: number ) { }

}
