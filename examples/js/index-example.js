import * as ORE from '../../src/';
const scene = require('./scenes/' + SCENE )

class APP {

	constructor() {
		
		this.controller = new ORE.Controller( {

			canvas: document.querySelector( "#canvas" ),
			retina: true,
			alpha: false,

		} );
		
		this.controller.bindScene( new scene[SCENE]() );
		
	}

}

window.addEventListener( 'load', ()=>{

	let app = new APP();

} );
