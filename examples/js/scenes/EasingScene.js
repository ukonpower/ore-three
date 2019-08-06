import * as ORE from '../../../src/';
import * as THREE from 'three';

export default class MainScene extends ORE.BaseScene {


	constructor() {
		
		super();

		this.name = "MainScene";

	}

	onBind( gProps ) {

		super.onBind( gProps );

		this.renderer = this.gProps.renderer;

		this.camera.position.set( 0, 1.5, 3 );
		this.camera.lookAt( 0, 0, 0 );

		this.light = new THREE.DirectionalLight();
		this.light.position.y = 10;
		this.scene.add( this.light );
		
		let geo = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
		let mat = new THREE.MeshNormalMaterial();
		this.box = new THREE.Mesh( geo, mat );
		this.scene.add( this.box );

	}

	animate( deltaTime ) {

		this.box.position.y =  ORE.Easings.easeInOutQuad( Math.min( 1.0, this.time ));


		console.log();
		
		
		this.renderer.render( this.scene, this.camera );

	}

	onResize( width, height ) {

		super.onResize( width, height );

	}
	
}
