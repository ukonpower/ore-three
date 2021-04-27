import * as THREE from 'three';
import * as ORE from '@ore-three-ts';

export class PageScrollerScene extends ORE.BaseLayer {

	private scroller?: ORE.PageScroller;

	constructor() {

		super();

	}

	public onBind( info: ORE.LayerInfo ) {

		super.onBind( info );

		this.camera.position.set( 0, 0, 4 );
		this.camera.lookAt( 0, 0, 0 );

		this.initScroller();
		this.initScene();

	}

	private initScroller() {

		let wrapper = document.querySelector( '.wrapper' ) as HTMLElement;
		let sec1Elm = document.querySelector( '.section1' ) as HTMLElement;
		let sec2Elm = document.querySelector( '.section2' ) as HTMLElement;
		let sec3Elm = document.querySelector( '.section3' ) as HTMLElement;
		let sec4Elm = document.querySelector( '.section4' ) as HTMLElement;

		if ( wrapper && sec1Elm && sec2Elm && sec3Elm && sec4Elm ) {

			this.scroller = new ORE.PageScroller( wrapper );

			this.scroller.add( new ORE.PageScrollerSection( {
				name: 'sec1',
				element: sec1Elm,
				stop: true,
				bottom: true,
			} ) );

			this.scroller.add( new ORE.PageScrollerSection( {
				name: 'sec2',
				element: sec2Elm,
				stop: true,
				bottom: true,
				events: {
					onStartScroll: {
						down: ( args ) => {

							if ( this.scroller ) {

								this.scroller.autoMove( {
									target: 'sec3',
								} );

							}

						}
					},
					onArrivals: [
						{
							percentage: 1,
							event: {
								common: () => {
								}
							}
						}
					]
				},
			} ) );

			this.scroller.add( new ORE.PageScrollerSection( {
				name: 'sec3',
				element: sec3Elm,
				stop: true,
				bottom: false,
				events: {
					onStartScroll: {
						up: ( args ) => {

							if ( this.scroller ) {

								this.scroller.autoMove( {
									target: 'sec2',
									bottom: true
								} );

							}

						},
					},
				}
			} ) );

			this.scroller.add( new ORE.PageScrollerSection( {
				name: 'sec4',
				element: sec4Elm,
				stop: true,
				bottom: true,
				events: {
					onArrivals: [
						{
							percentage: 1.0,
							event: {
								common: () => {

									console.log( "arrival sec4" );

								}
							}
						}
					]
				}
			} ) );

		}


	}

	private initScene() {

		for ( let i = 0; i < 20; i ++ ) {

			let boxgeo = new THREE.BoxBufferGeometry();
			let mat = new THREE.MeshNormalMaterial();

			let mesh = new THREE.Mesh( boxgeo, mat );
			mesh.position.y = - i * 1.5;
			this.scene.add( mesh );

		}

	}

	public animate( deltaTime: number ) {

		if ( this.scroller == null ) return;

		this.scroller.update( deltaTime );

		this.camera.position.y = - this.scroller.scrollPercentageDelay * 5.0;

		if ( this.renderer ) {

			this.renderer.render( this.scene, this.camera );

		}

	}

	public onWheel( e: WheelEvent, trackpatDelta: number ) {

		if ( this.scroller ) {

			this.scroller.scroll( trackpatDelta );

		}

	}

	public onTouchStart( args: ORE.TouchEventArgs ) {

		if ( this.scroller ) {

			this.scroller.catch();

		}

	}

	public onTouchMove( args: ORE.TouchEventArgs ) {

		if ( this.scroller ) {

			this.scroller.drag( - args.delta.y * 1.0 );

		}

		args.event.preventDefault();

	}

	public onTouchEnd( args: ORE.TouchEventArgs ) {

		if ( this.scroller ) {

			this.scroller.release();

		}

	}

}
