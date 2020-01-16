import * as ORE from '../../../src/';
import * as THREE from 'three';

import frag from './glsl/stableFluidsView.fs';
import densityFrag from './glsl/stableFluidsDensity.fs';

export class StableFluidsScene extends ORE.BaseScene {

	constructor() {

		super();

		this.name = "StableFluidsScene";

	}

	onBind( gProps ) {
		
		super.onBind( gProps );

		this.renderer = this.gProps.renderer;

		this.camera.position.set( 0, 1.5, 3 );
		this.camera.lookAt( 0, 0, 0 );

		//create stable fluids
		this.fluid = new ORE.StableFluids( this.renderer, new THREE.Vector2( 128, 128 ) );
		

		//create density
		this.gcContrller = new ORE.GPUComputationController( this.renderer, new THREE.Vector2( 2048, 2048 ) );
        this.densityKernel = this.gcContrller.createKernel( densityFrag );
		this.densityData = this.gcContrller.createData({
			minFilter: THREE.LinearFilter,
			magFilter: THREE.LinearFilter
		});

        this.densityKernel.uniforms.dataTex = { value: null };
        this.densityKernel.uniforms.densityTex = { value: null };
        this.densityKernel.uniforms.pointerPos = { value: new THREE.Vector2( -99, -99 ) };
        this.densityKernel.uniforms.pow = { value: 0 };
        this.densityKernel.uniforms.screenAspect = { value: 1.0 };
		this.densityKernel.uniforms.time = { value: 0 };
		
		//create element
		this.elm = document.createElement('div');
		this.elm.classList.add('stableFluids');
		document.body.insertBefore(this.elm,document.querySelector('#canvas'));

		//create domGLSL
		this.param = {
			fragmentShader: frag,
			uniforms: {
				time: { value: 0 },
				texture: { value: null },
			}
		};

		this.domglsl = new ORE.DomGLSL( this.elm, this.param );

		this.scene.add( this.domglsl );

	}

	animate( deltaTime ) {

		//update fluids
		this.fluid.update();

		//update density
		this.densityKernel.uniforms.dataTex.value = this.fluid.getTexture();
		this.densityKernel.uniforms.densityTex.value = this.densityData.buffer.texture;
		this.densityKernel.uniforms.time.value = this.time;
		this.gcContrller.compute( this.densityKernel, this.densityData );

		//update uniform
		this.param.uniforms.time.value = this.time;
		this.param.uniforms.texture.value = this.densityData.buffer.texture;

		//update dom size and position
		this.domglsl.updateDom();
		
		this.renderer.render( this.scene, this.camera );

	}

	onResize( args ) {

		super.onResize( args );

		this.fluid.parameter.screenAspect = 1.0;

	}
	
	onHover( cursor ){

		//update fluid
		let vec = new THREE.Vector2( cursor.hoverDelta.x, -cursor.hoverDelta.y );
		let pos = cursor.getRelativePosition( this.elm, true, true);

		if( pos ){			

			pos.y = 1 - pos.y;
			
			this.fluid.setPointer( pos, vec );

			this.densityKernel.uniforms.pointerPos.value = pos;

		}else{

			this.fluid.setPointer( new THREE.Vector2(0,0), vec );
			
		}

		this.densityKernel.uniforms.pow.value = vec.length() * 0.05;

		
	}

	onTouchMove( cursor, event ){
		event.preventDefault();
	}
	
}
