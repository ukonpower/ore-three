import * as ORE from 'ore-three';

import { PageScrollerScene } from './PageScrollerScene';

export class APP {

	private controller: ORE.Controller;
	private scene: PageScrollerScene;

	constructor() {

		this.controller = new ORE.Controller();

		this.scene = new PageScrollerScene();

		this.controller.addLayer( this.scene, {
			name: 'Main',
			canvas: document.querySelector( '#canvas' ) as HTMLCanvasElement,
		} );

	}

}

window.addEventListener( 'load', () => {

	let app = new APP();

} );
