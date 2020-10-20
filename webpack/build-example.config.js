const { merge } = require( 'webpack-merge' );
const baseConfig = require( './base.config' );

module.exports = merge( baseConfig, {
	mode: 'development',
	entry: {
	},
	output: {
		filename: 'main.js'
	}
} );
