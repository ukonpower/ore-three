import *  as THREE from 'three';

import comShadePressure from './shader/pressure.fs';
import comShaderGradientSubtract from './shader/gradientSubtract.fs';
import comShaderVelocity from './shader/velocity.fs';
import comShaderDivergence from './shader/divergence.fs';
import comShaderAdvect from './shader/advect.fs';
import comShaderCurl from './shader/curl.fs';
import { GPUComputationKernel, GPUComputationController, GPUcomputationData } from '../GPUComputationController';

declare interface Kernels{
    curl: GPUComputationKernel;
    velocity: GPUComputationKernel;
    pressure: GPUComputationKernel;
    gradientSubtract: GPUComputationKernel;
    divergence: GPUComputationKernel;
    advect: GPUComputationKernel;
}

export interface StableFluidsParam{
    solverIteration: number;
    screenAspect: number;
    pointerSize: number;
    curl: number;
    velocityAttenuation: number;
    pressureAttenuation: number;
}

export class StableFluids{

    public parameter: StableFluidsParam = {
        solverIteration: 20,
        screenAspect: 1.0,
        pointerSize: 1.0,
        curl: 0.1,
        velocityAttenuation: 0.95,
        pressureAttenuation: 0.8
    }
 
    private gcConroller: GPUComputationController;

    private resolution: THREE.Vector2;

    private kernels: Kernels;
    private fluidData: GPUcomputationData;
    private curlData: GPUcomputationData;

    private time: number = 0;
    private renderer: THREE.WebGLRenderer;
	
    constructor( renderer :THREE.WebGLRenderer, resolution: THREE.Vector2 ) {
        
        this.renderer = renderer;
        this.resolution = resolution;
        
        this.gcConroller = new GPUComputationController( this.renderer, this.resolution );

        //create kernels
        this.kernels = {
            curl: this.gcConroller.createKernel( comShaderCurl ),
            divergence: this.gcConroller.createKernel( comShaderDivergence ),
            velocity: this.gcConroller.createKernel( comShaderVelocity ),
            gradientSubtract: this.gcConroller.createKernel( comShaderGradientSubtract ),
            pressure: this.gcConroller.createKernel( comShadePressure ),
            advect: this.gcConroller.createKernel( comShaderAdvect )
        }

        this.kernels.curl.uniforms.dataTex = { value: null };
        this.kernels.curl.uniforms.curl = { value: this.parameter.curl };

        this.kernels.velocity.uniforms.dataTex = { value: null };
        this.kernels.velocity.uniforms.curlTex = { value: null };
        this.kernels.velocity.uniforms.screenAspect = { value: this.parameter.screenAspect };
        this.kernels.velocity.uniforms.pointerPos = { value: 0 };
        this.kernels.velocity.uniforms.pointerVec = { value: 0 };
        this.kernels.velocity.uniforms.pointerSize = { value: this.parameter.pointerSize };

        this.kernels.pressure.uniforms.dataTex = { value: null };

        this.kernels.gradientSubtract.uniforms.dataTex = { value: null };

        this.kernels.divergence.uniforms.dataTex = { value: null };

        this.kernels.advect.uniforms.dataTex = { value: null };
        this.kernels.advect.uniforms.velocityAttenuation = { value: this.parameter.velocityAttenuation };
        this.kernels.advect.uniforms.pressureAttenuation = { value: this.parameter.pressureAttenuation };

        //create fluid data
        this.fluidData = this.gcConroller.createData({
            magFilter: THREE.LinearFilter,
            minFilter: THREE.LinearFilter
        });

        this.curlData = this.gcConroller.createData({
            magFilter: THREE.LinearFilter,
            minFilter: THREE.LinearFilter
        });
        
    }

    public update( deltaTime: number ) {        

        this.time += deltaTime;
        
        
        this.kernels.curl.uniforms.curl.value = this.parameter.curl;
        this.kernels.velocity.uniforms.screenAspect.value = this.parameter.screenAspect;
        this.kernels.velocity.uniforms.pointerSize.value = this.parameter.pointerSize;
        this.kernels.advect.uniforms.velocityAttenuation.value = this.parameter.velocityAttenuation;
        this.kernels.advect.uniforms.pressureAttenuation.value = this.parameter.pressureAttenuation;

        //update curl
        this.kernels.curl.uniforms.dataTex.value = this.fluidData.buffer.texture;
        this.gcConroller.compute( this.kernels.curl, this.curlData );

        //update velocity
        this.kernels.velocity.uniforms.dataTex.value = this.fluidData.buffer.texture;
        this.kernels.velocity.uniforms.curlTex.value = this.curlData.buffer.texture;
        this.gcConroller.compute( this.kernels.velocity, this.fluidData );

        //update divergence
        this.kernels.divergence.uniforms.dataTex.value = this.fluidData.buffer.texture;
        this.gcConroller.compute( this.kernels.divergence, this.fluidData );

        //update pressure
        for( let i = 0; i < 20; i++ ){
            
            this.kernels.pressure.uniforms.dataTex.value = this.fluidData.buffer.texture;
            this.gcConroller.compute( this.kernels.pressure, this.fluidData );

        }

        //gradient subtract
        this.kernels.gradientSubtract.uniforms.dataTex.value = this.fluidData.buffer.texture;
        this.gcConroller.compute( this.kernels.gradientSubtract, this.fluidData );

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

    public resize( width: number, height: number ){
    }

}