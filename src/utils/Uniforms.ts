import * as THREE from 'three';

export interface Uniforms{ [ key: string ] : THREE.IUniform }

export namespace UniformsLib {

	export function mergeUniforms( ...uniforms: ( Uniforms|undefined )[] ) : Uniforms {

		let res = {};

		for ( let i = 0; i < uniforms.length; i ++ ) {

			if ( uniforms[ i ] != undefined ) {

				Object.assign( res, uniforms[ i ] );

			}

		}

		return res;

	}

}
