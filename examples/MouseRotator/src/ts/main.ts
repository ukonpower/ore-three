import * as ORE from '@ore-three-ts';

import { MouseRotatorScene } from './MouseRotatorScene';

export class APP {

	private controller: ORE.Controller;
	private scene: MouseRotatorScene;

	constructor() {

		this.controller = new ORE.Controller();

		this.scene = new MouseRotatorScene();

		this.controller.addLayer( this.scene, {
			name: 'Main',
			canvas: document.querySelector( '#canvas' ) as HTMLCanvasElement,
		} );

	}

}

window.addEventListener( 'load', () => {

	let app = new APP();

} );
