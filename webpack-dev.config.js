const path = require('path');

module.exports = {
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
	module: {
		rules: [{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: 'ts-loader'
			},
			{
				test: /\.(glsl|vs|fs)$/,
				loader: 'shader-loader',
				options: {
					glsl: {
						chunkPath: "src/shaders/chunks"
					}
				}
			}
		]
	},
	resolve: {
		modules: ['node_modules'],
		extensions: ['.ts', '.js']
	},
	devServer: {
		host: '0.0.0.0',
		port: 3000,
		contentBase: path.resolve(__dirname, 'examples/'),
		publicPath: '/js',
		openPage: 'index.html',
		disableHostCheck: true,
		compress: true,
		open: true
	},
};