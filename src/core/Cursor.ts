import * as THREE from 'three';
import { Controller } from './Controller';

export class Cursor {

    public onTouchStart: Function;
    public onTouchMove: Function;
    public onTouchEnd: Function;
    public onHover: Function;
    public onWheel: Function;

    private _touchDown: boolean;

    public _position: THREE.Vector2;
    public _delta: THREE.Vector2;

    public _hoverPosition: THREE.Vector2;
    public _hoverDelta: THREE.Vector2;

    public hoverMode: boolean = false;

    
    public get position(): THREE.Vector2 {

        return this._touchDown ? this._position : null;
    
    }

    public get delta(): THREE.Vector2 { 

        return this._touchDown ? this._delta : null;

    }

    public get hoverPosition(): THREE.Vector2 {

        return this.hoverMode ? this._hoverPosition : null;

    }
    
    public get hoverDelta(): THREE.Vector2 {

        return this.hoverMode ? this._hoverDelta : null;
        
    }

    constructor() {

        this._position = new THREE.Vector2( 0, 0 );
        this._delta = new THREE.Vector2( 0, 0 );

        this._hoverPosition = new THREE.Vector2( 0, 0 );
        this._hoverDelta = new THREE.Vector2( 0, 0 );

        
        let userAgent = navigator.userAgent;

        if ( userAgent.indexOf( 'iPhone' ) >= 0 || userAgent.indexOf( 'iPad' ) >= 0 || userAgent.indexOf( 'Android' ) >= 0 ) {
        
            window.addEventListener( 'touchstart', this._TouchStart.bind( this ) );
            window.addEventListener( 'touchmove', this._TouchMove.bind( this ), { passive: false } );
            window.addEventListener( 'touchend', this._TouchEnd.bind( this ) );
        
        } else {
        
            window.addEventListener( 'mousedown', this._TouchStart.bind( this ) );
            window.addEventListener( 'mousemove', this._TouchMove.bind( this ) );
            window.addEventListener( 'mouseup', this._TouchEnd.bind( this ) );
            window.addEventListener( 'dragend', this._TouchEnd.bind( this ) );
            window.addEventListener( 'wheel',this.wheel.bind( this ),{ passive: false } );
        
        }

        this._position.set( -1 , -1 );

        this._touchDown = false;
    
    }

    public getRelativePosition( elm: HTMLElement, normalize?: boolean ){

        let rect: DOMRect = ( elm.getClientRects()[0] ) as DOMRect;

        let pos: THREE.Vector2;
        
        if( this.hoverMode ){

            pos = this._hoverPosition

        }else{
            
            if( !this._touchDown ) return null;

            pos = this._position;
        
        }
        
        let x = pos.x - rect.left;
        let y = pos.y - rect.top;

        if( normalize ){

            x /= rect.width;
            y /= rect.height;

        }

        let p = new THREE.Vector2( x, y );

        return p;

    }

    private setPos( x: number, y: number ){
        
        if( this._touchDown ){

            if( this._position.x == -1 || this._position.y == -1 ){
        
                this._delta.set( 0, 0 );
            
            }else{
            
                this._delta.set( x - this._position.x, y - this._position.y )
            }
    
            this._position.set( x, y );

        }

        //calc delta
        this._hoverDelta.set( x - this._hoverPosition.x, y - this._hoverPosition.y )
        this._hoverPosition.set( x, y );
    
    }
     
    private _TouchStart( event ) {
        
        if ( !event.touches ) {

            if ( event.button == 0 ){

                this.setPos( event.pageX, event.pageY )

            }

        } else {

            this._position.set( event.touches[0].clientX + window.pageXOffset, event.touches[0].clientY + window.pageYOffset )

        }

        this._touchDown = true;

        if ( this.onTouchStart ) {

            this.onTouchStart( event );

        }
    }

    private _TouchMove( event ) {
            
        if ( !event.touches ) {

            this.setPos( event.pageX, event.pageY );

        } else {
            
            this.setPos( event.touches[0].clientX + window.pageXOffset, event.touches[0].clientY + window.pageYOffset );
        
        }

        if ( this._touchDown && this.onTouchMove ) {
            
            this.onTouchMove( event );

        }

    }

    private _TouchEnd( event ) {
        
        if ( this._touchDown ) {

            this._touchDown = false;
            
            this._position.set( -1, -1 );

            if ( this.onTouchEnd ) {

                this.onTouchEnd( event );

            }

            this._delta.set( 0, 0 );

        }

    }
    
    private wheel( e: MouseWheelEvent ){

        if( this.onWheel ){

            this.onWheel( e );

        }

    }

    public update(){
        
        this._delta.multiplyScalar( 0.9 );
        this._hoverDelta.multiplyScalar( 0.9 );

        if( this.hoverMode ){

            if( this.onHover ){

                this.onHover();

            }

        }

    }

}