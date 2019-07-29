import * as THREE from 'three';

declare interface CustomRect{
	width: number;
	height: number;
	top: number;
	bottom: number;
}

export declare interface PageScrollerSection{
	name: string
	element: HTMLElement,
	rect: CustomRect,
	bottom?: Boolean,
	position?: THREE.Vector3,
	stop: boolean,
}

export interface ScrollPercentages{
	[key: string]: number
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
	public scrollPercentages: ScrollPercentages = {};
	private currentSection: number;

	private stop = false;

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

	public registerSections( name: string, element: HTMLElement, stop?: boolean );

	public registerSections( name: string, element: HTMLElement, position?: THREE.Vector3, bottom?: boolean, stop?: boolean );
	
	public registerSections( name: string, section: PageScrollerSection );

	public registerSections( name: string, section_element: any, position_stop?: any, bottom: boolean = false, stop: boolean = false ){

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
				position: position_stop.isVector3 ? position_stop : null,
				bottom: bottom,
				name: name,
				stop:( typeof position_stop ) == 'boolean' ? position_stop : stop
			}

			console.log( section );
			
			
			this.sections.push( section );
			this.scrollPercentages[ name ] = 0;

		}

		this.sortSections();

		this._pageOffset = 0;
		this.currentSection = 0;

	}

	private sortSections(){

		this.sections.sort( ( a: PageScrollerSection, b: PageScrollerSection ): number => {

			return a.rect.top > b.rect.top ? 1 : -1;

		} );

		for( let i = 0; i < this.sections.length; i++ ){

			if( this.sections[i].position ){
				
				this.threePosition.copy( this.sections[i].position );
				break;

			}
		}

		this.scrollPercentages[this.sections[0].name] = 1;

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

		if( this.stop ){

			if( velocity > 0 ){

				console.log( "↓start" );
				
			}else{

				console.log( "↑start" );

				this.currentSection -= 1;

			}
			
			this.stop = false;
			
		}
	
	}

	public update( deltaTime?: number ) {
		
		if ( !this.isAutoMoving ) {
	
			if( !this.stop ){

				this._pageOffset += this.scrollVel;
				this._pageOffset = Math.min( Math.max( 0.0, this.pageOffset ), this.rect.height - window.innerHeight );
				this.scrollVel *= this.velocityAttenuation;
			
			}
	
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
	
					this.onAutoMoved();
	
				}
	
				this.isAutoMoving = false;
				this.onAutoMoved = null;
	
			}			
	
		}
		
		for( let i = 1; i < this.sections.length; i++ ){

			let top = this.sections[i - 1];
			let under = this.sections[i];
			
			let topPos = top.bottom ? top.rect.bottom : top.rect.top;
			let underPos = under.bottom ? under.rect.bottom : under.rect.top;

			let percent: number;

			let base: number;
			
			if( top.bottom ){

			}

			if( under.bottom ){

				if( top.bottom ){

					let top = this._pageOffset + window.innerHeight - topPos ;
					let base = underPos - topPos;

					percent = top / base;

				}else{

					let top = this._pageOffset - topPos;
					let base =  underPos - topPos - window.innerHeight;

					percent = top / base;
				
				}
				

			}else{

				if( top.bottom){

					let top = this._pageOffset - topPos + window.innerHeight;
					let base = underPos - topPos + window.innerHeight;

					percent = top / base;

				}else{

					let top = this._pageOffset - topPos;
					let base = underPos - topPos;

					percent = top / base;

				}
				

			}
			
			let scrollPercentage = Math.min( 1, Math.max( 0.0, percent ));
			
			this.scrollPercentages[under.name] = scrollPercentage;

		}
		
	
		this.element.style.transform = 'translate3d( 0,' + -this._pageOffset + 'px,0 )';
	
	}

	private sigmoid( a, x ) {
	
		var e1 = Math.exp( -a * ( 2 * x - 1 ) );
		var e2 = Math.exp( -a );
	
		return ( 1 + ( 1 - e1 ) / ( 1 + e1 ) * ( 1 + e2 ) / ( 1 - e2 ) ) / 2;
	
	}

}