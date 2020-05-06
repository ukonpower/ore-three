import * as THREE from 'three';
import * as ORE from '@ore-three-ts';

import backgroundFrag from './shaders/background.fs';
import MainObj from './MainObj';
import { ScrollManager } from './ScrollManager';

export class MainScene extends ORE.BaseScene {

	private mainObj: MainObj;

	private background: ORE.Background;
	private uniforms: ORE.Uniforms;

	private scrollManager: ScrollManager;

	constructor() {

		super();

		this.initScroller();

		// this.scrollManager.scroller.autoMove( {
		// 	target: 'usage',
		// 	duration: 0.01
		// } );

	}

	public onBind( gProps: ORE.GlobalProperties ) {

		super.onBind( gProps );

		this.camera.position.set( 0, 4, 15 );
		this.camera.lookAt( 0, 0, 0 );

		let aLight = new THREE.AmbientLight();
		aLight.intensity = 0.4;
		this.scene.add( aLight );

		let dLight = new THREE.DirectionalLight();
		dLight.intensity = 0.7;
		dLight.position.set( 0.1, 10, 2 );
		this.scene.add( dLight );

		this.mainObj = new MainObj();
		this.scene.add( this.mainObj.obj );

		this.uniforms = {
			time: {
				value: 0
			},
		};

		this.background = new ORE.Background( {
			fragmentShader: backgroundFrag,
			uniforms: this.uniforms
		} );

		this.scene.add( this.background );

	}

	private initScroller() {

		this.scrollManager = new ScrollManager( this );

	}

	public animate( deltaTime: number ) {

		this.uniforms.time.value = this.time;

		this.scrollManager.scroller.update( deltaTime );
		this.scrollManager.timeline.update( this.scrollManager.scroller.scrollTimelinePercentage );

		this.camera.position.copy( this.scrollManager.timeline.get<THREE.Vector3>( 'camPos' ) );

		this.mainObj.update( this.time );

		this.renderer.render( this.scene, this.camera );

	}

	public onResize( args: ORE.ResizeArgs ) {

		super.onResize( args );

		this.background.resize( args );

	}

	public onWheel( e: WheelEvent, trackPadDelta: number ) {

		this.scrollManager.scroller.scroll( trackPadDelta );

	}

	public onTouchStart( cursor: ORE.Cursor, e: MouseEvent ) {

		this.scrollManager.scroller.catch();

	}

	public onTouchMove( cursor: ORE.Cursor, e: MouseEvent ) {

		this.scrollManager.scroller.drag( - cursor.delta.y );


	}

	public onTouchEnd( cursor: ORE.Cursor ) {

		this.scrollManager.scroller.release();

	}

}
