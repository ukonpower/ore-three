import * as ORE from '../../../src/';
import * as THREE from 'three';

export default class MouseRotatorScene extends ORE.BaseScene {

	constructor() {

		super();
		
		this.name = "MouseRotatorScene";

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

		this.rotator = new ORE.MouseRotator( this.box );

	}

	animate( deltaTime ) {

		this.rotator.update();
		this.renderer.render( this.scene, this.camera );

	}

	onResize( width, height ) {

		super.onResize( width, height );

	}
	
	onTouchMove( cursor, e ) {

		this.rotator.addVelocity( new THREE.Vector2( cursor.delta.x, cursor.delta.y ) );

	}
	
}
