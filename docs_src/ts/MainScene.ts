import * as THREE from 'three';
import * as ORE from '@ore-three-ts';

import { MainObj } from './MainObj';
import { ScrollManager } from './ScrollManager';
import { AssetManager } from './AssetManager';
import { RenderPipeline } from './RenderPipeline';

import backgroundFrag from './shaders/background.fs';

export class MainScene extends ORE.BaseLayer {

	private isExamplePage: boolean = false;

	private scrollManager?: ScrollManager;
	private assetManager?: AssetManager;
	private mainObj?: MainObj;
	private background?: ORE.Background;
	private spWeight: number = 0.0;

	private renderPipeline?: RenderPipeline;

	constructor() {

		super();

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

		if ( ! this.isExamplePage ) {

			this.initScroller();

			this.assetManager = new AssetManager( {
				onMustAssetLoaded: () => {

					this.initScene();

				}
			} );

			window.oreDocsAssetManager = this.assetManager;

		} else {

			document.body.setAttribute( 'data-useScroller', 'false' );

			this.initScene();

		}

		let menuButtonElm = document.querySelector( '.ui-menu-button' ) as HTMLElement;

		if ( menuButtonElm ) {

			menuButtonElm.addEventListener( 'click', ( e ) => {

				document.body.setAttribute( 'data-menu-open', document.body.getAttribute( 'data-menu-open' ) == 'true' ? 'false' : 'true' );

			} );

		}

	}

	public onBind( info: ORE.LayerInfo ) {

		super.onBind( info );

		let aLight = new THREE.AmbientLight();
		aLight.intensity = 0.4;
		this.scene.add( aLight );

		let dLight = new THREE.DirectionalLight();
		dLight.intensity = 0.7;
		dLight.position.set( 0.1, 10, 2 );
		this.scene.add( dLight );

		if ( this.renderer ) {

			this.renderPipeline = new RenderPipeline( this.renderer );

		}

		this.dispatchEvent( {
			type: 'createdRenderer',
			renderer: this.renderer
		} );

	}

	private initScene() {

		if ( ! this.isExamplePage ) {

			this.mainObj = new MainObj( this.commonUniforms );
			this.scene.add( this.mainObj.obj );

		}

		this.background = new ORE.Background( {
			fragmentShader: backgroundFrag,
			uniforms: this.commonUniforms
		} );
		this.background.renderOrder = - 100;

		this.scene.add( this.background );

		window.scrollTo( 0, 0 );

	}

	private initScroller() {

		this.scrollManager = new ScrollManager( this );

	}

	public animate( deltaTime: number ) {

		if ( ! this.isExamplePage ) {

			if ( this.assetManager && this.assetManager.isLoaded ) {

				if ( this.scrollManager && this.scrollManager.scroller && this.scrollManager.timeline ) {

					this.scrollManager.scroller.update( deltaTime );
					this.scrollManager.timeline.update( this.scrollManager.scroller.scrollTimelinePercentage );

					this.commonUniforms.objTransform.value = this.scrollManager.timeline.get<number>( 'objTransform' );
					this.commonUniforms.objSelector.value = this.scrollManager.timeline.get<number>( 'objSelector' );
					this.commonUniforms.dark.value = this.scrollManager.timeline.get<number>( 'dark' );

					let pos = this.scrollManager.timeline.get<THREE.Vector3>( 'camPos' );
					let rot = this.scrollManager.timeline.get<THREE.Quaternion>( 'camRot' );

					if ( pos && rot ) {

						this.camera.position.copy( pos );
						this.camera.quaternion.copy( rot );

					}

				}


				this.camera.position.x *= this.spWeight;

				if ( this.mainObj ) {

					this.mainObj.update( this.time );

				}

			}



		}

		if ( this.renderPipeline ) {

			this.renderPipeline.render( this.scene, this.camera );

		}


	}

	public onResize() {

		super.onResize();

		this.spWeight = Math.min( 1.0, Math.max( 0.0, ( this.info.size.windowSize.x - 500 ) / 1000 ) );

		this.commonUniforms.spWeight.value = this.spWeight;

		this.background && this.background.resize( this.info.size );

		if ( this.renderPipeline ) {

			this.renderPipeline.resize( this.info.size.canvasPixelSize );

		}

	}

	public onWheel( e: WheelEvent, trackPadDelta: number ) {

		this.scrollManager && this.scrollManager.scroller.scroll( e.deltaY * 0.7 );

	}

	public onTouchStart( args: ORE.TouchEventArgs ) {

		this.scrollManager && this.scrollManager.scroller.catch();

	}

	public onTouchMove( args: ORE.TouchEventArgs ) {

		this.scrollManager && this.scrollManager.scroller.drag( - args.delta.y );

	}

	public onTouchEnd( args: ORE.TouchEventArgs ) {

		this.scrollManager && this.scrollManager.scroller.release();

	}

}
