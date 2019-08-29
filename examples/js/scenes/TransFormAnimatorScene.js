import * as ORE from '../../../src/';
import * as THREE from 'three';

export default class TransformAnimatorScene extends ORE.BaseScene {

	constructor() {

		super();

		this.name = "TransformAnimatorScene";

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

		//create TransformAnimator
		this.transformAnimator = new ORE.TransformAnimator( this.box );

		//use move() when object is moving.
		this.transformAnimator.force = true;

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

		this.transformAnimator.update( this.deltaTime );
		this.renderer.render( this.scene, this.camera );

	}

	onResize( args ) {

		super.onResize( args );

	}

	onTouchStart( e ) {

		if ( this.left ) {

			let didStart = this.transformAnimator.move( this.transforms.right.pos, this.transforms.right.rot, 1 );
			
			if ( didStart ) {

				this.left = false;

			}

		} else {

			let didStart = this.transformAnimator.move( this.transforms.left.pos, this.transforms.left.rot, 1 );

			if ( didStart ) {

				this.left = true;

			}

		}

	}

}
