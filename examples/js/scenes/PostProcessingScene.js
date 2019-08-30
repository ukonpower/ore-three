import * as ORE from '../../../src/';
import * as THREE from 'three';

import pp1 from './glsl/pp1.fs';
import pp2 from './glsl/pp2.fs';

export class PostProcessingScene extends ORE.BaseScene {

	constructor() {

		super();

		this.name = "PostProcessScene";

	}

	onBind( gProps ) {

		super.onBind( gProps );

		this.renderer = this.gProps.renderer;
		
		this.camera.position.set( 0, 1.5, 3 );
		this.camera.lookAt( 0, 0, 0 );

		var boxGeo = new THREE.SphereGeometry( 0.8, 30, 20 );
		var boXMat = new THREE.MeshStandardMaterial( {
			color: new THREE.Color( 0xffffff ),
			roughness: 0.2
		} );

		boXMat.flatShading = true;

		this.box = new THREE.Mesh( boxGeo, boXMat );
		this.scene.add( this.box );

		this.light = new THREE.PointLight();
		this.light.intensity = 1.5;
		this.light.position.y = 5;
		this.light.position.x = 3;
		this.scene.add( this.light );

		this.aLight = new THREE.AmbientLight();
		this.aLight.intensity = 0.5;
		this.scene.add( this.aLight );

		this.ppParam = [
			{
				fragmentShader: pp1,
				uniforms: {
					time: {
						value: 0
					}
				}
			},
			{
				fragmentShader: pp2,
				uniforms: {
					time: {
						value: 0
					}
				}
			}
		];

		this.pp = new ORE.PostProcessing( this.renderer, this.ppParam );

	}

	animate( deltaTime ) {

		this.box.rotateY( 0.01 );
		this.box.rotateX( 0.015 );
		this.ppParam[ 0 ].uniforms.time.value = this.time;
		this.ppParam[ 1 ].uniforms.time.value = this.time;


		this.pp.render( this.scene, this.camera );

	}

	onResize( args ) {

		super.onResize( args );
		
		this.pp.resize( args.windowPixelSize );

	}

}
