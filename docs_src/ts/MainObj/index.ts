import * as THREE from 'three';
import * as ORE from '@ore-three-ts';

import vert from './shaders/mainobj.vs';
import frag from './shaders/mainobj.fs';

export default class MainObj {

	public obj: THREE.Object3D;
	private uni: ORE.Uniforms;

	constructor() {

		this.obj;
		this.createMesh();

	}

	private createMesh() {

		// let geo = new THREE.SphereGeometry( 1, 50, 50 );
		let geo = new THREE.BoxBufferGeometry();

		let customUni = {
			time: {
				value: 0
			},
			pointer: {
				value: new THREE.Vector3( 0, 0, 0 )
			}
		};

		let std = THREE.ShaderLib.standard;

		this.uni = THREE.UniformsUtils.merge( [ customUni, std.uniforms ] );

		let mat = new THREE.ShaderMaterial( {
			uniforms: this.uni,
			fragmentShader: frag,
			vertexShader: vert,
			lights: true,
		} );

		mat.uniforms.diffuse.value = new THREE.Vector3( 1.0, 1.0, 1.0 );
		mat.uniforms.roughness.value = 0.3;
		mat.uniforms.metalness.value = 0.1;

		this.obj = new THREE.Mesh( geo, new THREE.MeshNormalMaterial() );
		this.obj.scale.set( 3, 3, 3 );

	}

	public update( time: number ) {

		this.uni.time.value = time;

		this.obj.rotation.set( 0, time, 0 );

	}

	public setPointer( point: THREE.Vector3 ) {

		let p = point.sub( this.obj.position );
		this.uni.pointer.value = p;

	}

}
