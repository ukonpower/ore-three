import * as THREE from 'three';
import vert from './domglsl.vs';
import { ShaderMaterial, ShaderMaterialParameters } from 'three';
import { Uniforms } from '../../shaders/shader';

export class DomGLSL extends THREE.Mesh {
	
	private uni: Uniforms;
	private dom: HTMLElement;
	private domPos: THREE.Vector2;
	private domSize: THREE.Vector2;
	private windowSize: THREE.Vector2;


	constructor( element: HTMLElement, parameter: ShaderMaterialParameters ) {

		let geo = new THREE.PlaneBufferGeometry( 2, 2, 1, 1 );
		
		parameter.vertexShader = vert;

		let mat = new THREE.ShaderMaterial( parameter );
		
		super( geo, mat );

		this.frustumCulled = false;
		
		this.dom = element;
		this.uni = parameter.uniforms;

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

	public get uniforms(){

		return this.uni;
	}

	public updateDom(): void {
	
		this.windowSize.set( window.innerWidth, window.innerHeight );
	
		let rect = this.dom.getBoundingClientRect();
	
		this.domSize.set( rect.width, rect.height );
		this.domPos.set( rect.left, rect.top );
	
	}
}
