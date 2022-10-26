import * as THREE from 'three';
import * as ORE from '@ore-three';

export class AnimatorScene extends ORE.BaseLayer {

	private animator: ORE.Animator;
	private box: THREE.Mesh;

	constructor( param: ORE.LayerParam ) {

		super( param );

		/*-------------------------------
			Scene
		-------------------------------*/

		this.camera.position.set( 0, 1.5, 4 );
		this.camera.lookAt( 0, 0, 0 );

		this.box = new THREE.Mesh( new THREE.BoxGeometry(), new THREE.MeshNormalMaterial() );
		this.scene.add( this.box );

		/*-------------------------------
			Animator
		-------------------------------*/

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

		this.animator.addEventListener( 'update/rot', ( e ) => {

			if ( this.animator ) {

				console.log( 'update/rot', e.value );

			}

		} );

	}

	private async startPosAnimation() {

		await this.animator.animateAsync( 'pos', new THREE.Vector3( 1.0, 0.0, 0.0 ), 1.0 );

		this.animator.animate( 'pos', new THREE.Vector3( - 1.0, 0.0, 0.0 ), 1.0, () => {

			this.startPosAnimation();

		} );

	}

	private async startRotAnimation() {

		await this.animator.animateAsync( 'rot', new THREE.Quaternion().setFromEuler( new THREE.Euler( 0, 0, - Math.PI ) ), 1.0 );

		this.animator.animate( 'rot', new THREE.Quaternion().setFromEuler( new THREE.Euler( 0, 0, 0.0 ) ), 1.0, () => {

			this.startRotAnimation();

		} );

	}

	public animate( deltaTime: number ) {

		if ( this.animator ) {

			if ( this.animator.isAnimating() ) {

				this.animator.update( deltaTime );

			}

			if ( this.animator.isAnimating( 'pos' ) ) {

				const pos = this.animator.get<THREE.Vector3>( 'pos' )!;
				this.box.position.copy( pos );

			}

			if ( this.animator.isAnimating( 'rot' ) ) {

				const rot = this.animator.get<THREE.Quaternion>( 'rot' )!;
				this.box.quaternion.copy( rot );

			}

		}

		if ( this.renderer ) {

			this.renderer.render( this.scene, this.camera );

		}

	}

}
