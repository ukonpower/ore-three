const info = require( '../info' );
const merge = require( 'webpack-merge' );
const baseConfig = require( './build-base.config' );

module.exports = merge( baseConfig, {
	mode: 'production',
	output: {
		filename: info.packageName + '.min.js',
		library: info.packageBuildName,
		libraryTarget: 'window'
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
				options: {
					configFile: 'webpack/tsconfig/build.json'
				}
			},
			{
				test: /\.(glsl|vs|fs)$/,
				loader: 'shader-loader',
				options: {
					glsl: {
						chunkPath: "src/glsl-chunks"
					}
				}
			}
		]
	},
	externals: {
		'three': 'THREE'
	},
} );
