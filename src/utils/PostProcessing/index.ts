import * as THREE from 'three';

export interface PPParam {
    fragmentShader: string,
    uniforms?: any
}

export interface EffectMaterial {
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
    public resultBuffer: THREE.WebGLRenderTarget;
    public resolution: THREE.Vector2;
    public resolutionRatio: number;

    private effectMaterials: [EffectMaterial];

    constructor(renderer: THREE.WebGLRenderer, parameter: PPParam[], resolutionRatio?: number) {

        this.renderer = renderer;
        this.resolutionRatio = resolutionRatio ? resolutionRatio : 1.0;

        this.resolution = new THREE.Vector2();
        this.renderer.getSize(this.resolution);
        this.resolution.multiplyScalar(this.renderer.getPixelRatio() * (this.resolutionRatio ? this.resolutionRatio : 1.0));

        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        this.screenMesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null);
        this.scene.add(this.screenMesh);
        
        this.initRenderTargets();
        
        parameter.forEach((param) => {

            if ( !param.uniforms ) param.uniforms = {};

            if ( !param.uniforms.backbuffer ){

                param.uniforms.backbuffer = { value: null };
            
            }

            if ( !param.uniforms.resolution ){

                param.uniforms.resolution = { value: this.resolution };

            }

            let mat = new THREE.ShaderMaterial({

                uniforms: param.uniforms,
                vertexShader: "varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4( position, 1.0 ); } ",
                fragmentShader: param.fragmentShader,
                depthTest: false,
                depthFunc: THREE.NeverDepth

            })

            let effectMaterial = { material: mat, uniforms: param.uniforms }

            if (!this.effectMaterials) {

                this.effectMaterials = [effectMaterial];

            }else{

                this.effectMaterials.push(effectMaterial);
            
            }
        });

    }

    private initRenderTargets() {
        
        this.readBuffer = this.createRenderTarget();
        this.writeBuffer = this.createRenderTarget();

    }

    public createRenderTarget(){

        return new THREE.WebGLRenderTarget(this.resolution.x,this.resolution.y);

    }

    private swapBuffers() {

        let tmp = this.writeBuffer;
        this.writeBuffer = this.readBuffer;
        this.readBuffer = tmp;

    }

    public render(offScreenRendering: boolean);

    public render(srcTexture?: THREE.Texture, offScreenRendering?: boolean);

    public render(scene: THREE.Scene, camera: THREE.Camera, offScreenRendering?: boolean);

    public render(scene_srcTexture_offScreen: any = false, camera_offScreenRendering: any = false, offScreenRendering: boolean = false) {

        let isOffscreen = false;
        let skipSetBackBuffer = false;

        if (scene_srcTexture_offScreen.type == 'Scene') {
            
            this.renderer.setRenderTarget(this.readBuffer);
            this.renderer.render(scene_srcTexture_offScreen, camera_offScreenRendering);

            isOffscreen = offScreenRendering;

        } else {

            if( typeof(scene_srcTexture_offScreen) == 'boolean'){

                isOffscreen = scene_srcTexture_offScreen;

            }else{

                this.effectMaterials[0].uniforms.backbuffer.value = scene_srcTexture_offScreen;
                skipSetBackBuffer = true;
                isOffscreen = camera_offScreenRendering;
  
            }

        }
        
        this.effectMaterials.forEach((mat, i) => {
            
            this.screenMesh.material = mat.material;          
            
            if(!skipSetBackBuffer || i > 0){

                mat.uniforms["backbuffer"].value = this.readBuffer.texture;
            
            }
            
            if (i < this.effectMaterials.length - 1 || isOffscreen) {
                
                this.renderer.setRenderTarget(this.writeBuffer);

            } else {
                
                this.renderer.setRenderTarget(null);

            }

            this.renderer.render(this.scene, this.camera);

            this.swapBuffers();

        })

        this.resultBuffer = isOffscreen ? this.readBuffer : null;
    }

    public getResultTexture(): THREE.Texture {

        return this.resultBuffer ? this.resultBuffer.texture : null;

    }

    public resize( windowPixelSize: THREE.Vector2 ){

        let res = windowPixelSize.clone().multiplyScalar( this.resolutionRatio );

        this.resolution.set( res.x, res.y );
        
        this.readBuffer.setSize( res.x, res.y );
        
        this.writeBuffer.setSize( res.x, res.y );

    }
}