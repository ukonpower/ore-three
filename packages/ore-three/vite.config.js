import path from 'path';
import { defineConfig } from 'vite';
import glslify from 'rollup-plugin-glslify';
import { peerDependencies } from './package.json'

export default defineConfig( {
	root: 'src',
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/'),
			name: 'ORE',
			fileName: 'ore-three',
			formats: [ 'es', 'cjs', 'umd', 'iife' ],
		},
		rollupOptions: {
			external: [...Object.keys(peerDependencies)],
			output: {
				dir: './build',
				globals: {
					three: 'THREE'
				},
			},
		},
		sourcemap: true,
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
