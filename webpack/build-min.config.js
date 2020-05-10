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
	externals: {
		'three': 'THREE'
	},
} );
