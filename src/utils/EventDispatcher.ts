export declare interface Event {
	type: string;
	[key:string]: any;
}

export declare interface EventListener {
	type: string,
	listener: ( e: Event ) => void,
}

export class EventDispatcher {

	private events: EventListener[] = [];

	constructor() {

	}

	public addEventListener( type: string, listener: ( e: Event ) => void ) {

		this.events.push( {
			type: type,
			listener: listener
		} );

	}

	public dispatchEvent( event: Event ) {

		event.target = this;

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
