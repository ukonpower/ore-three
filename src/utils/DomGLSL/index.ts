import * as THREE from 'three';
import vert from './domglsl.vs';

export interface DomGLSLParam extends THREE.ShaderMaterialParameters{
	dom: any;
}

export class DomGLSL extends THREE.Mesh {
	
	private uni: any;
	private frag: any;
	private dom: HTMLElement;
	private domPos: THREE.Vector2;
	private domSize: THREE.Vector2;
	private windowSize: THREE.Vector2;


	constructor( parameter: DomGLSLParam ) {

		let geo = new THREE.PlaneBufferGeometry( 2, 2, 1, 1 );
		
		parameter.vertexShader = vert;

		let mat = new THREE.ShaderMaterial( parameter );
		
		super( geo, mat );

		this.frustumCulled = false;
		
		this.dom = parameter.dom;
		this.uni = parameter.uniforms;
		this.frag = parameter.fragmentShader;

		let rect = this.dom.getBoundingClientRect();
		this.domPos = new THREE.Vector2( rect.left, rect.right );
		this.domSize = new THREE.Vector2( rect.width, rect.height );
		this.windowSize = new THREE.Vector2( window.innerWidth, window.innerHeight );

		this.uni.domPos = {
			value: this.domPos
		}

		this.uni.domSize = {
			value: this.domSize
		}

		this.uni.windowSize = {
			value: this.windowSize
		}

	}

	public updateDom(): void {
	
		this.windowSize.set( window.innerWidth, window.innerHeight );
	
		let rect = this.dom.getBoundingClientRect();
	
		this.domSize.set( rect.width, rect.height );
		this.domPos.set( rect.left, rect.top );
	
	}
}
