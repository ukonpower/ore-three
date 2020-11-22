import * as THREE from 'three';
import * as ORE from '@ore-three-ts';

import domMeshFrag1 from './shaders/domMesh1.fs';
import domMeshFrag2 from './shaders/domMesh2.fs';
import domMeshFrag3 from './shaders/domMesh3.fs';

export class DOMMeshScene extends ORE.BaseLayer {

	private domMesh: ORE.DOMMesh[] = [];
	private uniforms: ORE.Uniforms;

	constructor() {

		super();

	}

	public onBind( gProps: ORE.LayerInfo ) {

		super.onBind( gProps );

		this.uniforms = {
			time: {
				value: 0
			}
		};

		this.domMesh.push(
			new ORE.DOMMesh( document.querySelector( '#meshElement1' ), {
				fragmentShader: domMeshFrag1,
				uniforms: this.uniforms,
			} )
		);

		this.domMesh.push(
			new ORE.DOMMesh( document.querySelector( '#meshElement2' ), {
				fragmentShader: domMeshFrag2,
				uniforms: this.uniforms,
			} )
		);

		this.domMesh.push(
			new ORE.DOMMesh( document.querySelector( '#meshElement3' ), {
				fragmentShader: domMeshFrag3,
				uniforms: this.uniforms,
			} )
		);

		for ( let i = 0; i < this.domMesh.length; i ++ ) {

			this.scene.add( this.domMesh[ i ] );

		}

	}

	public animate( deltaTime: number ) {

		this.uniforms.time.value = this.time;

		for ( let i = 0; i < this.domMesh.length; i ++ ) {

			this.domMesh[ i ].update();

		}

		this.renderer.render( this.scene, this.camera );

	}

	public onResize( args: ORE.LayerSize ) {

		super.onResize( args );

	}

}
