import * as THREE from "three";

import { Lethargy } from 'lethargy';
import toPx from 'to-px';
export class Pointer extends THREE.EventDispatcher {

	protected isSP: boolean;
	protected isTouching: boolean;

	public position: THREE.Vector2;
	public delta: THREE.Vector2;

	constructor() {

		super();

		this.position = new THREE.Vector2( NaN, NaN );
		this.delta = new THREE.Vector2( NaN, NaN );

		let userAgent = navigator.userAgent;
		this.isSP = userAgent.indexOf( 'iPhone' ) >= 0 || userAgent.indexOf( 'iPad' ) >= 0 || userAgent.indexOf( 'Android' ) >= 0 || navigator.platform == "iPad" || ( navigator.platform == "MacIntel" && navigator.userAgent.indexOf( "Safari" ) != - 1 && navigator.userAgent.indexOf( "Chrome" ) == - 1 && ( navigator as any ).standalone !== undefined );

		window.addEventListener( 'pointerdown', this.touchEvent.bind( this, "start" ) );
		window.addEventListener( 'pointermove', this.touchEvent.bind( this, "move" ) );
		window.addEventListener( 'pointerup', this.touchEvent.bind( this, "end" ) );
		window.addEventListener( "dragend", this.touchEvent.bind( this, "end" ) );
		window.addEventListener( "wheel", this.wheel.bind( this ), { passive: false } );

		this.position.set( NaN, NaN );
		this.isTouching = false;

	}

	public getNormalizePosition( windowSize: THREE.Vector2 ) {

		if ( this.position.x != this.position.x ) return new THREE.Vector2( NaN, NaN );

		let p = this.position.clone()
			.divide( windowSize )
			.multiplyScalar( 2.0 )
			.subScalar( 1.0 );
		p.y *= - 1;

		return p;

	}

	public getRelativePosition( elm: HTMLElement, normalize?: boolean ) {

		let rect: DOMRect = elm.getClientRects()[ 0 ] as DOMRect;

		let pos: THREE.Vector2;

		let x = pos.x - rect.left;
		let y = pos.y - rect.top;

		if ( normalize ) {

			x /= rect.width;
			y /= rect.height;

		}

		let p = new THREE.Vector2( x, y );

		return p;

	}

	protected setPos( x: number, y: number ) {

		if (
			this.position.x !== this.position.x ||
			this.position.y !== this.position.y
		) {

			this.delta.set( 0, 0 );

		} else {

			this.delta.set( x - this.position.x, y - this.position.y );

		}

		this.position.set( x, y );

	}

	protected touchEvent( type: string, e: PointerEvent ) {

		if ( e.button > 0 ) return;

		let dispatch = false;

		let x = e.pageX - window.pageXOffset;
		let y = e.pageY - window.pageYOffset;

		if ( type == "start" ) {

			this.isTouching = true;

			this.setPos( x, y );

			dispatch = true;

		} else if ( type == "move" ) {

			this.setPos( x, y );

			if ( this.isTouching ) {

				dispatch = true;

			}

		} else if ( type == "end" ) {

			this.isTouching = false;

			dispatch = true;

		}

		if ( dispatch ) {

			this.dispatchEvent( {
				type: 'update',
				pointerEvent: e,
				pointerEventType: type,
				position: this.position.clone(),
				delta: this.delta.clone()
			} );

		}

	}

	public update() {

		if ( ! this.isSP ) {

			this.dispatchEvent( {
				type: 'update',
				pointerEvent: null,
				pointerEventType: 'hover',
				position: this.position.clone(),
				delta: this.delta.clone()
			} );

		}

	}

	protected trackpadMemDelta = 0;
	protected trackpadMax: boolean = false;
	protected lethargy = new Lethargy( 7, 0, 0.05 );

	protected wheel( e: WheelEvent ) {

		let delta = e.deltaY;
		let trackpadDelta = 0;

		switch ( e.deltaMode ) {

			case e.DOM_DELTA_LINE:
				delta *= toPx( 'ex', window ) * 2.5;
				break;

			case e.DOM_DELTA_PAGE:
				delta *= window.innerHeight;
				break;

		}

		if ( this.lethargy.check( e ) ) {

			trackpadDelta = delta;

		}

		this.dispatchEvent( {
			type: 'wheel',
			wheelEvent: e,
			trackpadDelta: trackpadDelta
		} );

	}

}
