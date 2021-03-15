import * as THREE from 'three';
import * as ORE from '@ore-three-ts';

export class AnimatorScene extends ORE.BaseLayer {

	private animator: ORE.Animator;

	private box: THREE.Mesh;
	private cnt: number = 0;

	constructor() {

		super();

	}

	public onBind( gProps: ORE.LayerInfo ) {

		super.onBind( gProps );

		this.camera.position.set( 0, 1.5, 4 );
		this.camera.lookAt( 0, 0, 0 );

		this.box = new THREE.Mesh( new THREE.BoxGeometry(), new THREE.MeshNormalMaterial() );
		this.scene.add( this.box );

		this.initAnimator();

	}

	private initAnimator() {

		this.animator = new ORE.Animator();

		this.animator.add( {
			name: 'pos',
			initValue: new THREE.Vector3( 0, 0, 0 )
		} );

		this.animator.add( {
			name: 'rot',
			initValue: new THREE.Quaternion().setFromEuler( new THREE.Euler( 0, 0, 0 ) )
		} );

		this.startPosAnimation();
		this.startRotAnimation();

		this.animator.addEventListener( 'update', ( deltaTime ) => {

			console.log( 'update', this.animator.get( 'pos' ) );

		} );

	}

	private startPosAnimation() {

		this.animator.animate( 'pos', new THREE.Vector3( 1.0, 0.0, 0.0 ), 1.0, () => {

			this.animator.animate( 'pos', new THREE.Vector3( - 1.0, 0.0, 0.0 ), 1.0, () => {

				// this.startPosAnimation();

			} );

		} );

	}

	private startRotAnimation() {

		this.animator.animate( 'rot', new THREE.Quaternion().setFromEuler( new THREE.Euler( 0, 0, - Math.PI ) ), 1.0, () => {

			this.animator.animate( 'rot', new THREE.Quaternion().setFromEuler( new THREE.Euler( 0, 0, 0.0 ) ), 1.0, () => {

				// this.startRotAnimation();

			} );

		} );

	}

	public animate( deltaTime: number ) {

		this.animator.update( deltaTime );

		this.box.position.copy( this.animator.get( 'pos' ) );
		this.box.quaternion.copy( this.animator.get( 'rot' ) );

		this.renderer.render( this.scene, this.camera );

	}

}
