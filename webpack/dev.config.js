const merge = require('webpack-merge');
const baseConfig = require('./base.config');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');

module.exports = merge(baseConfig,{
	mode: 'development',
	entry: {
		'main.js': './examples/js/index.js',
	},
	output: {
		filename: '[name]'
	},
	devServer: {
		host: 'localhost',
		port: 3000,
		contentBase: path.resolve(__dirname, '../'),
		publicPath: '/examples/js',
		openPage: 'examples/index.html',
		disableHostCheck: true,
		compress: true,
		open: true
	},
	plugins: [
        new webpack.DefinePlugin({
			SCENE: JSON.stringify("MainScene"),
		}),
		new CopyWebpackPlugin(
			[
				{
					from: './assets/',
					to: './examples/assets',
				},
			],
		)
    ]
});