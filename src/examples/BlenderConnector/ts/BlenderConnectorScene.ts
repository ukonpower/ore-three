import * as THREE from 'three';
import * as ORE from '@ore-three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import boxVert from './shaders/box.vs';
import boxFrag from './shaders/box.fs';
export class BlenderConnectorScene extends ORE.BaseLayer {

	private connector?: ORE.BlenderConnector;
	private cubeAction?: ORE.AnimationAction;
	private shaderAction?: ORE.AnimationAction;

	constructor() {

		super();

		this.commonUniforms = ORE.UniformsLib.mergeUniforms( this.commonUniforms, {
			color: {
				value: new THREE.Vector4()
			}
		} );

	}

	public onBind( info: ORE.LayerInfo ) {

		super.onBind( info );

		/*-------------------------------
			Connector
		-------------------------------*/

		this.connector = new ORE.BlenderConnector();

		this.connector.addListener( 'update/scene', ( connector: ORE.BlenderConnector ) => {

			let cubeAction = connector.getAction( 'CubeAction' );

			if ( cubeAction ) {

				this.cubeAction = cubeAction;

				this.cubeAction.addListener( 'update', ( action: ORE.AnimationAction ) => {

					let box = this.scene.getObjectByName( 'Cube' ) as THREE.Mesh;
					action.getValue( 'CubePosition', box.position );
					action.getValue( 'CubeRotation', box.rotation );
					action.getValue( 'CubeScale', box.scale );

				} );

			}

			let shaderAction = connector.getAction( 'Shader NodetreeAction.001' );

			if ( shaderAction ) {

				this.shaderAction = shaderAction;

				this.shaderAction.addListener( 'update', ( action: ORE.AnimationAction ) => {

					action.getValue( this.commonUniforms.color.value );

				} );

			}

		} );

		this.connector.addListener( 'update/timeline', ( current: number ) => {

			this.cubeAction?.updateFrame( current );
			this.shaderAction?.updateFrame( current );

		} );

		this.connector.connect( 'ws://localhost:3100' );

		// this.connector.syncJsonScene( './assets/three-connector.json' );

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

		// this.commonUniforms.color = this.connector.getUniform( 'CubeColor', new THREE.Vector4( 1.0, 1.0, 1.0, 1.0 ) );

		/*-------------------------------
			Scene
		-------------------------------*/

		let light = new THREE.DirectionalLight();
		light.position.set( 1, 1, 1 );
		this.scene.add( light );

	}

	public animate( deltaTime: number ) {

		if ( this.connector && ! this.connector.connected ) {

			// this.connector.setTimeline( ( this.time % 3 ) * 60.0 );

		}

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
