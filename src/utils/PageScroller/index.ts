import * as THREE from 'three';
import { PageScrollerSection, PageScrollerSectionParams, PageScrollerEventArgs } from './PageScrollerSection';
import { EasingSet, Easings } from '../Easings';
import { Animator } from '../Animator';

export declare interface PageScrollerAutoMoveParam {
	target: string | number | PageScrollerSection;
	duration?: number;
	easing?: EasingSet;
	callBack?: Function;
	bottom?: boolean;
}

export class PageScroller {

	protected animator: Animator;
	protected isAutoMove: boolean;

	protected parentElement: HTMLElement;
	protected parentElementHeight: number;

	protected sections: PageScrollerSection[];

	public delaySpeed: number = 0.1;
	public dragDelaySpeed: number = 0.4;
	protected isTouching: boolean = false;
	protected deltaMem: number = 0;

	protected scrollReady: boolean = false;
	protected sumDelta: number = 0;

	protected _scrollPos: number = 0;
	protected _scrollPosMem: number;
	protected _scrollPercentage: number = 0;

	protected _scrollPosDelay: number = 0;
	protected _scrollPercentageDelay: number = 0;

	protected caughtSection: PageScrollerSection;
	protected dragStop: boolean = false;
	protected dragUnlockReady: boolean = true;

	constructor( parentElement: HTMLElement ) {

		this.parentElement = parentElement;

		this.sections = [];

		this.initAnimator();

	}

	protected initAnimator() {

		this.animator = new Animator();

		this.animator.add( {
			name: 'scrollPos',
			initValue: 0,
			easing: {
				func: Easings.sigmoid,
				args: 4
			}
		} );

	}

	public get scrollPos() {

		return this._scrollPos;

	}

	public get scrollPosDelay() {

		return this._scrollPosDelay;

	}

	public get scrollPercentage() {

		return this._scrollPercentage;

	}

	public get scrollPercentageDelay() {

		return this._scrollPercentageDelay;

	}

	public get scrollTimelinePercentage() {

		let sum = 0;

		for ( let i = 0; i < this.sections.length; i ++ ) {

			let sec = this.sections[ i ];
			let secBef = this.sections[ i - 1 ];

			let a = Math.max( 0.0, sec.element.offsetTop - this.scrollPosDelay + ( sec.bottom ? sec.rect.height - window.innerHeight : 0 ) );
			let b = ( ( secBef ? secBef.rect.height - ( secBef.bottom ? window.innerHeight : 0 ) : 0 ) + ( sec.bottom ? sec.rect.height - window.innerHeight : 0 ) ) || 1;

			let d = 1.0 - ( a / b );
			d = Math.max( 0.0, d );

			sum += d;

			if ( d < 1.0 ) break;

		}

		return sum / this.sections.length;

	}

	public add( section: PageScrollerSection ) {

		this.sections.push( section );

		this.sortSections();

	}

	public sortSections() {

		this.sections.sort( ( a: PageScrollerSection, b: PageScrollerSection ): number => {

			return a.rect.y > b.rect.y ? 1 : - 1;

		} );

		for ( let i = 0; i < this.sections.length; i ++ ) {

			this.sections[ i ].timelinePercentage = ( i + 1 ) / this.sections.length;

		}

	}

	public get( name: string ) {

		for ( let i = 0; i < this.sections.length; i ++ ) {

			if ( this.sections[ i ].name == name ) return this.sections[ i ];

		}

		console.warn( 'section "' + name + '" is not exist.' );

		return null;

	}

	public update( deltaTime: number ) {

		this.updateParentElement();

		this.updateScrollPos( deltaTime );

		this.applyParentElementTransform();

		this.sumDelta = 0.0;

	}

	protected updateScrollPos( deltaTime: number ) {

		this.updateAutoMove( deltaTime );

		this.addScrollPos();

		this.calcScrollProperties( deltaTime );

	}

	protected updateAutoMove( deltaTime ) {

		this.animator.update( deltaTime );

		if ( this.isAutoMove ) {

			this.sumDelta = this.animator.get<number>( 'scrollPos' ) - this.scrollPos;

		}

	}

	protected addScrollPos() {

		if ( this.checkUnlockStopScroll( this.sumDelta ) ) {

			let stopPos = this.checkThrow( this.sumDelta );

			if ( stopPos !== null ) {

				this._scrollPos = stopPos;

			} else {

				this._scrollPos += this.sumDelta;

			}

			this._scrollPos = Math.max( Math.min( this._scrollPos, this.parentElementHeight - window.innerHeight ), 0 );

		}

	}

	protected checkUnlockStopScroll( scrollDelta: number ) {

		let unlockDir: number = 0;
		let unlock: boolean = false;

		if ( this.caughtSection ) {

			let distance = this.scrollPos - this.scrollPosDelay;

			if ( scrollDelta * distance < 0 || Math.abs( distance ) < 10.0 || this.isAutoMove ) {

				if ( scrollDelta < 0 ) {

					if ( - scrollDelta > ( this.caughtSection.startScrollUp || 0 ) || this.isAutoMove ) {

						unlockDir = - 1;

					}

				} else if ( scrollDelta > 0 ) {

					if ( scrollDelta > ( this.caughtSection.startScrollDown || 0 ) || this.isAutoMove ) {

						unlockDir = 1;

					}

				}

			}

			if ( unlockDir != 0 && this.caughtSection.events ) {

				if ( this.caughtSection.events.onStartScroll ) {

					let args: PageScrollerEventArgs = {
						scroller: this,
						section: this.caughtSection,
						scrollMode: this.isAutoMove ? 'auto' : 'manual',
						scrollDelta: scrollDelta,
						scrollPower: Math.abs( scrollDelta ),
					};

					let unlock: boolean | void;

					let commonUnlock = this.caughtSection.events.onStartScroll.common && this.caughtSection.events.onStartScroll.common( args );
					if ( unlockDir == - 1 ) unlock = this.caughtSection.events.onStartScroll.up && this.caughtSection.events.onStartScroll.up( args );
					if ( unlockDir == 1 ) unlock = this.caughtSection.events.onStartScroll.down && this.caughtSection.events.onStartScroll.down( args );

					if ( commonUnlock === false || unlock === false ) {

						unlockDir = 0;

					}

				}

			}

			unlock = unlockDir != 0;

		} else {

			unlock = true;

		}

		if ( unlockDir ) {

			this.caughtSection = null;

		}

		return unlock;

	}

