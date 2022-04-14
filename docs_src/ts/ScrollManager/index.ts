import * as THREE from 'three';
import * as ORE from '@ore-three-ts';
import { MainScene } from '../MainScene';

export class ScrollManager {

	private commonUniforms: ORE.Uniforms;
	private mainScene: MainScene;
	public scroller: ORE.PageScroller;
	public timeline: ORE.TimelineAnimator;

	constructor( scene: MainScene, parentUniforms?: ORE.Uniforms ) {

		this.mainScene = scene;

		this.commonUniforms = ORE.UniformsLib.mergeUniforms( parentUniforms, {

		} );

		let container = document.querySelector( '.transform-container' ) as HTMLElement;
		let mainVisElm = document.querySelector( '.mainVis' ) as HTMLElement;
		let about = document.querySelector( '.about' ) as HTMLElement;
		let usage = document.querySelector( '.usage' ) as HTMLElement;
		let face = document.querySelector( '.face' ) as HTMLElement;

		this.scroller = new ORE.PageScroller( container );

		let secMain = this.scroller.add( new ORE.PageScrollerSection( {
			element: mainVisElm,
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

		let secAbout = this.scroller.add( new ORE.PageScrollerSection( {
			element: about,
			name: "about",
			stop: false
		} ) );

		let secUsage = this.scroller.add( new ORE.PageScrollerSection( {
			element: usage,
			name: "usage",
			stop: false
		} ) );

		let secFace = this.scroller.add( new ORE.PageScrollerSection( {
			element: face,
			name: "face",
			bottom: true,
			stop: false
		} ) );


		this.timeline = new ORE.TimelineAnimator();

		this.timeline.add<THREE.Vector3>(
			{
				name: 'camPos',
				keyframes: [
					{
						time: secMain.timelinePercentage,
						value: new THREE.Vector3( 0, 1.5, 4 )
					},
					{
						time: secAbout.timelinePercentage,
						value: new THREE.Vector3( - 1.2, 1.5, 4 )
					},
					{
						time: secAbout.timelinePercentage,
						value: new THREE.Vector3( - 1.2, 1.5, 4 )
					},
					{
						time: secUsage.timelinePercentage,
						value: new THREE.Vector3( 1.3, 1.5, 4 )
					},
					{
						time: secUsage.timelinePercentage,
						value: new THREE.Vector3( 1.2, 1.5, 4 )
					},
					{
						time: secFace.timelinePercentage,
						value: new THREE.Vector3( 0, 0, 4 )
					},
				],
				easing: ORE.Easings.sigmoid( 4 )
			},
		);

		this.timeline.add<THREE.Quaternion>(
			{
				name: 'camRot',
				keyframes: [
					{
						time: secMain.timelinePercentage,
						value: new THREE.Quaternion().setFromEuler( new THREE.Euler( - 0.32, 0, 0 ) )
					},
					{
						time: secAbout.timelinePercentage,
						value: new THREE.Quaternion().setFromEuler( new THREE.Euler( - 0.32, 0, 0 ) )
					},
					{
						time: secAbout.timelinePercentage * 1.1,
						value: new THREE.Quaternion().setFromEuler( new THREE.Euler( - 0.32, 0, 0 ) )
					},
					{
						time: secUsage.timelinePercentage,
						value: new THREE.Quaternion().setFromEuler( new THREE.Euler( - 0.32, 0, 0 ) )
					},
					{
						time: secUsage.timelinePercentage * 1.1,
						value: new THREE.Quaternion().setFromEuler( new THREE.Euler( - 0.32, 0, 0 ) )
					},
					{
						time: secFace.timelinePercentage,
						value: new THREE.Quaternion().setFromEuler( new THREE.Euler( - 0.0, 0, 0 ) )
					},
				],
				easing: ORE.Easings.sigmoid( 4 )
			},
		);

		this.timeline.add<number>(
			{
				name: 'objTransform',
				keyframes: [
					{
						time: secMain.timelinePercentage,
						value: 0.0
					},
					{
						time: ( secMain.timelinePercentage + secAbout.timelinePercentage ) / 2,
						value: 1.0
					},
					{
						time: secAbout.timelinePercentage,
						value: 0.0
					},
					{
						time: ( secAbout.timelinePercentage + secUsage.timelinePercentage ) / 2,
						value: 1.0
					},
					{
						time: secUsage.timelinePercentage,
						value: 0.0
					},
					{
						time: ( secUsage.timelinePercentage + secFace.timelinePercentage ) / 2,
						value: 1.0
					},
					{
						time: secFace.timelinePercentage,
						value: 0.2
					},
				],
				easing: ORE.Easings.sigmoid( 4 )
			},
		);

		this.timeline.add<number>(
			{
				name: 'objSelector',
				keyframes: [
					{
						time: secMain.timelinePercentage,
						value: 0.0
					},
					{
						time: ( secMain.timelinePercentage + secAbout.timelinePercentage ) / 2,
						value: 0.0
					},
					{
						time: secAbout.timelinePercentage,
						value: 1.0
					},
					{
						time: ( secAbout.timelinePercentage + secUsage.timelinePercentage ) / 2,
						value: 1.0
					},
					{
						time: secUsage.timelinePercentage,
						value: 2.0
					},
					{
						time: ( secUsage.timelinePercentage + secFace.timelinePercentage ) / 2,
						value: 2.0
					},
					{
						time: secFace.timelinePercentage,
						value: 3.0
					},
				],
				easing: ORE.Easings.sigmoid( 4 )
			},
		);

		this.timeline.add<number>(
			{
				name: 'dark',
				keyframes: [
					{
						time: secMain.timelinePercentage,
						value: 0
					},
					{
						time: secAbout.timelinePercentage,
						value: 1.0
					},
					{
						time: secUsage.timelinePercentage,
						value: 1.0
					},
					{
						time: secFace.timelinePercentage,
						value: 0
					},
				],
				easing: ORE.Easings.sigmoid( 4 )
			},
		);

	}

}
