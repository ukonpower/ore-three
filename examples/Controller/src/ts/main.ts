import * as ORE from '@ore-three-ts';

import { ControllerScene } from './ControllerScene';

export class APP {

	private controller: ORE.Controller;
	private layer: ControllerScene;

	constructor() {

		this.controller = new ORE.Controller();

		this.controller.addLayer( new ControllerScene(), {
			name: 'Main',
			canvas: document.querySelector( '#canvas' ) as HTMLCanvasElement,
		} );

	}

}

window.addEventListener( 'load', () => {

	let app = new APP();

} );
