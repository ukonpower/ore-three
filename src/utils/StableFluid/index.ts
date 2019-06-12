import *  as THREE from 'three';

import GPUComputationRenderer from '../../plugins/GPUComputationRenderer';

export class StableFluid{

	private renderer: THREE.WebGLRenderer;
	private computeRenderer: any;
	
	private resolution: number;


	private time: number = 0;
	
    private comTexs: any;
    private uni: any;
	private fragment :string;
	
    constructor( renderer :THREE.WebGLRenderer, resolution: number ) {

        this.renderer = renderer;
		this.resolution = resolution;
		
        this.comTexs = {
            vectorTex: {
                texture: null,
                uniforms: null,
            }
        }

        if ( this.renderer.extensions.get(  "OES_texture_float"  )  ) {
        
            this.initComputeRenderer()
        
        }else{
        
            console.log( "No OES_texture_float support for float textures." );
        
        }
    }

    initComputeRenderer() {
        
        this.computeRenderer = new GPUComputationRenderer( this.resolution, this.resolution, this.renderer );

        let initPositionTex = this.computeRenderer.createTexture();
        let initVelocityTex = this.computeRenderer.createTexture();

        this.initVector( initPositionTex );

        this.comTexs.position.texture = this.computeRenderer.addVariable( "textureVector", comShaderPosition, initPositionTex );

        this.computeRenderer.setVariableDependencies( this.comTexs.position.texture, [this.comTexs.position.texture, this.comTexs.velocity.texture] );
        this.comTexs.position.uniforms = this.comTexs.position.texture.material.uniforms;

        this.computeRenderer.setVariableDependencies( this.comTexs.velocity.texture, [this.comTexs.position.texture, this.comTexs.velocity.texture] );
        this.comTexs.velocity.uniforms = this.comTexs.velocity.texture.material.uniforms;

        this.comTexs.velocity.uniforms.time = {
            value: 0
        };
        
        this.comTexs.velocity.uniforms.seed = {
            value: Math.random() * 100
        };
        
        this.comTexs.velocity.uniforms.avoidPos = {
            value: new THREE.Vector3( 0, 0, 0 )
        };

        this.computeRenderer.init();
    
        return true;
    
    }

    private initVector( tex ) {
    
        var texArray = tex.image.data;
    
        for ( var i = 0; i < texArray.length; i++ ) {
    
        }
    
    }

    public update( deltaTime: number ) {
	
		this.time += deltaTime;
        this.computeRenderer.compute();
        this.comTexs.velocity.uniforms.time.value = this.time;
        this.uni.texturePosition.value = this.computeRenderer.getCurrentRenderTarget( this.comTexs.position.texture ).texture;
        this.uni.textureVelocity.value = this.computeRenderer.getCurrentRenderTarget( this.comTexs.velocity.texture ).texture;
    
    }
}