export class PageScroller {

	private element: HTMLElement;
	private rect: ClientRect;

	private _pageOffset: number = 0;
	private baseOffset: number

	private scrollVel: number = 0;
	private x: number = 1.0;

	private isAutoMoving: boolean = false;
	private duration: number;
	private scrollDistance: number;

	private onAutoMoved: Function;

	public get pageOffset(  ): number {
	
		return this._pageOffset;
	
	}

	constructor( element: HTMLElement ) {
	
		this.element = element;
	
		this.rect = this.element.getBoundingClientRect(  );
	
	}

	public resize(  ) {
	
		this.rect = this.element.getBoundingClientRect(  );
	
	}

	public moveto( target: HTMLElement, duration: number = 1.0, callback: Function = null ) {
	
		if ( !target ) {
	
			console.log( ( "target is null." ) );
	
			return;
	
		}

		if ( !this.isAutoMoving ) {			
	
			let targetRect = target.getBoundingClientRect(  );
			let targetOffset = targetRect.top;
			this.baseOffset = this.pageOffset;

			this.x = 0;
			this.scrollVel = 0;
			this.isAutoMoving = true;
			this.duration = duration;
			
			this.scrollDistance = Math.min( targetOffset,( this.rect.height - ( this.pageOffset + window.innerHeight ) ) );
			this.onAutoMoved = callback;
	
		}
	
	}

	public setScrollVelocity( velocity: number ) {
	
		this.isAutoMoving = false;
	
		this.scrollVel = velocity;
	
	}

	public update( deltaTime: number = null ) {
		
		if ( !this.isAutoMoving ) {
	
			this._pageOffset += this.scrollVel;
			this._pageOffset = Math.min( Math.max( 0.0, this.pageOffset ), this.rect.height - window.innerHeight );
			this.scrollVel *= 0.95;
	
		} else {
	
			this.x += ( deltaTime ? deltaTime : 0.016 ) / this.duration;
	
			let ended = false;
			
			if ( this.x >= 1.0 ) {
	
				ended = true;
	
				this.x = 1.0;
	
			}

			let w = this.sigmoid( 6, this.x );
	
			this._pageOffset = this.baseOffset + this.scrollDistance * w;

			if ( ended ) {
	
				if ( this.onAutoMoved ) {
	
					this.onAutoMoved(  );
	
				}
	
				this.isAutoMoving = false;
				this.onAutoMoved = null;
	
			}
	
		}
	
		this.element.style.transform = 'translate3d( 0,' + -this._pageOffset + 'px,0 )';
	
	}

	private sigmoid( a, x ) {
	
		var e1 = Math.exp( -a * ( 2 * x - 1 ) );
		var e2 = Math.exp( -a );
	
		return ( 1 + ( 1 - e1 ) / ( 1 + e1 ) * ( 1 + e2 ) / ( 1 - e2 ) ) / 2;
	
	}

}