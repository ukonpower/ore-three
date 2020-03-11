import * as ORE from "@ore-three-ts";

import { CursorScene } from "./CursorScene";

export class APP {

	private controller: ORE.Controller;
	private scene: CursorScene;

	constructor() {

		this.controller = new ORE.Controller( {
			canvas: document.querySelector( "#canvas" ) as HTMLCanvasElement,
			retina: true
		} );

		this.scene = new CursorScene();

		this.controller.bindScene( this.scene );

	}

}

window.addEventListener( "load", () => {

	const app = new APP();

} );
