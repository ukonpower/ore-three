import * as THREE from "three";

export class Pointer extends THREE.EventDispatcher {

	protected isSP: boolean;
	protected isTouching: boolean;

	public element: HTMLElement | null = null;

	public position: THREE.Vector2;
	public delta: THREE.Vector2;

	constructor() {

		super();

		this.position = new THREE.Vector2( NaN, NaN );
		this.delta = new THREE.Vector2( NaN, NaN );

		const userAgent = navigator.userAgent;
		this.isSP = userAgent.indexOf( 'iPhone' ) >= 0 || userAgent.indexOf( 'iPad' ) >= 0 || userAgent.indexOf( 'Android' ) >= 0 || navigator.platform == "iPad" || ( navigator.platform == "MacIntel" && navigator.userAgent.indexOf( "Safari" ) != - 1 && navigator.userAgent.indexOf( "Chrome" ) == - 1 && ( navigator as any ).standalone !== undefined );

		this.position.set( NaN, NaN );
		this.isTouching = false;

	}

	public registerElement( elm: HTMLElement ) {

		this.element = elm;

		const onTouchStart = this.onTouch.bind( this, "start" );
		const onTouchMove = this.onTouch.bind( this, "move" );
		const onToucEnd = this.onTouch.bind( this, "end" );
		const onPointerDown = this.onPointer.bind( this, "start" );
		const onPointerMove = this.onPointer.bind( this, "move" );
		const onPointerUp = this.onPointer.bind( this, "end" );
		const onWheel = this.wheel.bind( this );

		elm.addEventListener( 'touchstart', onTouchStart, { passive: false } );
		elm.addEventListener( 'touchmove', onTouchMove, { passive: false } );
		elm.addEventListener( 'touchend', onToucEnd, { passive: false } );
		elm.addEventListener( 'pointerdown', onPointerDown );
		elm.addEventListener( 'pointermove', onPointerMove );
		elm.addEventListener( 'pointerup', onPointerUp );
		elm.addEventListener( "dragend", onPointerUp );
		elm.addEventListener( "wheel", onWheel, { passive: false } );

		const onUnRegister = ( e: any ) => {

			if ( elm.isEqualNode( e.elm ) ) {

				elm.removeEventListener( 'touchstart', onTouchStart );
				elm.removeEventListener( 'touchmove', onTouchMove );
				elm.removeEventListener( 'touchend', onToucEnd );
				elm.removeEventListener( 'pointerdown', onPointerDown );
				elm.removeEventListener( 'pointermove', onPointerMove );
				elm.removeEventListener( 'pointerup', onPointerUp );
				elm.removeEventListener( "dragend", onPointerUp );
				elm.removeEventListener( "wheel", onWheel );

				this.removeEventListener( 'unregister', onUnRegister );

			}

		};

		this.addEventListener( 'unregister', onUnRegister );

	}

	public unregisterElement( elm: HTMLElement ) {

		this.dispatchEvent( {
			type: 'unregister',
			elm: elm,
		} );

	}

	public getScreenPosition( windowSize: THREE.Vector2 ) {

		if ( this.position.x != this.position.x ) return new THREE.Vector2( NaN, NaN );

		const p = this.position.clone()
			.divide( windowSize )
			.multiplyScalar( 2.0 )
			.subScalar( 1.0 );
		p.y *= - 1;

		return p;

	}

	public getRelativePosition( elm: HTMLElement, screen?: boolean ) {

		const rect: DOMRect = elm.getClientRects()[ 0 ] as DOMRect;

		let x = this.position.x - rect.left;
		let y = this.position.y - rect.top;

		if ( screen ) {

			x /= rect.width;
			y /= rect.height;

		}

		const p = new THREE.Vector2( x, y );

		return p;

	}

	protected setPos( x: number, y: number ) {

		if (
			! ( this.position.x !== this.position.x || this.position.y !== this.position.y )
		) {

			this.delta.set( x - this.position.x, y - this.position.y );

		}

		this.position.set( x, y );

	}

	protected onTouch( type: string, e: TouchEvent ) {

		const touch = e.touches[ 0 ];

		if ( touch ) {

			this.touchEventHandler( touch.pageX, touch.pageY, type, e );

		} else {

			if ( type == 'end' ) {

				this.touchEventHandler( NaN, NaN, type, e );

			}

		}

	}

	protected onPointer( type: string, e: PointerEvent | DragEvent ) {

		const pointerType = ( e as PointerEvent ).pointerType;

		if ( pointerType != null ) {

			if ( pointerType == 'mouse' && ( e.button == - 1 || e.button == 0 ) ) {

				this.touchEventHandler( e.pageX, e.pageY, type, e as PointerEvent );

			}

		} else {

			this.touchEventHandler( e.pageX, e.pageY, type, e );

		}

	}

	protected touchEventHandler( posX: number, posY: number, type: string, e: TouchEvent | PointerEvent | DragEvent ) {

		let dispatch = false;

		const x = posX - window.pageXOffset;
		const y = posY - window.pageYOffset;

		if ( type == "start" ) {

			this.isTouching = true;

			this.setPos( x, y );

			this.delta.set( 0, 0 );

			dispatch = true;

		} else if ( type == "move" ) {

			this.setPos( x, y );

			if ( this.isTouching ) {

				dispatch = true;

			}

		} else if ( type == "end" ) {

			if ( 'targetTouches' in e ) {

				if ( e.targetTouches.length == 0 ) {

					this.isTouching = false;

				}

			} else {

				this.isTouching = false;

			}

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

			this.delta.set( 0, 0, );

		}

	}

	protected trackpadMemDelta = 0;
	protected trackpadMax = false;

	protected wheel( e: WheelEvent ) {

		this.dispatchEvent( {
			type: 'wheel',
			wheelEvent: e,
		} );

	}

}
