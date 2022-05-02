const info = require( '../../info' );
const { merge } = require( 'webpack-merge' );
const baseConfig = require( './base.webpack.config' );

module.exports = merge( baseConfig, {
	mode: 'production',
	output: {
		filename: info.packageFileName + '.min.js',
		library: info.packageBuildName,
		libraryTarget: 'umd'
	},
} );
