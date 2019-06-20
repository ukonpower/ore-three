/**
 * 
 * GPUComputationRenderer by yomboprime
 * https://github.com/yomboprime
 * 
 * customized to typescript by ukonpower
 * 
*/

import *  as THREE from 'three';

export declare interface ComputeRendererVariable{
	name: string,
	initialValueTexture: THREE.Texture,
	material: THREE.ShaderMaterial,
	dependencies: any,
	renderTargets: THREE.WebGLRenderTarget[],
	wrapS: THREE.Wrapping,
	wrapT: THREE.Wrapping,
	minFilter: THREE.TextureFilter,
	magFilter: THREE.TextureFilter
}

export class GPUComputationRenderer{

	private variables: ComputeRendererVariable[] = [];
	private currentTextureIndex: number = 0;

	private renderer: THREE.WebGLRenderer;
	private scene: THREE.Scene;
	private camera: THREE.Camera;

	private mesh: THREE.Mesh;

	private sizeX: number;
	private sizeY: number;

	private passThruUniforms: any;
	private passThruShader: THREE.ShaderMaterial;


	constructor( sizeX:number, sizeY:number, renderer:THREE.WebGLRenderer ) {

		this.sizeX = sizeX;
		this.sizeY = sizeY;

		this.renderer = renderer;

		this.scene = new THREE.Scene();

		this.camera = new THREE.Camera;
		this.camera.position.z = 1;

		this.passThruUniforms = {
			texture: {
				value: null
			}
		}
		this.passThruShader = this.createShaderMaterial( this.getPassThroughFragmentShader(), this.passThruUniforms );

		this.mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), this.passThruShader );
		this.scene.add( this.mesh );

	}


	public addVariable( variableName: string, computeFragmentShader: string, initialValueTexture: THREE.Texture ) {

		let material = this.createShaderMaterial( computeFragmentShader );

		let variable: ComputeRendererVariable = {
			name: variableName,
			initialValueTexture: initialValueTexture,
			material: material,
			dependencies: null,
			renderTargets: [],
			wrapS: null,
			wrapT: null,
			minFilter: THREE.NearestFilter,
			magFilter: THREE.NearestFilter
		};

		this.variables.push( variable );

		return variable;
		
	};

	public setVariableDependencies( variable, dependencies ) {

		variable.dependencies = dependencies;

	};

	public init(): boolean {

		if ( ! this.renderer.extensions.get( "OES_texture_float" ) ) {

			return false;

		}

		if ( this.renderer.capabilities.maxVertexTextures === 0 ) {

			return false;

		}

		for ( var i = 0; i < this.variables.length; i++ ) {

			var variable = this.variables[ i ];

			// Creates rendertargets and initialize them with input texture
			variable.renderTargets[ 0 ] = this.createRenderTarget( this.sizeX, this.sizeY, variable.wrapS, variable.wrapT, variable.minFilter, variable.magFilter );
			variable.renderTargets[ 1 ] = this.createRenderTarget( this.sizeX, this.sizeY, variable.wrapS, variable.wrapT, variable.minFilter, variable.magFilter );
			
			this.renderTexture( variable.initialValueTexture, variable.renderTargets[ 0 ] );
			this.renderTexture( variable.initialValueTexture, variable.renderTargets[ 1 ] );

			// Adds dependencies uniforms to the ShaderMaterial
			var material = variable.material;
			var uniforms = material.uniforms;
			if ( variable.dependencies !== null ) {

				for ( var d = 0; d < variable.dependencies.length; d++ ) {

					var depVar = variable.dependencies[ d ];

					if ( depVar.name !== variable.name ) {

						// Checks if variable exists
						var found = false;
						for ( var j = 0; j < this.variables.length; j++ ) {

							if ( depVar.name === this.variables[ j ].name ) {
								found = true;
								break;
							}

						}
						if ( ! found ) {

							console.error("Variable dependency not found. Variable=" + variable.name + ", dependency=" + depVar.name);

							return false;

						}

					}

					uniforms[ depVar.name ] = { value: null };

					material.fragmentShader = "\nuniform sampler2D " + depVar.name + ";\n" + material.fragmentShader;

				}
			}
		}

		this.currentTextureIndex = 0;

		return null;

	};

	public compute() {

		var currentTextureIndex = this.currentTextureIndex;
		var nextTextureIndex = this.currentTextureIndex === 0 ? 1 : 0;

		for ( var i = 0, il = this.variables.length; i < il; i++ ) {

			var variable = this.variables[ i ];

			// Sets texture dependencies uniforms
			if ( variable.dependencies !== null ) {

				var uniforms = variable.material.uniforms;
				for ( var d = 0, dl = variable.dependencies.length; d < dl; d++ ) {

					var depVar = variable.dependencies[ d ];

					uniforms[ depVar.name ].value = depVar.renderTargets[ currentTextureIndex ].texture;

				}

			}

			// Performs the computation for this variable
			this.doRenderTarget( variable.material, variable.renderTargets[ nextTextureIndex ] );

		}

		this.currentTextureIndex = nextTextureIndex;
	};

	public getCurrentRenderTarget( variable: ComputeRendererVariable ): THREE.WebGLRenderTarget {

		return variable.renderTargets[ this.currentTextureIndex ];

	};

	public getAlternateRenderTarget( variable: ComputeRendererVariable ) {

		return variable.renderTargets[ this.currentTextureIndex === 0 ? 1 : 0 ];

	};
	
	public addResolutionDefine( materialShader: THREE.ShaderMaterial ) {

		materialShader.defines.resolution = 'vec2( ' + this.sizeX.toFixed( 1 ) + ', ' + this.sizeY.toFixed( 1 ) + " )";

	}
	// The following functions can be used to compute things manually

	public createShaderMaterial( computeFragmentShader: string , uniforms?: any ) {

		uniforms = uniforms || {};

		var material = new THREE.ShaderMaterial( {
			uniforms: uniforms,
			vertexShader: this.getPassThroughVertexShader(),
			fragmentShader: computeFragmentShader
		} );

		this.addResolutionDefine( material );

		return material;

	}

	public createRenderTarget( sizeXTexture: number, sizeYTexture: number, wrapS: THREE.Wrapping, wrapT: THREE.Wrapping, minFilter: THREE.TextureFilter, magFilter: THREE.TextureFilter ) {

		sizeXTexture = sizeXTexture || this.sizeX;
		sizeYTexture = sizeYTexture || this.sizeY;

		wrapS = wrapS || THREE.ClampToEdgeWrapping;
		wrapT = wrapT || THREE.ClampToEdgeWrapping;

		minFilter = minFilter || THREE.NearestFilter;
		magFilter = magFilter || THREE.NearestFilter;

		var renderTarget = new THREE.WebGLRenderTarget( sizeXTexture, sizeYTexture, {
			wrapS: wrapS,
			wrapT: wrapT,
			minFilter: minFilter,
			magFilter: magFilter,
			format: THREE.RGBAFormat,
			type: ( /(iPad|iPhone|iPod)/g.test( navigator.userAgent ) ) ? THREE.HalfFloatType : THREE.FloatType,
			stencilBuffer: false,
			depthBuffer: false
		} );

		return renderTarget;

	};


	public createTexture(): THREE.DataTexture {

		var a = new Float32Array( this.sizeX * this.sizeY * 4 );
		var texture = new THREE.DataTexture( a, this.sizeX, this.sizeY, THREE.RGBAFormat, THREE.FloatType );
		texture.needsUpdate = true;

		return texture;

	};

	public renderTexture( input: THREE.RenderTarget, output: THREE.RenderTarget ) {

		// Takes a texture, and render out in rendertarget
		// input = Texture
		// output = RenderTarget

		this.passThruUniforms.texture.value = input;

		this.doRenderTarget( this.passThruShader, output);

		this.passThruUniforms.texture.value = null;

	};

	public doRenderTarget( material: THREE.ShaderMaterial, output: THREE.RenderTarget ) {

		var currentRenderTarget = this.renderer.getRenderTarget();

		this.mesh.material = material;
		this.renderer.setRenderTarget( output );
		this.renderer.render( this.scene, this.camera );
		this.mesh.material = this.passThruShader;

		this.renderer.setRenderTarget( currentRenderTarget );

	};

	// Shaders

	private getPassThroughVertexShader(): string {
		return	"void main()	{\n" +
				"\n" +
				"	gl_Position = vec4( position, 1.0 );\n" +
				"\n" +
				"}\n";

	}

	private getPassThroughFragmentShader():string {

		return	"uniform sampler2D texture;\n" +
				"\n" +
				"void main() {\n" +
				"\n" +
				"	vec2 uv = gl_FragCoord.xy / resolution.xy;\n" +
				"\n" +
				"	gl_FragColor = texture2D( texture, uv );\n" +
				"\n" +
				"}\n";

	}

}