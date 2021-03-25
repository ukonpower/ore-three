import * as THREE from 'three';
import * as ORE from '@ore-three-ts';

export class PointerScene extends ORE.BaseLayer {

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

	public onTouchStart( args: ORE.TouchEventArgs ) {

		this.box.scale.setScalar( 1.5 );

	}

	public onTouchMove( args: ORE.TouchEventArgs ) {

		let cursorPos = args.normalizedPosition;
		this.box.position.set( cursorPos.x * this.weight, cursorPos.y * this.weight, 0 );

		args.event.preventDefault();

	}

	public onTouchEnd( args: ORE.TouchEventArgs ) {

		this.box.scale.setScalar( 1.0 );

	}

	public onHover( args: ORE.TouchEventArgs ) {

		let cursorPos = args.normalizedPosition;

		if ( cursorPos.x != cursorPos.x ) return;

		this.box.position.set( cursorPos.x * this.weight, cursorPos.y * this.weight, 0 );

	}

}
