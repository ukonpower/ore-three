import * as THREE from 'three';
import { Pointer } from '../utils/Pointer';
import { BaseLayer, LayerInfo } from './BaseLayer';

export declare interface PointerEventArgs {
	pointerEvent: PointerEvent;
	pointerEventType: string;
	position: THREE.Vector2;
	delta: THREE.Vector2;
}

export declare interface ControllerParam {
	silent?: boolean;
}

export class Controller extends THREE.EventDispatcher {

	private layers: BaseLayer[] = [];
    public pointer: Pointer;
    public clock: THREE.Clock;

    constructor( parameter?: ControllerParam ) {

    	super();

    	if ( ! ( parameter && parameter.silent ) ) {

    		console.log( "%c- ore-three " + require( "../../package.json" ).version + " -", 'padding: 5px 10px ;background-color: black; color: white;font-size:11px' );

    	}

    	this.clock = new THREE.Clock();

    	this.pointer = new Pointer();
    	this.pointer.addEventListener( 'update', this.pointerEvent.bind( this ) );
    	this.pointer.addEventListener( 'wheel', this.onWheel.bind( this ) );

    	window.addEventListener( 'orientationchange', this.onOrientationDevice.bind( this ) );
    	window.addEventListener( 'resize', this.onWindowResize.bind( this ) );

    	this.tick();

    }

    protected tick() {

    	let deltaTime = this.clock.getDelta();

    	this.pointer.update();

    	for ( let i = 0; i < this.layers.length; i ++ ) {

    		this.layers[ i ].tick( deltaTime );

    	}

    	requestAnimationFrame( this.tick.bind( this ) );

    }

    public getLayer( layerName: string ) {

    	for ( let i = 0; i < this.layers.length; i ++ ) {

    		if ( this.layers[ i ].info.name == layerName ) return this.layers[ i ];

    	}

    	return null;

    }

    public addLayer( layer: BaseLayer, layerInfo: LayerInfo ) {

    	while ( this.getLayer( layerInfo.name ) ) {

    		layerInfo.name += '_';

    	}

    	layer.onBind( layerInfo );
    	this.layers.push( layer );

    }

    public removeLayer( layerNmae: string ) {

    	for ( let i = this.layers.length; i >= 0; i -- ) {

    		let layer = this.layers[ i ];

    		if ( layer.info.name == layerNmae ) {

    			this.layers.splice( i, 1 );

    		}

    	}

    }

    protected onWindowResize() {

    	for ( let i = 0; i < this.layers.length; i ++ ) {

    		this.layers[ i ].onResize();

    	}

    }

    protected onOrientationDevice() {

    	this.onWindowResize();

    }

    protected pointerEvent( e: PointerEventArgs ) {

    	for ( let i = 0; i < this.layers.length; i ++ ) {

    		this.layers[ i ].pointerEvent( e );

    	}

    }

    private onWheel( e: { wheelEvent: WheelEvent, trackpadDelta: number } ) {

    	for ( let i = 0; i < this.layers.length; i ++ ) {

    		this.layers[ i ].onWheel( e.wheelEvent, e.trackpadDelta );

    	}

    }

}
