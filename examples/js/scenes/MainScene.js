import * as ORE from '../../../src/';
import * as THREE from 'three';
import { Cursor } from '../../../src/';

export class MainScene extends ORE.BaseScene {

	constructor() {
		
		super();

		this.name = "MainScene";

	}

	onBind( gProps ) {

		super.onBind( gProps );

		this.renderer = this.gProps.renderer;

		this.camera.position.set( 0, 1.5, 3 );
		this.camera.lookAt( 0, 0, 0 );

		var boxGeo = new THREE.BoxGeometry( 1, 1, 1 );
		var boXMat = new THREE.MeshNormalMaterial();
		this.box = new THREE.Mesh( boxGeo, boXMat );
		this.scene.add( this.box );

		this.light = new THREE.DirectionalLight();
		this.light.position.y = 10;
		this.scene.add( this.light );		

	}

	animate( deltaTime ) {
		
		this.box.rotateY( 0.01 );
		this.renderer.render( this.scene, this.camera );

	}

	onTouchMove( cursor, event ){

		console.log( cursor.position );
		
	}

	onHover( cursor ){

		console.log( cursor.hoverPosition );
		
	}

	onResize( args ) {

		super.onResize( args );

	}
	
}
