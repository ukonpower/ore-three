import * as THREE from 'three';
import { Pointer } from '../utils/Pointer';
import { BaseLayer, LayerParam } from './BaseLayer';

export declare interface PointerEventArgs {
	pointerEvent: PointerEvent;
	pointerEventType: string;
	position: THREE.Vector2;
	delta: THREE.Vector2;
}

export declare interface ControllerParam {
	silent?: boolean;
	pointerEventElement?: HTMLElement;
}

export class Controller extends THREE.EventDispatcher {

	public pointer: Pointer;
	public clock: THREE.Clock;

	protected layers: BaseLayer[] = [];
	protected pointerEventElement?: HTMLElement;

	constructor( parameter?: ControllerParam ) {

		super();

		if ( ! ( parameter && parameter.silent ) ) {

			console.log( "%c- ore-three -", 'padding: 5px 10px ;background-color: black; color: white;font-size:11px' );

		}

		this.clock = new THREE.Clock();

		/*-------------------------------
			Pointer
		-------------------------------*/

		this.pointer = new Pointer();
		this.setPointerEventElement( ( parameter && parameter.pointerEventElement ) || document.body );

		/*-------------------------------
			Events
		-------------------------------*/

		const pointerUpdate = this.pointerEvent.bind( this );
		const pointerWheel = this.onWheel.bind( this );
		const orientationchange = this.onOrientationDevice.bind( this );
		const windowResize = this.onWindowResize.bind( this );

		this.pointer.addEventListener( 'update', pointerUpdate );
		this.pointer.addEventListener( 'wheel', pointerWheel );
		window.addEventListener( 'orientationchange', orientationchange );
		window.addEventListener( 'resize', windowResize );

		this.addEventListener( 'dispose', () => {

			this.pointer.removeEventListener( 'update', pointerUpdate );
			this.pointer.removeEventListener( 'wheel', pointerWheel );
			window.removeEventListener( 'orientationchange', orientationchange );
			window.removeEventListener( 'resize', windowResize );

		} );

		this.tick();

	}

	protected tick() {

		const deltaTime = this.clock.getDelta();

		this.pointer.update();

		for ( let i = 0; i < this.layers.length; i ++ ) {

			this.layers[ i ].tick( deltaTime );

		}

		requestAnimationFrame( this.tick.bind( this ) );

	}

	protected onWindowResize() {

		for ( let i = 0; i < this.layers.length; i ++ ) {

			this.layers[ i ].onResize();

		}

	}

	protected onOrientationDevice() {

		this.onWindowResize();

	}

	protected pointerEvent( e: THREE.Event ) {

		for ( let i = 0; i < this.layers.length; i ++ ) {

			this.layers[ i ].pointerEvent( e as unknown as PointerEventArgs );

		}

	}

	protected onWheel( e: THREE.Event ) {

		for ( let i = 0; i < this.layers.length; i ++ ) {

			this.layers[ i ].onWheel( e.wheelEvent, e.trackpadDelta );

		}

	}

	/*-------------------------------
		API
	-------------------------------*/

	public addLayer( layer: BaseLayer, layerParam: LayerParam ) {

		while ( this.getLayer( layerParam.name ) ) {

			layerParam.name += '_';

		}

		this.layers.push( layer );

		layer.onBind( layerParam );

	}

	public getLayer( layerName: string ) {

		for ( let i = 0; i < this.layers.length; i ++ ) {

			if ( this.layers[ i ].info.name == layerName ) return this.layers[ i ];

		}

		return null;

	}

	public removeLayer( layerNmae: string ) {

		for ( let i = this.layers.length - 1; i >= 0; i -- ) {

			const layer = this.layers[ i ];

			if ( layer.info.name == layerNmae ) {

				layer.onUnbind();

				this.layers.splice( i, 1 );

			}

		}

	}

	public setPointerEventElement( elm: HTMLElement ) {

		if ( this.pointerEventElement ) {

			this.pointer.unregisterElement( this.pointerEventElement );

		}

		this.pointer.registerElement( elm );

		this.pointerEventElement = elm;

	}

	public dispose() {

		this.layers.forEach( item => {

			this.removeLayer( item.info.name );

		} );

		this.tick = () => {

			return;

		};

		this.dispatchEvent( { type: 'dispose' } );

	}

}
