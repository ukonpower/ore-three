import * as THREE from 'three';
import { Easings, EasingSet } from '../Easings';
import { PageScrollerSection } from './PageScrollerSection';

export declare interface PageScrollerMoveToParam{
	target: HTMLElement | string | number;
	duration?: number;
	callback?: Function;
	bottom?: boolean;
	lock?: boolean;
	force?: boolean;
}

export interface ScrollPercentages{
	[key: string]: number
}

export class PageScroller {

	private element: HTMLElement;
	private rect: ClientRect;

	public enabled: boolean = true;

	//manual move
	private _velocity: number = 0;
	private _pageOffset: number = 0;
	private _pageOffsetMem: number = 0;
	public velocityAttenuation: number = 0.95;

	//auto move
	private x: number = 1.0;
	private duration: number;
	private baseOffset: number
	private targetOffset: number;
	private scrollDistance: number;
	private onAutoMoveFinished: Function;
	private isAutoMoving: boolean = false;
	private autoMovingLock: boolean = false;
	private forceAutoMove: boolean = false;

	//sections
	public sections: PageScrollerSection[] = [];
	public sectionScrollPercentages: ScrollPercentages = {};
	public currentSectionNum: number;

	//easing
	private easingPos: EasingSet;
	private easingRot: EasingSet;
	private easingAutoMove: EasingSet;

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

		for( let i = this.sections[0].bottom ? 0 : 1; i < this.sections.length; i++ ){

			sum += this.sectionScrollPercentages[ this.sections[ i ].name ];

		}

