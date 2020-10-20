const { merge } = require( 'webpack-merge' );
const baseConfig = require( './base.config' );
const path = require( 'path' );

module.exports = merge( baseConfig, {
	mode: 'production',
	entry: {
		'main': './src/index.ts',
	},
	output: {
		path: path.join( __dirname, '../build' ),
	}
} );
