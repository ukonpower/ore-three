const path = require('path');
const info = require( '../../info' );
const { merge } = require( 'webpack-merge' );
const baseConfig = require( './webpack.config' );

module.exports = merge( baseConfig, {
	mode: 'development',
	devtool: 'inline-source-map',
	output: {
		path: path.resolve(__dirname, "../../build"),
		filename: info.packageFileName + '.js',
		library: info.packageBuildName,
		libraryTarget: 'umd',
		globalObject: 'this'
	}
} );
