import * as ORE from '../../src/';

const SCENE_NAME = 'PostProcessingScene';

const scene = require('./scenes/' + SCENE_NAME );

class APP {

	constructor() {
		
		this.controller = new ORE.Controller( {

			canvas: document.querySelector( "#canvas" ),
			retina: true,
			alpha: false,

		} );
		
		this.controller.bindScene( new scene[SCENE_NAME]() );
		
	}

}

window.addEventListener( 'load', ()=>{

	let app = new APP();

} );
