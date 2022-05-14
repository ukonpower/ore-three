import * as ORE from 'ore-three';

import { BackgroundScene } from './BackgroundScene';

export class APP {

	private controller: ORE.Controller;
	private scene: BackgroundScene;

	constructor() {

		this.controller = new ORE.Controller( );

		this.scene = new BackgroundScene();

		this.controller.addLayer( this.scene, {
			name: 'Main',
			canvas: document.querySelector( '#canvas' ) as HTMLCanvasElement,
		} );

	}

}

window.addEventListener( 'load', () => {

	let app = new APP();

} );
