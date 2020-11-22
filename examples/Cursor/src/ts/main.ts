import * as ORE from "@ore-three-ts";

import { CursorScene } from "./CursorScene";

export class APP {

	private controller: ORE.Controller;
	private scene: CursorScene;

	constructor() {

		this.controller = new ORE.Controller();

		this.scene = new CursorScene();

		this.controller.addLayer( this.scene, {
			name: 'Main',
			canvas: document.querySelector( '#canvas' ) as HTMLCanvasElement,
		} );

	}

}

window.addEventListener( "load", () => {

	const app = new APP();

} );
