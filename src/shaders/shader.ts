export interface Uniforms{ [ key: string ] : THREE.IUniform }

export namespace UniformsLib {
	
  	export function CopyUniforms ( uni1: Uniforms, uni2: Uniforms ) { 

		let keys = Object.keys( uni2 );

		for( let i = 0; i < keys.length; i++ ){

			uni1[ keys[ i ] ] = uni2[ keys[ i ] ];
			
		}

	}

}