import * as ORE from '../../src/';
import OREScene from './scenes/StableFluidsScene';

class APP {

	constructor() {
		
		this.controller = new ORE.Controller( {

			canvas: document.querySelector( "#canvas" ),
			retina: false,
			alpha: false,

		} );
	
		this.controller.setScene( OREScene );

	}

}

window.addEventListener( 'load', ()=>{

	let app = new APP();

} );
