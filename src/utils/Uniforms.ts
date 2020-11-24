import * as THREE from 'three';

export interface Uniforms{ [ key: string ] : THREE.IUniform }

export namespace UniformsLib {

  	export function CopyUniforms( uni1: Uniforms, uni2: Uniforms ) {

		if ( ! uni1 || ! uni2 ) return uni1 || uni2;

		let res: Uniforms = {};
		
		Object.assign( res, uni1 );
		Object.assign( res, uni2 );

  		return res;

  	}

}
