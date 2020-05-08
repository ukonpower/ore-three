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
			events: {
				onArrivals: [
					{
						percentage: 1.0,
						event: {
							common: () => {

								document.body.setAttribute( 'data-isScrollTop', 'true' );

							}
						}
					}
				],
				onStartScroll: {
					up: () => {

						return false;

					},
					down: () =>{

						document.body.setAttribute( 'data-isScrollTop', 'false' );

					}
				}
			},
			stop: true
		} ) );

		this.scroller.add( new ORE.PageScrollerSection( {
			element: document.querySelector( '.about' ),
			name: "about",
			stop: false
		} ) );

		this.scroller.add( new ORE.PageScrollerSection( {
			element: document.querySelector( '.usage' ),
			name: "usage",
			stop: false
		} ) );

		this.scroller.add( new ORE.PageScrollerSection( {
			element: document.querySelector( '.link' ),
			name: "link",
			bottom: true,
			stop: false
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
						time: this.scroller.get( 'about' ).timelinePercentage * 1.1,
						value: new THREE.Vector3( - 2, 1.5, 7 )
					},
					{
						time: this.scroller.get( 'usage' ).timelinePercentage,
						value: new THREE.Vector3( 2, 1.5, 7 )
					},
					{
						time: this.scroller.get( 'usage' ).timelinePercentage * 1.1,
						value: new THREE.Vector3( 2, 1.5, 7 )
					},
					{
						time: this.scroller.get( 'link' ).timelinePercentage,
						value: new THREE.Vector3( 0, 4, 15 )
					},
				],
				easing: {
					func: ORE.Easings.sigmoid,
					args: 4
				}
			},
		);

	}

}
