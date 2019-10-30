import * as THREE from 'three';
import { Controller } from './Controller';

export class Cursor {

    public onTouchStart: Function;
    public onTouchMove: Function;
    public onTouchEnd: Function;
    public onHover: Function;
    public onWheel: Function;
    public attenuation: number = 0.9;

    private _touchDown: boolean;

    private _position: THREE.Vector2;
    private _delta: THREE.Vector2;

    private _hoverPosition: THREE.Vector2;
    private _hoverDelta: THREE.Vector2;

    public hoverMode: boolean = false;

    
    public get position(): THREE.Vector2 {

        return this._position;
    
    }

    public get delta(): THREE.Vector2 { 

        return this._delta;

    }

    public get hoverPosition(): THREE.Vector2 {

        return this._hoverPosition;

    }
    
    public get hoverDelta(): THREE.Vector2 {

        return this._hoverDelta;
        
    }

    constructor() {

        this._position = new THREE.Vector2( 0, 0 );
        this._delta = new THREE.Vector2( 0, 0 );

        this._hoverPosition = new THREE.Vector2( 0, 0 );
        this._hoverDelta = new THREE.Vector2( 0, 0 );

        
        let userAgent = navigator.userAgent;

        if ( userAgent.indexOf( 'iPhone' ) >= 0 || userAgent.indexOf( 'iPad' ) >= 0 || userAgent.indexOf( 'Android' ) >= 0 ) {
        
            window.addEventListener( 'touchstart', this._MouseEvent.bind( this, 'start' ) );
            window.addEventListener( 'touchmove', this._MouseEvent.bind( this, 'move' ), { passive: false } );
            window.addEventListener( 'touchend', this._MouseEvent.bind( this, 'end' ) );
        
        } else {
        
            window.addEventListener( 'mousedown', this._MouseEvent.bind( this, 'start' ) );
            window.addEventListener( 'mousemove', this._MouseEvent.bind( this, 'move' ) );
            window.addEventListener( 'mouseup', this._MouseEvent.bind( this, 'end' ) );
            window.addEventListener( 'dragend', this._MouseEvent.bind( this, 'end' ) );
            window.addEventListener( 'wheel',this.wheel.bind( this ),{ passive: false } );
        
        }

        this._position.set( NaN , NaN );
        this._hoverPosition.set( NaN , NaN );

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

            if( this._position.x !== this._position.x || this._position.y !== this._position.y ){
        
                this._delta.set( 0, 0 );
            
            }else{
            
                this._delta.set( x - this._position.x, y - this._position.y );
            }            
    
            this._position.set( x, y );

        }else{

            this._position.set( NaN, NaN );
            this._delta.set( 0, 0 );
            
        }

        //calc delta
        if( this._hoverPosition.x !== this._hoverPosition.x || this._hoverPosition.y !== this._hoverPosition.y ){
            
            this._hoverDelta.set( 0, 0 );

        }else{

            this._hoverDelta.set( x - this._hoverPosition.x, y - this._hoverPosition.y );

        }
        
        this._hoverPosition.set( x, y );
    
    }

    private _MouseEvent( type: string, event: MouseEvent | TouchEvent ){
        
        let x: number;
        let y: number;
        
        if( 'touches' in event ){

            x = event.touches[0].clientX;
            y = event.touches[0].clientY;

        }else{

            if( event.button == 0 ){

                x = event.pageX - window.pageXOffset;
                y =  event.pageY - window.pageYOffset;

            }

        }

        
        if( type == 'start' ){

            this._touchDown = true;

            this.setPos( x, y );

            if ( this.onTouchStart ) {

                this.onTouchStart( event );
    
            }

        }else if( type == 'move' ){
            
            this.setPos( x, y );

            if( this._touchDown ){

                if( this.onTouchMove ){

                    this.onTouchMove( event );
                    
                }
                
            }

        }else if( type == 'end' ){

            this._touchDown = false;
            
            this.setPos( x, y );

            if( this.onTouchEnd ){

                this.onTouchEnd( event );
                
            }
            
        }

    }
    
    private wheel( e: MouseWheelEvent ){

        if( this.onWheel ){

            this.onWheel( e );

        }

    }

    public update(){
        
        this._delta.multiplyScalar( this.attenuation );
        this._hoverDelta.multiplyScalar( this.attenuation );

        if( this.hoverMode ){

            if( this.onHover ){

                this.onHover();

            }

        }

    }

}