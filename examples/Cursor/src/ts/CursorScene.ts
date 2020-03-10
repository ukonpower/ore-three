import * as THREE from 'three';
import * as ORE from '@ore-three-ts';

export class ControllerScene extends ORE.BaseScene {
	
	private box: THREE.Mesh;
	
	constructor() {
		
		super();
		
	}
	
	public onBind( gProps: ORE.GlobalProperties ) {

		super.onBind( gProps );

	}

	public animate( deltaTime: number ) {

		this.renderer.render( this.scene, this.camera );
		
	}

	public onTouchStart( cursor: ORE.Cursor, e: MouseEvent ) {

		console.log( cursor.position, cursor.delta );
		
	}

	public onTouchMove( cursor: ORE.Cursor, e: MouseEvent ) {
		
		console.log( cursor.position, cursor.delta );

	}

	public onTouchEnd( cursor: ORE.Cursor, e: MouseEvent ) {
		
		console.log( cursor.position, cursor.delta );

	}

	public onHover( cursor: ORE.Cursor ) {

		console.log( cursor.getNormalizePosition( this.gProps.resizeArgs.windowSize ), cursor.delta );
		
	}

	public onResize( args: ORE.ResizeArgs ) {

		super.onResize( args );

	}
	
}
