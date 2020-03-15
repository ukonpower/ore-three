import * as THREE from 'three';
import vert from './domMesh.vs';
import { ShaderMaterial, ShaderMaterialParameters } from 'three';
import { Uniforms, UniformsLib } from '../Uniforms';

export class DOMMesh extends THREE.Mesh {

	private _uniforms: Uniforms;
	private element: HTMLElement;

	constructor( element: HTMLElement, parameter: ShaderMaterialParameters ) {

		let geo = new THREE.PlaneBufferGeometry( 2, 2 );

		parameter.vertexShader = vert;

		let uni = UniformsLib.CopyUniforms( {
			domPos: {
				value: new THREE.Vector2()
			},
			domSize: {
				value: new THREE.Vector2()
			},
			windowSize: {
				value: new THREE.Vector2()
			},
			aspectRatio: {
				value: 1.0
			}
		}, parameter.uniforms );

		parameter.uniforms = uni;

		let mat = new THREE.ShaderMaterial( parameter );

		super( geo, mat );

		this.frustumCulled = false;

		this._uniforms = uni;

		this.element = element;

		this.update();

	}

	public get uniforms() {

		return this._uniforms;

	}

	public update() {

		let rect = this.element.getBoundingClientRect();

		this._uniforms.windowSize.value.set( window.innerWidth, window.innerHeight );
		this._uniforms.aspectRatio.value = window.innerWidth / window.innerHeight;
		this._uniforms.domSize.value.set( rect.width, rect.height );
		this._uniforms.domPos.value.set( rect.left, rect.top );

	}

}
