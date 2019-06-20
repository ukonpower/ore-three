import *  as THREE from 'three';

import { GPUComputationRenderer, ComputeVariable } from '../../plugins/GPUComputationRenderer';

import comShadePressure from './shader/pressure.fs';
import comShaderVelocity from './shader/velocity.fs';
import comShaderDivergence from './shader/divergence.fs';

import { Uniforms } from '../../shaders/shader';

declare interface computeTexture{
    variable: ComputeVariable;
    uniforms: Uniforms
}

declare interface computeTextures{
    velocity: computeTexture,
    pressure: computeTexture,
    divergence: computeTexture,
}

export class StableFluids{

    private renderer: THREE.WebGLRenderer;
    
	private computeRenderer: GPUComputationRenderer;
    private comTexs: computeTextures;
	
    private resolution: THREE.Vector2;	
   
    private time: number = 0;
    
    public texPixelRatio: number = 0.4          // ピクセル比
    public solverIteration: number = 20         // 圧力計算の回数
    public attenuation: number = 1.00           // 圧力のステップごとの減衰値
    public alpha: number = 1.0                  // 圧力計算時の係数
    public beta: number = 1.0                   // 圧力計算時の係数
    public viscosity: number = 0.99             // 粘度
    public forceRadius: number = 90             // 加える力の半径
    public forceCoefficient: number = 1         // 加える力の係数
    public autoforceCoefficient: number = 0.06  // 自動で加える力の係数
	
    constructor( renderer :THREE.WebGLRenderer, resolution: THREE.Vector2 ) {
        
        this.renderer = renderer;
		this.resolution = resolution;
		
        this.comTexs = {
            velocity: {
                variable: null,
                uniforms: null,
            },
            pressure: {
                variable: null,
                uniforms: null,
            },
            divergence: {
                variable: null,
                uniforms: null,
            }
        }

        this.initComputeRenderer();

    }

    initComputeRenderer() {
        
        this.computeRenderer = new GPUComputationRenderer( this.resolution.x, this.resolution.y, this.renderer );

        //create init textures
        let intVelocityTex = this.computeRenderer.createTexture();
        this.initVector( intVelocityTex );

        //create variables
        this.comTexs.velocity.variable = this.computeRenderer.addVariable( "velocity", comShaderVelocity, intVelocityTex );
        this.comTexs.pressure.variable = this.computeRenderer.addVariable( "pressure", comShaderVelocity, intVelocityTex );
        this.comTexs.divergence.variable = this.computeRenderer.addVariable( "divergence", comShaderVelocity, intVelocityTex );
        
        //set dependencies
        this.computeRenderer.setVariableDependencies( this.comTexs.velocity.variable, [ this.comTexs.velocity.variable ] );
        this.computeRenderer.setVariableDependencies( this.comTexs.pressure.variable, [ this.comTexs.velocity.variable ] );
        this.computeRenderer.setVariableDependencies( this.comTexs.divergence.variable, [ this.comTexs.velocity.variable ] );

        //get uniform objects
        this.comTexs.velocity.uniforms = this.comTexs.velocity.variable.material.uniforms;
        this.comTexs.pressure.uniforms = this.comTexs.pressure.variable.material.uniforms;
        this.comTexs.divergence.uniforms = this.comTexs.divergence.variable.material.uniforms;

        //set velocity uniforms
        this.comTexs.velocity.uniforms.deltaTime = { value: 0 };
        this.comTexs.velocity.uniforms.viscosity = { value: this.viscosity };
        this.comTexs.velocity.uniforms.forceRadius = { value: this.forceRadius };
        this.comTexs.velocity.uniforms.forceCoefficient = { value: this.forceCoefficient };
        this.comTexs.velocity.uniforms.autoforceCoefficient = { value: this.autoforceCoefficient };
        this.comTexs.velocity.uniforms.pointerPos = { value: null };
        this.comTexs.velocity.uniforms.pointerPosBefore = { value: null };

        //set pressure uniforms
        this.comTexs.pressure.uniforms.deltaTime = { value: 0 };
        this.comTexs.pressure.uniforms.alpha = { value: 0 };
        this.comTexs.pressure.uniforms.beta = { value: 0 };
        
        //set divergence uniforms
        this.comTexs.divergence.uniforms.deltaTime = { value: 0 };

        //iniiiiiiiit
        this.computeRenderer.init();
    
        return true;
    
    }

    private initVector( tex: THREE.DataTexture ) {
    
        var texArray = tex.image.data;
    
        for ( var i = 0; i < texArray.length; i++ ) {
            
            texArray[i] = Math.random();

        }
    
    }

    public update( deltaTime: number ) {
	
		this.time += deltaTime;
        
        //update uniforms
        this.comTexs.velocity.uniforms.deltaTime.value = deltaTime;
        this.comTexs.pressure.uniforms.deltaTime.value = deltaTime;
        this.comTexs.divergence.uniforms.deltaTime.value = deltaTime;

        //compute
        this.computeRenderer.compute();

    }

    public getTexture(): THREE.Texture {
        
        return this.computeRenderer.getCurrentRenderTarget( this.comTexs.velocity.variable ).texture;

    }
}