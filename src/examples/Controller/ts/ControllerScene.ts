import * as THREE from 'three';
import * as ORE from '@ore-three';

export class ControllerScene extends ORE.BaseLayer {

	private box?: THREE.Mesh;

	constructor( param: ORE.LayerParam ) {

		super( param );

	}

	public onBind() {

		super.onBind();

		this.camera.position.set( 0, 1.5, 4 );
		this.camera.lookAt( 0, 0, 0 );

		this.box = new THREE.Mesh( new THREE.BoxGeometry(), new THREE.MeshNormalMaterial() );
		this.scene.add( this.box );

		const geo = new THREE.PlaneBufferGeometry();

	}

	public animate( deltaTime: number ) {

		if ( this.box ) {

			this.box.rotateY( 1.0 * deltaTime );

		}

		if ( this.renderer ) {

			this.renderer.render( this.scene, this.camera );

		}

	}

	public onResize() {

		super.onResize();

	}

	public onTouchStart( args: ORE.TouchEventArgs ) {

	}

	public onTouchMove( args: ORE.TouchEventArgs ) {

	}

	public onTouchEnd( args: ORE.TouchEventArgs ) {

	}

	public onHover( args: ORE.TouchEventArgs ) {

	}

	public onWheel( event: WheelEvent, trackpadDelta: number ) {

	}


}
