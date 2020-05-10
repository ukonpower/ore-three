import * as ORE from '@ore-three-ts';

import { MouseRotatorScene } from './MouseRotatorScene';

export class APP {

	private controller: ORE.Controller;
	private scene: MouseRotatorScene;

	constructor() {

		this.controller = new ORE.Controller( {
			canvas: document.querySelector( '#canvas' ) as HTMLCanvasElement,
			retina: true,
		} );

		this.scene = new MouseRotatorScene();

		this.controller.bindScene( this.scene );

	}

}

window.addEventListener( 'load', () => {

	let app = new APP();

} );
