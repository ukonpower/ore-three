import * as ORE from '@ore-three-ts';

import { PostProcessingScene } from './PostProcessingScene';

export class APP {

	private controller: ORE.Controller;
	private scene: PostProcessingScene;

	constructor() {

		this.controller = new ORE.Controller();

		this.scene = new PostProcessingScene();

		this.controller.addLayer( this.scene, {
			name: 'Main',
			canvas: document.querySelector( '#canvas' ) as HTMLCanvasElement,
		} );

	}

}

window.addEventListener( 'load', () => {

	let app = new APP();

} );
