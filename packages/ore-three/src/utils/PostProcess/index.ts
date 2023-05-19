import * as THREE from 'three';
import { PostProcessPass } from '../PostProcessPass';
import { PostProcessRenderOpt } from '../..';

export interface PostProcessParam {
	renderer: THREE.WebGLRenderer;
	passes: PostProcessPass[];
}

export interface PostProcessRenderOpt {
	camera?: THREE.Camera;
}

export class PostProcess {

	public renderer: THREE.WebGLRenderer;

	public passes: PostProcessPass[];

	private scene: THREE.Scene;
	private quad: THREE.Mesh;
	private camera: THREE.Camera;

	private projectionMatrix: THREE.Matrix4;
	private projectionMatrixInverse: THREE.Matrix4;
	private cameraMatrix: THREE.Matrix4;
	private viewMatrix: THREE.Matrix4;

	constructor( param: PostProcessParam ) {

		this.renderer = param.renderer;
		this.passes = param.passes;
		this.scene = new THREE.Scene();
		this.quad = new THREE.Mesh( new THREE.PlaneGeometry( 2.0, 2.0 ) );
		this.scene.add( this.quad );
		this.camera = new THREE.Camera();

		this.projectionMatrix = new THREE.Matrix4();
		this.projectionMatrixInverse = new THREE.Matrix4();
		this.cameraMatrix = new THREE.Matrix4();
		this.viewMatrix = new THREE.Matrix4();

	}

	public render( opt?: PostProcessRenderOpt ) {

		const rt = this.renderer.getRenderTarget();
		const autoClear = this.renderer.autoClear;
		this.renderer.autoClear = false;

		if ( opt && opt.camera ) {

			this.projectionMatrix.copy( opt.camera.projectionMatrix );
			this.projectionMatrixInverse.copy( this.projectionMatrix ).invert();
			this.cameraMatrix.copy( opt.camera.matrixWorld );
			this.viewMatrix.copy( opt.camera.matrixWorld ).invert();

		}

		for ( let i = 0; i < this.passes.length; i ++ ) {

			const pass = this.passes[ i ];

			this.quad.material = pass;

			let changed = false;

			for ( let j = 0; j < pass.input.length; j ++ ) {

				const samplerName = "sampler" + j;

				const uniInput = pass.uniforms[ samplerName ];

				if ( uniInput ) {

					uniInput.value = pass.input[ j ];

				} else {

					changed = true;

					pass.uniforms[ samplerName ] = {
						value: pass.input[ j ]
					};

				}

			}

			if ( opt && opt.camera ) {

				pass.uniforms.pProjectionMatrix = {
					value: this.projectionMatrix
				};

				pass.uniforms.pProjectionMatrixInverse = {
					value: this.projectionMatrixInverse
				};

				pass.uniforms.pCameraMatrix = {
					value: this.cameraMatrix
				};

				pass.uniforms.pViewMatrix = {
					value: this.viewMatrix
				};

			}

			if ( changed ) pass.needsUpdate = true;

			this.renderer.setRenderTarget( pass.renderTarget );
			this.renderer.render( this.scene, this.camera );

		}

		this.renderer.setRenderTarget( rt );
		this.renderer.autoClear = autoClear;

	}

}
