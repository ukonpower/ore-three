import * as THREE from 'three';
import { Easings } from 'ore-three-ts';

declare interface CustomRect{
	width: number;
	height: number;
	top: number;
	bottom: number;
}

declare interface ScrollerEasing{
	func: Function,
	variables: number[],
}

declare interface ScrollerSectionEasings{
	position?: ScrollerEasing,
	rotation?: ScrollerEasing
}

export declare interface PageScrollerSectionParam{
	name: string
	element: HTMLElement,
	bottom?: Boolean,
	threePosition?: THREE.Vector3,
	threeRotation?: THREE.Quaternion,
	stop?: boolean,
	onStartDownScroll?: Function,
	onStartUpScroll?: Function,
	onArrivalDownScroll?: Function,
	onArrivalUpScroll?: Function,
	sectionEasings?: ScrollerSectionEasings
}

export declare interface PageScrollerSection extends PageScrollerSectionParam{
	rect: CustomRect
}

export declare interface PageScrollerMoveToParam{
	target: HTMLElement | string,
	duration?: number,
	callback?: Function,
	lock?: boolean
}

export interface ScrollPercentages{
	[key: string]: number
}

export class PageScroller {

	private element: HTMLElement;
	private rect: ClientRect;

	//manual move
	private _velocity: number = 0;
	private _pageOffset: number = 0;
	private _pageOffsetMem: number = 0;
	public velocityAttenuation: number = 0.95;

	//auto move
	private x: number = 1.0;
	private duration: number;
	private baseOffset: number
	private scrollDistance: number;
	private onAutoMoveFinished: Function;
	private isAutoMoving: boolean = false;
	private autoMovingLock: boolean = false;

	//sections
	public sections: PageScrollerSection[] = [];
	public sectionScrollPercentages: ScrollPercentages = {};
	private currentSection: number;

	//easing
	private easingPos: ScrollerEasing;
	private easingRot: ScrollerEasing;
	private easingAutoMove: ScrollerEasing;

	//three transforms
	public threePosition: THREE.Vector3 = new THREE.Vector3( 0, 0, 0 );
	public threeRotation: THREE.Quaternion = new THREE.Quaternion( 0, 0, 0 );

	//stop
	private isStop: boolean = false;
	private stopSection: number = null;
	

	public get pageOffset(): number {
	
		return this._pageOffset;
	
	}

	public get scrollVel(): number{

		return this._velocity;

	}

	public get scrollPercentage(): number{
		
		let sum = 0;

		for( let i = 1; i < this.sections.length; i++ ){

			sum += this.sectionScrollPercentages[this.sections[i].name];

		}

		return sum / ( this.sections.length - 1 );

	}

	constructor( element: HTMLElement ) {
	
		this.element = element;
	
		this.rect = this.element.getBoundingClientRect();

		this.initEasings();
	
	}

	private initEasings(){

		this.easingPos = {
			func: Easings.linear,
			variables: null
		}

		this.easingRot = {
			func: Easings.linear,
			variables: null
		}

		this.easingAutoMove = {
			func: Easings.sigmoid,
			variables: [6]
		}
	}

	public addVelocity( scrollVelocity: number ) {

		if( this.autoMovingLock ) return;

		if( this.isStop ){

			//スクロールロック解除条件に合わなければRETURN
			if( !this.checkUnlockStopScroll( scrollVelocity ) ){

				return;

			}

		}

		this._velocity += scrollVelocity;

	}

	public setVelocity( scrollVelocity: number ) {

		if( this.autoMovingLock ) return;

		if( this.isStop ){

			//スクロールロック解除条件に合わなければRETURN
			if( !this.checkUnlockStopScroll( scrollVelocity ) ){

				return;

			}

		}

		this._velocity = scrollVelocity;
	
	}

	private checkUnlockStopScroll( scrollVelocity: number ){

		let unLock: boolean = true;
		let sec = this.sections[this.stopSection];

		if( scrollVelocity > 0 ){

			if( sec.onStartDownScroll ){

				unLock = sec.onStartDownScroll( scrollVelocity );

			}

		}else{

			if( sec.onStartUpScroll ){

				unLock = sec.onStartUpScroll( scrollVelocity );

			}

		}

		if( unLock ){

			this.isStop = false;
			this.stopSection = null;

		}

		return unLock;

	}

