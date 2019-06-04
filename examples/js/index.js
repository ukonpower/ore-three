import * as ORE from '../../src/';
import OREScene from './scenes/AudioPlayerScene';

class APP{
	constructor(){
		this.canvas = document.querySelector("#canvas");
		
        this.controller = new ORE.Controller({
			canvas: this.canvas,
			retina: false,
			alpha: false
		});

		this.oreScene = new OREScene(this.controller.renderer);
        this.controller.setScene(this.oreScene);
	}
}

window.addEventListener('load',()=>{
	let app = new APP();
});