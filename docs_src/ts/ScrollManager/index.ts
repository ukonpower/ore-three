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

		this.commonUniforms = ORE.UniformsLib.mergeUniforms( parentUniforms, {

		} );

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
			element: document.querySelector( '.face' ),
			name: "face",
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
						value: new THREE.Vector3( 0, 1.5, 4 )
					},
					{
						time: this.scroller.get( 'about' ).timelinePercentage,
						value: new THREE.Vector3( - 1.2, 1.5, 4 )
					},
					{
						time: this.scroller.get( 'about' ).timelinePercentage * 1.1,
						value: new THREE.Vector3( - 1.2, 1.5, 4 )
					},
					{
						time: this.scroller.get( 'usage' ).timelinePercentage,
						value: new THREE.Vector3( 1.3, 1.5, 4 )
					},
					{
						time: this.scroller.get( 'usage' ).timelinePercentage * 1.1,
						value: new THREE.Vector3( 1.2, 1.5, 4 )
					},
					{
						time: this.scroller.get( 'face' ).timelinePercentage,
						value: new THREE.Vector3( 0, 0, 4 )
					},
				],
				easing: {
					func: ORE.Easings.sigmoid,
					args: 4
				}
			},
		);

		this.timeline.add<THREE.Quaternion>(
			{
				name: 'camRot',
				keyframes: [
					{
						time: this.scroller.get( 'mainVis' ).timelinePercentage,
						value: new THREE.Quaternion().setFromEuler( new THREE.Euler( - 0.32, 0, 0 ) )
					},
					{
						time: this.scroller.get( 'about' ).timelinePercentage,
						value: new THREE.Quaternion().setFromEuler( new THREE.Euler( - 0.32, 0, 0 ) )
					},
					{
						time: this.scroller.get( 'about' ).timelinePercentage * 1.1,
						value: new THREE.Quaternion().setFromEuler( new THREE.Euler( - 0.32, 0, 0 ) )
					},
					{
						time: this.scroller.get( 'usage' ).timelinePercentage,
						value: new THREE.Quaternion().setFromEuler( new THREE.Euler( - 0.32, 0, 0 ) )
					},
					{
						time: this.scroller.get( 'usage' ).timelinePercentage * 1.1,
						value: new THREE.Quaternion().setFromEuler( new THREE.Euler( - 0.32, 0, 0 ) )
					},
					{
						time: this.scroller.get( 'face' ).timelinePercentage,
						value: new THREE.Quaternion().setFromEuler( new THREE.Euler( - 0.0, 0, 0 ) )
					},
				],
				easing: {
					func: ORE.Easings.sigmoid,
					args: 4
				}
			},
		);

		this.timeline.add<number>(
			{
				name: 'objTransform',
				keyframes: [
					{
						time: this.scroller.get( 'mainVis' ).timelinePercentage,
						value: 0.0
					},
					{
						time: ( this.scroller.get( 'mainVis' ).timelinePercentage + this.scroller.get( 'about' ).timelinePercentage ) / 2,
						value: 1.0
					},
					{
						time: this.scroller.get( 'about' ).timelinePercentage,
						value: 0.0
					},
					{
						time: ( this.scroller.get( 'about' ).timelinePercentage + this.scroller.get( 'usage' ).timelinePercentage ) / 2,
						value: 1.0
					},
					{
						time: this.scroller.get( 'usage' ).timelinePercentage,
						value: 0.0
					},
					{
						time: ( this.scroller.get( 'usage' ).timelinePercentage + this.scroller.get( 'face' ).timelinePercentage ) / 2,
						value: 1.0
					},
					{
						time: this.scroller.get( 'face' ).timelinePercentage,
						value: 0.2
					},
				],
				easing: {
					func: ORE.Easings.sigmoid,
					args: 4
				}
			},
		);

		this.timeline.add<number>(
			{
				name: 'objSelector',
				keyframes: [
					{
						time: this.scroller.get( 'mainVis' ).timelinePercentage,
						value: 0.0
					},
					{
						time: ( this.scroller.get( 'mainVis' ).timelinePercentage + this.scroller.get( 'about' ).timelinePercentage ) / 2,
						value: 0.0
					},
					{
						time: this.scroller.get( 'about' ).timelinePercentage,
						value: 1.0
					},
					{
						time: ( this.scroller.get( 'about' ).timelinePercentage + this.scroller.get( 'usage' ).timelinePercentage ) / 2,
						value: 1.0
					},
					{
						time: this.scroller.get( 'usage' ).timelinePercentage,
						value: 2.0
					},
					{
						time: ( this.scroller.get( 'usage' ).timelinePercentage + this.scroller.get( 'face' ).timelinePercentage ) / 2,
						value: 2.0
					},
					{
						time: this.scroller.get( 'face' ).timelinePercentage,
						value: 3.0
					},
				],
				easing: {
					func: ORE.Easings.sigmoid,
					args: 4
				}
			},
		);

		this.timeline.add<number>(
			{
				name: 'dark',
				keyframes: [
					{
						time: this.scroller.get( 'mainVis' ).timelinePercentage,
						value: 0
					},
					{
						time: this.scroller.get( 'about' ).timelinePercentage,
						value: 1.0
					},
					{
						time: this.scroller.get( 'usage' ).timelinePercentage,
						value: 1.0
					},
					{
						time: this.scroller.get( 'face' ).timelinePercentage,
						value: 0
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
