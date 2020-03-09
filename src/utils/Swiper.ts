import { Animator } from "./Animator";
import { Easings, EasingSet } from "./Easings";

export declare interface SwiperParams {
	items: number;
	loop?: boolean;
}

export class Swiper {

	public itemCount: number;

	private _activeNum: number;
	private _value: number;

	public attenuation: number = 0.8;
	
	private isLoopMode: boolean;
	private swipeVelocity: number = 0;

	private isTouching: boolean = false;
	private value_mem: number;
	private pos: number;
	private pos_mem: number;
	private pos_start: number;
	private weight: number = 1.0;

	private animator: Animator;
	private isAutoSlide: boolean = false;
	
	constructor( param: SwiperParams ) {

		this.itemCount = param.items;
		this.isLoopMode = param.loop != null ? param.loop : false;

		this._activeNum = 0;
		this._value = 0;
		
		this.animator = new Animator();
		this.animator.add<number>( {
			name: "value",
			initValue: 0,
			easing: {
				func: Easings.sigmoid,
				variables: [ 5 ],
			}
		} )

	}

	public get value() {

		if( this.isLoopMode ){

			return ( ( this._value % this.itemCount ) + this.itemCount ) % ( this.itemCount );
			
		}
		
		return this._value;
		
	}

	public get activeNum() {

		return (( this._activeNum % this.itemCount ) + this.itemCount ) % this.itemCount;
		
	}

	public addVelocity( vel: number ) {

		this.swipeVelocity += vel;

	}

	public setVelocity( vel: number ) {

		this.swipeVelocity = vel;
		
	}

	public catch( pos: number ) {

		if( this.isAutoSlide ) return;
		
		this.isTouching = true;
		
		this.value_mem = this._value;
		this.pos = this.pos_start = this.pos_mem = pos;

	}

	public move( pos: number, weight?: number ){
		
		if( this.isAutoSlide || !this.isTouching ) return;
		
		this.pos_mem = this.pos;

		this.pos = pos;
		
		this.weight = weight;
		
	}

	public release() {

		if( this.isAutoSlide || !this.isTouching ) return;
		
		this.isTouching = false;

		this.setVelocity( ( this.pos_mem - this.pos ) * this.weight * 1.5 );
		
	}

	public select( num: number, callback?: Function, duration: number = 1.5, easing?: EasingSet ) { 

		if( this.isAutoSlide ) return
		
		let right = ( num - this.value + this.itemCount ) % this.itemCount;

		num = this.value + ( ( right < this.itemCount / 2 ) ? right : - ( this.itemCount - right ) );
			
		this.animator.setValue( 'value', this.value );

		if( easing ) {

			this.animator.setEasing( 'value', easing )
			
		}

		this.isAutoSlide = true;

		this.animator.animate( 'value', num, duration, () => {

			if( callback ) callback();
			
			this.isAutoSlide = false;
			
		 } );

	}
	
	public next( callback?: Function, duration: number = 1.5, easing?: EasingSet ) {

		this.select( ( this.activeNum + 1 ) % this.itemCount, callback, duration, easing );
		
	}

	public prev( callback?: Function, duration: number = 1.5, easing?: EasingSet ) {

		this.select( ( this.activeNum + ( this.itemCount - 1 ) ) % this.itemCount, callback, duration, easing );
		
	}
	
	public update( deltaTime? : number ) {

		this._value += this.swipeVelocity;
		this.swipeVelocity *= this.attenuation;

		if( this.animator.isAnimating ){

			this.animator.update( deltaTime || 1 / 16 );

			this._value = this.animator.get( 'value' );

		}
		
		if( this.isTouching ) {

			this._value = this.value_mem + ( this.pos_start - this.pos ) * this.weight;

			
		} else{

			//force to move active num

			if( this.isLoopMode ){

				this._activeNum = Math.round( this._value + this.getDirection( this.swipeVelocity ) * 0.3 );

			} else {

				this._activeNum = Math.max( 0, Math.min( this.itemCount - 1, Math.round( this._value ) ) );
				
			}

			this._value += ( this._activeNum - this._value ) * 0.2;

		}

	}

	private getDirection( vel: number ){

		return vel < 0 ? -1 : 1.0;
		
	}

}