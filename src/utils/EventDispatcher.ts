declare interface CustomEvent {
	type: string,
	listener: Function,
}

export class EventDispatcher {

	private events: CustomEvent[] = [];

	constructor() {

	}

	public addEventListener( type: string, listener: Function ) {

		this.events.push( {
			type: type,
			listener: listener
		} );

	}

	public dispatchEvent( event: Event ) {

		for ( let i = 0; i < this.events.length; i ++ ) {

			if ( event.type == this.events[ i ].type ) {

				this.events[ i ].listener( event );

			}

		}

	}

	public removeEventListener( type: string, listener: Function ) {

		for ( let i = this.events.length; i >= 0; i -- ) {

			if ( type == this.events[ i ].type && listener == this.events[ i ].listener ) {

				this.events.splice( i, 1 );

			}

		}

	}

}
