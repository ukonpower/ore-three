import * as ORE from '../..';

import comShaderPosition from './shaders/computePosition.glsl';
import comShaderVelocity from './shaders/computeVelocity.glsl';

import vert from './shaders/fish.vs';

import GPUComputationRenderer from '../../plugins/GPUComputationRenderer';

import * as THREE from 'three';

export class Fish extends ORE.BaseObject{
    private renderer: THREE.WebGLRenderer;
    private computeRenderer: any;
    private num:number;
    private length: number;
    public obj: THREE.Mesh;
    private comTexs: any;
    private uni: any;

    constructor(renderer :THREE.WebGLRenderer, num : number, length :number) {
        super();
        this.renderer = renderer;
        this.computeRenderer;
        this.num = num;
        this.length = length;
        
        this.comTexs = {
            position: {
                texture: null,
                uniforms: null,
            },
            velocity: {
                texture: null,
                uniforms: null,
            },
        }

        if (this.renderer.extensions.get( "OES_texture_float" ) ) {
            this.initComputeRenderer()
            this.createTrails();
        }else{
			console.log("No OES_texture_float support for float textures.");
        }
    }

    initComputeRenderer() {
        this.computeRenderer = new GPUComputationRenderer(this.length, this.num, this.renderer);

        if (this.computeRenderer == null) {
            return false;
        }

        let initPositionTex = this.computeRenderer.createTexture();
        let initVelocityTex = this.computeRenderer.createTexture();

        this.initPosition(initPositionTex);

        this.comTexs.position.texture = this.computeRenderer.addVariable("texturePosition", comShaderPosition, initPositionTex);
        this.comTexs.velocity.texture = this.computeRenderer.addVariable("textureVelocity", comShaderVelocity, initVelocityTex);

        this.computeRenderer.setVariableDependencies(this.comTexs.position.texture, [this.comTexs.position.texture, this.comTexs.velocity.texture]);
        this.comTexs.position.uniforms = this.comTexs.position.texture.material.uniforms;

        this.computeRenderer.setVariableDependencies(this.comTexs.velocity.texture, [this.comTexs.position.texture, this.comTexs.velocity.texture]);
        this.comTexs.velocity.uniforms = this.comTexs.velocity.texture.material.uniforms;
        this.comTexs.velocity.uniforms.time = {
            value: 0
        };
        this.comTexs.velocity.uniforms.seed = {
            value: Math.random() * 100
        };
        this.comTexs.velocity.uniforms.avoidPos = {
            value: new THREE.Vector3(0, 0, 0)
        };
        this.comTexs.velocity.uniforms.avoidScale = {
            value: 0
        };
        this.comTexs.velocity.uniforms.camY = {
            value: 0
        };
        this.computeRenderer.init();

        return true;
    }

    initPosition(tex) {
        var texArray = tex.image.data;
        let range = new THREE.Vector3(25, 25, 25);
        for (var i = 0; i < texArray.length; i += this.length * 4) {
            let x = Math.random() * range.x - range.x / 2;
            let y = Math.random() * range.y - range.y / 2;
            let z = Math.random() * range.z - range.z / 2;
            for (let j = 0; j < this.length * 4; j += 4) {
                texArray[i + j + 0] = x - 30;
                texArray[i + j + 1] = y + 20;
                texArray[i + j + 2] = z;
                texArray[i + j + 3] = 0.0;
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
        for (let j = 0; j < this.length; j++) {
            let cNum = j;
            for (let k = 0; k < res; k++) {
                let rad = Math.PI * 2 / res * k;
                let x = Math.cos(rad) * r;
                let y = Math.sin(rad) * r;
                let z = j * 1.6;
                z = 0;

                posArray.push(x);
                posArray.push(y);
                posArray.push(z);

                let nml = new THREE.Vector3(x, y, z);
                nml.normalize();

                normalArray.push(nml.x, nml.y, nml.z);

                uvXArray.push(j / this.length);

                let c = cNum * res + k;
                if (j > 0) {
                    indexArray.push(c);
                    indexArray.push(((cNum - 1) * (res) + (k + 1) % res));
                    indexArray.push((cNum * res + ((k + 1) % res)));

                    indexArray.push(c);
                    indexArray.push(c - res);
                    indexArray.push(((cNum - 1) * res + ((k + 1) % res)));
                }
            }
        }

        let pos = new Float32Array(posArray);
        let normal = new Float32Array(normalArray);
        let indices = new Uint32Array(indexArray);
        let uvx = new Float32Array(uvXArray);

        geo.addAttribute('position', new THREE.BufferAttribute(pos, 3));
        geo.addAttribute('uvx', new THREE.BufferAttribute(uvx, 1));
        geo.addAttribute('normal', new THREE.BufferAttribute(normal, 3));
        geo.setIndex(new THREE.BufferAttribute(indices, 1));

        //instanecing attribute
        for (let i = 0; i < this.num; i++) {
            uvYArray.push(i / this.num);
        }

        let uvy = new Float32Array(uvYArray);
        geo.addAttribute('uvy', new THREE.InstancedBufferAttribute(uvy, 1, false, 1));


        let customUni = {
            texturePosition: {
                value: null
            },
            textureVelocity: {
                value: null
            },
        }

        let phong = THREE.ShaderLib.standard;
        this.uni = THREE.UniformsUtils.merge([phong.uniforms, customUni]);

        let mat = new THREE.ShaderMaterial({
            uniforms: this.uni,
            vertexShader: vert,
            fragmentShader: phong.fragmentShader,
            lights: true,
            flatShading: true,
        });

        this.obj = new THREE.Mesh(geo, mat);
        this.obj.matrixAutoUpdate = false;
        this.obj.updateMatrix();
    }

    update(time) {
        this.computeRenderer.compute();
        this.comTexs.velocity.uniforms.time.value = time;
        this.uni.texturePosition.value = this.computeRenderer.getCurrentRenderTarget(this.comTexs.position.texture).texture;
        this.uni.textureVelocity.value = this.computeRenderer.getCurrentRenderTarget(this.comTexs.velocity.texture).texture;
    }

    setAvoidObje(pos, scale) {
        this.comTexs.velocity.uniforms.avoidPos.value = pos;
        this.comTexs.velocity.uniforms.avoidScale.value = scale;
    }

    setCamY(pos) {
        this.comTexs.velocity.uniforms.camY.value = pos;
    }
}