import * as ORE from '@ore-three-ts';

import { DOMMeshScene } from './DOMMeshScene';

export class APP {

	private controller: ORE.Controller;
	private scene: DOMMeshScene;

	constructor() {

		this.controller = new ORE.Controller();

		this.scene = new DOMMeshScene();

		this.controller.addLayer( this.scene, {
			name: 'Main',
			canvas: document.querySelector( '#canvas' ) as HTMLCanvasElement,
		} );

	}

}

window.addEventListener( 'load', () => {

	let app = new APP();

} );
