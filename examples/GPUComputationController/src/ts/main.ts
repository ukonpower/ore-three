import * as ORE from '@ore-three-ts';

import { GPUComputationControllerScene } from './GPUComputationControllerScene';

export class APP {

	private controller: ORE.Controller;
	private scene: GPUComputationControllerScene;

	constructor() {

		this.controller = new ORE.Controller( {
			canvas: document.querySelector( '#canvas' ) as HTMLCanvasElement,
			retina: true,
		} );

		this.scene = new GPUComputationControllerScene();

		this.controller.bindScene( this.scene );

	}

}

window.addEventListener( 'load', () => {

	let app = new APP();

} );
