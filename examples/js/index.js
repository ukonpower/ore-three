import * as ORE from '../../src/';
import OREScene from './scenes/MainScene';

class APP{
	constructor(){
		this.canvas = document.querySelector("#canvas");
        this.controller = new ORE.Controller(this.canvas,false);
        this.oreScene = new OREScene(this.controller.renderer);
        this.controller.setScene(this.oreScene);
	}
}

window.addEventListener('load',()=>{
	let app = new APP();
});