	public setEasingPos( easingFunction: Function, ...variables: number[] ){

		this.easingPos.func = easingFunction;
		this.easingPos.variables = variables;

	}

	public setEasingRot( easingFunction: Function, ...variables: number[] ){

		this.easingRot.func = easingFunction;
		this.easingRot.variables = variables;

	}

	public setEasingAutoMove( easingFunction: Function, ...variables: number[] ){

		this.easingAutoMove.func = easingFunction;
		this.easingAutoMove.variables = variables;

	}

	public moveto( param: PageScrollerMoveToParam ) {
	
		let targetOffset: number;

		if ( typeof param.target == 'string' ) {

			let targetSection = this.getSection( param.target );

			if( targetSection ){

				if( targetSection.bottom ){

					targetOffset = targetSection.rect.bottom - window.innerHeight;

				}else{

					targetOffset = targetSection.rect.top;

				}

			}
			
		}else{

			let targetRect = param.target.getBoundingClientRect();
			targetOffset = targetRect.top;

		}
	

		this.baseOffset = this.pageOffset;

		this.x = 0;
		this._velocity = 0;
		this.isAutoMoving = true;
		this.duration = param.duration ? param.duration : 1.0;
		this.autoMovingLock = param.lock ? param.lock : false;
		
		this.scrollDistance = Math.min( targetOffset, ( this.rect.height - ( this.pageOffset + window.innerHeight ) ) );
		this.onAutoMoveFinished = param.callback ? param.callback : null;
	
	}

	public update( deltaTime?: number ) {

		if( !this.isStop ){

			this.updateScroll( deltaTime );

			this.checkThrowSection();

		}
		
		this.calcScrollPercentage();

		this.currentSection = this.getCurrentSection();
		
		this.calcThreePosition();
		this.calcThreeRotation();

		this.applyPageOffset( this.pageOffset );
		
	}

	private updateScroll( deltaTime: number ){

		this._pageOffsetMem = this.pageOffset;

		if ( this.isAutoMoving ) {

			this.autoScroll( deltaTime );

		} else {
			
			this.manualScroll( deltaTime )

		}		

	}

	private manualScroll( deltaTime: number ){

		this._pageOffset += this._velocity;
		this._pageOffset = Math.min( Math.max( 0.0, this.pageOffset ), this.rect.height - window.innerHeight );
		this._velocity *= this.velocityAttenuation;

	}

	private autoScroll( deltaTime: number ){

		this.x += ( deltaTime ? deltaTime : 0.016 ) / this.duration;
	
		let ended = false;
		
		if ( this.x >= 1.0 ) {

			ended = true;

			this.x = 1.0;

		}

		let w = this.easingAutoMove.func( this.x, this.easingAutoMove.variables );

		this._pageOffset = this.baseOffset + this.scrollDistance * w;

		if ( ended ) {

			if ( this.onAutoMoveFinished ) {

				this.onAutoMoveFinished();

			}

			this.isAutoMoving = false;
			this.onAutoMoveFinished = null;
			this._velocity = 0;
			this.autoMovingLock = false;

		}

	}

	private applyPageOffset( pageOffset: number ){

		this.element.style.transform = 'translate3d( 0,' + -pageOffset + 'px,0 )';
	
	}

	private checkThrowSection(){

		let i: number;

		for( i = 0; i < this.sections.length; i++ ){

			let sec = this.sections[i];
			let line: number;
			let pos: number = this._pageOffset;
			let posM: number = this._pageOffsetMem;
			
			if( sec.bottom ){

				line = sec.rect.bottom;
				pos += window.innerHeight;
				posM += window.innerHeight;

			}else{

				line = sec.rect.top;
				
			}

			//throw down scroll
			if( pos >= line && line > posM ){

				if( this.sections[i].onArrivalDownScroll ){

					this.sections[i].onArrivalDownScroll();

				}
				
				this.onThrowSection( i );

				break;
				
			}

			//throw up scroll
			if( pos <= line && line < posM ){				

				if( this.sections[i].onArrivalUpScroll ){

					this.sections[i].onArrivalUpScroll();
					
				}

				this.onThrowSection( i );

				break;
				
			}

			//stay
			if( pos == posM && pos == line ){

				this.onThrowSection( i );

				break;
				
			}

		}

	}

