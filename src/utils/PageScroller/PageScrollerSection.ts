import * as THREE from 'three';
import { PageScroller } from '.';
import { EasingSet } from '../Easings';

export declare interface PageScrollerSectionParam{
	name: string;
	bottom?: Boolean;
	element: HTMLElement;
	events?: PageScrollerEvents;
	stop?: boolean;
	sectionEasings?: ScrollerSectionEasings;
	threePosition?: THREE.Vector3;
	threeRotation?: THREE.Quaternion;
}

export declare interface onArrivalEvent{
	percentage: number;
	event : ( args: ScrollEventArgs ) => void;
}

export declare interface PageScrollerEvents{
	onStartScroll?: ( args: ScrollEventArgs ) => boolean;
	onArrivals?: onArrivalEvent[];
}

declare interface ScrollEventArgs{
	scroller: PageScroller
	section: PageScrollerSection;
	scrollVelocity: number;
	scrollMode: string
}

export declare interface ScrollerSectionEasings{
	position?: EasingSet,
	rotation?: EasingSet
}

declare interface PageScrollerSectionRect{
	width: number;
	height: number;
	top: number;
	bottom: number;
}

export class PageScrollerSection{

	public threePosition?: THREE.Vector3;
	public threeRotation?: THREE.Quaternion;
	public sectionEasings?: ScrollerSectionEasings
	public stop?: boolean;
	public bottom?: Boolean;
	public num: number;
	public scrollPosition: number;

	private _name: string
	private _element: HTMLElement;
	private _events: PageScrollerEvents;
	private _rect: PageScrollerSectionRect;

	
	public get name(){
		
		return this._name;

	}

	public get element(){

		return this._element;

	}

	public get events(){

		return this._events;

	}

	public get rect(){

		return this._rect;

	}

	constructor( param: PageScrollerSectionParam ){

		if( !param.element ){

			console.error( '"' + param.name + '"' + ' Element is null.' );
			
			
		}
		
		let clientRect  = ( param.element as HTMLElement ).getBoundingClientRect();

		let rect: PageScrollerSectionRect = {
			top: clientRect.top,
			bottom: clientRect.bottom,
			width: clientRect.width,
			height: clientRect.height,
		}

		this._name = param.name;
		this._element = param.element;
		this._rect = rect;
		this.bottom = param.bottom || false;
		this.stop = param.stop || false;
		this.threePosition = param.threePosition || null;
		this.threeRotation = param.threeRotation || null;

		this._events = {
			onStartScroll: null,
			onArrivals: []
		}

		if( param.events ){
		
			this._events.onArrivals = param.events.onArrivals || [];
			this._events.onStartScroll = param.events.onStartScroll || null;
			
		}

		this.sectionEasings = {
			position: null,
			rotation: null
		}

		if( param.sectionEasings && param.sectionEasings.position ){

			this.sectionEasings.position = {
				func: param.sectionEasings.position.func || null,
				variables: param.sectionEasings.position.variables || [],
			}

		}

		if( param.sectionEasings && param.sectionEasings.rotation ){

			this.sectionEasings.rotation = {
				func: param.sectionEasings.rotation.func || null,
				variables: param.sectionEasings.rotation.variables || [],
			}

		}

	}

	public resize( pageOffset: number ){

		let clientRect = this._element.getBoundingClientRect();

		this.rect.bottom = clientRect.bottom + pageOffset;
		this.rect.top = clientRect.top + pageOffset;
		this.rect.width = clientRect.width;
		this.rect.height = clientRect.height;
			
	}

	public addArrivalEvent( ...customEvents: onArrivalEvent[] ){
		
		Array.prototype.push.apply( this._events.onArrivals, customEvents );
		
	}
	
}