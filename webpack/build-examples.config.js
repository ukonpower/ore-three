const merge = require('webpack-merge');
const baseConfig = require('./base.config');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

var scenes = [
	'AnimatorScene',
	'AudioPlayerScene',
	'BackgroundScene',
	'BloomFilterScene',
	'DomGLSLScene',
	'FishScene',
	'MainScene',
	'MicDataScene',
	'MouseRotatorScene',
	'MouseVertexRotatorScene',
	'PageScrollerScene',
	'PostProcessingScene',
	'StableFluidsScene',
	'TransformAnimatorScene',
]

var configArray = [];

for( var i = 0; i < scenes.length; i++ ){

	let name = scenes[i];
	
	configArray.push(
		merge(baseConfig,{
			mode: 'development',
			entry: {
				main: './examples/js/index-example.js',
			},
			output: {
				path: path.join(__dirname, '../docs/examples/'),
				filename: name + '/js/main.js',
			},
			plugins: [
				new webpack.DefinePlugin({
					SCENE: JSON.stringify(name),
				}),
				new CopyWebpackPlugin(
					[
						{
							from: './examples/',
							to: './' + name + '/',
							ignore: ['*.js','*.vs','*.fs','*.glsl']
						},
					],
				),
				new CopyWebpackPlugin(
					[
						{
							from: './assets/',
							to: './assets',
						},
					],
				)
			]
		})
	);
}

module.exports = configArray;