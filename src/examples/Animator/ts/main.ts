import * as ORE from 'ore-three';

import { AnimatorScene } from './AnimatorScene';

export class APP {

	private controller: ORE.Controller;
	private scene: AnimatorScene;

	constructor() {

		this.controller = new ORE.Controller();

		this.scene = new AnimatorScene();

		this.controller.addLayer( this.scene, {
			name: 'Main',
			canvas: document.querySelector( '#canvas' ) as HTMLCanvasElement,
		} );

	}

}

window.addEventListener( 'load', () => {

	const app = new APP();

} );
