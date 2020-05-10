import * as ORE from '@ore-three-ts';

import { AnimatorScene } from './AnimatorScene';

export class APP {

	private controller: ORE.Controller;
	private scene: AnimatorScene;

	constructor() {

		this.controller = new ORE.Controller( {
			canvas: document.querySelector( '#canvas' ) as HTMLCanvasElement,
			retina: true,
		} );

		this.scene = new AnimatorScene();

		this.controller.bindScene( this.scene );

	}

}

window.addEventListener( 'load', () => {

	const app = new APP();

} );
