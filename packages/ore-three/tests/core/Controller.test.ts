import { BaseLayer } from '../../src/core/BaseLayer';
import { Controller  } from '../../src/core/Controller'

describe( 'Controller', () => {

	let controller: Controller

	beforeEach( () => {

		controller = new Controller({silent: true})

	} );

	it( 'can add layers', () => {

		controller.addLayer( new BaseLayer( {
			name: 'testLayer1',
			context: require('gl')(1, 1)
		}))

		controller.addLayer( new BaseLayer( {
			name: 'testLayer2',
			context: require('gl')(1, 1)
		}))

		let testLayer1 = controller.getLayer( 'testLayer1' )
		let testLayer2 = controller.getLayer( 'testLayer2' )

		expect(testLayer1).not.toBeNull()
		expect(testLayer2).not.toBeNull()

		if( testLayer1 ) {

			expect(testLayer1.info.name).toEqual( 'testLayer1' )
			
		}

		if( testLayer2 ) {

			expect(testLayer2.info.name).toEqual( 'testLayer2' )
			
		}

	} );

	it( 'can remove layers', () => {

		controller.addLayer( new BaseLayer( {
			name: 'testLayer1',
			context: require('gl')(1, 1)
		}))

		controller.addLayer( new BaseLayer( {
			name: 'testLayer2',
			context: require('gl')(1, 1)
		}))

		controller.removeLayer( 'testLayer1' );
		
		let testLayer1 = controller.getLayer( 'testLayer1' )
		let testLayer2 = controller.getLayer( 'testLayer2' )
		
		expect(testLayer1).toBeNull()
		expect(testLayer2).not.toBeNull()
		
	} );

	it( 'can dispose', () => {

		controller.addLayer( new BaseLayer( {
			name: 'testLayer',
			context: require('gl')(1, 1)
		}))

		controller.dispose()

		let testLayer = controller.getLayer( 'testLayer' );
		
		expect(testLayer).toBeNull()

	} );
	
	it( 'can set pointer event element', () => {

		let elm1 = document.createElement('div');
		let elm2 = document.createElement('div');

		// constructor
		
		let controller = new Controller({
			silent: true,
			pointerEventElement: elm1
		})

		expect(elm1.isEqualNode( controller.pointer.element) ).toBeTruthy()
		
		// method

		controller.setPointerEventElement( elm2 );

		expect(elm2.isEqualNode( controller.pointer.element) ).toBeTruthy()

	} );

} );
