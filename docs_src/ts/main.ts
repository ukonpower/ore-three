import * as ORE from '@ore-three-ts';

import { MainScene } from './MainScene';
import { AssetManager } from './AssetManager';

declare global {
	interface Window {
	  assetManager: AssetManager;
	}
  }

export class APP {

	private controller: ORE.Controller;
	private scene: MainScene;

	constructor() {

		this.controller = new ORE.Controller( {
			canvas: document.querySelector( '#canvas' ) as HTMLCanvasElement,
			retina: true,
		} );

		this.scene = new MainScene();

		this.controller.bindScene( this.scene );

	}

}

window.addEventListener( 'load', () => {

	new APP();

} );
