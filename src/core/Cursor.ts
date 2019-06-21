import * as THREE from 'three';

export class Cursor {

    public onTouchStart: Function;
    public onTouchMove: Function;
    public onTouchEnd: Function;
    public onWheel: Function;

    private _touchDown: boolean;

    public position: THREE.Vector2;
    public delta: THREE.Vector2;

    public hoverPosition: THREE.Vector2;
    public hoverDelta: THREE.Vector2;

    constructor() {

        this.position = new THREE.Vector2( 0, 0 );
        this.delta = new THREE.Vector2( 0, 0 );

        this.hoverPosition = new THREE.Vector2( 0, 0 );
        this.hoverDelta = new THREE.Vector2( 0, 0 );

        
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

        this.position.set( -1 , -1 );

        this._touchDown = false;
    
    }

    private setPos( x: number, y: number ){
        
        if( this._touchDown ){

            if( this.position.x == -1 || this.position.y == -1 ){
        
                this.delta.set( 0, 0 );
            
            }else{
            
                this.delta.set( x - this.position.x, y - this.position.y )
            }
    
            this.position.set( x, y );

        }

        //calc delta
        this.hoverDelta.set( x - this.hoverPosition.x, y - this.hoverPosition.y )
        this.hoverPosition.set( x, y );
    
    }
     
    private _TouchStart( event ) {

        if ( !event.touches ) {

            if ( event.button == 0 ){

                this.setPos( event.pageX, event.pageY )

            }

        } else {

            this.position.set( event.touches[0].clientX + window.pageXOffset, event.touches[0].clientY + window.pageYOffset )

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

        if ( this.onTouchMove ) {
            
            this.onTouchMove( event );

        }

    }

    private _TouchEnd() {
        
        if ( this._touchDown ) {

            this._touchDown = false;
            
            this.position.set( -1, -1 );

            if ( this.onTouchEnd ) {

                this.onTouchEnd( event );

            }

            this.delta.set( 0, 0 );

        }

    }
    
    private wheel( e: MouseWheelEvent ){

        if( this.onWheel ){

            this.onWheel( e );

        }

    }

    public update(){

        this.delta.multiplyScalar( 0.9 );
        this.hoverDelta.multiplyScalar( 0.9 );
    }

}