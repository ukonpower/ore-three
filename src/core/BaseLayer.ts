import * as THREE from 'three';
import { PointerEventArgs } from './Controller';

export declare interface LayerBindParam extends THREE.WebGLRendererParameters {
	name: string;
	canvas: HTMLCanvasElement;
	aspect?: AspectInfo;
	wrapperElement?: HTMLElement;
	wrapperElementRect?: DOMRect;
}

export declare interface LayerInfo extends LayerBindParam {
	size?: LayerSize;
}

export declare interface LayerSize {
	canvasAspectRatio: number;
	windowSize: THREE.Vector2;
	windowAspectRatio: number;
	canvasSize: THREE.Vector2;
	canvasPixelSize: THREE.Vector2;
	portraitWeight: number;
	wideWeight: number;
}

export declare interface AspectInfo {
	mainAspect: number;
	portraitAspect: number;
	wideAspect: number;
}

export declare interface TouchEventArgs {
	event?: PointerEvent;
	position: THREE.Vector2;
	delta: THREE.Vector2;
	normalizedPosition: THREE.Vector2;
	windowPosition: THREE.Vector2;
}

export class BaseLayer extends THREE.EventDispatcher {

	public info: LayerInfo;

	public renderer: THREE.WebGLRenderer;
	public scene: THREE.Scene;
	public camera: THREE.PerspectiveCamera;

	public time: number = 0;

	constructor() {

		super();

		this.info = {
			name: '',
			canvas: null,
			wrapperElement: null,
			wrapperElementRect: null,
			aspect: {
				mainAspect: 16 / 9,
				wideAspect: 10 / 1,
				portraitAspect: 1 / 2
			},
			size: {
				windowSize: new THREE.Vector2(),
				windowAspectRatio: 1.0,
				canvasSize: new THREE.Vector2(),
				canvasPixelSize: new THREE.Vector2(),
				canvasAspectRatio: 1.0,
				portraitWeight: 0.0,
				wideWeight: 0.0,
			}
		};

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( 50, 1, 0.1, 1000 );

	}

	public tick( deltaTime: number ) {

		this.time += deltaTime;

		this.animate( deltaTime );

	}

	public animate( deltaTime: number ) {}

	public onBind( layerInfo: LayerBindParam ) {

		this.info.name = layerInfo.name;
		this.info.canvas = layerInfo.canvas;
		this.info.wrapperElement = layerInfo.wrapperElement;
		this.info.wrapperElementRect = layerInfo.wrapperElement && layerInfo.wrapperElement.getBoundingClientRect(),
		this.info.aspect = layerInfo.aspect || this.info.aspect;

		this.renderer = new THREE.WebGLRenderer( this.info );
    	this.renderer.debug.checkShaderErrors = true;
		this.renderer.setSize( window.innerWidth, window.innerHeight );

		setTimeout( () => {

			this.onResize();

		}, 0 );

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

	public onResize() {

		let newWindowSize = new THREE.Vector2( window.innerWidth, window.innerHeight );
		let newCanvasSize = new THREE.Vector2();

		if ( this.info.wrapperElement ) {

			newCanvasSize.set( this.info.wrapperElement.clientWidth, this.info.wrapperElement.clientHeight );

		} else {

			newCanvasSize.copy( newWindowSize );

		}

		let portraitWeight = 1.0 - ( ( newCanvasSize.x / newCanvasSize.y ) - this.info.aspect.portraitAspect ) / ( this.info.aspect.mainAspect - this.info.aspect.portraitAspect );
		portraitWeight = Math.min( 1.0, Math.max( 0.0, portraitWeight ) );

		let wideWeight = 1.0 - ( ( newCanvasSize.x / newCanvasSize.y ) - this.info.aspect.wideAspect ) / ( this.info.aspect.mainAspect - this.info.aspect.wideAspect );
		wideWeight = Math.min( 1.0, Math.max( 0.0, wideWeight ) );

		this.info.size.windowSize.copy( newWindowSize );
		this.info.size.windowAspectRatio = newWindowSize.x / newWindowSize.y;
		this.info.size.canvasSize.copy( newCanvasSize );
		this.info.size.canvasPixelSize.copy( newCanvasSize.clone().multiplyScalar( this.renderer.getPixelRatio() ) );
		this.info.size.canvasAspectRatio = newCanvasSize.x / newCanvasSize.y,
		this.info.size.portraitWeight = portraitWeight,
		this.info.size.wideWeight = wideWeight,

		this.renderer.setSize( this.info.size.canvasSize.x, this.info.size.canvasSize.y );
		this.camera.aspect = this.info.size.canvasAspectRatio;
		this.camera.updateProjectionMatrix();

		if ( this.info.wrapperElement ) {

			this.info.wrapperElementRect = this.info.wrapperElement.getBoundingClientRect();

		}

	}

	public pointerEvent( e: PointerEventArgs ) {

		let canvasPosition = e.position.clone();

		if ( this.info.wrapperElementRect ) {

			canvasPosition.x -= this.info.wrapperElementRect.x;
			canvasPosition.y -= this.info.wrapperElementRect.y;

		}

		let normalizedPosition = canvasPosition.clone();
		normalizedPosition.divide( this.info.size.canvasSize )
		normalizedPosition.y = 1.0 - normalizedPosition.y;
		normalizedPosition.multiplyScalar( 2.0 ).subScalar( 1.0 );

		let args: TouchEventArgs = {
			event: e.pointerEvent,
			position: canvasPosition.clone(),
			delta: e.delta.clone(),
			normalizedPosition: normalizedPosition.clone(),
			windowPosition: e.position.clone()
		};

		if ( e.pointerEventType == 'hover' ) {

			this.onHover( args );

		} else if ( e.pointerEventType == 'start' ) {

			this.onTouchStart( args );

		} else if ( e.pointerEventType == 'move' ) {

			this.onTouchMove( args );

		} else if ( e.pointerEventType == 'end' ) {

			this.onTouchEnd( args );

		}

	}

	public onTouchStart( args: TouchEventArgs ) { }

	public onTouchMove( args: TouchEventArgs ) { }

	public onTouchEnd( args: TouchEventArgs ) { }

	public onHover( args: TouchEventArgs ) { }

	public onWheel( event: WheelEvent, trackpadDelta: number ) { }

}
