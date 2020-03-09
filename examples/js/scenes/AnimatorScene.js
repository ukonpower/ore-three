import * as ORE from '../../../src/';
import * as THREE from 'three';

export class AnimatorScene extends ORE.BaseScene {

	constructor() {

		super();

		this.name = "AnimatorScene";

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

		this.animator = new ORE.Animator();
		this.animator.add( 'pos', new THREE.Vector3( 0, 0, 0 ) );

		this.left = true;
		this.transforms = {
			left: {
				pos: new THREE.Vector3( - 1, 0, 0 ),
				rot: new THREE.Euler( 0, 0, Math.PI ),
			},
			right: {
				pos: new THREE.Vector3( 1, 0, 0 ),
				rot: new THREE.Euler( 0, 0, - Math.PI ),
			}
		};

	}

	animate( deltaTime ) {

		this.animator.update( deltaTime );

		this.box.position.x = this.animator.getValue( 'posX' );

		this.renderer.render( this.scene, this.camera );

	}

	onResize( args ) {

		super.onResize( args );

	}

	onTouchStart( e ) {

		if ( this.left ) {

			this.left = false;

			this.animator.animate( 'posX', 1, 1, () => {

				console.log( 'animated' );
				

			});

		} else {

			this.left = true;

			this.animator.animate( 'posX', -1, 1, () => {
				
				console.log( 'animated' );
				
			});

		}

	}

}
