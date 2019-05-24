const path = require('path');

module.exports = {
	mode: 'production',
	entry: {
		'ore-three.js': './src/index.ts',
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: '[name]',
		library: "ORE",
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
			loader: 'ts-shader-loader'
		}]
	},
	resolve: {
		modules: ['node_modules'],
		extensions: ['.ts', '.js']
	},
	externals: {
		'three': 'THREE'
	},
};