		return sum / ( this.sections.length - ( this.sections[ 0 ].bottom ? 0 : 1 ) );

	}

	public  getScrollPercentage( sectionA: PageScrollerSection, sectionB: PageScrollerSection ): number{

		if( sectionA.num >= sectionB.num ) return null;

		let sum = 0;
		let cnt = 0;
		
		for( let i = sectionA.num; i <= sectionB.num; i++ ) {

			sum += ( this.sectionScrollPercentages[ this.sections[ i ].name ] );
			cnt ++;
			
		}

		return sum / ( cnt || 1 );

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

		if( !this.enabled ) return;

		if( this.autoMovingLock ) return;

		if( this.isStop ){

			//スクロールロック解除条件に合わなければRETURN
			if( !this.checkUnlockStopScroll( scrollVelocity, 'add' ) ){

				return;

			}

		}

		this._velocity += scrollVelocity;

	}

	public setVelocity( scrollVelocity: number ) {

		if( !this.enabled ) return;

		if( this.autoMovingLock ) return;

		if( this.isStop ){

			//スクロールロック解除条件に合わなければRETURN
			if( !this.checkUnlockStopScroll( scrollVelocity, 'set' ) ){

				return;

			}

		}

		this._velocity = scrollVelocity;
	
	}

	private checkUnlockStopScroll( scrollVelocity: number, mode: string ){

		let unLock: boolean;
		let sec = this.sections[this.stopSection];

		if( sec.events.onStartScroll ){

			unLock = sec.events.onStartScroll({
				scroller: this,
				section: sec,
				scrollVelocity: scrollVelocity,
				scrollMode: mode
			});

		}else{

			unLock = true;

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
		
		if( !this.enabled && !param.force ) return;

		if( typeof param.target == 'number' ) {

			this.targetOffset = 0;
			
		} else if ( typeof param.target == 'string' ) {

			let targetSection = this.getSection( param.target );

			if( targetSection ){

				if( param.bottom ){

					this.targetOffset = targetSection.rect.bottom - window.innerHeight;

				}else{

					this.targetOffset = targetSection.rect.top;

				}

			}else{

				console.log( param.target + ' is not exist.' );
				
				return;
				
			}
			
		}else{

			let targetRect = param.target.getBoundingClientRect();
			this.targetOffset = targetRect.top;

		}
	
		this.baseOffset = this.pageOffset;

		this.x = 0;
		this._velocity = 0;
		this.isAutoMoving = true;
		this.duration = param.duration != null ? param.duration : 1.0;
		this.autoMovingLock = param.lock || false;
		this.scrollDistance = this.targetOffset - this.baseOffset;
		this.onAutoMoveFinished = param.callback;
		this.forceAutoMove = param.force || false;

		if( this.isStop ){

			//スクロールロック解除条件に合わなければRETURN
			if( !this.checkUnlockStopScroll( this.scrollDistance, 'auto' ) ){

				return;

			}

		}
	
	}

	public update( deltaTime?: number ) {

		if( !this.isStop ){

			this.updateScroll( deltaTime );
			
			this.checkThrowSection();

		}

		this.calcScrollPercentage();

		this.currentSectionNum = this.getCurrentSection();
		
		this.calcThreePosition();
		this.calcThreeRotation();

		
		this.applyPageOffset( this.pageOffset );
		
	}

	private updateScroll( deltaTime: number ){

		this._pageOffsetMem = this.pageOffset;

		if ( this.isAutoMoving ) {

			if( !this.enabled && !this.forceAutoMove ) return;

			this.autoScroll( deltaTime );

		} else {
			
			if( !this.enabled ) return;			

			this.manualScroll( deltaTime )

		}		

	}

	private manualScroll( deltaTime: number ){

		this._pageOffset += this._velocity;
		this._pageOffset = Math.min( Math.max( 0.0, this.pageOffset ), this.rect.height - window.innerHeight );
		this._velocity *= this.velocityAttenuation;

	}

	private autoScroll( deltaTime: number ){

		if( this.duration == 0 ){

			this.x = 1.0;
			
		} else {

			this.x += ( deltaTime ? deltaTime : 0.016 ) / this.duration;
			
		}
			
	
		let ended = false;
		
		if ( this.x >= 1.0 ) {

			ended = true;

			this.x = 1.0;

		}

		let w = this.easingAutoMove.func( this.x, this.easingAutoMove.variables );

		let newPos = this.baseOffset + this.scrollDistance * w;

		this._velocity = newPos - this._pageOffset;
		
		this._pageOffset = newPos;

		if ( ended ) {

			if ( this.onAutoMoveFinished ) {
				
				this.onAutoMoveFinished();

			}

			

			this.isAutoMoving = false;
			this.onAutoMoveFinished = null;
			this._velocity = 0;
			this.autoMovingLock = false;
			this._pageOffset = this._pageOffsetMem = this.targetOffset;
			
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

			//custom percentage
			for( let j = 0; j < sec.events.onArrivals.length; j++ ){

				let customLine: number = 0;

				if( sec.bottom ){

					customLine = sec.rect.bottom + sec.rect.height * sec.events.onArrivals[j].percentage

				}else{

					customLine = sec.rect.top + sec.rect.height * sec.events.onArrivals[j].percentage;

				}

				if( ( pos >= customLine && customLine > posM ) || ( pos <= customLine && customLine < posM ) || ( Math.abs( pos - posM ) < 0.1 && Math.abs( pos - customLine ) < 0.1 ) ){

					sec.events.onArrivals[j].event({
						scroller: this,
						section: sec,
						scrollVelocity: this._velocity,
						scrollMode: this.isAutoMoving ? 'auto' : 'manual'
					});

					break;
					
				}
			
			}

			//throw section
			if( ( pos >= line && line > posM ) || ( pos <= line && line < posM ) || ( Math.abs( pos - posM ) < 0.1 && Math.abs( pos - line ) < 0.1 ) ){
				
				this.onThrowSection( i );
				
			}

		}

	}

	private onThrowSection( secNum: number ){
		
		if( this.stopSection == secNum ){

			return;
		
		}
		
		let sec = this.sections[secNum];

		if( sec.stop ){
			
			if( this.isAutoMoving ){
				
				if( sec.events.onStartScroll ){					

					sec.events.onStartScroll({
						scroller: this,
						section: sec,
						scrollVelocity: this._velocity,
						scrollMode: 'auto',
					})

				}

			}else{

				this.isStop = true;
				this.stopSection = secNum;
				this._velocity = 0;
	
				this.setPageOffsetToSection( secNum );

			}
			
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

		for( let i = 0; i < this.sections.length; i++ ){

			if( i == 0 ) {

				if( this.sections[ 0 ].bottom ) {

					let percent = this.pageOffset / ( this.sections[ 0 ].rect.top + this.sections[ 0 ].rect.height - window.innerHeight );
					this.sectionScrollPercentages[ this.sections[0].name ] = Math.min( 1, Math.max( 0.0, percent));
					
				} else {

					this.sectionScrollPercentages[ this.sections[ 0 ].name ] = 1;
					
				}

				continue;

			}

			let top = this.sections[ i - 1 ];
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

				if( top.bottom ){

					num = this._pageOffset - topPos + window.innerHeight;
					deno = underPos - topPos + window.innerHeight;

				}else{

					num = this._pageOffset - topPos;
					deno = underPos - topPos;

				}
				

			}

			let percent = ( num ) / ( deno );
			
			this.sectionScrollPercentages[under.name] = Math.min( 1, Math.max( 0.0, percent));

		}

	}

	private calcThreePosition(){

		let a: number;
		let b: number;
		let aPos: THREE.Vector3;
		let bPos: THREE.Vector3;

		for( let i = this.currentSectionNum - 1; i >= 0; i-- ){
			
			a = i;
			aPos = this.sections[a].threePosition;
			
			if( aPos != null ) break;

		}

		for( let i = this.currentSectionNum; i < this.sections.length; i++ ){
			
			b = i;
			bPos = this.sections[b].threePosition;
			
			if( bPos != null ) break;
			
		}

		let sum = 0;
		let num = 0;

		if( aPos && bPos){

			for( let i = a + 1; i <= b; i++ ){

				sum += this.sectionScrollPercentages[ this.sections[i].name ];
				num++;

			}

			let sec = this.sections[ this.currentSectionNum ];

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

		for( let i = this.currentSectionNum - 1; i >= 0; i-- ){
			
			a = i;
			aRot = this.sections[a].threeRotation;
			
			if( aRot != null ) break;

		}

		for( let i = this.currentSectionNum; i < this.sections.length; i++ ){
			
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

			let sec = this.sections[ this.currentSectionNum ];
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

	public addSection( section: PageScrollerSection ){

		this.sections.push( section );
		this.sectionScrollPercentages[ section.name ] = 0;
		this._pageOffset = 0;
		this.currentSectionNum = 0;

		this.resize();

		this.calcScrollPercentage();

	}

	private sortSections( ){

		this.sections.sort( ( a: PageScrollerSection, b: PageScrollerSection ): number => {
			
			return a.rect.top > b.rect.top ? 1 : -1;
			// return ( a.bottom ? a.rect.bottom : a.rect.top) > ( b.bottom ? b.rect.bottom : b.rect.top) ? 1 : -1;

		} );

		let setThreePos = false;

		for( let i = 0; i < this.sections.length; i++ ){

			//sorted section number
			this.sections[i].num = i;

			this.sections[i].scrollPosition = i / ( this.sections.length - 1 );
			
			if( !setThreePos && this.sections[i].threePosition ){
				
				//initialize threeposition
				this.threePosition.copy( this.sections[i].threePosition );

				setThreePos = true;

			}
		}

		this.sectionScrollPercentages[this.sections[0].name] = 1;

	}

	public resize() {
	
		this.rect = this.element.getBoundingClientRect();

		if( this.sections.length == 0 ) return;

		for( let i = 0; i < this.sections.length; i++ ){

			this.sections[i].resize( this._pageOffset );			

		}

		this.sortSections();
	
	}

}