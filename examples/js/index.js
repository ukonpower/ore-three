import * as ORE from '../../src/';
import MainScene from './scenes/TransFormAnimatorScene';

class APP {

	constructor() {
		
		this.controller = new ORE.Controller( {

			canvas: document.querySelector( "#canvas" ),
			retina: false,
			alpha: false,

		} );

		this.controller.bindScene( new MainScene() );

	}

}

window.addEventListener( 'load', ()=>{

	let app = new APP();

} );
