
export class BlenderConnector {

	constructor( url: string ) {

		let websocket = new WebSocket( url );

		websocket.onmessage = ( e ) => {

			console.log( e.data );

		};

	}

}
