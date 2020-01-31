import * as THREE from 'three';
import  { EasingSet } from '../Easings'

export declare interface TimelineAnimatorKeyFrame<T> {
	time: number;
	value: T;
}

export declare interface TimelineAnimatorVariable<T> {
	keyframes: TimelineAnimatorKeyFrame<T>[];
	transitionFunc: ( a: T, b: T, t: number ) => T;
	value: T;
	easing?: EasingSet;
}

export declare interface TimelineAnimatorAddParams<T> {
	name: string;
	keyframes: TimelineAnimatorKeyFrame<T>[];
	customTransition?: ( a: T, b: T, t: number ) => T,
	easing?: EasingSet;
}
export class TimelineAnimator {
	
	private variables: { [name: string]: TimelineAnimatorVariable<any> } = {};
	private time: number;
	public defaultEasing: EasingSet;
	
	constructor( ) {

		this.time = 0

	}

	public add<T>( params: TimelineAnimatorAddParams<T> ) {
		
		if( params.keyframes.length == 0 ){

			console.warn( '"' + params.name + '"', 'Keyframe length is 0!!');
			
			return;
			
		}
		
		this.variables[ params.name ] = {
			keyframes: params.keyframes,
			transitionFunc: params.customTransition,
			easing: params.easing,
			value: null
		}

		this.variables[ params.name ].keyframes.sort( ( a, b ) => { return ( a.time < b.time ) ? -1 : 1 } );
		
		if( !this.variables[ params.name ].transitionFunc ){

			this.variables[ params.name ].transitionFunc = this.getTransitionFunc( params.keyframes[ 0 ].value )
			
		}
		
		this.calc();
		
		return params.name;

	}

	public getTransitionFunc( value: any ) {

		if( typeof( value ) == 'number' ){
			
			return ( a: number, b: number, t: number ) => {

				return a + ( b - a ) * t;
				
			}
			
		} else if ( value instanceof Array && typeof( value[0] ) == 'number' ) {

			return ( a: number[], b: number[], t: number ) => {

				if( a.length == b.length ){

					let c = [];

					for( let i = 0; i < a.length; i++ ){
					
						c.push( a[ i ] + ( b[ i ] - a[ i ] ) * t );
						
					}
					
					return c;

				}else{

					console.log( 'Different length Arrays!!!' );
					
					return false;
					
				}
				
			}

		} else if ( value.isVector2 | value.isVector3 | value.isVector4 ){

			return ( a: THREE.Vector2 & THREE.Vector3 & THREE.Vector4, b: THREE.Vector2 & THREE.Vector3 & THREE.Vector4, t: number ) => {

				return a.clone().lerp( b, t );

			}
			
		} else if ( value.isQuaternion ){

			return ( a: THREE.Quaternion, b: THREE.Quaternion, t: number ) => {

				return a.clone().slerp( b, t );
				
			}
			
		}

	}

	public get<T>( name: string ): T {

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

			let t = Math.max( kfs[ 0 ].time, Math.min( kfs[ kfs.length - 1 ].time ,this.time) )

			if( kfs.length == 1 ){

				t = kfs[ 0 ].time;
				a = b = kfs[ 0 ];
				
			} else {

				for( let j = 0; j < kfs.length - 1; j++ ){

					a = kfs[ j ];
					b = kfs[ j + 1 ];
	
					if( a.time <= t && t <= b.time ) break;
					
				}

				t = ( t - a.time ) / ( b.time - a.time );
				
			}

			
			if( valiable.easing ) {

				t = valiable.easing.func( t, valiable.easing.variables );
				
			}else if( this.defaultEasing ){

				t = this.defaultEasing.func( t, this.defaultEasing.variables );
				
			}
			
			if( valiable.transitionFunc ){

				valiable.value = valiable.transitionFunc( a.value, b.value, t );

				if( valiable.value === false ) {

					console.log( 'error at ' + '"' + keys[i] + '"' );
					
				}

			} else {

				console.warn( '"' + keys[i] + '"', 'Transition function is not set.' );
				
			}
			
			
		}
		
	}

}
