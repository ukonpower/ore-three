import * as ORE from '@ore-three-ts';

import { GPUComputationControllerScene } from './GPUComputationControllerScene';

export class APP {

	private controller: ORE.Controller;
	private scene: GPUComputationControllerScene;

	constructor() {

		this.controller = new ORE.Controller();

		this.scene = new GPUComputationControllerScene();

		this.controller.addLayer( this.scene, {
			name: 'Main',
			canvas: document.querySelector( '#canvas' ) as HTMLCanvasElement,
		} );

	}

}

window.addEventListener( 'load', () => {

	let app = new APP();

} );
