import * as THREE from 'three';
import EventEmitter from 'wolfy87-eventemitter';
import { Uniforms } from '../Uniforms';
import { FCurveGroup } from './FCurveGroup';

export type AnimationFrameInfo = {
	start: number
	end: number
	duration: number
}

export class AnimationAction extends EventEmitter {

	public name: string;
	public curves: {[key:string]:FCurveGroup} = {};
	private uniforms: Uniforms;
	
	public frame: AnimationFrameInfo;

	constructor( name?: string ) {

		super();

		this.name = name || '';
		this.uniforms = {};

		this.frame = {
			start: 0,
			end: 0,
			duration: 0,
		}
		
	}

	public addFcurveGroup( propertyName: string, fcurveGroup: FCurveGroup ) {

		this.curves[ propertyName ] = fcurveGroup;

		this.calcFrame();

	}

	public removeFCurve( propertyName: string ) {

		delete this.curves[ propertyName ];

		this.calcFrame();
		
	}

	private calcFrame() {

		let curveKeys = Object.keys( this.curves )

		let minStart = Infinity
		let maxEnd = -Infinity
		
		for ( let i = 0; i < curveKeys.length; i++ ) {

			let curve = (this.curves)[ curveKeys[ i ] ];

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

		this.frame.start = minStart;
		this.frame.end = maxEnd;
		this.frame.duration = this.frame.end - this.frame.start;

	}

	public getFCurveGroup( propertyName: string ): FCurveGroup | null {

		return this.curves[ propertyName ] || null;

	}

	/*-------------------------------
		get values
	-------------------------------*/

	public assignUniforms( propertyName: string, uniform: THREE.IUniform ) {

		this.uniforms[ propertyName ] = uniform;

	}

	public getUniforms<T extends THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | number>( propertyName: string ): THREE.IUniform<T> | null {

		if ( this.uniforms[ propertyName ] ) {
			
			return this.uniforms[ propertyName ];
			
		}
		
		let curveGroup = this.getFCurveGroup(propertyName)

		if( curveGroup ) {
			
			let uni = {
				value: curveGroup.createInitValue() as T
			};
			
			this.uniforms[ propertyName ] = uni;
			
			return uni;

		}

		return null;

	}

	public getValue<T extends THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | THREE.Euler | number>( propertyName: string ): T | null;
	
	public getValue<T extends THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | THREE.Euler >( propertyName: string, target: T ): T;
	
	public getValue( propertyName: string, target?: THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | THREE.Euler ): THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | THREE.Euler | number | null {

		let uniform = this.getUniforms(propertyName);

		if( !uniform ) return target || null;

		let value = uniform.value;
		
		if( !target ) return value;

		if( typeof value == 'number' ) {

			target.x = value;

			return target;

		}

		target.x = value.x;
		target.y = value.y;

		if( 'z' in target && 'z' in value ) {

			target.z = value.z
			
		}

		if( 'w' in target && 'w' in value ) {

			target.w = value.w
			
		}
		
		return target || null;

	}

	/*-------------------------------
		UpdateFrame
	-------------------------------*/
	
	public updateFrame( frame: number ) {

		let curveKeys = Object.keys( this.curves );

		for ( let i = 0; i < curveKeys.length; i ++ ) {

			let fcurveGroup = this.curves[ curveKeys[ i ] ];
			let uni = this.getUniforms( curveKeys[ i ] );

			if( !uni ) return;

			if( typeof uni.value == 'number' ) {

				if ( fcurveGroup.curve.scalar  ) {
					
					uni.value = fcurveGroup.curve.scalar.getValue( frame );
					
				}
				
				continue;

			}

			if ( fcurveGroup.curve.x ) {

				uni.value.x = fcurveGroup.curve.x.getValue( frame );

			}

			if ( fcurveGroup.curve.y ) {

				uni.value.y = fcurveGroup.curve.y.getValue( frame );

			}

			if ( fcurveGroup.curve.z && 'z' in uni.value ) {

				uni.value.z = fcurveGroup.curve.z.getValue( frame );

			}

			if ( fcurveGroup.curve.w  && 'w' in uni.value ) {

				uni.value.w = fcurveGroup.curve.w.getValue( frame );

			}

		}

		this.emitEvent('update', [this] );

	}

}
