import * as THREE from 'three';
import * as ORE from '@ore-three';

import { RenderPipeline } from './RenderPipeline';

import backgroundVert from './shaders/background.vs';
import backgroundFrag from './shaders/background.fs';

export class MainScene extends ORE.BaseLayer {

	private isExamplePage: boolean = false;
	private spWeight: number = 0.0;

	private box?: THREE.Mesh;

	private renderPipeline?: RenderPipeline;

	constructor( param: ORE.LayerParam ) {

		super( param );

		this.commonUniforms = ORE.UniformsLib.mergeUniforms( this.commonUniforms, {
			objTransform: {
				value: 0
			},
			objSelector: {
				value: 0
			},
			spWeight: {
				value: 0
			},
			dark: {
				value: 0
			}
		} );

		this.isExamplePage = window.location.href.indexOf( 'examples' ) != - 1;

		const menuButtonElm = document.querySelector( '.ui-menu-button' ) as HTMLElement;

		if ( menuButtonElm ) {

			menuButtonElm.addEventListener( 'click', ( e ) => {

				document.body.setAttribute( 'data-menu-open', document.body.getAttribute( 'data-menu-open' ) == 'true' ? 'false' : 'true' );

			} );

		}

	}

	public onBind() {

		super.onBind();

		const aLight = new THREE.AmbientLight();
		aLight.intensity = 0.4;
		this.scene.add( aLight );

		const dLight = new THREE.DirectionalLight();
		dLight.intensity = 0.7;
		dLight.position.set( 0.1, 10, 2 );
		this.scene.add( dLight );

		// main obj

		this.box = new THREE.Mesh( new THREE.BoxBufferGeometry(), new THREE.MeshNormalMaterial() );
		this.scene.add( this.box );

		// background

		const background = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), new THREE.ShaderMaterial( {
			vertexShader: backgroundVert,
			fragmentShader: backgroundFrag,
			uniforms: this.commonUniforms
		} ) );

		this.scene.add( background );

		// camera

		this.camera.position.set( 0, 1, 5 );
		this.camera.lookAt( 0, 0, 0 );

		if ( this.renderer ) {

			this.renderPipeline = new RenderPipeline( this.renderer );

		}

		this.dispatchEvent( {
			type: 'createdRenderer',
			renderer: this.renderer
		} );

	}

	public animate( deltaTime: number ) {

		if ( this.box ) {

			this.box.rotation.y = this.time;

		}

		if ( this.renderPipeline ) {

			this.renderPipeline.render( this.scene, this.camera );

		}


	}

	public onResize() {

		super.onResize();

		this.spWeight = Math.min( 1.0, Math.max( 0.0, ( this.info.size.windowSize.x - 500 ) / 1000 ) );

		this.commonUniforms.spWeight.value = this.spWeight;

		if ( this.renderPipeline ) {

			this.renderPipeline.resize( this.info.size.canvasPixelSize );

		}

	}

}
