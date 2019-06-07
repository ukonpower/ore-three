import * as ORE from '../../../src/';
import * as THREE from 'three';
import frag from './glsl/dom-glsl.fs';

export default class DomGLSLScene extends ORE.BaseScene {

	constructor( renderer ) {

		super( renderer );
		this.name = "DomGLSLScene";
		this.init();

	}

	init() {

		this.camera.position.set( 0, 1.5, 3 );
		this.camera.lookAt( 0, 0, 0 );

		let dom = document.createElement('div');
		dom.classList.add('dom-glsl');
		document.body.insertBefore(dom,document.querySelector('#canvas'));

		//create domGLSL
		this.param = {
			dom: dom,
			fragmentShader: frag,
			uniforms: {
				time: { value: 0 }
			}
		};

		this.domglsl = new ORE.DomGLSL( this.param );

		this.scene.add( this.domglsl );

	}

	animate() {

		//update dom size and position
		this.domglsl.updateDom();

		//update uniform
		this.param.uniforms.time.value = this.time;

		this.renderer.render( this.scene, this.camera );

	}

	onResize( width, height ) {

		super.onResize( width, height );

	}

	onTouchStart( e ) {
	}

	onTouchMove( e ) {}

	onTouchEnd( e ) {}

	onWheel( e ) {}

}
