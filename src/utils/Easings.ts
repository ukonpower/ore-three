export namespace Easings {
	
	export function sigmoid( x: number, variables: number[] ): number{
		
		let weight = 6;

		if( variables[0] ){
			
			weight = variables[0];

		}

		var e1 = Math.exp( -weight * ( 2 * x - 1 ) );
		var e2 = Math.exp( -weight );

		return ( 1 + ( 1 - e1 ) / ( 1 + e1 ) * ( 1 + e2 ) / ( 1 - e2 ) ) / 2;

	}
	
	export function smoothstep( min: number, max: number, value: number ): number{

		let x = Math.max( 0, Math.min( 1, value-min / ( max - min ) ) );
		
		return x * x * ( 3 - 2 * x );

	}

	/*
	@auther https://gist.github.com/gre/1650294
	*/

	export function linear ( t: number ) { return t }

	// accelerating from zero velocity
	export function easeInQuad ( t: number ) { return t*t }
	  
	// decelerating to zero velocity
	export function easeOutQuad ( t: number ) { return t*(2-t) }
	  
	// acceleration until halfway, then deceleration
	export function easeInOutQuad ( t: number ) { return t<.5 ? 2*t*t : -1+(4-2*t)*t }
	  
	// accelerating from zero velocity 
	export function easeInCubic ( t: number ) { return t*t*t }
	  
	// decelerating to zero velocity 
	export function easeOutCubic ( t: number ) { return (--t)*t*t+1 }
	  
	// acceleration until halfway, then deceleration 
	export function easeInOutCubic ( t: number ) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 }
	  
	// accelerating from zero velocity 
	export function easeInQuart ( t: number ) { return t*t*t*t }
	  
	// decelerating to zero velocity 
	export function easeOutQuart ( t: number ) { return 1-(--t)*t*t*t }
	  
	// acceleration until halfway, then deceleration
	export function easeInOutQuart ( t: number ) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t }
	  
	// accelerating from zero velocity
	export function easeInQuint ( t: number ) { return t*t*t*t*t }
	  
	// decelerating to zero velocity
	export function easeOutQuint ( t: number ) { return 1+(--t)*t*t*t*t }
	  
	// acceleration until halfway, then deceleration 
  	export function easeInOutQuint ( t: number ) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }

}