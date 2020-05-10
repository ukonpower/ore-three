import * as ORE from '@ore-three-ts';

import { PostProcessingScene } from './PostProcessingScene';

export class APP {

	private controller: ORE.Controller;
	private scene: PostProcessingScene;

	constructor() {

		this.controller = new ORE.Controller( {
			canvas: document.querySelector( '#canvas' ) as HTMLCanvasElement,
			retina: true,
		} );

		this.scene = new PostProcessingScene();

		this.controller.bindScene( this.scene );

	}

}

window.addEventListener( 'load', () => {

	let app = new APP();

} );
