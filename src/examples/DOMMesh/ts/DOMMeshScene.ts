import * as THREE from 'three';
import * as ORE from 'ore-three';

import domMeshFrag1 from './shaders/domMesh1.fs';
import domMeshFrag2 from './shaders/domMesh2.fs';
import domMeshFrag3 from './shaders/domMesh3.fs';

export class DOMMeshScene extends ORE.BaseLayer {

	private domMesh: ORE.DOMMesh[] = [];
	private uniforms: ORE.Uniforms;

	constructor() {

		super();

		this.uniforms = {
			time: {
				value: 0
			}
		};

	}

	public onBind( info: ORE.LayerInfo ) {

		super.onBind( info );

		let dom1 = document.querySelector( '#meshElement1' ) as HTMLElement;

		if ( dom1 ) {

			this.domMesh.push(
				new ORE.DOMMesh( dom1, {
					fragmentShader: domMeshFrag1,
					uniforms: this.uniforms,
				} )
			);

		}

		let dom2 = document.querySelector( '#meshElement2' ) as HTMLElement;

		if ( dom2 ) {

			this.domMesh.push(
				new ORE.DOMMesh( dom2, {
					fragmentShader: domMeshFrag2,
					uniforms: this.uniforms,
				} )
			);

		}

		let dom3 = document.querySelector( '#meshElement3' ) as HTMLElement;

		if ( dom3 ) {

			this.domMesh.push(
				new ORE.DOMMesh( dom3, {
					fragmentShader: domMeshFrag3,
					uniforms: this.uniforms,
				} )
			);

		}

		for ( let i = 0; i < this.domMesh.length; i ++ ) {

			this.scene.add( this.domMesh[ i ] );

		}

	}

	public animate( deltaTime: number ) {

		this.uniforms.time.value = this.time;

		for ( let i = 0; i < this.domMesh.length; i ++ ) {

			this.domMesh[ i ].update();

		}

		if ( this.renderer ) {

			this.renderer.render( this.scene, this.camera );

		}

	}

}
