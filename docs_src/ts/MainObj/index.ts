import * as THREE from 'three';
import * as ORE from '@ore-three-ts';

import vert from './shaders/mainobj.vs';
import frag from './shaders/mainobj.fs';

export class MainObj {

	public obj: THREE.Object3D;
	private commonUniforms: ORE.Uniforms;

	constructor( parentUniforms: ORE.Uniforms ) {

		let customUni = {
			time: {
				value: 0
			},
			pointer: {
				value: new THREE.Vector3( 0, 0, 0 )
			}
		};

		let std = THREE.ShaderLib.standard;

		this.commonUniforms = THREE.UniformsUtils.merge( [ customUni, std.uniforms ] );
		this.commonUniforms = ORE.UniformsLib.mergeUniforms( this.commonUniforms, parentUniforms );

		this.obj = new THREE.Object3D();

		if ( window.oreDocsAssetManager.gltfScene == null ) return;

		let cubeGeo = ( window.oreDocsAssetManager.gltfScene.getObjectByName( 'Cube' ) as THREE.Mesh ).geometry.clone();

		let cubeUni = ORE.UniformsLib.mergeUniforms( this.commonUniforms, {
			num: {
				value: 0
			}
		} );

		let mat = new THREE.ShaderMaterial( {
			uniforms: cubeUni,
			fragmentShader: frag,
			vertexShader: vert,
			transparent: true
		} );

		let cube = new THREE.Mesh( cubeGeo, mat );
		this.obj.add( cube );

		let hatenaGeo = ( window.oreDocsAssetManager.gltfScene.getObjectByName( 'Hatena' ) as THREE.Mesh ).geometry.clone();

		let hatenaUni = ORE.UniformsLib.mergeUniforms( {
			num: {
				value: 1
			}
		}, this.commonUniforms );

		let hatenaMat = new THREE.ShaderMaterial( {
			uniforms: hatenaUni,
			fragmentShader: frag,
			vertexShader: vert,
			transparent: true
		} );

		let hatena = new THREE.Mesh( hatenaGeo, hatenaMat );
		this.obj.add( hatena );


		let installGeo = ( window.oreDocsAssetManager.gltfScene.getObjectByName( 'Install' ) as THREE.Mesh ).geometry.clone();
		let installUni = ORE.UniformsLib.mergeUniforms( {
			num: {
				value: 2
			}
		}, this.commonUniforms );

		let installMat = new THREE.ShaderMaterial( {
			uniforms: installUni,
			fragmentShader: frag,
			vertexShader: vert,
			transparent: true
		} );

		let install = new THREE.Mesh( installGeo, installMat );
		this.obj.add( install );

		let faceGeo = ( window.oreDocsAssetManager.gltfScene.getObjectByName( 'Face' ) as THREE.Mesh ).geometry.clone();
		let faceUni = ORE.UniformsLib.mergeUniforms( {
			num: {
				value: 3
			}
		}, this.commonUniforms );

		let faceMat = new THREE.ShaderMaterial( {
			uniforms: faceUni,
			fragmentShader: frag,
			vertexShader: vert,
			transparent: true
		} );

		let face = new THREE.Mesh( faceGeo, faceMat );
		this.obj.add( face );

	}

	public update( time: number ) {

		this.commonUniforms.time.value = time;

	}

	public setPointer( point: THREE.Vector3 ) {

		if ( this.obj ) {

			let p = point.sub( this.obj.position );
			this.commonUniforms.pointer.value = p;

		}

	}

}
