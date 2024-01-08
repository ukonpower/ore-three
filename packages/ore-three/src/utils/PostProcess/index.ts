import * as THREE from 'three';
import { PostProcessPass } from '../PostProcessPass';

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

	public render( input?: THREE.Texture, opt?: PostProcessRenderOpt ) {

		const rt = this.renderer.getRenderTarget();
		const autoClear = this.renderer.autoClear;
		this.renderer.autoClear = false;

		if ( opt && opt.camera ) {

			this.projectionMatrix.copy( opt.camera.projectionMatrix );
			this.projectionMatrixInverse.copy( this.projectionMatrix ).invert();
			this.cameraMatrix.copy( opt.camera.matrixWorld );
			this.viewMatrix.copy( opt.camera.matrixWorld ).invert();

		}

		let backbuffer: THREE.Texture | null = input || null;

		for ( let i = 0; i < this.passes.length; i ++ ) {

			const pass = this.passes[ i ];

			this.quad.material = pass;

			pass.uniforms.uBackBuffer = {
				value: backbuffer
			};

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

			this.renderer.setRenderTarget( pass.renderTarget );
			this.renderer.render( this.scene, this.camera );

			if ( ! pass.passThrough && pass.renderTarget ) {

				backbuffer = pass.renderTarget.texture;

			}

		}

		this.renderer.setRenderTarget( rt );
		this.renderer.autoClear = autoClear;

	}

	public resize( resolution: THREE.Vector2 ) {

		for ( let i = 0; i < this.passes.length; i ++ ) {

			const pass = this.passes[ i ];

			pass.resize( resolution );

		}

	}

}
