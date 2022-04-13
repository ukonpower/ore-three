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

	public addFcurveGroup( curveName: string, fcurveGroup: FCurveGroup ) {

		this.curves[ curveName ] = fcurveGroup;

	}

	public removeFCurve( curveName: string ) {

		delete this.curves[ curveName ];

	}

	public getFCurveGroup( curveName: string ): FCurveGroup | null {

		return this.curves[ curveName ] || null;

	}

	/*-------------------------------
		Value as Uniform
	-------------------------------*/

	public assignUniforms( curveName: string, uniform: THREE.IUniform ) {

		if ( this.uniforms[ curveName ] !== undefined ) {

			console.warn( 'AnimationAction: uniform ' + curveName + ' is alraedy exist' );

		} else {

			this.uniforms[ curveName ] = uniform;

		}

	}

	public getUniforms<T>( curveName: string ): THREE.IUniform<T> {

		let uniName = curveName;

		if ( this.uniforms[ uniName ] ) {

			return this.uniforms[ uniName ];

		}

		this.uniforms[ uniName ] = {
			value: null
		};

		return this.uniforms[ uniName ];

	}

	public updateFrame( frame: number ) {

		let curveKeys = Object.keys( this.curves );

		for ( let i = 0; i < curveKeys.length; i ++ ) {

			let fcurveGroup = this.curves[ curveKeys[ i ] ];
			let uni = this.uniforms[ curveKeys[ i ] ];

			if ( ! fcurveGroup || ! uni ) continue;

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

	}

}
