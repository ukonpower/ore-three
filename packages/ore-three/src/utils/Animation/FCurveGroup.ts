import * as THREE from 'three';
import EventEmitter from 'wolfy87-eventemitter';
import { FCurve, FCurveAxis } from './FCurve';

export type FCurveGroupType = 'scalar' | 'vec2' | 'vec3' | 'vec4'

export class FCurveGroup extends EventEmitter {

	public name: string;
	public curve: {[axis in FCurveAxis]: FCurve | null};
	public type: FCurveGroupType = 'scalar';

	public frameStart: number;
	public frameEnd: number;
	public frameDuration: number;

	constructor( name?: string, x?: FCurve, y?: FCurve, z?: FCurve, w?: FCurve, scalar?: FCurve ) {

		super();

		this.name = name || '';
		
		this.frameStart = 0;
		this.frameEnd = 0;
		this.frameDuration = 0;
		
		this.curve = {
			x: null,
			y: null,
			z: null,
			w: null,
			scalar: null
		};

		if( x ) {

			this.setFCurve( x, 'x' )

		}
		
		if( y ) {

			this.setFCurve( y, 'y' )
			
		}
		
		if( z ) {

			this.setFCurve( z, 'z' )
			
		}

		if( w ) {

			this.setFCurve( w, 'w' )
			
		}

	}

	public setFCurve( curve: FCurve, axis: FCurveAxis ) {

		this.curve[ axis ] = curve;

		this.calcType();
		this.calcFrame();

	}

	public calcType() {

		if ( this.curve.scalar ) {

			this.type = 'scalar';

		}

		if ( this.curve.w ) {

			this.type = 'vec4';

		} else if ( this.curve.z ) {

			this.type = 'vec3';

		} else if ( this.curve.y ) {

			this.type = 'vec2';

		} else if ( this.curve.x ) {

			this.type = 'scalar';

		}

	}
	
	private calcFrame() {
		
		let curveKeys = Object.keys( this.curve )

		let minStart = Infinity
		let maxEnd = -Infinity
		
		for ( let i = 0; i < curveKeys.length; i++ ) {

			let curve = (this.curve as {[key: string]: FCurve})[ curveKeys[ i ] ];

			if( !curve ) continue;

			if( curve.frameStart < minStart ) {

				minStart = curve.frameStart;
				
			}

			if( curve.frameEnd > maxEnd ) {

				maxEnd = curve.frameEnd;
				
			}

		}

		if( minStart == -Infinity || maxEnd == Infinity) {

			minStart = 0;
			maxEnd = 1
			
		}

		this.frameStart = minStart;
		this.frameEnd = maxEnd;
		this.frameDuration = this.frameEnd - this.frameStart;
		
	}
	
	public createInitValue() {

		if ( this.type == 'vec2' ) {

			return new THREE.Vector2();

		} else if ( this.type == 'vec3' ) {

			return new THREE.Vector3();

		} else if ( this.type == 'vec4' ) {

			return new THREE.Vector4();

		}

		return 0;

	}

	public getValue<T extends THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | THREE.Euler>( frame: number, target: T ): T;

	public getValue( frame: number ): number | null;

	public getValue<T extends THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | THREE.Euler>( frame: number, target?: T): T | number | null {

		if( target ) {

			if ( this.curve.x ) {

				target.x = this.curve.x.getValue( frame );

			}

			if ( this.curve.y ) {

				target.y = this.curve.y.getValue( frame );

			}

			if ( this.curve.z && 'z' in target ) {

				target.z = this.curve.z.getValue( frame );

			}

			if ( this.curve.w  && 'w' in target ) {

				target.w = this.curve.w.getValue( frame );

			}

			return target;
			
		} else {

			if ( this.curve.scalar ) {
						
				return  this.curve.scalar.getValue( frame );
				
			}

			return null;

		}
		
	}

	
}
