import * as ORE from '@ore-three-ts';

import { FilterScene } from './FilterScene';

export class APP {

	private controller: ORE.Controller;
	private scene: FilterScene;

	constructor() {

		this.controller = new ORE.Controller( {
			canvas: document.querySelector( '#canvas' ) as HTMLCanvasElement,
			retina: true,
		} );

		this.scene = new FilterScene();

		this.controller.bindScene( this.scene );

	}

}

window.addEventListener( 'load', () => {

	let app = new APP();

} );
