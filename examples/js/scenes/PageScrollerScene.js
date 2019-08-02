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
	
		this.camera.position.set(0, 0, 5);

		let wrapper = document.createElement('div');
		wrapper.classList.add('wrapper');
		document.body.appendChild(wrapper);

		for( let i = 0; i < 6; i++ ){

			let elm = document.createElement('div');
			elm.classList.add('part' +  (i + 1).toString() );

			wrapper.appendChild( elm );

		}

		this.scroller = new ORE.PageScroller(wrapper);

		for( let i = 0; i < 10; i++ ){

			const boxGeo = new THREE.BoxGeometry( 1,1,1 );
			const boXMat = new THREE.MeshNormalMaterial();
			this.box = new THREE.Mesh( boxGeo,boXMat );

			this.box.position.y = -i * 1.5;
			this.scene.add( this.box );

		}

		//html sections
		this.scroller.registerSections({ 
			name: "a",
			element: document.querySelector( '.part1'),
			threePosition: new THREE.Vector3( 0, 0, 10 ),
		});
		
		this.scroller.registerSections({ 
			name: "b",
			element: document.querySelector( '.part3'),
			threePosition: new THREE.Vector3( 0, -8, 10 ),
			stop: true,
			onArrivalDownScroll: () => {
				
				console.log( 'arrival section at down scroll');
				
			},
			onArrivalUpScroll: () => {
				
				console.log( 'arrival section at up scroll');
				
			}
		});
		
		this.scroller.registerSections({ 
			name: "c",
			element: document.querySelector( '.part4'),
			threePosition: new THREE.Vector3( 0, -8, 10 ),
			stop: true,
			onStartDownScroll: ( vel ) => {

				console.log( 'start up scroll' );

				if( vel > 20 ){

					console.log( 'move.' );
				
					return true;

				}

				return false

			},
			onStartUpScroll: ( vel ) => {

				console.log( 'start up scroll' );
				
				return true;

			}
		});

		this.scroller.registerSections({ 
			name: "d",
			element: document.querySelector( '.part6'),
			threePosition: new THREE.Vector3( 0, -13, 10 ),
			bottom: true,
		});
	}

	animate( deltaTime ) {
	
		this.scroller.update( deltaTime );

		this.camera.position.copy( this.scroller.threePosition );
		this.renderer.render( this.scene, this.camera );
	
	}

	onResize(width, height) {
	
		super.onResize(width, height);
	
	}

	onTouchStart( cursor, e ) {
	
		// this.scroller.moveto(this.target);
	
	}

	onTouchMove( cursor, event ){

		this.scroller.setScrollVelocity( -cursor.delta.y );

		event.preventDefault();
		
	}

	onWheel( e ){
		
		this.scroller.setScrollVelocity(e.deltaY * 0.5)

	}
}