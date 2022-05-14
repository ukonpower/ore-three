import * as ORE from 'ore-three';

import { MainScene } from './MainScene';
import { AssetManager } from './AssetManager';

declare global {
	interface Window {
		oreDocsAssetManager: AssetManager;
	}
  }

export class APP {

	private controller: ORE.Controller;
	private scene: MainScene;

	constructor() {

		this.controller = new ORE.Controller();

		this.scene = new MainScene();

		this.controller.addLayer( this.scene, {
			name: 'Main',
			canvas: document.querySelector( '#canvas' ) as HTMLCanvasElement,
		} );

	}

}

window.addEventListener( 'load', () => {

	new APP();

} );
