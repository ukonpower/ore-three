import * as THREE from 'three';
import * as ORE from '@ore-three-ts';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { BlenderConnector } from '@ore-three-ts';

export class BlenderConnectorScene extends ORE.BaseLayer {

	private connector?: BlenderConnector;

	constructor() {

		super();

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

			this.scene.traverse( obj => {

				if ( this.connector ) {

					// this.connector.getTransform();

				}

			} );

		} );

		/*-------------------------------
			Scene
		-------------------------------*/

		let light = new THREE.DirectionalLight();
		light.position.set( 1.1, 1, 1 );
		this.scene.add( light );

	}

	public animate( deltaTime: number ) {

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
