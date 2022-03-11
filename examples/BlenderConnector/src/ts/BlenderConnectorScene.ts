import * as THREE from 'three';
import * as ORE from '@ore-three-ts';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { BlenderConnector } from '@ore-three-ts';

import boxVert from './shaders/box.vs';
import boxFrag from './shaders/box.fs';
export class BlenderConnectorScene extends ORE.BaseLayer {

	private commoUniforms: ORE.Uniforms;
	private connector?: BlenderConnector;

	constructor() {

		super();

		this.commoUniforms = {};

	}

	public onBind( info: ORE.LayerInfo ) {

		super.onBind( info );

		/*-------------------------------
			Connector
		-------------------------------*/

		this.connector = new ORE.BlenderConnector( 'ws://localhost:3100' );

		/*-------------------------------
			gltf
		-------------------------------*/

		let loader = new GLTFLoader();
		loader.load( './assets/blender-connector.glb', ( gltf ) => {

			this.scene.add( gltf.scene );

			let camera = this.scene.getObjectByName( 'Camera' );

			if ( camera ) {

				camera.getWorldPosition( this.camera.position );

				let target = this.scene.getObjectByName( 'CameraTarget' );

				if ( target ) {

					this.camera.lookAt( target.getWorldPosition( new THREE.Vector3() ) );

				}

				let cameraData = camera.getObjectByName( 'Camera_Orientation' ) as THREE.PerspectiveCamera;

				if ( cameraData ) {

					this.camera.fov = cameraData.fov;
					this.camera.updateProjectionMatrix();

				}

			}

			let box = this.scene.getObjectByName( 'Cube' ) as THREE.Mesh;
			let boxUni = ORE.UniformsLib.mergeUniforms( this.commoUniforms );
			box.material = new THREE.ShaderMaterial( {
				vertexShader: boxVert,
				fragmentShader: boxFrag,
				uniforms: boxUni
			} );

		} );

		/*-------------------------------
			Uniforms
		-------------------------------*/

		this.commoUniforms.color = this.connector.getUniform( 'CubeMaterial', 'BaseColor_Color', new THREE.Vector4( 1.0, 1.0, 1.0, 1.0 ) );

		/*-------------------------------
			Scene
		-------------------------------*/

		let light = new THREE.DirectionalLight();
		light.position.set( 1, 1, 1 );
		this.scene.add( light );

	}

	public animate( deltaTime: number ) {

		this.scene.traverse( obj => {

			if ( this.connector ) {

				let transform = this.connector.getTransform( obj.name );

				if ( obj.name != 'Cube' ) return;

				if ( transform.position ) {

					obj.position.copy( transform.position );

				}

				if ( transform.rotation ) {

					obj.rotation.copy( transform.rotation );

				}

				if ( transform.scale ) {

					obj.scale.copy( transform.scale );

				}

			}

		} );


		if ( this.renderer ) {

			this.renderer.render( this.scene, this.camera );

		}

	}

	public onResize() {

		super.onResize();

	}

	public onTouchStart( args: ORE.TouchEventArgs ) {

	}

	public onTouchMove( args: ORE.TouchEventArgs ) {

	}

	public onTouchEnd( args: ORE.TouchEventArgs ) {

	}

	public onHover( args: ORE.TouchEventArgs ) {

	}

	public onWheel( event: WheelEvent, trackpadDelta: number ) {

	}


}
