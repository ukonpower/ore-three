import * as THREE from 'three';

export interface Uniforms{ [ key: string ] : THREE.IUniform }

export namespace UniformsLib {

  	export function CopyUniforms( uni1: Uniforms, uni2: Uniforms ) {

  		if ( ! uni1 || ! uni2 ) return uni1 || uni2;

  		let keys = Object.keys( uni2 );

  		for ( let i = 0; i < keys.length; i ++ ) {

  			if ( ! uni1[ keys[ i ] ] ) {

  				uni1[ keys[ i ] ] = uni2[ keys[ i ] ];

  			}

  		}

  		return uni1;

  	}

}
