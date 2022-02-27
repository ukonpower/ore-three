import * as ORE from '@ore-three-ts';

export class BlenderConnectorScene extends ORE.BaseLayer {

	constructor() {

		super();

	}

	public onBind( info: ORE.LayerInfo ) {

		super.onBind( info );

		this.camera.position.set( 0, 1.5, 4 );
		this.camera.lookAt( 0, 0, 0 );

		let connector = new ORE.BlenderConnector( 'ws://localhost:3100' );

	}

	public animate( deltaTime: number ) {

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
