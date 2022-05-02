const info = require( '../../info' );
const { merge } = require( 'webpack-merge' );
const baseConfig = require( './base.webpack.config' );

module.exports = merge( baseConfig, {
	mode: 'development',
	devtool: 'inline-source-map',
	output: {
		filename: info.packageFileName + '.js',
		library: info.packageBuildName,
		libraryTarget: 'umd',
	},
} );
