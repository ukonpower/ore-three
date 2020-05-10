import * as THREE from 'three';
import { PageScroller } from '.';

export declare interface PageScrollerEventArgs {
	scroller: PageScroller;
	section: PageScrollerSection;
	scrollMode: string;
	scrollDelta: number;
	scrollPower: number;
}

declare interface PageScrollerEvent {
	common?: ( args: PageScrollerEventArgs ) => void | boolean;
	up?: ( args: PageScrollerEventArgs ) => void | boolean;
	down?: ( args: PageScrollerEventArgs ) => void | boolean;
}

declare interface PageScrollerEvents {
	onStartScroll?: PageScrollerEvent
	onArrivals?: [ {
		percentage: number;
		event: PageScrollerEvent;
	} ]
}

export declare interface PageScrollerSectionParams {
	name: string;
	element: HTMLElement;
	events?: PageScrollerEvents;
	stop?: boolean;
	startScrollUp?: number;
	startScrollDown?: number;
	bottom?: boolean;
}

declare interface PageScrollerSectionRect {
	x: number;
	y: number;
	width: number;
	height: number;
}

export class PageScrollerSection {

	public name: string;
	public element: HTMLElement;
	public rect: PageScrollerSectionRect;
	public stop: boolean;
	public startScrollUp: number;
	public startScrollDown: number;
	public events: PageScrollerEvents;
	public bottom: boolean;
	public timelinePercentage: number = 0;

	constructor( params: PageScrollerSectionParams ) {

		this.name = params.name;
		this.element = params.element;
		this.stop = params.stop;
		this.events = params.events;
		this.bottom = params.bottom;
		this.startScrollDown = params.startScrollDown || 0;
		this.startScrollUp = params.startScrollUp || 0;

		this.updateRect( 0 );

	}

	public get isPageScrollerSection() {

		return true;

	}

	public updateRect( scrollPos: number ) {

		this.rect = {
			x: this.element.offsetLeft,
			y: this.element.offsetTop - scrollPos,
			width: this.element.offsetWidth,
			height: this.element.offsetHeight
		};

	}

	public getScrollPercentage( offsetPos?: number ) {

		let bottomOffset = ( this.bottom ? this.rect.height - window.innerHeight : 0 );
		let pos = ( this.rect.y + bottomOffset ) - ( offsetPos || 0 );

		let firstHalfHeight = this.bottom ? this.rect.height : window.innerHeight;
		let firstHalf = Math.min( 1.0, 1.0 - ( pos / firstHalfHeight ) );

		let secondHalfHeight = this.bottom ? window.innerHeight : this.rect.height;
		let secondHalf = Math.max( 0.0, - pos / secondHalfHeight );

		let percentage = firstHalf + secondHalf;

		return percentage;

	}

}
