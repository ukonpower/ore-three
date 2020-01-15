import * as ORE from '../../../src/';
import * as THREE from 'three';
import * as CANNON from 'cannon';

export class CannonScene extends ORE.BaseScene {

	constructor() {

		super();

		this.name = "CannonScene";
		
	}

	onBind( gProps ) {

		super.onBind( gProps );

		this.renderer = this.gProps.renderer;

		this.camera.position.set( 2, 10, 20 );
		this.camera.lookAt( 0, 0, 0 );
		
		this.cannonAdapter = new ORE.CannonAdapter( this.scene );

		let groundGeo = new THREE.BoxBufferGeometry( 30, 0.1, 30 );
		let normalMat = new THREE.MeshNormalMaterial();

		let ground = new THREE.Mesh( groundGeo, normalMat );
		ground.position.set( 0, -2, 0 );
		this.cannonAdapter.add( ground, { mass: 0 });

		let sphereGeo = new THREE.SphereGeometry( 1.5, 10, 10 );
		let sphere = new THREE.Mesh( sphereGeo, normalMat );

		let sphereBody = this.cannonAdapter.add( sphere, { mass: 1 } );
		sphereBody.velocity.set( 1, 0, -1 );

	}

	animate( deltaTime ) {

		this.cannonAdapter.update( deltaTime );
		
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

			let body = this.cannonAdapter.add( 
				mesh,
				{ 
					mass: 1,
					angularDamping: 0.1,
					type: CANNON.Body.DYNAMIC
				}
			);
			
			body.position.y = 10;
			body.position.x = Math.random() - 0.5;
			body.position.z = Math.random() - 0.5;
			
			body.velocity.set( 0, -10, -0 );
			
		}
		


	}

}
