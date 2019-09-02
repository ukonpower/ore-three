import * as ORE from '../../../src/';
import * as THREE from 'three';
import frag from './glsl/dom-glsl.fs';

export class DomGLSLScene extends ORE.BaseScene {

	constructor() {

		super();

		this.name = "DomGLSLScene";
		
	}

	onBind( gProps ) {

		super.onBind( gProps );

		this.renderer = this.gProps.renderer;

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

	animate( deltaTime ) {

		//update dom size and position
		this.domglsl.updateDom();

		//update uniform
		this.param.uniforms.time.value = this.time;

		this.renderer.render( this.scene, this.camera );

	}

	onResize( args ) {

		super.onResize( args );

	}

}
