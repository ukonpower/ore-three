
import { BaseLayer } from '../../src/core/BaseLayer';
import { Controller  } from '../../src/core/Controller'

describe( 'Controller', () => {

	let controller: Controller

	beforeAll( () => {

		controller = new Controller({})

	} );

	describe( 'Controller', () => {

		it( 'can add layer', () => {

			controller.addLayer( new BaseLayer( {
				name: 'testLayer',
				context: require('gl')(1, 1)
			}))

			let testLayer = controller.getLayer( 'testLayer' )

			expect(testLayer).not.toBeNull()

		} );

	} );

} );