	protected checkThrow( scrollDelta: number ) {

		for ( let i = 0; i < this.sections.length; i ++ ) {

			let sec = this.sections[ i ];

			sec.updateRect( this._scrollPos );

			let stopPos = this.checkThrowSectionEvents( sec, scrollDelta );

			if ( stopPos !== null ) {

				this.caughtSection = sec;

				return this.isAutoMove ? null : stopPos;

			}

		}

		return null;

	}

	protected checkThrowSectionEvents( section: PageScrollerSection, scrollDelta: number ) {

		let percentage = section.getScrollPercentage();
		let movedPercentage = section.getScrollPercentage( scrollDelta );

		if ( section.events ) {

			let args: PageScrollerEventArgs = {
				scroller: this,
				section: section,
				scrollMode: this.isAutoMove ? 'auto' : 'manual',
				scrollDelta: scrollDelta,
				scrollPower: Math.abs( scrollDelta ),
			};

			let arrivalEvents = section.events.onArrivals && section.events.onArrivals.length || 0;

			for ( let i = 0; i < arrivalEvents; i ++ ) {

				let arrivalEvent = section.events.onArrivals[ i ];

				let isThrow = this.checkThrowLine( percentage, movedPercentage, arrivalEvent.percentage );

				if ( isThrow != 0 ) {

					arrivalEvent.event.common && arrivalEvent.event.common( args );

					if ( isThrow < 0 ) {

						arrivalEvent.event.up && arrivalEvent.event.up( args );

					} else {

						arrivalEvent.event.down && arrivalEvent.event.down( args );

					}

				}

			}

		}

		if ( section.stop ) {

			if ( this.checkThrowLine( percentage, movedPercentage, 1 ) ) {

				this.dragUnlockReady = false;

				return section.element.offsetTop + ( section.bottom ? section.rect.height - window.innerHeight : 0 );

			}

		}

		return null;

	}

	protected checkThrowLine( a: number, b :number, line: number ) {

		if ( a < line && line <= b ) {

			return 1;

		} else if ( a > line && line >= b ) {

			return - 1;

		} else if ( a == line && line == b ) {

			return 2;

		} else {

			return 0;

		}

	}

	protected calcScrollProperties( deltaTime ) {

		this._scrollPosDelay += ( this._scrollPos - this._scrollPosDelay ) * ( this.isTouching && ! this.caughtSection ? this.dragDelaySpeed : this.delaySpeed ) * Math.min( 1.0, deltaTime * 60 );

		this._scrollPercentage = this.scrollPosToPerecntage( this.scrollPos );

		this._scrollPercentageDelay = this.scrollPosToPerecntage( this.scrollPosDelay );

	}

	protected scrollPosToPerecntage( scrollPos: number ) {

		return scrollPos / ( this.parentElementHeight - window.innerHeight );

	}


	protected updateParentElement() {

		this.parentElementHeight = this.parentElement.getBoundingClientRect().height;

	}

	protected applyParentElementTransform() {

		this.parentElement.style.transform = 'translate3d( 0,' + - this.scrollPosDelay.toString() + 'px, 0 )';

	}

	public scroll( delta: number ) {

		this.deltaMem = ( this.deltaMem + delta ) / 2;
		this.sumDelta += delta;

	}

	public catch() {

		if ( this.isAutoMove ) return;

		this.isTouching = true;
		this.deltaMem = 0;

		if ( ! this.caughtSection ) {

			this._scrollPos = this._scrollPosDelay;

		}

	}

	public drag( delta: number ) {

		if ( ! this.isTouching ) return;

		this.scroll( delta );

	}

	public release( snap: number = 10.0 ) {

		if ( ! this.isTouching ) return;

		this.isTouching = false;

		if ( ! this.caughtSection ) {

			this.scroll( this.deltaMem * snap );

		}

	}

	public autoMove( param: PageScrollerAutoMoveParam ) {

		let targetPos: number;

		if ( ( param.target as PageScrollerSection ).isPageScrollerSection ) {

			let target = param.target as PageScrollerSection;
			let bottomOffset = param.bottom ? target.rect.height - window.innerHeight : 0;

			targetPos = target.element.offsetTop + bottomOffset;

		} else if ( typeof param.target == 'string' ) {

			let target = this.get( param.target );
			let bottomOffset = param.bottom ? target.rect.height - window.innerHeight : 0;

			targetPos = target.element.offsetTop + bottomOffset;

		} else if ( typeof param.target == 'number' ) {

			targetPos = param.target;

		}

		this.animator.setValue( 'scrollPos', this._scrollPos );
		this.animator.animate( 'scrollPos', targetPos, param.duration, () => {

			if ( param.callBack ) param.callBack();

			this.isAutoMove = false;

		}, param.easing );

		this.sumDelta = 0;
		this.isAutoMove = true;

	}

}
