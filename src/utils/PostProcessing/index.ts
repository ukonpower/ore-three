import * as THREE from 'three';
import { Uniforms } from '../Uniforms';

export interface PPParam extends THREE.ShaderMaterialParameters{
}

export interface EffectMaterial {
    material: THREE.ShaderMaterial,
    uniforms: any
}

export class PostProcessing {

    protected renderer: THREE.WebGLRenderer;
    protected scene: THREE.Scene;
    protected camera: THREE.Camera;
    protected screenMesh: THREE.Mesh;

	protected renderTargetOptions: THREE.WebGLRenderTargetOptions;
    protected readBuffer: THREE.WebGLRenderTarget;
    protected writeBuffer: THREE.WebGLRenderTarget;
	public resultBuffer: THREE.WebGLRenderTarget;
    public resolution: THREE.Vector2;

    protected effectMaterials: [EffectMaterial];

    constructor( renderer: THREE.WebGLRenderer, parameter: PPParam[], resolution?: THREE.Vector2, bufferOptions?: THREE.WebGLRenderTargetOptions ) {

    	this.renderer = renderer;

    	this.resolution = new THREE.Vector2();
    	this.scene = new THREE.Scene();
    	this.camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
    	this.screenMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), null );
    	this.scene.add( this.screenMesh );

    	this.renderTargetOptions = bufferOptions;

    	this.initRenderTargets();

    	this.resize( resolution );

    	parameter.forEach( ( param ) => {

    		if ( ! param.uniforms ) param.uniforms = {};

    		if ( ! param.uniforms.backbuffer ) {

    			param.uniforms.backbuffer = { value: null };

    		}

    		if ( ! param.uniforms.resolution ) {

    			param.uniforms.resolution = { value: this.resolution };

    		}

    		param.vertexShader = param.vertexShader || param.vertexShader || "varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4( position, 1.0 ); } ";
    		param.depthTest = false;

    		let mat = new THREE.ShaderMaterial( param );

    		let effectMaterial = { material: mat, uniforms: param.uniforms };

    		if ( ! this.effectMaterials ) {

    			this.effectMaterials = [ effectMaterial ];

    		} else {

    			this.effectMaterials.push( effectMaterial );

    		}

    	} );

    }

    protected initRenderTargets() {

    	this.readBuffer = this.createRenderTarget( this.renderTargetOptions );
    	this.writeBuffer = this.createRenderTarget( this.renderTargetOptions );

    }

    public createRenderTarget( options?: THREE.WebGLRenderTargetOptions ) {

    	return new THREE.WebGLRenderTarget( this.resolution.x, this.resolution.y, options );

    }

    protected swapBuffers() {

    	let tmp = this.writeBuffer;
    	this.writeBuffer = this.readBuffer;
    	this.readBuffer = tmp;

    }

    public render( offScreenRendering: boolean );

    public render( srcTexture?: THREE.Texture, offScreenRendering?: boolean );

    public render( scene: THREE.Scene, camera: THREE.Camera, offScreenRendering?: boolean );

    public render( scene_srcTexture_offScreen: any = false, camera_offScreenRendering: any = false, offScreenRendering: boolean = false ) {

    	let isOffscreen = false;
    	let skipSetBackBuffer = false;

    	let currentRenderTarget = this.renderer.getRenderTarget();

    	if ( scene_srcTexture_offScreen.type == 'Scene' ) {

    		this.renderer.setRenderTarget( this.readBuffer );

    		this.renderer.clear();

    		this.renderer.render( scene_srcTexture_offScreen, camera_offScreenRendering );

    		isOffscreen = offScreenRendering;

    	} else {

    		if ( typeof ( scene_srcTexture_offScreen ) == 'boolean' ) {

    			isOffscreen = scene_srcTexture_offScreen;

    		} else {

    			this.effectMaterials[ 0 ].uniforms.backbuffer.value = scene_srcTexture_offScreen;
    			skipSetBackBuffer = true;
    			isOffscreen = camera_offScreenRendering;

    		}

    	}

    	this.effectMaterials.forEach( ( mat, i ) => {

    		this.screenMesh.material = mat.material;

    		if ( ! skipSetBackBuffer || i > 0 ) {

    			mat.uniforms[ "backbuffer" ].value = this.readBuffer.texture;

    		}

    		if ( i < this.effectMaterials.length - 1 || isOffscreen ) {

    			this.renderer.setRenderTarget( this.writeBuffer );

    		} else {

    			this.renderer.setRenderTarget( null );

    		}

    		this.renderer.render( this.scene, this.camera );

    		this.swapBuffers();

    	} );

    	this.resultBuffer = isOffscreen ? this.readBuffer : null;

    	this.renderer.setRenderTarget( currentRenderTarget );

    }

    public getResultTexture(): THREE.Texture {

    	return this.resultBuffer ? this.resultBuffer.texture : null;

    }

    public resize( resolution?: THREE.Vector2 ) {

    	let res = new THREE.Vector2();

    	if ( resolution ) {

    		res.copy( resolution );

    	} else {

    		this.renderer.getSize( res ).multiplyScalar( this.renderer.getPixelRatio() );

    	}


    	this.resolution.copy( res );

    	this.readBuffer.setSize( this.resolution.x, this.resolution.y );

    	this.writeBuffer.setSize( this.resolution.x, this.resolution.y );

    }

}
