import * as THREE from 'three';
import vert from './domglsl.vs';

export interface DomGLSLParam {
	dom: any;
	uniforms: any;
	fragmentShader: string;
}

export class DomGLSL extends THREE.Object3D {
	private uni: any;
	private frag: any;
	private dom: HTMLElement;
	private domPos: THREE.Vector2;
	private domSize: THREE.Vector2;
	private windowSize: THREE.Vector2;


	constructor(parameter: DomGLSLParam) {
		super();
		this.dom = parameter.dom;
		this.uni = parameter.uniforms;
		this.frag = parameter.fragmentShader;

		let rect = this.dom.getBoundingClientRect();
		this.domPos = new THREE.Vector2(rect.left, rect.right);
		this.domSize = new THREE.Vector2(rect.width, rect.height);
		this.windowSize = new THREE.Vector2(window.innerWidth, window.innerHeight);

		this.uni.domPos = {
			value: this.domPos
		}
		this.uni.domSize = {
			value: this.domSize
		}
		this.uni.windowSize = {
			value: this.windowSize
		}

		this.createMesh();
	}

	createMesh() {
		let geo = new THREE.PlaneGeometry(2, 2, 1, 1);
		let mat = new THREE.ShaderMaterial({
			uniforms: this.uni,
			fragmentShader: this.frag,
			vertexShader: vert,
			transparent: true,
		});
		let obj = new THREE.Mesh(geo, mat);
		obj.frustumCulled = false;
		obj.position.set(0, 0, 0);
		obj.rotateY(Math.PI);
		this.add(obj);
	}

	public updateDom(): void {
		this.windowSize.set(window.innerWidth, window.innerHeight);
		let rect = this.dom.getBoundingClientRect();
		this.domSize.set(rect.width, rect.height);
		this.domPos.set(rect.left, rect.top);
	}
}
