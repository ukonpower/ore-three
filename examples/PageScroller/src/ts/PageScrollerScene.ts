import * as THREE from 'three';
import * as ORE from '@ore-three-ts';

export class PageScrollerScene extends ORE.BaseScene {

	private scroller: ORE.PageScroller;

	constructor() {

		super();

	}

	public onBind( gProps: ORE.GlobalProperties ) {

		super.onBind( gProps );

		this.camera.position.set( 0, 0, 4 );
		this.camera.lookAt( 0, 0, 0 );

		this.initScroller();
		this.initScene();

	}

	private initScroller() {

		this.scroller = new ORE.PageScroller( document.querySelector( '.wrapper' ) );

		this.scroller.add( new ORE.PageScrollerSection( {
			name: 'sec1',
			element: document.querySelector( '.section1' ),
			stop: true,
			bottom: true,
		} ) );

		this.scroller.add( new ORE.PageScrollerSection( {
			name: 'sec2',
			element: document.querySelector( '.section2' ),
			stop: true,
			bottom: true,
			events: {
				onStartScroll: {
					down: ( args ) => {

						this.scroller.autoMove( {
							target: 'sec3'
						} );

					}
				}
			},
			startScrollDown: 20,
			startScrollUp: 0
		} ) );

		this.scroller.add( new ORE.PageScrollerSection( {
			name: 'sec3',
			element: document.querySelector( '.section3' ),
			stop: true,
			bottom: false,
			startScrollUp: 30,
			events: {
				onStartScroll: {
					up: ( args ) => {

						this.scroller.autoMove( {
							target: 'sec2',
							bottom: true
						} );

					},
				},
			}
		} ) );

		this.scroller.add( new ORE.PageScrollerSection( {
			name: 'sec4',
			element: document.querySelector( '.section4' ),
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

		this.scroller.update( deltaTime );

		this.camera.position.y = - this.scroller.scrollPercentageDelay * 5.0;

		console.log( this.scroller.scrollTimelinePercentage );

		this.renderer.render( this.scene, this.camera );

	}

	public onWheel( e: WheelEvent, trackpatDelta: number ) {

		this.scroller.scroll( trackpatDelta );

	}

	public onTouchStart( cursor: ORE.Cursor, event: MouseEvent ) {

		this.scroller.catch();

	}

	public onTouchMove( cursor: ORE.Cursor, event: MouseEvent ) {

		this.scroller.drag( - cursor.delta.y * 1.0 );

		event.preventDefault();

	}

	public onTouchEnd( cursor: ORE.Cursor, event: MouseEvent ) {

		this.scroller.release();

	}

	public onResize( args: ORE.ResizeArgs ) {

		super.onResize( args );

	}

}
