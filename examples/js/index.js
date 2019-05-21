import * as ORE from '../../src/';
import OREScene from './scenes/BackgroundScene';

class APP{
	constructor(){
		this.canvas = document.querySelector("#canvas");
        this.controller = new ORE.Controller(this.canvas,true);
        this.oreScene = new OREScene(this.controller.renderer);
        this.controller.setScene(this.oreScene);
	}
}

window.addEventListener('load',()=>{
	let app = new APP();
});