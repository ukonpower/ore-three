import * as THREE from 'three';
import * as ORE from '@ore-three-ts';
import { MainScene } from '../MainScene';

export class ScrollManager {

	private commonUniforms: ORE.Uniforms;
	private mainScene: MainScene;
	public scroller: ORE.PageScroller;
	public timeline: ORE.TimelineAnimator

	constructor( scene: MainScene, parentUniforms?: ORE.Uniforms ) {

		this.mainScene = scene;

		this.commonUniforms = ORE.UniformsLib.CopyUniforms( {

		}, parentUniforms );

		this.initScroller();
		this.initTimeline();

	}

	protected initScroller() {

		this.scroller = new ORE.PageScroller( document.querySelector( '.transform-container' ) );

		this.scroller.add( new ORE.PageScrollerSection( {
			element: document.querySelector( '.mainVis' ),
			name: "mainVis",
			stop: true
		} ) );

		this.scroller.add( new ORE.PageScrollerSection( {
			element: document.querySelector( '.about' ),
			name: "about",
			stop: true
		} ) );

		this.scroller.add( new ORE.PageScrollerSection( {
			element: document.querySelector( '.usage' ),
			name: "usage",
			stop: true
		} ) );

		this.scroller.add( new ORE.PageScrollerSection( {
			element: document.querySelector( '.links' ),
			name: "links",
			stop: true
		} ) );

	}

	protected initTimeline() {

		this.timeline = new ORE.TimelineAnimator();

		this.timeline.add<THREE.Vector3>(
			{
				name: 'camPos',
				keyframes: [
					{
						time: this.scroller.get( 'mainVis' ).timelinePercentage,
						value: new THREE.Vector3( 0, 4, 15 )
					},
					{
						time: this.scroller.get( 'about' ).timelinePercentage,
						value: new THREE.Vector3( - 2, 1.5, 7 )
					},
					{
						time: this.scroller.get( 'usage' ).timelinePercentage,
						value: new THREE.Vector3( 2, 1.5, 7 )
					},
					{
						time: this.scroller.get( 'links' ).timelinePercentage,
						value: new THREE.Vector3( 0, 4, 15 )
					},
				]
			}
		);

	}

}
