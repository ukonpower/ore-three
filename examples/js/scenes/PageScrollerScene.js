import * as ORE from '../../../src/';
import * as THREE from 'three';

export default class MainScene extends ORE.BaseScene {

	constructor() {
	
		super();
	
		this.name = "PageScrollerScene";
	
	}

	onBind( gProps ) {
		
		super.onBind( gProps );
		
		this.renderer = this.gProps.renderer;
	
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

	animate( deltaTime ) {
	
		this.scroller.update( deltaTime );
		this.renderer.render( this.scene, this.camera );
	
	}

	onResize(width, height) {
	
		super.onResize(width, height);
	
	}

	onTouchStart( cursor, e ) {
	
		this.scroller.moveto(this.target);
	
	}

	onWheel( e ){
		
		this.scroller.setScrollVelocity(e.deltaY)

	}
}