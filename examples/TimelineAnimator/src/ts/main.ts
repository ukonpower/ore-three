import * as ORE from '@ore-three-ts';

import { TimelineAnimatorScene } from './TimelineAnimatorScene';

export class APP {

	private controller: ORE.Controller;
	private scene: TimelineAnimatorScene;

	constructor() {

		this.controller = new ORE.Controller( {
			canvas: document.querySelector( '#canvas' ) as HTMLCanvasElement,
			retina: true,
		} );

		this.scene = new TimelineAnimatorScene();

		this.controller.bindScene( this.scene );

	}

}

window.addEventListener( 'load', () => {

	let app = new APP();

} );
