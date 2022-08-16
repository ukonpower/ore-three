
import * as THREE from 'three';
import { Animator } from '../../src/utils/Animator'
import { Easings } from '../../src/utils/Easings';

describe( 'Controller', () => {

	let animator: Animator

	beforeEach( () => {

		animator = new Animator()

	} );

	it( 'can add variable', () => {

		animator.add({
			name: 'number',
			initValue: 0,
			easing: Easings.easeInCubic
		})

		animator.add({
			name: 'vector2',
			initValue: new THREE.Vector2(),
			easing: Easings.easeOutCubic,
		})

		animator.add({
			name: 'vector3',
			initValue: new THREE.Vector3(),
			easing: Easings.easeInOutCubic,
		})

		animator.add({
			name: 'quaternion',
			initValue: new THREE.Quaternion(),
			easing: Easings.easeInOutCubic,
		})

		animator.add({
			name: 'array',
			initValue: [ 0, 0, 0 ],
			easing: Easings.easeInQuad,
		})

		let varNumber = animator.get<number>('number');
		let varVector2 = animator.get<THREE.Vector2>('vector2');
		let varVector3 = animator.get<THREE.Vector3>('vector3');
		let varQuaternion = animator.get<THREE.Quaternion>('quaternion');
		let varArray = animator.get<number[]>('array');

		expect(varNumber).toBe(0)
		expect(varVector2?.isVector2).toBeTruthy()
		expect(varVector3?.isVector3).toBeTruthy()
		expect(varQuaternion?.isQuaternion).toBeTruthy()
		expect(Array.isArray(varArray)).toBeTruthy()

	} );

} );
