import * as ORE from '@ore-three-ts';

import { DomMeshScene } from './DomMeshScene';

export class APP {

	private controller: ORE.Controller;
	private scene: DomMeshScene;

	constructor() {

		this.controller = new ORE.Controller( {
			canvas: document.querySelector( '#canvas' ) as HTMLCanvasElement,
			retina: true,
		} );

		this.scene = new DomMeshScene();

		this.controller.bindScene( this.scene );

	}

}

window.addEventListener( 'load', () => {

	let app = new APP();

} );
