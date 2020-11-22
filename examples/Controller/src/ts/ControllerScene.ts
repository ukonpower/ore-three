import * as THREE from 'three';
import * as ORE from '@ore-three-ts';

export class ControllerScene extends ORE.BaseLayer {

	private box: THREE.Mesh;

	constructor() {

		super();

	}

	public onBind( gProps: ORE.LayerInfo ) {

		super.onBind( gProps );

		this.camera.position.set( 0, 1.5, 4 );
		this.camera.lookAt( 0, 0, 0 );

		this.box = new THREE.Mesh( new THREE.BoxGeometry(), new THREE.MeshNormalMaterial() );
		this.scene.add( this.box );

	}

	public animate( deltaTime: number ) {

		this.box.rotateY( 1.0 * deltaTime );

		this.renderer.render( this.scene, this.camera );

	}

	public onResize( args: ORE.LayerSize ) {

		super.onResize( args );

	}

}
