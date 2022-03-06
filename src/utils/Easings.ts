export type EasingFunc = ( t: number ) => any

export type BezierControlPoints = {
	p0: number;
	p1: number;
	p2: number;
	p3: number;
}

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

	/*-------------------------------
		Bezier
	-------------------------------*/

	// inspired https://github.com/gre/bezier-easing/blob/master/src/index.js and https://github.com/0b5vr/automaton/blob/872420e798d9054d4a7a06c972cbb4261a67b4bc/src/bezierEasing.ts

	var NEWTON_ITERATIONS = 4;
	var NEWTON_MIN_SLOPE = 0.001;
	var SUBDIVISION_PRECISION = 0.0000001;
	var SUBDIVISION_MAX_ITERATIONS = 10;

	var kSplineTableSize = 11;
	var kSampleStepSize = 1.0 / ( kSplineTableSize - 1.0 );

	// q0 = ( 1.0 - t ) * ( 1.0 - t ) * ( 1.0 - t ) * p0;
	// = ( 1.0 - 3t + 3tt - ttt ) * p0

	// q1 = 3 * ( 1.0 - t ) * ( 1.0 - t ) * t * p1;
	// = ( 3t - 6tt + 3ttt ) * p1

	// q2 = ( 3 * ( 1.0 - t ) * t * t ) * p2;
	// = ( 3tt - 3ttt ) * p2

	// q3 = t * t * t * p3;
	// = ttt * p3

	// q0 + q2 + q2 + q3
	// = ( -p0 + 3p1 - 3p2 + p3) * ttt + ( 3p0 - 6p1 + 3p2 ) * tt + ( -3p0 + 3p1 ) * t + p0
	// = calcBezierA * ttt + calcBezierB * tt * calcBezierC * t + p0

	function calcBezierA( p: BezierControlPoints ) {

		return - p.p0 + 3.0 * p.p1 - 3.0 * p.p2 + p.p3;

	}
	function calcBezierB( p: BezierControlPoints ) {

		return 3.0 * p.p0 - 6.0 * p.p1 + 3.0 * p.p2;

	}
	function calcBezierC( p: BezierControlPoints ) {

		return - 3.0 * p.p0 + 3.0 * p.p1;

	}

	function calcBezierSlope( p: BezierControlPoints, t: number ) {

		return 3.0 * calcBezierA( p ) * t * t + 2.0 * calcBezierB( p ) * t + calcBezierC( p );

	}

	function calcBezier( p: BezierControlPoints, t: number ) {

		return ( ( calcBezierA( p ) * t + calcBezierB( p ) ) * t + calcBezierC( p ) ) * t + p.p0;

	}

	function newton( x:number, p: BezierControlPoints, t: number ) {

		for ( let i = 0; i < NEWTON_ITERATIONS; i ++ ) {

			let slope = calcBezierSlope( p, t );

			if ( slope == 0.0 ) {

				return t;

			}

			let currentX = calcBezier( p, t ) - x;
			t -= currentX / slope;

		}

		return t;

	}

	function getBezierTfromX( p: BezierControlPoints, x: number, cache: number[] ) {

		let sample = 0;

		for ( let i = 1; i < cache.length; i ++ ) {

			sample = i - 1;
			if ( x < cache[ i ] ) break;

		}

		const dist = ( x - cache[ sample ] ) / ( cache[ sample + 1 ] - cache[ sample ] );
		let t = ( sample + dist ) / ( kSplineTableSize - 1 );

		// console.log( "dist", x - cache[ sample ] );

		// console.log( "init t: ", t );


		let diff = calcBezierSlope( p, t ) / ( p.p3 - p.p0 );

		// if ( diff >= NEWTON_MIN_SLOPE ) {

		t = newton( x, p, t );

		// } else if ( diff == 0 ) {

		// 	return t;

		// } else {

		// 	// binary subdivide
		// }

		return t;

	}

	export function bezier( c1: THREE.Vec2, h1: THREE.Vec2, h2: THREE.Vec2, c2: THREE.Vec2 ): EasingFunc {

		var cache = new Array( kSplineTableSize );

		for ( var i = 0; i < kSplineTableSize; ++ i ) {

			cache[ i ] = calcBezier( { p0: c1.x, p1: h1.x, p2: h2.x, p3: c2.x }, i / ( kSplineTableSize - 1.0 ) );

		}

		return ( x: number ) => {

			if ( c2.x == 20 ) {

				// console.log( { p0: c1.x, p1: h1.x, p2: h2.x, p3: c2.x } );
				// console.log( x );

				// console.log( getBezierTfromX( { p0: c1.x, p1: h1.x, p2: h2.x, p3: c2.x }, x, cache ) );

			}

			return calcBezier( { p0: c1.y, p1: h1.y, p2: h2.y, p3: c2.y }, getBezierTfromX( { p0: c1.x, p1: h1.x, p2: h2.x, p3: c2.x }, x, cache ) );

		};

	}
}
