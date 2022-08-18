
/* eslint no-undef: 0 */

import * as THREE from 'three';
import { Animator } from '../../src/utils/Animator';
import { Easings } from '../../src/utils/Easings';

describe( 'Controller', () => {

	let animator: Animator;

	beforeEach( () => {

		animator = new Animator();

	} );

	it( 'can add variable', () => {

		animator.add( {
			name: 'number',
			initValue: 0,
			easing: Easings.easeInCubic
		} );

		animator.add( {
			name: 'vector2',
			initValue: new THREE.Vector2(),
			easing: Easings.easeOutCubic,
		} );

		animator.add( {
			name: 'vector3',
			initValue: new THREE.Vector3(),
			easing: Easings.easeInOutCubic,
		} );

		animator.add( {
			name: 'quaternion',
			initValue: new THREE.Quaternion(),
			easing: Easings.easeInOutCubic,
		} );

		animator.add( {
			name: 'array',
			initValue: [ 0, 0, 0 ],
			easing: Easings.easeInQuad,
		} );

		const varNumber = animator.get<number>( 'number' );
		const varVector2 = animator.get<THREE.Vector2>( 'vector2' );
		const varVector3 = animator.get<THREE.Vector3>( 'vector3' );
		const varQuaternion = animator.get<THREE.Quaternion>( 'quaternion' );
		const varArray = animator.get<number[]>( 'array' );

		expect( varNumber ).toBe( 0 );
		expect( varVector2?.isVector2 ).toBeTruthy();
		expect( varVector3?.isVector3 ).toBeTruthy();
		expect( varQuaternion?.isQuaternion ).toBeTruthy();
		expect( Array.isArray( varArray ) ).toBeTruthy();

	} );

} );
