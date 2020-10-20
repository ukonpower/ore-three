const info = require( '../info' );
const { merge } = require( 'webpack-merge' );
const baseConfig = require( './build-base.config' );

module.exports = merge( baseConfig, {
	mode: 'development',
	output: {
		filename: info.packageName + '.js',
		library: info.packageBuildName,
		libraryTarget: 'umd'
	},
	externals: {
		'three': 'three'
	},
} );
