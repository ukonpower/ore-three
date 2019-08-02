import * as THREE from 'three';

declare interface CustomRect{
	width: number;
	height: number;
	top: number;
	bottom: number;
}

export declare interface PageScrollerSectionParam{
	name: string
	element: HTMLElement,
	bottom?: Boolean,
	threePosition?: THREE.Vector3,
	stop?: boolean,
	onStartDownScroll?: Function,
	onStartUpScroll?: Function,
	onArrivalDownScroll?: Function,
	onArrivalUpScroll?: Function,
}

export declare interface PageScrollerSection{
	name: string
	element: HTMLElement,
	rect: CustomRect,
	bottom?: Boolean,
	threePosition?: THREE.Vector3,
	stop: boolean,
	onStartDownScroll?: Function,
	onStartUpScroll?: Function,
	onArrivalDownScroll?: Function,
	onArrivalUpScroll?: Function,
}

export interface ScrollPercentages{
	[key: string]: number
}

export class PageScroller {

	private element: HTMLElement;
	private rect: ClientRect;

	//manual move
	private _scrollVel: number = 0;
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

	private scrollLock = false;

	public threePosition: THREE.Vector3 = new THREE.Vector3( 0, 0, 0 );

	public get pageOffset(): number {
	
		return this._pageOffset;
	
	}

