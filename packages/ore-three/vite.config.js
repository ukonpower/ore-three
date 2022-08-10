import path from 'path';
import { defineConfig } from 'vite';
import glslify from 'rollup-plugin-glslify';

export default defineConfig( {
	root: 'src',
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/'),
			name: 'ORE',
			fileName: (format) => {
				if( format == 'es' ) return 'ore-three.esm.js';
				if( format == 'cjs' ) return 'ore-three.cjs.js';
				if( format == 'umd' ) return 'ore-three.umd.js';
				if( format == 'iife' ) return 'ore-three.iife.js';
			},
			formats: [ 'es', 'cjs', 'umd', 'iife' ]
		},
		rollupOptions: {
			external: ['three'],
			output: {
				dir: './build',
				globals: {
					three: 'THREE'
				},
			},
		}
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
