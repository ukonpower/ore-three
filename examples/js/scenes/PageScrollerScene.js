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

		this.scroller = new ORE.PageScroller(document.querySelector('.wrapper'));
	}

	animate() {
		this.scroller.update(this.deltaTime);
		this.renderer.render(this.scene, this.camera);
	}

	onResize(width, height) {
		super.onResize(width, height);
	}

	onTouchStart(e) {
		this.scroller.moveto(document.querySelector('.dom-glsl'));
	}

	onTouchMove(e) {
	}

	onTouchEnd(e) {
	}

	onWheel(e){
		this.scroller.setScrollVelocity(e.deltaY)
	}
}