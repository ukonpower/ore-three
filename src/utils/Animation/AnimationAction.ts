import * as THREE from 'three';
import EventEmitter from 'wolfy87-eventemitter';
import { Uniforms } from '../Uniforms';
import { FCurve } from './FCurve';

export class AnimationAction extends EventEmitter {

	public name: string;
	public curves: { [name:string]: FCurve } = {};

	private uniforms: Uniforms;

	constructor( name?: string ) {

		super();

		this.name = name || '';
		this.uniforms = {};

	}

	public addCurve( name: string, curve: FCurve ) {

		this.curves[ name ] = curve;

	}

	public removeCurve( name: string ) {

		delete this.curves[ name ];

	}

	public getCurves( curveName: string ): FCurve[] {

		if ( this.curves[ curveName ] ) {

			return [ this.curves[ curveName ] ];

		} else {

			let curves = [];

			curves.push( this.curves[ curveName + '_x' ] );
			curves.push( this.curves[ curveName + '_y' ] );
			curves.push( this.curves[ curveName + '_z' ] );
			curves.push( this.curves[ curveName + '_w' ] );

			for ( let i = curves.length; i >= 0; i -- ) {

				if ( curves[ i - 1 ] != undefined ) {

					curves.length = i;
					return curves;

				}

			}

		}

		return [];

	}

	/*-------------------------------
		Value as Uniform
	-------------------------------*/

	public assignUniformAsProperty( propertyName: string, uniform: THREE.IUniform ) {

		if ( this.uniforms[ propertyName ] !== undefined ) {

			console.warn( 'AnimationAction: uniform ' + propertyName + ' is alraedy exist' );

		} else {

			this.uniforms[ propertyName ] = uniform;

		}

	}

	public getPropertyAsUniform<T>( propertyName: string ): THREE.IUniform<T> {

		let uniName = propertyName;

		if ( this.uniforms[ uniName ] ) {

			return this.uniforms[ uniName ];

		}

		this.uniforms[ uniName ] = {
			value: null
		};

		return this.uniforms[ uniName ];

	}

	public updateFrame( frame: number ) {

		let uniNames = Object.keys( this.uniforms );

		for ( let i = 0; i < uniNames.length; i ++ ) {

			let uniName = uniNames[ i ];

			let curve = this.getCurves( uniName );
			let uni = this.uniforms[ uniName ];

			if ( curve.length == 1 ) {

				uni.value = curve[ 0 ].getValue( frame );

				continue;

			} else if ( curve.length > 1 && uni.value != null ) {

				if ( curve.length == 2 && uni.value.isVector2 ) {

					uni.value.set(
						curve[ 0 ].getValue( frame ),
						curve[ 1 ].getValue( frame )
					);

					continue;

				} else if ( curve.length == 3 && uni.value.isVector3 ) {

					uni.value.set(
						curve[ 0 ].getValue( frame ),
						curve[ 1 ].getValue( frame ),
						curve[ 2 ].getValue( frame ),
					);

					continue;

				} else if ( curve.length == 4 && uni.value.isVector4 ) {

					uni.value.set(
						curve[ 0 ].getValue( frame ),
						curve[ 1 ].getValue( frame ),
						curve[ 2 ].getValue( frame ),
						curve[ 3 ].getValue( frame ),
					);

					continue;

				}

			}

			if ( curve.length == 2 ) {

				uni.value = new THREE.Vector2(
					curve[ 0 ].getValue( frame ),
					curve[ 1 ].getValue( frame )
				);

			} else if ( curve.length == 3 ) {

				uni.value = new THREE.Vector3(
					curve[ 0 ].getValue( frame ),
					curve[ 1 ].getValue( frame ),
					curve[ 2 ].getValue( frame )
				);

			} else if ( curve.length == 4 ) {

				uni.value = new THREE.Vector4(
					curve[ 0 ].getValue( frame ),
					curve[ 1 ].getValue( frame ),
					curve[ 2 ].getValue( frame ),
					curve[ 3 ].getValue( frame )
				);

			}

		}

	}

}
