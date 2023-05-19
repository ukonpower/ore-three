import * as THREE from 'three';
import { PostProcessPass } from '../PostProcessPass';

export interface PostProcessParam {
	renderer: THREE.WebGLRenderer;
	passes: PostProcessPass[];
}

export class PostProcess {

	public renderer: THREE.WebGLRenderer;

	public passes: PostProcessPass[];

	private scene: THREE.Scene;
	private quad: THREE.Mesh;
	private camera: THREE.Camera;

	constructor( param: PostProcessParam ) {

		this.renderer = param.renderer;
		this.passes = param.passes;
		this.scene = new THREE.Scene();
		this.quad = new THREE.Mesh( new THREE.PlaneGeometry( 2.0, 2.0 ) );
		this.scene.add( this.quad );
		this.camera = new THREE.Camera();

	}

	public render() {

		const rt = this.renderer.getRenderTarget();
		const autoClear = this.renderer.autoClear;
		this.renderer.autoClear = false;

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

			if ( changed ) pass.needsUpdate = true;

			this.renderer.setRenderTarget( pass.renderTarget );
			this.renderer.render( this.scene, this.camera );

		}

		this.renderer.setRenderTarget( rt );
		this.renderer.autoClear = autoClear;

	}

}
