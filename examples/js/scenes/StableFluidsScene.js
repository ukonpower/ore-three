import * as ORE from '../../../src/';
import * as THREE from 'three';

import frag from './glsl/textureView.fs';

export default class StableFluidScene extends ORE.BaseScene {

	constructor( renderer ) {

		super( renderer );

		this.name = "StableFluidsScene";
		
		this.init();

	}

	init() {
		
		this.camera.position.set( 0, 1.5, 3 );
		this.camera.lookAt( 0, 0, 0 );

		//create stable fluids
		this.fluid = new ORE.StableFluids( this.renderer, new THREE.Vector2( 256, 256 ) );

		//create element
		let dom = document.createElement('div');
		dom.classList.add('dom-glsl');
		document.body.insertBefore(dom,document.querySelector('#canvas'));

		//create domGLSL
		this.param = {
			dom: dom,
			fragmentShader: frag,
			uniforms: {
				time: { value: 0 },
				texture: { value: null },
			}
		};

		this.domglsl = new ORE.DomGLSL( this.param );

		this.scene.add( this.domglsl );

	}

	animate() {

		//update fluid
		let pos = new THREE.Vector2( this.cursor.position.x / this.width, (this.heigth - this.cursor.position.y) / this.heigth );
		let vec = new THREE.Vector2( this.cursor.delta.x, -this.cursor.delta.y );
		this.fluid.setPointer( pos, vec );
		this.fluid.update( this.deltaTime );

		//update dom size and position
		this.domglsl.updateDom();

		//update uniform
		this.param.uniforms.time.value = this.time;
		this.param.uniforms.texture.value = this.fluid.getTexture();

		this.cursor.update();
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
