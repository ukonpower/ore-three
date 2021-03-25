import * as THREE from 'three';
import * as ORE from '@ore-three-ts';

export class AnimatorScene extends ORE.BaseLayer {

	private animator?: ORE.Animator;
	private box?: THREE.Mesh;
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

		this.animator.addEventListener( 'update/rot', ( deltaTime ) => {

			if ( this.animator ) {

				console.log( 'update/rot', this.animator.get( 'rot' ) );

			}

		} );

	}

	private startPosAnimation() {

		if ( this.animator == null ) return;

		this.animator.animate( 'pos', new THREE.Vector3( 1.0, 0.0, 0.0 ), 1.0, () => {

			if ( this.animator == null ) return;

			this.animator.animate( 'pos', new THREE.Vector3( - 1.0, 0.0, 0.0 ), 1.0, () => {

				this.startPosAnimation();

			} );

		} );

	}

	private startRotAnimation() {

		if ( this.animator == null ) return;

		this.animator.animate( 'rot', new THREE.Quaternion().setFromEuler( new THREE.Euler( 0, 0, - Math.PI ) ), 1.0, () => {

			if ( this.animator == null ) return;

			this.animator.animate( 'rot', new THREE.Quaternion().setFromEuler( new THREE.Euler( 0, 0, 0.0 ) ), 1.0, () => {

				this.startRotAnimation();

			} );

		} );

	}

	public animate( deltaTime: number ) {

		if ( this.animator ) {

			this.animator.update( deltaTime );

			let pos = this.animator.get<THREE.Vector3>( 'pos' );
			let rot = this.animator.get<THREE.Quaternion>( 'rot' );

			if ( this.box && pos && rot ) {

				this.box.position.copy( pos );
				this.box.quaternion.copy( rot );

			}

		}



		if ( this.renderer ) {

			this.renderer.render( this.scene, this.camera );

		}

	}

}
