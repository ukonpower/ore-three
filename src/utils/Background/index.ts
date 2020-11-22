import * as ORE from '../../';
import * as THREE from 'three';

import vert from './shaders/background.vs';
import { LayerSize as LayerSizeInfo } from '../../core/BaseLayer';

export class Background extends THREE.Mesh {

	protected uniforms: ORE.Uniforms;

	constructor( param: THREE.ShaderMaterialParameters ) {

		let geo = new THREE.BufferGeometry();

		let posArray = [];
		let indexArray = [];
		let uvArray = [];

		posArray.push( - 1, 1, 0 );
		posArray.push( 1, 1, 0 );
		posArray.push( 1, - 1, 0 );
		posArray.push( - 1, - 1, 0 );

		uvArray.push( 0, 1 );
		uvArray.push( 1, 1 );
		uvArray.push( 1, 0 );
		uvArray.push( 0, 0 );

		indexArray.push( 0, 2, 1, 0, 3, 2 );

		let pos = new Float32Array( posArray );
		let indices = new Uint32Array( indexArray );
		let uv = new Float32Array( uvArray );

		geo.setAttribute( 'position', new THREE.BufferAttribute( pos, 3 ) );
		geo.setAttribute( 'uv', new THREE.BufferAttribute( uv, 2 ) );
		geo.setIndex( new THREE.BufferAttribute( indices, 1 ) );

		param.vertexShader = param.vertexShader || vert;
		param.transparent = param.transparent != undefined ? param.transparent : true;
		param.depthFunc = param.depthFunc != undefined ? param.depthFunc : THREE.NeverDepth;

		let mat = new THREE.ShaderMaterial( param );

		super( geo, mat );

		this.uniforms = param.uniforms || {};

		this.frustumCulled = false;

	}

	public resize( args: LayerSizeInfo ) {

		this.uniforms.resolution = { value: args.windowSize };
		this.uniforms.aspectRatio = { value: args.aspectRatio };

	}

}
