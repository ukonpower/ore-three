
/*-------------------------------
		Bezier
-------------------------------*/

export namespace Bezier {

	export type BezierControlPoints = {
		p0: number;
		p1: number;
		p2: number;
		p3: number;
	}

	// inspired https://github.com/gre/bezier-easing/blob/master/src/index.js and https://github.com/0b5vr/automaton/blob/872420e798d9054d4a7a06c972cbb4261a67b4bc/src/bezierEasing.ts

	export const NEWTON_ITERATIONS = 4;
	export const NEWTON_MIN_SLOPE = 0.001;
	export const SUBDIVISION_PRECISION = 0.0000001;
	export const SUBDIVISION_MAX_ITERATIONS = 10;
	export const BEZIER_EASING_CACHE_SIZE = 11;
	export const BEZIER_EASING_SAMPLE_STEP_SIZE = 1.0 / BEZIER_EASING_CACHE_SIZE;

	function calcBezierA( p: BezierControlPoints ) {

		return - p.p0 + 3.0 * p.p1 - 3.0 * p.p2 + p.p3;

	}
	function calcBezierB( p: BezierControlPoints ) {

		return 3.0 * p.p0 - 6.0 * p.p1 + 3.0 * p.p2;

	}
	function calcBezierC( p: BezierControlPoints ) {

		return - 3.0 * p.p0 + 3.0 * p.p1;

	}

	export function calcBezierSlope( p: BezierControlPoints, t: number ) {

		return 3.0 * calcBezierA( p ) * t * t + 2.0 * calcBezierB( p ) * t + calcBezierC( p );

	}

	export function calcBezier( p: BezierControlPoints, t: number ) {

		return ( ( calcBezierA( p ) * t + calcBezierB( p ) ) * t + calcBezierC( p ) ) * t + p.p0;

	}

	function subdiv( x: number, startT: number, endT: number, p: BezierControlPoints ) {

		let currentX = 0;
		let currentT = 0;

		for ( let i = 0; i < SUBDIVISION_MAX_ITERATIONS; i ++ ) {

			currentT = startT + ( endT - startT ) / 2;
			currentX = calcBezier( p, currentT );

			if ( currentX > x ) {

				endT = currentT;

			} else {

				startT = currentT;

			}

		}

		return currentT;

	}

	function newton( x:number, p: BezierControlPoints, t: number ) {

		for ( let i = 0; i < NEWTON_ITERATIONS; i ++ ) {

			const slope = calcBezierSlope( p, t );

			if ( slope == 0.0 ) {

				return t;

			}

			const currentX = ( calcBezier( p, t ) ) - x;
			t -= currentX / slope;

		}

		return t;

	}

	export function getBezierTfromX( p: BezierControlPoints, x: number, cache: number[] ) {

		p.p1 = Math.max( p.p0, Math.min( p.p3, p.p1 ) );
		p.p2 = Math.max( p.p0, Math.min( p.p3, p.p2 ) );

		let sample = 0;

		for ( let i = 1; i < cache.length; i ++ ) {

			sample = i - 1;
			if ( x < cache[ i ] ) break;

		}

		const t = sample / ( BEZIER_EASING_CACHE_SIZE - 1.0 );
		const diff = calcBezierSlope( p, t ) / ( p.p3 - p.p0 );

		if ( diff == 0.0 ) {

			return t;

		} else if ( diff > 0.01 ) {

			return newton( x, p, t );

		} else {

			return subdiv( x, t, t + BEZIER_EASING_SAMPLE_STEP_SIZE, p );

		}


	}

}
