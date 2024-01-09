
/* eslint no-undef: 0 */

import * as THREE from 'three';
import { Animator } from '../../src/utils/Animation/Animator';
import { Easings } from '../../src/utils/Animation/Easings';

describe( 'Animator', () => {

	let animator: Animator;

	beforeEach( () => {

		animator = new Animator();

	} );

	it( 'can add variable', () => {

		animator.add( {
			name: 'number',
			initValue: 0,
			easing: Easings.easeInCubic,
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

	it( 'can set easing', () => {

		animator.add( {
			name: 'number',
			initValue: 0,
			easing: Easings.easeInCubic,
		} );

		animator.setEasing( 'number', Easings.easeOutCubic );

		const variable = animator.getVariableObject<number>( 'number' );
		expect( variable?.easing ).toBe( Easings.easeOutCubic );

	} );

	it( 'can set value', () => {

		animator.add( {
			name: 'number',
			initValue: 0,
			easing: Easings.easeInCubic,
		} );

		animator.setValue( 'number', 10 );

		const variable = animator.getVariableObject<number>( 'number' );
		expect( variable?.value ).toBe( 10 );

	} );

	it( 'can animate', () => {

		animator.add( {
			name: 'number',
			initValue: 0,
			easing: Easings.easeInCubic,
		} );

		animator.animate( 'number', 100, 1 );

		const variable = animator.getVariableObject<number>( 'number' );
		expect( variable?.isAnimating ).toBeTruthy();
		expect( variable?.goalValue ).toBe( 100 );

	} );

	it( 'can cancel animate', () => {

		animator.add( {
			name: 'number',
			initValue: 0,
			easing: Easings.easeInCubic,
		} );

		animator.animate( 'number', 100, 1 );
		animator.cancelAnimate( 'number' );

		const variable = animator.getVariableObject<number>( 'number' );
		expect( variable?.isAnimating ).toBeFalsy();
		expect( variable?.time ).toBe( - 1.0 );

	} );

	it( 'can get variable', () => {

		animator.add( {
			name: 'number',
			initValue: 0,
			easing: Easings.easeInCubic,
		} );

		const variable = animator.getVariableObject<number>( 'number' );
		expect( variable?.value ).toBe( 0 );

	} );

	it( 'can get variable object', () => {

		animator.add( {
			name: 'number',
			initValue: 0,
			easing: Easings.easeInCubic,
		} );

		const variable = animator.getVariableObject<number>( 'number' );
		expect( variable?.value ).toBe( 0 );

	} );

	it( 'can apply to uniforms', () => {

		const uniforms: any = {};
		animator.add( {
			name: 'number',
			initValue: 0,
			easing: Easings.easeInCubic,
		} );

		animator.applyToUniforms( uniforms );

		expect( uniforms.number ).toBeDefined();
		expect( uniforms.number.value ).toBe( 0 );

	} );

	it( 'can check if animating', () => {

		animator.add( {
			name: 'number',
			initValue: 0,
			easing: Easings.easeInCubic,
		} );

		animator.animate( 'number', 100, 1 );

		expect( animator.isAnimating() ).toBeTruthy();
		expect( animator.isAnimating( 'number' ) ).toBeTruthy();

	} );

	it( 'can wait', async () => {

		const startTime = Date.now();
		const waitTime = 1; // seconds

		await animator.wait( waitTime );

		const endTime = Date.now();
		const elapsedTime = ( endTime - startTime ) / 1000; // seconds

		expect( elapsedTime ).toBeGreaterThanOrEqual( waitTime );

	} );

	it( 'can update', () => {

		animator.add( {
			name: 'number',
			initValue: 0,
			easing: Easings.easeInCubic,
		} );

		animator.animate( 'number', 100, 1 );

		animator.update( 0.5 );

		const variable = animator.getVariableObject<number>( 'number' );
		expect( variable?.value ).toBeGreaterThan( 0 );

	} );

} );
