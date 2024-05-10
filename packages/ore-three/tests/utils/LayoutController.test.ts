/* eslint no-undef: 0 */

import * as THREE from 'three';
import { LayoutController } from '../../src/utils/LayoutController';

describe( 'LayoutController', () => {

	let object: THREE.Object3D;
	let transform: any;
	let layoutController: LayoutController;

	beforeEach( () => {

		object = new THREE.Object3D();
		transform = {
			position: new THREE.Vector3( 1, 2, 3 ),
			rotation: new THREE.Quaternion().setFromEuler( new THREE.Euler( 0, Math.PI, 0 ) ),
			scale: 2
		};
		layoutController = new LayoutController( object, transform );

	} );

	test( 'should update position correctly', () => {

		const weight = 0.5;
		layoutController.updateTransform( weight );
		expect( object.position.x ).toBeCloseTo( 0.5 );
		expect( object.position.y ).toBeCloseTo( 1 );
		expect( object.position.z ).toBeCloseTo( 1.5 );

	} );

	test( 'should update rotation correctly', () => {

		const weight = 0.5;
		layoutController.updateTransform( weight );

		const answerRot = new THREE.Quaternion().setFromEuler( new THREE.Euler( 0, Math.PI / 2, 0 ) );

		expect( object.quaternion.x ).toBeCloseTo( answerRot.x );
		expect( object.quaternion.y ).toBeCloseTo( answerRot.y );
		expect( object.quaternion.z ).toBeCloseTo( answerRot.z );
		expect( object.quaternion.w ).toBeCloseTo( answerRot.w );

	} );

	test( 'should update scale correctly', () => {

		const weight = 0.5;
		layoutController.updateTransform( weight );
		expect( object.scale.x ).toBeCloseTo( 1.5 );
		expect( object.scale.y ).toBeCloseTo( 1.5 );
		expect( object.scale.z ).toBeCloseTo( 1.5 );

	} );

} );
