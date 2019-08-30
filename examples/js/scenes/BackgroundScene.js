import * as ORE from '../../../src/';
import * as THREE from 'three';

import frag from './glsl/sample.fs';

export class BackgroundScene extends ORE.BaseScene {

	constructor() {

		super();

		this.name = "BackgroundScene";

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

		this.uniforms = {

			time: {

				value: 0

			},
			resolution: {
				value: new THREE.Vector2( window.innerWidth, window.innerHeight )

			}
		};

		this.background = new ORE.Background( frag, this.uniforms );

		this.scene.add( this.background );

	}

	animate( deltaTime ) {

		this.box.rotateY( 0.01 );

		this.uniforms.time.value = this.time;

		this.renderer.render( this.scene, this.camera );

	}

	onResize( args ) {

		super.onResize( args );

		this.uniforms.resolution.value.copy( args.windowSize );

	}
	
}
