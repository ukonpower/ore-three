import { Bezier } from "./Bezier";

export type EasingFunc = ( t: number ) => any

export namespace Easings {

	export function sigmoid( weight: number = 6 ): EasingFunc {

		return ( x: number ) => {

			var e1 = Math.exp( - weight * ( 2 * x - 1 ) );
			var e2 = Math.exp( - weight );

			return ( 1 + ( 1 - e1 ) / ( 1 + e1 ) * ( 1 + e2 ) / ( 1 - e2 ) ) / 2;

		};

	}

	export function smoothstep( min: number, max: number, value: number ): number {

		let x = Math.max( 0, Math.min( 1, ( value - min ) / ( max - min ) ) );
		return x * x * ( 3 - 2 * x );

	}

	/*
	@auther https://gist.github.com/gre/1650294
	*/

	export function linear( t: number ) {

		return t;

	}

	export function easeInQuad( t: number ) {

		return t * t;

	}

	export function easeOutQuad( t: number ) {

		return t * ( 2 - t );

	}

	export function easeInOutQuad( t: number ) {

		return t < .5 ? 2 * t * t : - 1 + ( 4 - 2 * t ) * t;

	}

	export function easeInCubic( t: number ) {

		return t * t * t;

	}

	export function easeOutCubic( t: number ) {

		return ( -- t ) * t * t + 1;

	}

	export function easeInOutCubic( t: number ) {

		return t < .5 ? 4 * t * t * t : ( t - 1 ) * ( 2 * t - 2 ) * ( 2 * t - 2 ) + 1;

	}

	export function easeInQuart( t: number ) {

		return t * t * t * t;

	}

	export function easeOutQuart( t: number ) {

		return 1 - ( -- t ) * t * t * t;

	}

	export function easeInOutQuart( t: number ) {

		return t < .5 ? 8 * t * t * t * t : 1 - 8 * ( -- t ) * t * t * t;

	}

	export function easeInQuint( t: number ) {

		return t * t * t * t * t;

	}

	export function easeOutQuint( t: number ) {

		return 1 + ( -- t ) * t * t * t * t;

	}

  	export function easeInOutQuint( t: number ) {

  		return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * ( -- t ) * t * t * t * t;

  	}

	export function bezier( c1: THREE.Vec2, h1: THREE.Vec2, h2: THREE.Vec2, c2: THREE.Vec2 ): EasingFunc {

		var cache = new Array( Bezier.BEZIER_EASING_CACHE_SIZE );

		for ( var i = 0; i < Bezier.BEZIER_EASING_CACHE_SIZE; ++ i ) {

			cache[ i ] = Bezier.calcBezier( { p0: c1.x, p1: h1.x, p2: h2.x, p3: c2.x }, i / ( Bezier.BEZIER_EASING_CACHE_SIZE - 1.0 ) );

		}

		return ( x: number ) => {

			if ( x <= c1.x ) return c1.y;
			if ( c2.x <= x ) return c2.y;

			return Bezier.calcBezier( { p0: c1.y, p1: h1.y, p2: h2.y, p3: c2.y }, Bezier.getBezierTfromX( { p0: c1.x, p1: h1.x, p2: h2.x, p3: c2.x }, x, cache ) );

		};

	}

	export function cubicBezier( h1X: number, h1Y: number, h2X: number, h2Y: number ) {

		return bezier(
			{ x: 0.0, y: 0.0 },
			{ x: h1X as number, y: h1Y as number },
			{ x: h2X as number, y: h2Y as number },
			{ x: 1.0, y: 1.0 },
		);

	}

}
