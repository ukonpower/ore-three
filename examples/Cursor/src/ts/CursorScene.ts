import * as THREE from 'three';
import * as ORE from '@ore-three-ts';

export class CursorScene extends ORE.BaseLayer {

	private box: THREE.Mesh;

	constructor() {

		super();

	}

	private weight: number = 5;

	public onBind( gProps: ORE.LayerInfo ) {

		super.onBind( gProps );

		this.camera.position.set( 0, 0, 10 );

		let geo = new THREE.BoxBufferGeometry();
		let mat = new THREE.MeshNormalMaterial();

		this.box = new THREE.Mesh( geo, mat );
		this.scene.add( this.box );

	}

	public animate( deltaTime: number ) {

		this.renderer.render( this.scene, this.camera );

	}

	public onTouchStart( cursor: ORE.Pointer, e: MouseEvent ) {

		this.box.scale.setScalar( 1.5 );

	}

	public onTouchMove( cursor: ORE.Pointer, e: MouseEvent ) {

		let cursorPos = cursor.getNormalizePosition( this.info.size.windowSize );

		this.box.position.set( cursorPos.x * this.weight, cursorPos.y * this.weight, 0 );

		e.preventDefault();

	}

	public onTouchEnd( cursor: ORE.Pointer, e: MouseEvent ) {

		this.box.scale.setScalar( 1.0 );

	}

	public onHover( cursor: ORE.Pointer ) {

		let cursorPos = cursor.getNormalizePosition( this.info.size.windowSize );

		this.box.position.set( cursorPos.x * this.weight, cursorPos.y * this.weight, 0 );

	}

	public onResize( args: ORE.LayerSize ) {

		super.onResize( args );

	}

}
