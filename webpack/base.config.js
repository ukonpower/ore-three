const path = require('path');

module.exports = {
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
	}
};