	private onThrowSection( secNum: number ){
		
		if( this.stopSection == secNum ){

			return;
		
		}
		
		if( this.sections[secNum].stop ){

			this.isStop = true;
			this.stopSection = secNum;
			this._velocity = 0;

			this.setPageOffsetToSection( secNum );
			
		}
	}

	private setPageOffsetToSection( secNum: number ){

		if( this.sections[secNum].bottom ){

			this._pageOffset = this.sections[ secNum ].rect.bottom - window.innerHeight;

		}else{
			
			this._pageOffset = this.sections[ secNum ].rect.top;
			
		}

	}

	public getSection( name: string ){

		for( let i = 0; i < this.sections.length; i++ ){
			
			if( this.sections[i].name == name ){
			
				return this.sections[i];
			
			}
		
		}

		return null;

	}

	private getCurrentSection(){

		for( let i = 0; i < this.sections.length; i++){

			let a = this.sections[i];
			let ap = this.sectionScrollPercentages[a.name];

			let b = this.sections[i + 1];

			if( b == null ){

				if( ap > 0 ) {
					
					return i;
	
				}

				break;

			}

			let bp = this.sectionScrollPercentages[b.name];

			if( ap > 0 && bp == 0 ){

				return i;
				
			}

		}

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
			
			this.sectionScrollPercentages[under.name] = scrollPercentage;

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

				sum += this.sectionScrollPercentages[this.sections[i].name];
				num++;

			}

			let sec = this.sections[ this.currentSection ];

			let value = this.calcThreeEasings( sum / num, sec, 'pos' );
			
			this.threePosition.copy(aPos.clone().add( new THREE.Vector3().subVectors( bPos, aPos ).multiplyScalar( value ) ) );

		}else if( aPos ){

			this.threePosition.copy(aPos);

		}else if( bPos ){

			this.threePosition.copy(bPos);

		}
		
	}

	private calcThreeRotation(){

		let a: number;
		let b: number;
		let aRot: THREE.Quaternion;
		let bRot: THREE.Quaternion;

		for( let i = this.currentSection - 1; i >= 0; i-- ){
			
			a = i;
			aRot = this.sections[a].threeRotation;
			
			if( aRot != null ) break;

		}

		for( let i = this.currentSection; i < this.sections.length; i++ ){
			
			b = i;
			bRot = this.sections[b].threeRotation;
			
			if( bRot != null ) break;
			
		}

		let sum = 0;
		let num = 0;

		if( aRot && bRot){

			for( let i = a + 1; i <= b; i++ ){

				sum += this.sectionScrollPercentages[this.sections[i].name];
				num++;

			}

			let sec = this.sections[ this.currentSection ];
			let value = this.calcThreeEasings( sum / num, sec, 'rot' );

			this.threeRotation.copy( aRot.clone().slerp( bRot, value ));

		}else if( aRot ){

			this.threeRotation.copy(aRot);

		}else if( bRot ){

			this.threeRotation.copy(bRot);

		}
		
	}

	private calcThreeEasings( value: number, section: PageScrollerSection, type: string ){
		
		if( type == 'pos'){

			if( section.sectionEasings && section.sectionEasings.position ){

				return section.sectionEasings.position.func( value, section.sectionEasings.position.variables );
	
			}else{
	
				return this.easingPos.func( value , this.easingPos.variables );
	
			}
			
		}
		
		if( type == 'rot'){

			if( section.sectionEasings && section.sectionEasings.rotation ){

				return section.sectionEasings.rotation.func( value, section.sectionEasings.rotation.variables );
	
			}else{
	
				return this.easingRot.func( value , this.easingRot.variables );
	
			}
			
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

		let section: PageScrollerSection = param as PageScrollerSection;
		section.rect = rect;

		this.sections.push( section );
		this.sectionScrollPercentages[ param.name ] = 0;
		this._pageOffset = 0;
		this.currentSection = 0;

		this.sortSections();
		this.calcScrollPercentage();

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

		this.sectionScrollPercentages[this.sections[0].name] = 1;

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

}