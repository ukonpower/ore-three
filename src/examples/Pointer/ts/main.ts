import * as ORE from "@ore-three";

import { PointerScene } from "./PointerScene";

export class APP {

	private controller: ORE.Controller;

	constructor() {

		this.controller = new ORE.Controller();

		this.controller.addLayer( new PointerScene( {
			name: 'Main',
			canvas: document.querySelector( '#canvas' ) as HTMLCanvasElement,
		} ) );

	}

}

window.addEventListener( "load", () => {

	const app = new APP();

} );
