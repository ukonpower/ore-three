/* eslint no-undef: 0 */

var fs = require( 'fs' );
var path = require( 'path' );

const wait = ( sec: number ) => {

	return new Promise( ( r ) => {

		setTimeout( () => {

			r( null );

		}, sec * 1000 );

	} );

};

const waitList: {[key:string]: number} = {
	"GPUComputationController": 2
};

const pageList: {[key:string]: string} = {
	index: '/',
};

describe( 'Documents', () => {

	beforeEach( async () => {
	} );

	// page

	const pageKeyList = Object.keys( pageList );

	pageKeyList.forEach( key => {

		const path = pageList[ key ];

		it( key, async () => {

			await page.goto( 'http://localhost:3000' + path );
			await wait( waitList[ key ] || 0 );

			expect( await page.screenshot() ).toMatchImageSnapshot( {
				failureThreshold: 0.5,
				failureThresholdType: "percent",
				updatePassedSnapshot: true,
			} );

		} );

	} );

	// examples

	const files = fs.readdirSync( "./src/examples" ) as string[];
	const dirList = files.filter( ( file: any ) => {

		return fs.statSync( path.join( "./src/examples", file ) ).isDirectory();

	} );

	dirList.forEach( exName => {

		it( exName, async () => {

			await page.goto( 'http://localhost:3000/examples/' + exName + '/' );
			await wait( waitList[ exName ] || 0 );

			expect( await page.screenshot() ).toMatchImageSnapshot( {
				failureThreshold: 0.5,
				failureThresholdType: "percent",
				updatePassedSnapshot: true,
				blur: 4
			} );

		} );

	} );

} );
