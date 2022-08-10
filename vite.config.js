import path from 'path';
import { defineConfig } from 'vite';
import glslify from 'rollup-plugin-glslify';

const exList = [
	"Animator",
	"BlenderConnector",
	"Controller",
	"GPUComputationController",
	"Pointer",
	"PostProcessing",
];

const input = {
	index: path.resolve( __dirname, 'src/index.html' ),
	examples: path.resolve( __dirname, 'src/examples/index.html' ),
	...( () => {

		const exEntryList = {};

		exList.map( ( exName ) => {

			exEntryList[ exName ] = path.resolve( __dirname, 'src/examples/' + exName + '/index.html' );

		} );

		return exEntryList;

	} )(),
};

export default defineConfig( {
	root: 'src',
	server: {
		port: 3000,
	},
	build: {
		rollupOptions: {
			input,
			output: {
				dir: './public',
			}
		}
	},
	resolve: {
		alias: {
			"@ore-three": path.join( __dirname, "packages/ore-three/src" )
		},
	},
	plugins: [
		{
			...glslify( {
				basedir: './src/glsl/',
				transform: [
					[ 'glslify-hex' ],
					[ 'glslify-import' ]
				],
			} ),
			enforce: 'pre'
		}
	]
} );
