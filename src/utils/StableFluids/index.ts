import *  as THREE from 'three';

import { GPUComputationController, GPUcomputationData, GPUComputationKernel } from '../GPUComputationController';

import comShadePressure from './shader/pressure.fs';
import comShaderVelocity from './shader/velocity.fs';
import comShaderDivergence from './shader/divergence.fs';
import comShaderAdvect from './shader/advect.fs';

declare interface Kernels{
    velocity: GPUComputationKernel;
    pressure: GPUComputationKernel;
    divergence: GPUComputationKernel;
    advect: GPUComputationKernel;
}

export interface StableFluidsParam{
    solverIteration: number;
    attenuation: number;
    alpha: number;
    beta: number;
    viscosity: number;
    screenAspect: number;
    pointerSize: number;
}

export class StableFluids{

    public parameter: StableFluidsParam = {
        solverIteration: 20,
        attenuation: 1.0,
        alpha: 1.0,
        beta: 1.0,
        viscosity: 0.999,
        screenAspect: 1.0,
        pointerSize: 0.5,
    }
 
    private gcConroller: GPUComputationController;

    private resolution: THREE.Vector2;

    private kernels: Kernels;
    private fluidData: GPUcomputationData;

    private renderer: THREE.WebGLRenderer;
	
    constructor( renderer :THREE.WebGLRenderer, resolution: THREE.Vector2 ) {
        
        this.renderer = renderer;
        this.resolution = resolution;
        
        this.gcConroller = new GPUComputationController( this.renderer, this.resolution );

        //create kernels
        this.kernels = {
            divergence: this.gcConroller.createKernel( comShaderDivergence ),
            velocity: this.gcConroller.createKernel( comShaderVelocity ),
            pressure: this.gcConroller.createKernel( comShadePressure ),
            advect: this.gcConroller.createKernel( comShaderAdvect )
        }

        this.kernels.divergence.uniforms.dataTex = { value: null };

        this.kernels.pressure.uniforms.dataTex = { value: null };
        this.kernels.pressure.uniforms.alpha = { value: this.parameter.alpha };
        this.kernels.pressure.uniforms.beta = { value: this.parameter.beta };

        this.kernels.velocity.uniforms.dataTex = { value: null };
        this.kernels.velocity.uniforms.viscosity = { value: this.parameter.viscosity };
        this.kernels.velocity.uniforms.screenAspect = { value: this.parameter.screenAspect };
        this.kernels.velocity.uniforms.pointerPos = { value: new THREE.Vector2( 0, 0 ) };
        this.kernels.velocity.uniforms.pointerVec = { value: new THREE.Vector2( 0, 0 ) };
        this.kernels.velocity.uniforms.pointerSize = { value: this.parameter.pointerSize };

        this.kernels.advect.uniforms.dataTex = { value: null };
        this.kernels.advect.uniforms.attenuation = { value: this.parameter.attenuation };

        //create fluid data
        this.fluidData = this.gcConroller.createData();
        
    }

    public update() {

        this.kernels.pressure.uniforms.alpha.value = this.parameter.alpha;
        this.kernels.pressure.uniforms.beta.value = this.parameter.beta;
        this.kernels.velocity.uniforms.viscosity.value = this.parameter.viscosity;
        this.kernels.velocity.uniforms.screenAspect.value = this.parameter.screenAspect;
        this.kernels.velocity.uniforms.pointerSize.value = this.parameter.pointerSize;
        this.kernels.advect.uniforms.attenuation.value = this.parameter.attenuation;

        //update divergence
        this.kernels.divergence.uniforms.dataTex.value = this.fluidData.buffer.texture;
        this.gcConroller.compute( this.kernels.divergence, this.fluidData );

        //update pressure
        for( let i = 0; i < this.parameter.solverIteration; i++ ){
            
            this.kernels.pressure.uniforms.dataTex.value = this.fluidData.buffer.texture;
            this.gcConroller.compute( this.kernels.pressure, this.fluidData );

        }

        //update velocity
        this.kernels.velocity.uniforms.dataTex.value = this.fluidData.buffer.texture;
        this.gcConroller.compute( this.kernels.velocity, this.fluidData );

        //advect
        this.kernels.advect.uniforms.dataTex.value = this.fluidData.buffer.texture;
        this.gcConroller.compute( this.kernels.advect, this.fluidData );

    }

    public setPointer( position: THREE.Vector2, vector: THREE.Vector2 ){

        this.kernels.velocity.uniforms.pointerPos.value = position;
        this.kernels.velocity.uniforms.pointerVec.value = vector;

    }

    public getTexture(): THREE.Texture {

        return this.fluidData.buffer.texture;

    }

}