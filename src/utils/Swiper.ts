export declare interface SwiperParams {
	items: number;
	loop?: boolean;
}

export class Swiper {

	private _activeNum: number;
	private _value: number;

	public attenuation: number = 0.8;
	
	private isLoopMode: boolean;
	private swipeVelocity: number = 0;
	private items: number;

	private isTouching: boolean = false;
	private value_mem: number;
	private pos: number;
	private pos_mem: number;
	private pos_start: number;
	private weight: number = 1.0;
	
	constructor( param: SwiperParams ) {

		this.items = param.items;
		this.isLoopMode = param.loop != null ? param.loop : false;

		this._activeNum = 0;
		this._value = 0;
		
	}

	public addVelocity( vel: number ) {

		this.swipeVelocity += vel;

	}

	public setVelocity( vel: number ) {

		this.swipeVelocity = vel;
		
	}

	public catch( pos: number ) {

		this.isTouching = true;
		
		this.value_mem = this._value;
		this.pos = this.pos_start = this.pos_mem = pos;

	}

	public move( pos: number, weight?: number ){
		
		this.pos_mem = this.pos;

		this.pos = pos;
		
		this.weight = weight;
		
	}

	public release() {

		this.isTouching = false;

		this.setVelocity( ( this.pos_mem - this.pos ) * this.weight * 2.0 );
		
	}

	public get value() {

		if( this.isLoopMode ){

			return this._value % this.items;
			
		}
		
		return this._value;
		
	}

	public get activeNum() {

		return this._activeNum % this.items;
		
	}
	
	public update() {

		this._value += this.swipeVelocity;
		this.swipeVelocity *= this.attenuation;
		
		if( this.isTouching ) {

			this._value = this.value_mem + ( this.pos_start - this.pos ) * this.weight;

			
		} else{

			//force to move active num

			if( this.isLoopMode ){

				this._activeNum = Math.round( this._value );

			} else {

				this._activeNum = Math.max( 0, Math.min( this.items - 1, Math.round( this._value ) ) );
				
			}

			this._value += ( this._activeNum - this._value ) * 0.1;

		}

	}

}