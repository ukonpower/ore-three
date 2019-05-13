import * as THREE from 'three';
import ppVert from './shaders/post-processing.vs';

declare interface PPParam {
    fragmentShader: string,
    uniforms: any
}

declare interface EffectMaterials {
    material: THREE.ShaderMaterial,
    uniforms: any
}

export class PostProcessing {
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private screenMesh: THREE.Mesh;

    private readBuffer: THREE.WebGLRenderTarget;
    private writeBuffer: THREE.WebGLRenderTarget;

    private effectMaterials: [EffectMaterials];

    constructor(renderer: THREE.WebGLRenderer, parameter: [PPParam]) {
        this.renderer = renderer;

        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        this.screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), null);
        this.scene.add(this.screenMesh);

        this.initRenderTargets();

        parameter.forEach((param, i) => {
            let mat = new THREE.ShaderMaterial({
                uniforms: param.uniforms,
                vertexShader: "varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4( position, 1.0 ); } ",
                fragmentShader: param.fragmentShader,
            })
            param.uniforms.backbuffer = { vlaue: null };
            let effectMaterial = { material: mat, uniforms: param.uniforms }
            if (!this.effectMaterials) {
                this.effectMaterials = [effectMaterial];
            }
            this.effectMaterials.push(effectMaterial);
        });
    }

    private initRenderTargets() {
        let size: THREE.Vector2 = new THREE.Vector2();
        this.renderer.getSize(size);
        size.multiplyScalar(this.renderer.getPixelRatio());
        this.readBuffer = new THREE.WebGLRenderTarget(size.x, size.y);
        this.writeBuffer = new THREE.WebGLRenderTarget(size.x, size.y);
    }

    private swapBuffers() {
        let tmp = this.readBuffer;
        this.readBuffer = this.writeBuffer;
        this.writeBuffer = tmp;
    }

    render(scene: THREE.Scene, camera: THREE.Camera) {
        this.renderer.setRenderTarget(this.readBuffer);
        this.renderer.render(scene, camera);
        this.effectMaterials.forEach((mat, i) => {
            this.screenMesh.material = mat.material;
            mat.uniforms["backbuffer"].value = this.readBuffer.texture;

            if (i < this.effectMaterials.length - 1) {
                this.renderer.setRenderTarget(this.writeBuffer);
            } else {
                this.renderer.setRenderTarget(null);
            }

            this.renderer.render(this.scene, this.camera);
            this.swapBuffers();
        })
    }
}