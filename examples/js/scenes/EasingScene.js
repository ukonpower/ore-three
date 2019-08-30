import * as ORE from '../../../src/';
import * as THREE from 'three';

export class EasingScene extends ORE.BaseScene {


	constructor() {
		
		super();

		this.name = "EasingScene";

	}

	onBind( gProps ) {

		super.onBind( gProps );

		this.renderer = this.gProps.renderer;

		this.camera.position.set( 0, 0, 3 );
		this.camera.lookAt( 0, 0, 0 );

		this.light = new THREE.DirectionalLight();
		this.light.position.y = 10;
		this.scene.add( this.light );
		
		let geo = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
		let mat = new THREE.MeshNormalMaterial();
		this.box = new THREE.Mesh( geo, mat );
		this.scene.add( this.box );

	}

	animate( deltaTime ) {

		this.box.position.x =  ORE.Easings.easeInOutQuad( Math.min( 1.0, this.time )) * 1.5 - 0.75;
		
		this.renderer.render( this.scene, this.camera );

	}

	onResize( args ) {

		super.onResize( args );

	}
	
}
