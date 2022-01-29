import * as THREE from 'three';

export class WaitMan extends THREE.EventDispatcher {

	constructor() {

		super();

	}

	public goHome() {

		this.dispatchEvent( { type: 'gohome' } );

	}

	public wait( time: number ) {

		return new Promise<void>( ( resolve, reject ) => {

			const onGoHome = () => {

				reject();

				this.removeEventListener( 'gohome', onGoHome );

			};

			this.addEventListener( 'gohome', onGoHome );

			setTimeout( () => {

				this.removeEventListener( 'gohome', onGoHome );

				resolve();

			}, time * 1000.0 );

		} );

	}

}
