import * as ORE from '../..';

import comShaderPosition from './shaders/computePosition.glsl';
import comShaderVelocity from './shaders/computeVelocity.glsl';
import vert from './shaders/fish.vs';


import * as THREE from 'three';
import { GPUComputationController, GPUComputationKernel, GPUcomputationData } from '../GPUComputationController';

declare interface Kernels{
    velocity: GPUComputationKernel,
    position: GPUComputationKernel
}

export class Fish extends THREE.Object3D{
    
    private renderer: THREE.WebGLRenderer;

    private gcController: GPUComputationController
    private kernels: Kernels;
    private positionData: GPUcomputationData;
    private velocityData: GPUcomputationData;
    
    private num:number;
    private length: number;
    private uni: any;
    private fragment :string;

    constructor( renderer :THREE.WebGLRenderer, num : number, length :number,customComputeShader: string = null ) {
        
        super();

        this.renderer = renderer;
        this.num = num;
        this.length = length;
        this.fragment = customComputeShader != null ? customComputeShader : comShaderVelocity;

        this.gcController = new GPUComputationController( this.renderer, new THREE.Vector2( this.length, this.num ));
    
        //create kernels
        this.kernels = {
            position: this.gcController.createKernel( comShaderPosition ),
            velocity: this.gcController.createKernel( comShaderVelocity )
        }

        //create initialize texture
        let initPosTex = this.gcController.createInitializeTexture();
        this.initPosition( initPosTex );

        //create data
        this.positionData = this.gcController.createData( initPosTex );
        this.velocityData = this.gcController.createData();
        initPosTex.dispose();

        //set uniforms
        this.kernels.position.uniforms.texturePosition = { value: null };
        this.kernels.position.uniforms.textureVelocity = { value: null };

        this.kernels.velocity.uniforms.texturePosition = { value: null };
        this.kernels.velocity.uniforms.textureVelocity = { value: null };

        this.kernels.velocity.uniforms.time = { value: 0 };
        this.kernels.velocity.uniforms.seed = { value: Math.random() * 100.0 };

        this.createTrails();

    }

    initPosition( tex: THREE.DataTexture ) {
        
        var texArray = tex.image.data;
        let range = new THREE.Vector3( 10, 10, 10);
    
        for ( var i = 0; i < texArray.length; i += this.length * 4 ) {
    
            let x = Math.random() * range.x - range.x / 2;
            let y = Math.random() * range.y - range.y / 2;
            let z = Math.random() * range.z - range.z / 2;
    
            for ( let j = 0; j < this.length * 4; j += 4 ) {
                texArray[i + j + 0] = x;
                texArray[i + j + 1] = y;
                texArray[i + j + 2] = z;
                texArray[i + j + 3] = 1.0;
    
            }
    
        }
    
    }

    createTrails() {
        
        let geo = new THREE.InstancedBufferGeometry();

        let posArray = [];
        let indexArray = [];
        let normalArray = [];
        let uvXArray = [];
        let uvYArray = [];

        let r = .1;
        let res = 10;
        
        for ( let j = 0; j < this.length; j++ ) {
        
            let cNum = j;
        
            for ( let k = 0; k < res; k++ ) {
                let rad = Math.PI * 2 / res * k;
                let x = Math.cos( rad ) * r;
                let y = Math.sin( rad ) * r;
                let z = j * 1.6;
                z = 0;

                posArray.push( x );
                posArray.push( y );
                posArray.push( z );

                let nml = new THREE.Vector3( x, y, z );
                nml.normalize();

                normalArray.push( nml.x, nml.y, nml.z );

                uvXArray.push( j / this.length );

                let c = cNum * res + k;
                
                if ( j > 0 ) {
                
                    indexArray.push( c );
                    indexArray.push( ( ( cNum - 1 ) * ( res ) + ( k + 1 ) % res ) );
                    indexArray.push( ( cNum * res + ( ( k + 1 ) % res ) ) );

                    indexArray.push( c );
                    indexArray.push( c - res );
                    indexArray.push( ( ( cNum - 1 ) * res + ( ( k + 1 ) % res ) ) );
                
                }
        
            }
        
        }

        let pos = new Float32Array( posArray );
        let normal = new Float32Array( normalArray );
        let indices = new Uint32Array( indexArray );
        let uvx = new Float32Array( uvXArray );

        geo.addAttribute( 'position', new THREE.BufferAttribute( pos, 3 ) );
        geo.addAttribute( 'uvx', new THREE.BufferAttribute( uvx, 1 ) );
        geo.addAttribute( 'normal', new THREE.BufferAttribute( normal, 3 ) );
        geo.setIndex( new THREE.BufferAttribute( indices, 1 ) );

        //instanecing attribute
        for ( let i = 0; i < this.num; i++ ) {
        
            uvYArray.push( i / this.num );
        
        }

        let uvy = new Float32Array( uvYArray );
        geo.addAttribute( 'uvy', new THREE.InstancedBufferAttribute( uvy, 1, false, 1 ) );

        let customUni = {
            texturePosition: {
                value: null
            },
            textureVelocity: {
                value: null
            },
        }

        let phong = THREE.ShaderLib.standard;
        this.uni = THREE.UniformsUtils.merge( [phong.uniforms, customUni] );

        let mat = new THREE.ShaderMaterial( {
            uniforms: this.uni,
            vertexShader: vert,
            fragmentShader: phong.fragmentShader,
            lights: true,
            flatShading: true,
        } );

        let obj = new THREE.Mesh( geo, mat );
        obj.matrixAutoUpdate = false;
        obj.updateMatrix();

        this.add( obj );
    
    }

    update( time ) {
    
        this.kernels.velocity.uniforms.time.value = time;
        this.kernels.velocity.uniforms.textureVelocity.value = this.velocityData.buffer.texture;
        this.kernels.velocity.uniforms.texturePosition.value = this.positionData.buffer.texture;

        this.gcController.compute( this.kernels.velocity, this.velocityData );

        this.kernels.position.uniforms.textureVelocity.value = this.velocityData.buffer.texture;
        this.kernels.position.uniforms.texturePosition.value = this.positionData.buffer.texture;

        this.gcController.compute( this.kernels.position, this.positionData );
        
        this.uni.texturePosition.value = this.positionData.buffer.texture;
        this.uni.textureVelocity.value = this.velocityData.buffer.texture;
    
    }

    public dispose(){

        this.positionData.buffer.dispose();
        this.velocityData.buffer.dispose();
        this.gcController.dispose();

    }
}