import * as THREE from 'three';
import { Uniforms } from '../../shaders/shader';

import passThroughVert from './shaders/passThrough.vs';
import passThroughFrag from './shaders/passThrough.fs';

export interface GPUComputationKernel{
    material: THREE.RawShaderMaterial,
    uniforms: Uniforms,
}

export interface GPUcomputationData{
    buffer: THREE.WebGLRenderTarget 
}

export class GPUComputationController {

    private renderer: THREE.WebGLRenderer;
    private resolution: THREE.Vector2

    private scene: THREE.Scene;
    private camera: THREE.Camera;

    private mesh: THREE.Mesh;
    private materials: THREE.ShaderMaterial[];

    private tempData: GPUcomputationData;

    
    public get isSupported() : boolean {
        
        return this.renderer.extensions.get( "OES_texture_float" );

    }

    constructor( renderer: THREE.WebGLRenderer, resolution: THREE.Vector2 ){

        this.renderer = renderer;

        this.resolution = resolution;

        this.tempData = this.createData({ 
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter
        });

        this.scene = new THREE.Scene();
		this.camera = new THREE.Camera();
        this.camera.position.z = 1;
        
        this.materials = [];
        this.mesh = new THREE.Mesh( new THREE.PlaneGeometry( 2, 2 ) );
		this.scene.add( this.mesh );

    }

    public createInitializeTexture(): THREE.DataTexture {

		let a = new Float32Array( this.resolution.x * this.resolution.y * 4 );
		let texture = new THREE.DataTexture( a, this.resolution.x, this.resolution.y, THREE.RGBAFormat, THREE.FloatType );
		texture.needsUpdate = true;

		return texture;

	}

    public createData(): GPUcomputationData;
    
    public createData( initializeTexture: THREE.DataTexture ): GPUcomputationData;

    public createData( textureParam: THREE.WebGLRenderTargetOptions ): GPUcomputationData;

    public createData( initializeTexture: THREE.DataTexture, textureParam: THREE.WebGLRenderTargetOptions ): GPUcomputationData;
    
    public createData( initTex_texParam?: any, textureParam? : THREE.WebGLRenderTargetOptions)  {

        let param: THREE.WebGLRenderTargetOptions = {
            wrapS: THREE.ClampToEdgeWrapping,
			wrapT: THREE.ClampToEdgeWrapping,
			minFilter: THREE.LinearFilter,
			magFilter: THREE.LinearFilter,
			format: THREE.RGBAFormat,
			type: ( /(iPad|iPhone|iPod)/g.test( navigator.userAgent ) ) ? THREE.HalfFloatType : THREE.FloatType,
			stencilBuffer: false,
			depthBuffer: false
        };

        
        let initTex: THREE.DataTexture;
        let customParam: THREE.WebGLRenderTargetOptions;

        if( initTex_texParam ){

            if( initTex_texParam.isDataTexture ){

                initTex = initTex_texParam;

                if( textureParam ){

                    customParam = textureParam;

                }

            }else{

                customParam = initTex_texParam;

            }

        }
        
        if( customParam ){
                
            param.wrapS = customParam.wrapS || param.wrapS;
            param.wrapT = customParam.wrapT || param.wrapT;
            param.minFilter = customParam.minFilter || param.minFilter;
            param.magFilter = customParam.magFilter || param.magFilter;
            param.format = customParam.format || param.format;
            param.type = customParam.type || param.type;
            param.stencilBuffer = customParam.stencilBuffer || param.stencilBuffer;
            param.depthBuffer = customParam.depthBuffer || param.depthBuffer;

        }

        let buf = new THREE.WebGLRenderTarget( this.resolution.x, this.resolution.y, param );

        let data = { buffer: buf };


        if( initTex ){

            let initKernel = this.createKernel( passThroughFrag );

            initKernel.uniforms.texture = { value: initTex };

            this.compute( initKernel, data );

        }

        return data;

    }

    public createKernel( shader: string ): GPUComputationKernel{
        
        let uniforms: Uniforms = {
            resolution: {
                value: this.resolution
            }
        };

        let mat = new THREE.ShaderMaterial({
            vertexShader: passThroughVert,
            fragmentShader: shader,
            uniforms: uniforms
        });

        this.materials.push(mat);

        let kernel: GPUComputationKernel = {
            material: mat,
            uniforms: uniforms
        }

        return kernel;

    }

    public compute( kernel: GPUComputationKernel, variable: GPUcomputationData ){

        this.mesh.material = kernel.material;

        this.renderer.setRenderTarget( this.tempData.buffer );

        this.renderer.render( this.scene, this.camera );
        
        this.swapBuffers( variable, this.tempData );

        this.renderer.setRenderTarget( null );
        
    }

    private swapBuffers( b1: GPUcomputationData, b2: GPUcomputationData ){

        let tmp = b1.buffer;
        b1.buffer = b2.buffer;
        b2.buffer = tmp;

    }

    public dispose(){

        let geo = this.mesh.geometry;
        geo.dispose();
        
        for( let i = 0; i < this.materials.length; i++ ){

            this.materials[i].dispose();
        
        }

        this.scene.remove( this.mesh );

        this.tempData.buffer.dispose();

    }

    
}