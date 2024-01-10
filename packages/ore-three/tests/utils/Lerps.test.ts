/* eslint no-undef: 0 */

import * as THREE from 'three';
import { Animator } from '../../src/utils/Animation/Animator';
import { Lerps } from '../../src/utils/Lerps';

describe( 'Lerps', () => {

	let animator: Animator;

	beforeEach( () => {

		animator = new Animator();

	} );

	it( 'can lerp numbers', () => {

		const a = 0;
		const b = 10;
		const t = 0.5;
		const result = Lerps.number( a, b, t );
		expect( result ).toBe( 5 );

	} );

	it( 'can lerp number arrays', () => {

		const a = [ 0, 0, 0 ];
		const b = [ 10, 10, 10 ];
		const t = 0.5;
		const result = Lerps.numberArray( a, b, t );
		expect( result ).toEqual( [ 5, 5, 5 ] );

	} );

	it( 'can lerp THREE vectors', () => {

		const a = new THREE.Vector3( 0, 0, 0 );
		const b = new THREE.Vector3( 10, 10, 10 );
		const t = 0.5;
		const result = Lerps.THREEVectors( a, b, t );
		expect( result ).toEqual( new THREE.Vector3( 5, 5, 5 ) );

	} );

	it( 'can slerp THREE quaternions', () => {

		const a = new THREE.Quaternion();
		const b = new THREE.Quaternion().setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), Math.PI );
		const t = 0.5;
		const result = Lerps.THREEQuaternion( a, b, t );

		const answerRot = new THREE.Quaternion().setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), Math.PI / 2 );

		expect( result.x ).toBeCloseTo( answerRot.x );
		expect( result.y ).toBeCloseTo( answerRot.y );
		expect( result.z ).toBeCloseTo( answerRot.z );
		expect( result.w ).toBeCloseTo( answerRot.w );

	} );

	it( 'can lerp THREE euler angles', () => {

		const a = new THREE.Euler( 0, 0, 0 );
		const b = new THREE.Euler( Math.PI, Math.PI, Math.PI );
		const t = 0.5;
		const result = Lerps.THREEEuler( a, b, t );
		expect( result ).toEqual( new THREE.Euler( Math.PI / 2, Math.PI / 2, Math.PI / 2 ) );

	} );

	it( 'can get lerp function based on variable type', () => {

		const numberLerpFunc = Lerps.getLerpFunc( 0 );
		expect( numberLerpFunc ).toBe( Lerps.number );

		const arrayLerpFunc = Lerps.getLerpFunc( [ 0, 0, 0 ] );
		expect( arrayLerpFunc ).toBe( Lerps.numberArray );

		const vectorLerpFunc = Lerps.getLerpFunc( new THREE.Vector3() );
		expect( vectorLerpFunc ).toBe( Lerps.THREEVectors );

		const quaternionLerpFunc = Lerps.getLerpFunc( new THREE.Quaternion() );
		expect( quaternionLerpFunc ).toBe( Lerps.THREEQuaternion );

		const eulerLerpFunc = Lerps.getLerpFunc( new THREE.Euler() );
		expect( eulerLerpFunc ).toBe( Lerps.THREEEuler );

	} );

} );
