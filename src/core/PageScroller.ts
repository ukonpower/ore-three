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
	position?: THREE.Vector3
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

	public registerSections( name: string, element: HTMLElement);

	public registerSections( name: string, element: HTMLElement, position?: THREE.Vector3, bottom?: boolean );
	
	public registerSections( name: string, section: PageScrollerSection );

	public registerSections( name: string, section_element: any, position?: THREE.Vector3, bottom: boolean = false ){

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
				bottom: bottom,
				name: name
			}
		
			this.sections.push( section );
			this.scrollPercentages[ name ] = 0;

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
		
		let done = false;

		for( let i = 0; i < this.sections.length; i++ ){

			let a = this.sections[i];
			let aRectPos = a.bottom ? a.rect.bottom : a.rect.top;

			if( i == this.sections.length - 1 ){

				if( this.pageOffset + ( a.bottom ? window.innerHeight : 0 ) >= aRectPos ){

					this.scrollPercentages[a.name] = 1;

				}
				
				break;

			}

			let b = this.sections[i + 1];
			let bRectPos = b.bottom ? b.rect.bottom : b.rect.top;


			if( done ){

				this.scrollPercentages[b.name] = 0;
				continue;

			}

			this.scrollPercentages[a.name] = 1;

			if( this.pageOffset + ( a.bottom ? window.innerHeight : 0 ) >= aRectPos && this.pageOffset + ( b.bottom ? window.innerHeight : 0 ) <= bRectPos ){
				
				let sectionPercentage = ( this.pageOffset - aRectPos ) / ( ( bRectPos - ( b.bottom ? window.innerHeight : 0 ) ) - aRectPos );
				this.scrollPercentages[ b.name ] = sectionPercentage;
				let threePosPercentage = sectionPercentage;

				if( !a.position || !b.position ){

					if( !a.position ){

						for(let j = i; j >= 0; j-- ){
						
							let sec = this.sections[j];
		
							if( sec.position ){
		
								a = sec;

								break;
		
							}

						}

					}

					if( !b.position ){

						for(let j = i + 2; j < this.sections.length; j++ ){
						
							let sec = this.sections[j];
		
							if( sec.position ){
		
								b = sec;

								break;
		
							}

						}

					}

					//calc percentage
					aRectPos = a.bottom ? a.rect.bottom : a.rect.top;
					bRectPos = b.bottom ? b.rect.bottom : b.rect.top;

					threePosPercentage = ( this.pageOffset - aRectPos ) / ( ( bRectPos - ( b.bottom ? window.innerHeight : 0 ) ) - aRectPos );

				}
				
				let aThreePos = a.position;
				let bThreePos = b.position;

				aThreePos = aThreePos || bThreePos;
				bThreePos = bThreePos || aThreePos;
				
				if( aThreePos && bThreePos ){

					this.threePosition = aThreePos.clone().add( new THREE.Vector3().subVectors( bThreePos, aThreePos ).multiplyScalar( threePosPercentage ) );
				
				}

				done = true;

			}else if( this.pageOffset + ( a.bottom ? window.innerHeight : 0 ) >= aRectPos ){
				
				this.scrollPercentages[b.name] = 1.0;

			}else{

				this.scrollPercentages[b.name] = 0.0;
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