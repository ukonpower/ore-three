import * as ORE from '@ore-three-ts';

import { TimelineAnimatorScene } from './TimelineAnimatorScene';

export class APP {

	private controller: ORE.Controller;
	private scene: TimelineAnimatorScene;

	constructor() {

		this.controller = new ORE.Controller();

		this.scene = new TimelineAnimatorScene();

		this.controller.addLayer( this.scene, {
			name: 'Main',
			canvas: document.querySelector( '#canvas' ) as HTMLCanvasElement,
		} );

	}

}

window.addEventListener( 'load', () => {

	let app = new APP();

} );
