import * as ORE from '../../../src/';
import * as THREE from 'three';

export default class MouseRotatorScene extends ORE.BaseScene {

	constructor( renderer ) {

		super( renderer );
		this.name = "MouseRotatorScene";
		this.init();

	}

	init() {

		this.camera.position.set( 0, 1.5, 3 );
		this.camera.lookAt( 0, 0, 0 );

		var boxGeo = new THREE.BoxGeometry( 1, 1, 1 );
		var boXMat = new THREE.MeshNormalMaterial();
		this.box = new THREE.Mesh( boxGeo, boXMat );
		this.scene.add( this.box );

		this.rotator = new ORE.MouseRotator( this.box );

	}

	animate() {

		this.rotator.update();
		this.renderer.render( this.scene, this.camera );

	}

	onResize( width, height ) {

		super.onResize( width, height );

	}

	onTouchStart( e ) {
	}

	onTouchMove( e ) {

		this.rotator.addVelocity( new THREE.Vector2( this.cursor.deltaX, this.cursor.deltaY ) );

	}

	onTouchEnd( e ) {
	}

	onWheel( e ) {
	}

}
