const merge = require('webpack-merge');
const baseConfig = require('./build-base.config');

module.exports = merge(baseConfig,{
	mode: 'production',
	output: {
		filename: '[name].min.js',
		library: "ORE",
		libraryTarget: 'window'
	},
	externals: {
		'three': 'THREE'
	},
});