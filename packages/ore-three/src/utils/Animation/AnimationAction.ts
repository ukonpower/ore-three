import * as THREE from 'three';
import EventEmitter from 'wolfy87-eventemitter';
import { Uniforms } from '../Uniforms';
import { FCurveGroup } from './FCurveGroup';

export class AnimationAction extends EventEmitter {

	public name: string;
	public curves: {[key:string]:FCurveGroup} = {};

	private uniforms: Uniforms;

	constructor( name?: string ) {

		super();

		this.name = name || '';
		this.uniforms = {};

	}

	public addFcurveGroup( propertyName: string, fcurveGroup: FCurveGroup ) {

		this.curves[ propertyName ] = fcurveGroup;

	}

	public removeFCurve( propertyName: string ) {

		delete this.curves[ propertyName ];

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

	public getUniforms<T>( propertyName: string ): THREE.IUniform<T> | null {

		if ( this.uniforms[ propertyName ] ) {
			
			return this.uniforms[ propertyName ];
			
		}
		
		let curveGroup = this.getFCurveGroup(propertyName)

		if( curveGroup ) {
			
			let uni = {
				value: curveGroup.createInitValue() as unknown as T
			};
			
			this.uniforms[ propertyName ] = uni;
			
			return uni;

		}

		return null;

	}

	public getValue<T>( propertyName: string ): T | null {

		let uniform = this.getUniforms<T>(propertyName);

		if( uniform ) {

			return uniform.value
			
		}

		return null;

	}
	
	public getValueAsScalar( propertyName: string ) {

		let value = this.getValue<THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | number>( propertyName );

		if ( value ) {

			if ( typeof value == 'number' ) {

				return value;

			} else {

				return value.x;

			}

		}

		return 0;

	}

	public getValueAsVector2( propertyName: string ) {

		let value = this.getValue<THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | number>( propertyName );

		if ( value ) {

			if ( typeof value == 'number' ) {

				return new THREE.Vector2( value, 0.0 );

			} else if ( 'isVector2' in value ) {

				return value;

			} else {

				return new THREE.Vector2( value.x, value.y );

			}

		} else {

			return new THREE.Vector2();

		}

	}

	public getValueAsVector3( propertyName: string ) {

		let value = this.getValue<THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | number>( propertyName );

		if ( value ) {

			if ( ( value as THREE.Vector3 ).isVector3 ) {

				return value as THREE.Vector3;

			}

			if ( typeof value == 'number' ) {

				return new THREE.Vector3( value, value, value );

			} else {

				let res = new THREE.Vector3( value.x, value.y );

				if ( 'isVector4' in value ) {

					res.z = value.z;

				}

				return res;

			}

		} else {

			return new THREE.Vector3();

		}

	}

	public getValueAsVector4( propertyName: string ) {

		let value = this.getValue<THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | number>( propertyName );

		if ( value ) {

			if ( ( value as THREE.Vector4 ).isVector4 ) {

				return value as THREE.Vector4;

			}

			if ( typeof value == 'number' ) {

				return new THREE.Vector4( value, value, value, value );

			} else {

				let res = new THREE.Vector4( value.x, value.y );

				if ( 'isVector3' in value ) {

					res.z = value.z;

				}

			}

		} else {

			return new THREE.Vector4();

		}

	}

	public getValueAsEuler( propertyName: string ) {

		let value = this.getValue<THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | number>( propertyName );

		let res = new THREE.Euler();
		res.order = 'YXZ';

		if ( value ) {

			if ( typeof value == 'number' ) {

				res.x = value;

			} else {

				res.x = value.x;
				res.y = value.y;

				if ( 'isVector3' in value || 'isVector4' in value ) {

					res.z = value.z;

				}

			}

		}

		return res;

	}

	/*-------------------------------
		UpdateFrame
	-------------------------------*/
	
	public updateFrame( frame: number ) {

		let curveKeys = Object.keys( this.curves );

		for ( let i = 0; i < curveKeys.length; i ++ ) {

			let fcurveGroup = this.curves[ curveKeys[ i ] ];
			let uni = this.uniforms[ curveKeys[ i ] ];

			if ( ! fcurveGroup || ! uni ) continue;

			if ( fcurveGroup.curve.scalar ) {

				uni.value = fcurveGroup.curve.scalar.getValue( frame );

			}

			if ( fcurveGroup.curve.x ) {

				uni.value.x = fcurveGroup.curve.x.getValue( frame );

			}

			if ( fcurveGroup.curve.y ) {

				uni.value.y = fcurveGroup.curve.y.getValue( frame );

			}

			if ( fcurveGroup.curve.z ) {

				uni.value.z = fcurveGroup.curve.z.getValue( frame );

			}

			if ( fcurveGroup.curve.w ) {

				uni.value.w = fcurveGroup.curve.w.getValue( frame );

			}

		}

		this.emitEvent('update', [this] );

	}

}
