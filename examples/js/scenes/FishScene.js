import * as ORE from '../../../src/';
import * as THREE from 'three';

export class FishScene extends ORE.BaseScene {

	constructor( gProps ) {

		super( gProps );
		
		this.name = "FishScene";

	}

	onBind( gProps ){

		super.onBind( gProps );

		this.renderer = this.gProps.renderer;

		this.camera.position.set( 0, 1.5, 3 );
		this.camera.lookAt( 0, 0, 0 );

		this.light = new THREE.DirectionalLight();
		this.light.position.y = 10;
		this.scene.add( this.light );

		this.fish = new ORE.Fish( this.gProps.renderer, 1000, 30 );
		this.scene.add( this.fish );

	}

	onUnbind(){	

		super.onUnbind();

		this.fish.dispose();

	}

	animate( deltaTime ) {

		this.fish.update( this.time );
		this.renderer.render( this.scene, this.camera );

	}

	onResize( args ) {

		super.onResize( args );

	}

}
