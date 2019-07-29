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
		this.scroller.registerSections( "a", document.querySelector( '.part1'), new THREE.Vector3( 0, 0, 10 ), false, false);
		this.scroller.registerSections( "b", document.querySelector( '.part3'), new THREE.Vector3( 0, -8, 10 ), true, true);
		this.scroller.registerSections( "c", document.querySelector( '.part4'), new THREE.Vector3( 0, -8, 10 ), false, true);
		this.scroller.registerSections( "d", document.querySelector( '.part6'), new THREE.Vector3( 0, -13, 10 ), true);

	}

	animate( deltaTime ) {
	
		this.scroller.update( deltaTime );
		
		console.log( this.scroller.scrollPercentages );
		

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