import * as THREE from 'three';

export declare interface TimelineAnimatorKeyFrame<T> {
	time: number;
	value: T;
}

export declare interface TimelineAnimatorVariable<T> {
	keyframes: TimelineAnimatorKeyFrame<T>[];
	easingFunc: ( a: T, b: T, t: number ) => T;
	value: T;
}

export class TimelineAnimator {
	
	private variables: { [name: string]: TimelineAnimatorVariable<any> } = {};
	private time: number;
	
	constructor( duration?: number ) {

		this.time = 0

	}

	public add<T>( name: string, initValue: T, keyframes: TimelineAnimatorKeyFrame<T>[], customEasing?: ( a: T, b: T, t: number ) => T ) {
		
		this.variables[ name ] = {
			keyframes: keyframes,
			easingFunc: customEasing,
			value: null
		}

		this.variables[ name ].keyframes.sort( ( a, b ) => { return ( a.time < b.time ) ? -1 : 1 } );
		
		this.calc();
		
		return name;

	}

	public get( name: string ) {

		return this.variables[ name ].value;

	}

	public update( time: number ) {

		this.time = time;
		
		this.calc();

	}

	private calc() {

		let keys = Object.keys( this.variables );

		for( let i = 0; i < keys.length; i++ ){

			let valiable = this.variables[ keys[ i ] ];
			let kfs = valiable.keyframes;
			
			let a: TimelineAnimatorKeyFrame<any>;
			let b: TimelineAnimatorKeyFrame<any>;

			for( let j = 0; j < kfs.length - 1; j++ ){

				a = kfs[ j ];
				b = kfs[ j + 1 ];

				if( a.time < this.time && this.time < b.time ) break;
				
			}

			let t = ( this.time - a.time ) / ( b.time - a.time );
			
			valiable.value = valiable.easingFunc( a.value, b.value, t );
			
		}
		
	}

}