	public get scrollVel(): number{

		return this._scrollVel;

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

	public registerSections( param: PageScrollerSectionParam ){

		let clientRect  = ( param.element as HTMLElement ).getBoundingClientRect();

		let rect: CustomRect = {
			top: clientRect.top,
			bottom: clientRect.bottom,
			width: clientRect.width,
			height: clientRect.height,
		}

		let section: PageScrollerSection = {
			name: param.name,
			element: param.element,
			rect: rect,
			bottom: param.bottom ? param.bottom : false,
			threePosition: param.threePosition,
			stop: param.stop,
			onStartDownScroll: param.onStartDownScroll,
			onStartUpScroll: param.onStartUpScroll,
			onArrivalDownScroll: param.onArrivalDownScroll,
			onArrivalUpScroll: param.onArrivalUpScroll,
		}

			
		this.sections.push( section );
		this.scrollPercentages[ name ] = 0;

		this.sortSections();

		this._pageOffset = 0;
		this.currentSection = 0;

	}

	private sortSections(){

		this.sections.sort( ( a: PageScrollerSection, b: PageScrollerSection ): number => {

			return a.rect.top > b.rect.top ? 1 : -1;

		} );

		for( let i = 0; i < this.sections.length; i++ ){

			if( this.sections[i].threePosition ){
				
				this.threePosition.copy( this.sections[i].threePosition );
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
			this._scrollVel = 0;
			this.isAutoMoving = true;
			this.duration = duration;
			
			this.scrollDistance = Math.min( targetOffset,( this.rect.height - ( this.pageOffset + window.innerHeight ) ) );
			this.onAutoMoved = callback;
	
		}
	
	}

	public setScrollVelocity( velocity: number ) {
	
		this.isAutoMoving = false;
		this._scrollVel = velocity;


		if( this.scrollLock ){

			let unlock: boolean;

			if( velocity > 0 ){

				if( this.sections[this.currentSection].onStartDownScroll ){

					unlock = this.sections[this.currentSection].onStartDownScroll( this.scrollVel );

				}else{
					
					unlock = true;

				}

				if( unlock ){
						
					this.currentSection += 1;

				}

				
			}else{
				
				if( this.sections[this.currentSection].onStartUpScroll ){

					unlock = this.sections[this.currentSection].onStartUpScroll( this.scrollVel );
				
				}else{

					unlock = true;
					
				}

			}

			if( unlock ){

				this.scrollLock = false;

			}else{;
				
				this._scrollVel = 0;

			}
			
		}
	
	}

	public update( deltaTime?: number ) {
		
		if ( !this.isAutoMoving ) {
	
			if( !this.scrollLock ){

				this._pageOffset += this._scrollVel;
				this._pageOffset = Math.min( Math.max( 0.0, this.pageOffset ), this.rect.height - window.innerHeight );
				this._scrollVel *= this.velocityAttenuation;

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
		
		this.calcScrollPercentage();

		let newSection = this.getCurrentSection();
		
		if( this.currentSection != newSection ){

			let isDownScroll = newSection > this.currentSection;
			let sec = this.sections[newSection - ( isDownScroll ? 1 : 0)]

			this._pageOffset = sec.rect.top + (sec.bottom ? sec.rect.height - window.innerHeight: 0 );			

			if( sec.stop ){

				this.scrollLock = true;
				this._scrollVel = 0;
				this.calcScrollPercentage();
				
			}

			if( isDownScroll ){

				if( sec.onArrivalDownScroll ){

					sec.onArrivalDownScroll();
				
				}

			}else{
				 
				if( sec.onArrivalUpScroll ){

					sec.onArrivalUpScroll();

				}
				
			}

			this.currentSection = this.getCurrentSection();

		}
		
		this.calcThreePosition();
		
		this.element.style.transform = 'translate3d( 0,' + -this._pageOffset + 'px,0 )';
	
	}

	private calcScrollPercentage(){

		for( let i = 1; i < this.sections.length; i++ ){

			let top = this.sections[i - 1];
			let under = this.sections[i];
			
			let topPos = top.bottom ? top.rect.bottom : top.rect.top;
			let underPos = under.bottom ? under.rect.bottom : under.rect.top;

			let num: number;
			let deno: number;

			if( under.bottom ){

				if( top.bottom ){

					num = this._pageOffset + window.innerHeight - topPos ;
					deno = underPos - topPos;

				}else{

					num = this._pageOffset - topPos;
					deno =  underPos - topPos - window.innerHeight;
				
				}

			}else{

				if( top.bottom){

					num = this._pageOffset - topPos + window.innerHeight;
					deno = underPos - topPos + window.innerHeight;

				}else{

					num = this._pageOffset - topPos;
					deno = underPos - topPos;

				}
				

			}

			let percent = ( num ) / ( deno );
			
			let scrollPercentage = Math.min( 1, Math.max( 0.0, percent));
			
			this.scrollPercentages[under.name] = scrollPercentage;

		}

	}
	

	private calcThreePosition(){

		let a: number;
		let b: number;
		let aPos: THREE.Vector3;
		let bPos: THREE.Vector3;

		for( let i = this.currentSection - 1; i >= 0; i-- ){
			
			a = i;
			aPos = this.sections[a].threePosition;
			
			if( aPos != null ) break;

		}

		for( let i = this.currentSection; i < this.sections.length; i++ ){
			
			b = i;
			bPos = this.sections[b].threePosition;
			
			if( bPos != null ) break;
			
		}

		let sum = 0;
		let num = 0;

		if( aPos && bPos){

			for( let i = a + 1; i <= b; i++ ){

				sum += this.scrollPercentages[this.sections[i].name];
				num++;

			}

			this.threePosition.copy(aPos.clone().add( new THREE.Vector3().subVectors( bPos, aPos ).multiplyScalar( this.sigmoid( 6 ,sum / num) ) ));

		}else if( aPos ){

			this.threePosition.copy(aPos);

		}else if( bPos ){

			this.threePosition.copy(bPos);

		}		
		
	}

	public getSection( name: string ){

		for( let i = 0; i < this.sections.length; i++ ){
			
			if( this.sections[i].name == name ){
			
				return this.sections[i];
			
			}
		
		}

	}

	private getCurrentSection(){

		for( let i = 0; i < this.sections.length; i++){

			let a = this.sections[i];
			let ap = this.scrollPercentages[a.name];

			let b = this.sections[i + 1];

			if( b == null ){

				if( ap > 0 ) {
					
					return i;
	
				}

				break;

			}

			let bp = this.scrollPercentages[b.name];

			if( ap > 0 && bp == 0 ){

				return i;
				
			}

		}

	}

	public unLockScroll(){

		this.scrollLock = false;

	}

	private sigmoid( a, x ) {
	
		var e1 = Math.exp( -a * ( 2 * x - 1 ) );
		var e2 = Math.exp( -a );
	
		return ( 1 + ( 1 - e1 ) / ( 1 + e1 ) * ( 1 + e2 ) / ( 1 - e2 ) ) / 2;
	
	}

}