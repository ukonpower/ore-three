import *  as THREE from 'three';

import { GPUComputationRenderer, ComputeRendererVariable } from '../../plugins/GPUComputationRenderer';
import { GPUComputationController, GPUcomputationData, GPUComputationKernel } from '../GPUComputationController';

import comShadePressure from './shader/pressure.fs';
import comShaderVelocity from './shader/velocity.fs';
import comShaderDivergence from './shader/divergence.fs';
import comShaderAdvect from './shader/advect.fs';

declare interface Kernels{
    velocity: GPUComputationKernel,
    pressure: GPUComputationKernel,
    divergence: GPUComputationKernel,
    advect: GPUComputationKernel
}

export class StableFluids{

    private renderer: THREE.WebGLRenderer;
    
    private gcConroller: GPUComputationController;

    private resolution: THREE.Vector2;
    private kernels: Kernels;
    private fluidData: GPUcomputationData;
   
    public solverIteration: number = 20         // 圧力計算の回数
    public attenuation: number = 1.00           // 圧力のステップごとの減衰値
    public alpha: number = 1.0                  // 圧力計算時の係数
    public beta: number = 1.0                   // 圧力計算時の係数
    public viscosity: number = 0.99             // 粘度
    public forceRadius: number = 90             // 加える力の半径
    public forceCoefficient: number = 1         // 加える力の係数
    public autoforceCoefficient: number = 0.06  // 自動で加える力の係数

    private time: number = 0;
	
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
        this.kernels.pressure.uniforms.alpha = { value: this.alpha };
        this.kernels.pressure.uniforms.beta = { value: this.beta };

        this.kernels.velocity.uniforms.dataTex = { value: null };
        this.kernels.velocity.uniforms.viscosity = { value: this.viscosity };
        this.kernels.velocity.uniforms.time = { value: this.time };
        this.kernels.velocity.uniforms.forceRadius = { value: this.forceRadius };
        this.kernels.velocity.uniforms.forceCoefficient = { value: this.forceCoefficient };
        this.kernels.velocity.uniforms.autoforceCoefficient = { value: this.autoforceCoefficient };
        this.kernels.velocity.uniforms.pointerPos = { value: 0 };
        this.kernels.velocity.uniforms.pointerVec = { value: 0 };

        this.kernels.advect.uniforms.dataTex = { value: null };
        this.kernels.advect.uniforms.attenuation = { value: this.attenuation };

        //create fluid data
        this.fluidData = this.gcConroller.createData();
        
    }

    public update( deltaTime: number ) {

        this.time += deltaTime;

        //update divergence
        this.kernels.divergence.uniforms.dataTex.value = this.fluidData.buffer.texture;
        this.gcConroller.compute( this.kernels.divergence, this.fluidData );

        //update pressure
        this.kernels.pressure.uniforms.dataTex.value = this.fluidData.buffer.texture;
        this.gcConroller.compute( this.kernels.pressure, this.fluidData );

        //update velocity
        this.kernels.velocity.uniforms.dataTex.value = this.fluidData.buffer.texture;
        this.kernels.velocity.uniforms.time.value = this.time;
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