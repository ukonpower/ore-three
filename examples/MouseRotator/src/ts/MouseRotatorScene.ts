import * as THREE from 'three';
import * as ORE from '@ore-three-ts';

export class MouseRotatorScene extends ORE.BaseLayer {

	private rotator?: ORE.MouseRotator;
	private box?: THREE.Mesh;

	constructor() {

		super();

	}

	public onBind( info: ORE.LayerInfo ) {

		super.onBind( info );

		this.camera.position.set( 0, 1.5, 4 );
		this.camera.lookAt( 0, 0, 0 );

		this.box = new THREE.Mesh( new THREE.BoxGeometry(), new THREE.MeshNormalMaterial() );
		this.scene.add( this.box );

		this.rotator = new ORE.MouseRotator( this.box );

	}

	public animate( deltaTime: number ) {

		if ( this.rotator ) {

			this.rotator.update();

		}

		if ( this.renderer ) {

			this.renderer.render( this.scene, this.camera );

		}

	}

	public onTouchMove( args: ORE.TouchEventArgs ) {

		if ( this.rotator ) {

			this.rotator.addVelocity( args.delta );

		}

	}

}
