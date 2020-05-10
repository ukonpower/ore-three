import * as ORE from '@ore-three-ts';

import { BackgroundScene } from './BackgroundScene';

export class APP {

	private controller: ORE.Controller;
	private scene: BackgroundScene;

	constructor() {

		this.controller = new ORE.Controller( {
			canvas: document.querySelector( '#canvas' ) as HTMLCanvasElement,
			retina: true,
		} );

		this.scene = new BackgroundScene();

		this.controller.bindScene( this.scene );

	}

}

window.addEventListener( 'load', () => {

	let app = new APP();

} );
