/* eslint no-undef: 0 */

import * as THREE from 'three';
import { WaitMan } from '../../src/utils/WaitMan';

describe( 'WaitMan', () => {

	let waitMan: WaitMan;

	beforeEach( () => {

		waitMan = new WaitMan();

	} );

	it( 'should dispatch "gohome" event when calling goHome()', () => {

		const spy = jest.fn();
		waitMan.addEventListener( 'gohome', spy );

		waitMan.goHome();

		expect( spy ).toHaveBeenCalled();

	} );

	it( 'should wait for the specified time', async () => {

		const waitTime = 1; // seconds
		const startTime = Date.now();

		const waitPromise = waitMan.wait( waitTime );

		await expect( waitPromise ).resolves.toBeUndefined();

		const endTime = Date.now();
		const elapsedTime = ( endTime - startTime ) / 1000; // seconds

		expect( elapsedTime ).toBeGreaterThanOrEqual( waitTime );

	} );

	it( 'should reject the wait promise when goHome() is called', async () => {

		const waitTime = 10; // seconds

		const waitPromise = waitMan.wait( waitTime );

		setTimeout( () => {

			waitMan.goHome();

		}, 500 );

		await expect( waitPromise ).rejects.toBeUndefined();

	} );

} );
