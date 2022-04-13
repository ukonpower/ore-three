import * as THREE from 'three';
import EventEmitter from 'wolfy87-eventemitter';
import { Uniforms } from '../Uniforms';
import { FCurveGroup } from './FCurve';

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

			let curve = this.curves[ curveKeys[ i ] ];
			let uni = this.uniforms[ curveKeys[ i ] ];

			if ( ! curve || ! uni ) continue;

			if ( curve.x ) {

				uni.value.x = curve.x.getValue( frame );

			}

			if ( curve.y ) {

				uni.value.y = curve.y.getValue( frame );

			}

			if ( curve.z ) {

				uni.value.z = curve.z.getValue( frame );

			}

			if ( curve.w ) {

				uni.value.w = curve.w.getValue( frame );

			}

		}

	}

}
