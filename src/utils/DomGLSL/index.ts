import * as THREE from 'three';
import vert from './domglsl.vs';
import { ShaderMaterial, ShaderMaterialParameters } from 'three';
import { Uniforms } from '../../shaders/shader';

export declare interface DomGLSLParam extends ShaderMaterialParameters{
	depth?: number;
}

export class DomGLSL extends THREE.Mesh {
	
	private uni: Uniforms;
	private dom: HTMLElement;
	private domPos: THREE.Vector2;
	private domSize: THREE.Vector2;
	private windowSize: THREE.Vector2;

	constructor( element: HTMLElement, parameter: DomGLSLParam ) {

		let geo = new THREE.PlaneBufferGeometry( 2, 2, 1, 1 );
		
		parameter.vertexShader = parameter.vertexShader || vert;

		let mat = new THREE.ShaderMaterial( parameter );
		
		super( geo, mat );

		this.frustumCulled = false;
		
		this.dom = element;
		this.uni = parameter.uniforms;

		let rect: DOMRect;

		if( this.dom ) {
			
			rect = this.dom.getBoundingClientRect();

		}else {

			rect = new DOMRect();
			
		}
		
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

		this.uni.depth = {
			value: parameter.depth || 0.0
		}

	}

	public get uniforms(){

		return this.uni;
	}

	public setElement( element: HTMLElement ) {

		this.dom = element;

	}
	
	public updateDom(): void {
	
		if( !this.dom ) return;
		
		this.windowSize.set( window.innerWidth, window.innerHeight );
	
		let rect = this.dom.getBoundingClientRect();
	
		this.domSize.set( rect.width, rect.height );
		this.domPos.set( rect.left, rect.top );
	
	}
}
