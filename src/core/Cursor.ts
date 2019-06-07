export class Cursor {
    public onTouchStart: Function;
    public onTouchMove: Function;
    public onTouchEnd: Function;
    public onWheel: Function;

    private _x: number;
    private _y: number;
    private _touchDown: boolean;
    public deltaX: number;
    public deltaY: number;
    
    constructor() {
        
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

        this._x = -1;
        this._y = -1;

        this._touchDown = false;
    
    }

    set x( x ) {
    
        if ( this._x == -1 ) this.deltaX = 0;
        else this.deltaX = x - this._x;
    
        this._x = x;
    
    }
    
    get x() {
    
        return this._x;
    
    }

    set y( y ) {
    
        if ( this._y == -1 ) this.deltaY = 0;
        else this.deltaY = y - this._y;
    
        this._y = y;
    
    }

    get y() {
    
        return this._y;
    
    }
    
    private _TouchStart( event ) {

        if ( !event.touches ) {

            if ( event.button == 0 ){

                this.x = event.pageX;
                this.y = event.pageY;

            }

        } else {

            this.x = event.touches[0].clientX + window.pageXOffset;
            this.y = event.touches[0].clientY + window.pageYOffset;

        }

        this._touchDown = true;

        if ( this.onTouchStart ) {

            this.onTouchStart( event );

        }
    }

    private _TouchMove( event ) {

        if ( this._touchDown ) {
            
            if ( !event.touches ) {

                this.x = event.pageX;
                this.y = event.pageY;

            } else {

                this.x = event.touches[0].clientX + window.pageXOffset;
                this.y = event.touches[0].clientY + window.pageYOffset;

            }

            if ( this.onTouchMove ) {
                
                this.onTouchMove( event );

            }

        }

    }

    private _TouchEnd() {
        
        if ( this._touchDown ) {

            this._touchDown = false;
            this._x = -1;
            this._y = -1;

            if ( this.onTouchEnd ) {

                this.onTouchEnd( event );

            }

            this.deltaX = 0;
            this.deltaY = 0;

        }

    }
    
    private wheel( e ){

        if( this.onWheel ){

            this.onWheel( e );

        }

    }

}