import * as THREE from "three";
import { Controller } from "../core/Controller";

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
		this.isSP = userAgent.indexOf( 'iPhone' ) >= 0 || userAgent.indexOf( 'iPad' ) >= 0 || userAgent.indexOf( 'Android' ) >= 0 || navigator.platform == "iPad" || ( navigator.platform == "MacIntel" && navigator.userAgent.indexOf( "Safari" ) != - 1 && navigator.userAgent.indexOf( "Chrome" ) == - 1 && ( navigator as any ).standalone !== undefined )

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

	protected touchEvent( type: string, event: MouseEvent | TouchEvent ) {

		let dispatch = false;
		let x: number = this.position.x;
		let y: number = this.position.y;

		if ( "touches" in event ) {

			if ( event.touches.length > 0 ) {

				x = event.touches[ 0 ].clientX;
				y = event.touches[ 0 ].clientY;

			}

		} else {

			if ( event.button == 0 ) {

				x = event.pageX - window.pageXOffset;
				y = event.pageY - window.pageYOffset;

			}

		}

		if ( type == "start" ) {

			this.isTouching = true;

			this.setPos( x, y );

			dispatch = true;

		} else if ( type == "move" ) {

			if( this.isTouching ) {

				this.setPos( x, y );

				dispatch = true;

			}

		} else if ( type == "end" ) {

			this.isTouching = false;
			
			dispatch = true;

		}

		if( dispatch ) {

			this.dispatchEvent( {
				type: 'update',
				eventType: type
			} );
	
		}
		
	}

	protected wheel( e: MouseWheelEvent ) {

		this.dispatchEvent( {
			type: 'wheel'
		} );

	}

	public update() {

		if ( ! this.isSP ) {

			this.dispatchEvent( {
				type: 'update',
				eventType: 'hover'
			} );

		}

	}

}
