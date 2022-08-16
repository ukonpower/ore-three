import * as ORE from '@ore-three';

import { PostProcessingScene } from './PostProcessingScene';

export class APP {

	private controller: ORE.Controller;
	constructor() {

		this.controller = new ORE.Controller();

		this.controller.addLayer( new PostProcessingScene( {
			name: 'Main',
			canvas: document.querySelector( '#canvas' ) as HTMLCanvasElement,
		} ) );

	}

}

window.addEventListener( 'load', () => {

	const app = new APP();

} );
