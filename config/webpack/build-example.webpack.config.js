var path = require( 'path' );
const { merge } = require( 'webpack-merge' );
const baseConfig = require( './base.webpack.config' );

module.exports = merge( baseConfig, {
	mode: 'development',
	entry: {
	},
	output: {
		filename: 'main.js'
	},
	resolve: {
		extensions: [ '.ts', '.js' ],
		alias: {
			"@ore-three-ts": path.resolve( __dirname, '../../src' ),
		},
	},
} );
