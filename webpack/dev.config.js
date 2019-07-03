const merge = require('webpack-merge');
const baseConfig = require('./base.config');

const path = require('path');

module.exports = merge(baseConfig,{
	mode: 'development',
	entry: {
		'main.js': './examples/js/index.js',
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: '[name]',
		library: "ore-three",
		libraryTarget: "umd"
	},
	devServer: {
		host: 'localhost',
		port: 3000,
		contentBase: path.resolve(__dirname, '../examples/'),
		publicPath: '/js',
		openPage: 'index.html',
		disableHostCheck: true,
		compress: true,
		open: true
	},
});