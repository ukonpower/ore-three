import * as THREE from "three";
import { Controller } from "../core/Controller";

export class Pointer extends THREE.EventDispatcher {

	public onHover: Function;
	public onWheel: Function;
	public attenuation: number = 0.9;

	protected isSP: boolean;

	protected _touchDown: boolean;

	protected _position: THREE.Vector2;
	protected _delta: THREE.Vector2;

	public get position(): THREE.Vector2 {

		return this._position.clone();

	}

	public get delta(): THREE.Vector2 {

		return this._delta.clone();

	}

	constructor() {

		super();

		this._position = new THREE.Vector2( NaN, NaN );
		this._delta = new THREE.Vector2( NaN, NaN );

		let userAgent = navigator.userAgent;

		if (
			userAgent.indexOf( 'iPhone' ) >= 0 || userAgent.indexOf( 'iPad' ) >= 0 || userAgent.indexOf( 'Android' ) >= 0 || navigator.platform == "iPad" || ( navigator.platform == "MacIntel" && navigator.userAgent.indexOf( "Safari" ) != - 1 && navigator.userAgent.indexOf( "Chrome" ) == - 1 && ( navigator as any ).standalone !== undefined )
		) {

			window.addEventListener(
				"touchstart",
				this.touchEvent.bind( this, "start" )
			);

			window.addEventListener(
				"touchmove",
				this.touchEvent.bind( this, "move" ),
				{ passive: false }
			);
			window.addEventListener( "touchend", this.touchEvent.bind( this, "end" ) );

		} else {

			window.addEventListener(
				"mousedown",
				this.touchEvent.bind( this, "start" )
			);
			window.addEventListener( "mousemove", this.touchEvent.bind( this, "move" ) );
			window.addEventListener( "mouseup", this.touchEvent.bind( this, "end" ) );
			window.addEventListener( "dragend", this.touchEvent.bind( this, "end" ) );
			window.addEventListener( "wheel", this.wheel.bind( this ), {
				passive: false
			} );

		}

		this._position.set( NaN, NaN );

		this._touchDown = false;

	}

	public getNormalizePosition( windowSize: THREE.Vector2 ) {

		if ( this._position.x != this._position.x ) return new THREE.Vector2( NaN, NaN );

		let p = this._position.clone()
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
			this._position.x !== this._position.x ||
			this._position.y !== this._position.y
		) {

			this._delta.set( 0, 0 );

		} else {

			this._delta.set( x - this._position.x, y - this._position.y );

		}

		this._position.set( x, y );

	}

	protected touchEvent( type: string, event: MouseEvent | TouchEvent ) {

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

			this._touchDown = true;

			this.setPos( x, y );


		} else if ( type == "move" ) {

			this.setPos( x, y );

		} else if ( type == "end" ) {

			this._touchDown = false;

		}

		this.dispatchEvent( {
			type: 'update',
			eventType: type
		} );

	}

	protected wheel( e: MouseWheelEvent ) {

		if ( this.onWheel ) {

			this.onWheel( e );

		}

	}

	public update() {

		this._delta.multiplyScalar( this.attenuation );

		if ( this.onHover && ! this.isSP ) {

			// this.onHover();
			this.dispatchEvent( {
				type: 'update',
				eventType: 'hover'
			} );

		}

	}

}
