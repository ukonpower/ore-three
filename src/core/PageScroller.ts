import * as THREE from 'three';

declare interface CustomRect{
	width: number;
	height: number;
	top: number;
	bottom: number;
}

export declare interface PageScrollerSection{
	element: HTMLElement,
	rect: CustomRect,
	bottom?: Boolean,
	position?: THREE.Vector3
}

export class PageScroller {

	private element: HTMLElement;
	private rect: ClientRect;

	//manual move
	private scrollVel: number = 0;
	private _pageOffset: number = 0;
	public velocityAttenuation: number = 0.95;

	//auto move
	private x: number = 1.0;
	private isAutoMoving: boolean = false;
	private duration: number;
	private baseOffset: number
	private scrollDistance: number;
	private onAutoMoved: Function;

	//sections
	public sections: PageScrollerSection[] = [];

	public threePosition: THREE.Vector3 = new THREE.Vector3( 0, 0, 0 );

	public get pageOffset(): number {
	
		return this._pageOffset;
	
	}

	constructor( element: HTMLElement ) {
	
		this.element = element;
	
		this.rect = this.element.getBoundingClientRect();
	
	}

	public resize() {
	
		this.rect = this.element.getBoundingClientRect();

		for( let i = 0; i < this.sections.length; i++ ){

			let clientRect = this.sections[i].element.getBoundingClientRect();

			this.sections[i].rect.bottom = clientRect.bottom + this.pageOffset;
			this.sections[i].rect.top = clientRect.top + this.pageOffset;
			this.sections[i].rect.width = clientRect.width;
			this.sections[i].rect.height = clientRect.height;

		}
	
	}

	public registerSections( element: HTMLElement, position: THREE.Vector3, bottom?: boolean );
	
	public registerSections( section: PageScrollerSection );

	public registerSections( section_element: any, position?: THREE.Vector3, bottom: boolean = false ){

		if( section_element.element ){

			this.sections.push( section_element );

		}else{

			let clientRect  = ( section_element as HTMLElement ).getBoundingClientRect();

			let rect: CustomRect = {
				top: clientRect.top,
				bottom: clientRect.bottom,
				width: clientRect.width,
				height: clientRect.height,
			}

			let section: PageScrollerSection = {
				element: ( section_element as HTMLElement ),
				rect: rect,
				position: position,
				bottom: bottom
			}
		
			this.sections.push( section );

		}

		this.sortSections();

	}

	private sortSections(){

		this.sections.sort( ( a: PageScrollerSection, b: PageScrollerSection ): number => {

			return a.rect.top > b.rect.top ? 1 : -1;

		} );		

	}

	public moveto( target: HTMLElement, duration: number = 1.0, callback: Function = null ) {
	
		if ( !target ) {
	
			console.log( ( "target is null." ) );
	
			return;
	
		}

		if ( !this.isAutoMoving ) {			
	
			let targetRect = target.getBoundingClientRect();
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

	public update( deltaTime?: number ) {
		
		if ( !this.isAutoMoving ) {
	
			this._pageOffset += this.scrollVel;
			this._pageOffset = Math.min( Math.max( 0.0, this.pageOffset ), this.rect.height - window.innerHeight );
			this.scrollVel *= this.velocityAttenuation;
	
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
		

		for( let i = 0; i < this.sections.length - 1; i++ ){

			let a = this.sections[i];
			let b = this.sections[i + 1];

			let aPos = a.bottom ? a.rect.bottom : a.rect.top;
			let bPos = b.bottom ? b.rect.bottom : b.rect.top;

			if( this.pageOffset + ( a.bottom ? window.innerHeight : 0 ) >= aPos && this.pageOffset + ( b.bottom ? window.innerHeight : 0 ) < bPos ){

				let percentage = ( this.pageOffset - aPos ) / ( ( bPos - ( b.bottom ? window.innerHeight : 0 ) ) - aPos );

				this.threePosition = a.position.clone().add( new THREE.Vector3().subVectors( b.position, a.position ).multiplyScalar( percentage ) );

				
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