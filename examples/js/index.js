import * as ORE from '../../src/';
import MainScene from './MainScene';

class APP{
	constructor(){
		this.canvas = document.querySelector("#canvas");
        this.controller = new ORE.Controller(this.canvas,false);
        this.oreScene = new MainScene(this.controller.renderer);
        this.controller.setScene(this.oreScene);
	}
}

window.addEventListener('load',()=>{
	let app = new APP();
});