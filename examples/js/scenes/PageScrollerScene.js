import * as ORE from '../../../src/';
import * as THREE from 'three';

export class PageScrollerScene extends ORE.BaseScene {

	constructor() {
	
		super();
	
		this.name = "PageScrollerScene";
	
	}

	onBind( gProps ) {
		
		super.onBind( gProps );
		
		this.renderer = this.gProps.renderer;
	
		this.camera.position.set( 0, 0, 5 );

		let wrapper = document.createElement( 'div' );
		wrapper.classList.add( 'wrapper' );
		document.body.appendChild(wrapper);

		for( let i = 0; i < 6; i++ ){

			let elm = document.createElement( 'div' );
			elm.classList.add('part' +  (i + 1).toString(), 'part' );
			wrapper.appendChild( elm );

		}

		this.scroller = new ORE.PageScroller(wrapper);
		this.scroller.setEasingPos( ORE.Easings.sigmoid, 6 );

		for( let i = 0; i < 10; i++ ){

			const boxGeo = new THREE.BoxGeometry( 1, 1, 1 );
			const boXMat = new THREE.MeshNormalMaterial();
			this.box = new THREE.Mesh( boxGeo,boXMat );

			this.box.position.y = -i * 1.5;
			this.scene.add( this.box );

		}

		//html sections
		this.scroller.addSection( new ORE.PageScrollerSection({ 
			name: "a",
			element: document.querySelector( '.part1' ),
			threePosition: new THREE.Vector3( 0, 0, 10 )
		}));
		
		this.scroller.addSection( new ORE.PageScrollerSection({ 
			name: "b",
			element: document.querySelector( '.part3' ),
			threePosition: new THREE.Vector3( 0, -8, 10 ),
			stop: true,
			events: {
				onStartScroll: ( args ) => {
				
					console.log( 'start Scroll : ', args.section );

					return true;

				}
			}
		}));
		
		this.scroller.addSection( new ORE.PageScrollerSection({ 
			name: "c",
			element: document.querySelector( '.part4' ),
			threePosition: new THREE.Vector3( 0, -8, 10 ),
			stop: true,
			events: {
				onStartScroll: ( args ) => {
				
					console.log( 'start Scroll : ', args.section );

					return true;

				}
			}
		}));

		this.scroller.addSection( new ORE.PageScrollerSection({ 
			name: "d",
			element: document.querySelector( '.part6' ),
			threePosition: new THREE.Vector3( 0, -13, 10 ),
			bottom: true,
			stop: true,
		}));

		this.scroller.getSection( 'a' ).addArrivalEvent( 
			{
				percentage: 0.5,
				event: () => { console.log( "hello" )}
			}
		)
		
	}

	animate( deltaTime ) {
	
		this.scroller.update( deltaTime );

		this.camera.position.copy( this.scroller.threePosition );
		this.renderer.render( this.scene, this.camera );
	
	}

	onResize(args) {
	
		super.onResize(args);

		this.scroller.resize();
	
	}

	onTouchStart( cursor, e ) {
	
		// this.scroller.moveto(this.target);
	
	}

	onTouchMove( cursor, event ){

		this.scroller.setVelocity( -cursor.delta.y );

		event.preventDefault();
		
	}

	onWheel( e ){
		
		this.scroller.addVelocity(e.deltaY * 0.5)

	}
}