import * as ORE from '@ore-three-ts';

import { FilterScene } from './FilterScene';

export class APP {

	private controller: ORE.Controller;
	private scene: FilterScene;

	constructor() {

		this.controller = new ORE.Controller();

		this.scene = new FilterScene();

		this.controller.addLayer( this.scene, {
			name: 'Main',
			canvas: document.querySelector( '#canvas' ) as HTMLCanvasElement,
		} );

	}

}

window.addEventListener( 'load', () => {

	let app = new APP();

} );
