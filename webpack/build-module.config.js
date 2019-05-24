const merge = require('webpack-merge');
const baseConfig = require('./build-base.config');

module.exports = merge(baseConfig,{
	mode: 'development',
	output: {
		filename: '[name].js',
		library: "ORE",
		libraryTarget: 'umd'
	},
	externals: {
		'three': 'three'
	},
});