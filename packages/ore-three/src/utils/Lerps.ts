import { AnimatorVariableType } from "./Animation/Animator";

export declare interface LerpFunc<T>{
	( a: T, b: T, t: number ): T;
}

export namespace Lerps {

	export function number( a: number, b: number, t: number ) {

		return a + ( b - a ) * t;

	}

	export function numberArray( a: number[], b: number[], t: number ) {

		if ( a.length == b.length ) {

			const c = [];

			for ( let i = 0; i < a.length; i ++ ) {

				c.push( a[ i ] + ( b[ i ] - a[ i ] ) * t );

			}

			return c;

		} else {

			console.log( 'Different length Arrays!!!' );

			return false;

		}

	}

	export function THREEVectors<T extends THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | THREE.Color >( a: T, b: T, t: number ) {

		return a.clone().lerp( b as any, t );

	}

	export function THREEQuaternion( a: THREE.Quaternion, b: THREE.Quaternion, t: number ) {

		return a.clone().slerp( b, t );

	}

	export function THREEEuler( a: THREE.Euler, b: THREE.Euler, t: number ) {

		const ac = a.clone();
		const bc = b.clone();

		ac.x = ac.x + ( bc.x - ac.x ) * t;
		ac.y = ac.y + ( bc.y - ac.y ) * t;
		ac.z = ac.z + ( bc.z - ac.z ) * t;

		return ac;

	}

	export function getLerpFunc( value: AnimatorVariableType ) {

		if ( typeof ( value ) == 'number' ) {

			return Lerps.number;

		} else if ( value instanceof Array ) {

			return Lerps.numberArray;

		} else if ( "isVector2" in value || "isVector3" in value || "isVector4" in value || "isColor" in value ) {

			return Lerps.THREEVectors;

		} else if ( "isQuaternion" in value ) {

			return Lerps.THREEQuaternion;

		} else if ( "isEuler" in value ) {

			return Lerps.THREEEuler;

		}

	}

}
