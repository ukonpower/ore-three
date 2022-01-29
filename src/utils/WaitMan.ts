import EventEmitter from 'wolfy87-eventemitter';

export class WaitMan extends EventEmitter {

	constructor() {

		super();

	}

	public goHome() {

		this.emitEvent( 'gohome' );

	}

	public wait( time: number ) {

		return new Promise<void>( ( resolve, reject ) => {

			const onGoHome = () => {

				reject();

			};

			this.addOnceListener( 'gohome', onGoHome );

			setTimeout( () => {

				this.removeListener( 'gohome', onGoHome );

				resolve();

			}, time * 1000.0 );

		} );

	}

}
