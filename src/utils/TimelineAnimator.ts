import * as THREE from 'three';
import { EasingFunc } from './Easings';
import { Lerps, LerpFunc } from './Lerps';

export declare interface TimelineAnimatorKeyFrame<T> {
	time: number;
	value: T;
	easing?: EasingFunc;
}

export declare interface TimelineAnimatorVariable<T> {
	keyframes: TimelineAnimatorKeyFrame<T>[];
	lerpFunc?: LerpFunc<T>;
	value: T;
	easing?: EasingFunc;
}

export declare interface TimelineAnimatorAddParams<T> {
	name: string;
	keyframes: TimelineAnimatorKeyFrame<T>[];
	customLerp?: LerpFunc<T>,
	easing?: EasingFunc;
}
export class TimelineAnimator {

	protected variables: { [name: string]: TimelineAnimatorVariable<any> } = {};
	protected time: number;
	public defaultEasing?: EasingFunc;

	constructor( ) {

		this.time = 0;

	}

	public add<T>( params: TimelineAnimatorAddParams<T> ) {

		if ( params.keyframes.length == 0 ) {

			console.warn( '"' + params.name + '"', 'Keyframe length is 0!!' );

			return;

		}

		this.variables[ params.name ] = {
			keyframes: params.keyframes,
			lerpFunc: params.customLerp,
			easing: params.easing,
			value: null
		};

		this.variables[ params.name ].keyframes.sort( ( a, b ) => {

			return ( a.time < b.time ) ? - 1 : 1;

		} );

		if ( ! this.variables[ params.name ].lerpFunc ) {

			this.variables[ params.name ].lerpFunc = Lerps.getLerpFunc( params.keyframes[ 0 ].value );

		}

		this.calc();

		return params.name;

	}

	public get<T>( name: string ): T | null {

		if ( this.variables[ name ] ) {

			return this.variables[ name ].value;

		} else {

			console.warn( '"' + name + '"' + ' is not exist' );

			return null;

		}

	}

	public getVariableObject<T>( name: string ): TimelineAnimatorVariable<T> | null {

		if ( this.variables[ name ] ) {

			return this.variables[ name ];

		} else {

			console.warn( '"' + name + '"' + ' is not exist' );

			return null;

		}

	}

	public update( time: number ) {

		this.time = time;

		this.calc();

	}

	protected calc() {

		let keys = Object.keys( this.variables );

		for ( let i = 0; i < keys.length; i ++ ) {

			let valiable = this.variables[ keys[ i ] ];
			let kfs = valiable.keyframes;

			let a: TimelineAnimatorKeyFrame<any> | null = null;
			let b: TimelineAnimatorKeyFrame<any> | null = null;

			let t = Math.max( kfs[ 0 ].time, Math.min( kfs[ kfs.length - 1 ].time, this.time ) );

			let easing: EasingFunc | null | undefined = null;

			if ( kfs.length == 1 ) {

				t = kfs[ 0 ].time;
				a = b = kfs[ 0 ];

			} else {


				for ( let j = 0; j < kfs.length - 1; j ++ ) {

					a = kfs[ j ];
					b = kfs[ j + 1 ];

					easing = a.easing;

					if ( a.time <= t && t <= b.time ) break;

				}

				if ( a != null && b != null ) {

					t = ( t - a.time ) / ( b.time - a.time );

				}

			}

			if ( easing ) {

				t = easing( t );

			} else if ( valiable.easing ) {

				t = valiable.easing( t );

			} else if ( this.defaultEasing ) {

				t = this.defaultEasing( t );

			}

			if ( valiable.lerpFunc ) {

				if ( a != null && b != null ) {

					valiable.value = valiable.lerpFunc( a.value, b.value, t );

				}


				if ( valiable.value === false ) {

					console.log( 'error at ' + '"' + keys[ i ] + '"' );

				}

			} else {

				console.warn( '"' + keys[ i ] + '"', 'lerp function is not set.' );

			}


		}

	}

}
