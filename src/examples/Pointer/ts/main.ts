import * as ORE from "@ore-three";

import { PointerScene } from "./PointerScene";

export class APP {

	private controller: ORE.Controller;
	private scene: PointerScene;

	constructor() {

		this.controller = new ORE.Controller();

		this.scene = new PointerScene();

		this.controller.addLayer( this.scene, {
			name: 'Main',
			canvas: document.querySelector( '#canvas' ) as HTMLCanvasElement,
		} );

	}

}

window.addEventListener( "load", () => {

	const app = new APP();

} );
