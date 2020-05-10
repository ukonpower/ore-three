import * as ORE from '@ore-three-ts';

import { PageScrollerScene } from './PageScrollerScene';

export class APP {

	private controller: ORE.Controller;
	private scene: PageScrollerScene;

	constructor() {

		this.controller = new ORE.Controller( {
			canvas: document.querySelector( '#canvas' ) as HTMLCanvasElement,
			retina: true,
		} );

		this.scene = new PageScrollerScene();

		this.controller.bindScene( this.scene );

	}

}

window.addEventListener( 'load', () => {

	let app = new APP();

} );
