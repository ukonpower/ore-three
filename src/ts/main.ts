import * as ORE from '@ore-three';

import { MainScene } from './MainScene';


export class APP {

	private controller: ORE.Controller;
	private scene: MainScene;

	constructor() {

		this.controller = new ORE.Controller();

		this.scene = new MainScene( {
			name: 'Main',
			canvas: document.querySelector( '#canvas' ) as HTMLCanvasElement,
		} );

		this.controller.addLayer( this.scene );

	}

}

window.addEventListener( 'load', () => {

	new APP();

} );
