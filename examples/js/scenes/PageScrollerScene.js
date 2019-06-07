import * as ORE from '../../../src/';
import * as THREE from 'three';

export default class MainScene extends ORE.BaseScene {

	constructor(renderer) {
	
		super(renderer);
	
		this.name = "MainScene";
		this.init();
	
	}

	init() {
	
		this.camera.position.set(0, 1.5, 3);
		this.camera.lookAt(0, 0, 0);

		let wrapper = document.createElement('div');
		wrapper.classList.add('wrapper');
		document.body.appendChild(wrapper);

		this.target = document.createElement('div');
		this.target.classList.add('target');
		wrapper.appendChild(this.target);

		this.scroller = new ORE.PageScroller(wrapper);
	
	}

	animate() {
	
		this.scroller.update(this.deltaTime);
		this.renderer.render(this.scene, this.camera);
	
	}

	onResize(width, height) {
	
		super.onResize(width, height);
	
	}

	onTouchStart(e) {
	
		this.scroller.moveto(this.target);
	
	}

	onTouchMove(e) {
	}

	onTouchEnd(e) {
	}

	onWheel(e){
		
		this.scroller.setScrollVelocity(e.deltaY)

	}
}