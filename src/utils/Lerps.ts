
export declare interface LerpFunc<T>{
	( a: T, b: T, t: number ): T;
} 

export namespace Lerps {
	
	export function number ( a: number, b: number, t: number ) { return a + ( b - a ) * t; }

	export function numberArray( a: number[], b: number[], t: number ) {

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

	export function THREEVectors ( a: THREE.Vector2 & THREE.Vector3 & THREE.Vector4 & THREE.Color, b: THREE.Vector2 & THREE.Vector3 & THREE.Vector4 & THREE.Color, t: number ) {

		return a.clone().lerp( b, t );

	}

	export function THREEQuaternion ( a: THREE.Quaternion, b: THREE.Quaternion, t: number ) {

		return a.clone().slerp( b, t );
		
	}

	export function getLerpFunc( value: any ) {

		if( typeof( value ) == 'number' ){
			
			return Lerps.number;
			
		} else if ( value instanceof Array && typeof( value[0] ) == 'number' ) {

			return Lerps.numberArray;

		} else if ( value.isVector2 | value.isVector3 | value.isVector4 | value.isColor ){

			return Lerps.THREEVectors;
			
		} else if ( value.isQuaternion ){

			return Lerps.THREEQuaternion;
			
		}

	}

}