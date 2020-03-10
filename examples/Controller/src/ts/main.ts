import * as ORE from '@ore-three-ts';

import { ControllerScene } from './ControllerScene';

export class APP{

	private controller: ORE.Controller;
	private scene: ControllerScene;

	constructor(){

		this.controller = new ORE.Controller( {
			canvas: document.querySelector( '#canvas' ) as HTMLCanvasElement,
			retina: true,
		} );
		
		this.scene = new ControllerScene();

		this.controller.bindScene( this.scene );
		
	}

}

window.addEventListener( 'load', () => {

	let app = new APP();

});