import * as ORE from '../../../src/';
import * as THREE from 'three';
import * as CANNON from 'cannon';

export class OimoScene extends ORE.BaseScene {

	constructor() {

		super();

		this.name = "OimoScene";
		
	}

	onBind( gProps ) {

		super.onBind( gProps );

		this.renderer = this.gProps.renderer;

		this.camera.position.set( 2, 10, 20 );
		this.camera.lookAt( 0, 0, 0 );
		
		this.oimoAdapter = new ORE.OimoAdapter( this.scene );

		let groundGeo = new THREE.BoxGeometry( 20, 0.5, 20 );
		let normalMat = new THREE.MeshNormalMaterial();

		let ground = new THREE.Mesh( groundGeo, normalMat );

		ground.position.set( 0, -2, 0 );
		this.oimoAdapter.add( ground, {move: false } );

		let sphereGeo = new THREE.SphereGeometry( 1, 10, 10 );
		let sphere = new THREE.Mesh( sphereGeo, normalMat );

		let sphereBody = this.oimoAdapter.add( sphere );
		sphereBody.linearVelocity.set( 1, 0, -1 );

	}

	animate( deltaTime ) {

		this.oimoAdapter.update( deltaTime );
		
		this.renderer.render( this.scene, this.camera );

	}

	onResize( args ) {

		super.onResize( args );

	}

	onTouchStart(){

		let geo = new THREE.BoxGeometry();
		let normalMat = new THREE.MeshNormalMaterial();

		for ( let i = 0; i < 10; i++ ) {

			let mesh = new THREE.Mesh( geo, normalMat );
			mesh.scale.set( 0.5, 0.5, 0.5 );

			let body = this.oimoAdapter.add( mesh );
			
			body.position.y = 10;
			body.position.x = Math.random() - 0.5;
			body.position.z = Math.random() - 0.5;
			
		}
		


	}

}
