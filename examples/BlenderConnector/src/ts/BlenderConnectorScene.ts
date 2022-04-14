import * as THREE from 'three';
import * as ORE from '@ore-three-ts';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { BlenderConnector } from '@ore-three-ts';

import boxVert from './shaders/box.vs';
import boxFrag from './shaders/box.fs';
export class BlenderConnectorScene extends ORE.BaseLayer {

	private connector?: BlenderConnector;

	constructor() {

		super();

		this.commonUniforms = ORE.UniformsLib.mergeUniforms( this.commonUniforms, {} );

	}

	public onBind( info: ORE.LayerInfo ) {

		super.onBind( info );

		/*-------------------------------
			Connector
		-------------------------------*/

		this.connector = new ORE.BlenderConnector( 'ws://localhost:3100' );
		this.connector.syncJsonScene( './assets/three-connector.json' );

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
			let boxUni = ORE.UniformsLib.mergeUniforms( this.commonUniforms );
			box.material = new THREE.ShaderMaterial( {
				vertexShader: boxVert,
				fragmentShader: boxFrag,
				uniforms: boxUni
			} );

		} );

		/*-------------------------------
			Uniforms
		-------------------------------*/

		this.commonUniforms.color = this.connector.getUniform( 'CubeColor', new THREE.Vector4( 1.0, 1.0, 1.0, 1.0 ) );

		/*-------------------------------
			Scene
		-------------------------------*/

		let light = new THREE.DirectionalLight();
		light.position.set( 1, 1, 1 );
		this.scene.add( light );

	}

	public animate( deltaTime: number ) {

		if ( this.connector && ! this.connector.connected ) {

			this.connector.setFrame( ( this.time % 3 ) * 60.0 );

		}

		this.scene.traverse( obj => {

			if ( obj.name == 'Cube' && this.connector ) {

				let pos = this.connector.getValue<THREE.Vector3>( 'CubePosition' );

				if ( pos ) {

					obj.position.set( pos.x, pos.y, pos.z );

				}

				let rot = this.connector.getValue<THREE.Vector3>( 'CubeRotation' );

				if ( rot ) {

					obj.rotation.set( rot.x, rot.y, rot.z, "YZX" );

				}

				let scale = this.connector.getValue<THREE.Vector3>( 'CubeScale' );

				if ( scale ) {

					obj.scale.copy( scale );

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
