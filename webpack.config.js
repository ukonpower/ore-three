const path = require( 'path' );

module.exports = {
	mode: 'development',
	watchOptions: {
		aggregateTimeout: 100,
		poll: 500
	},
	entry: {
	},
	output: {
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
			},
			{
				test: /\.(vs|fs|glsl)$/,
				exclude: /node_modules/,
				use: [
					'raw-loader',
					{
						loader: 'glslify-loader',
						options: {
							transform: [
								[ 'glslify-hex' ],
								[ 'glslify-import' ]
							],
							basedir: './src/glsl'
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: [ '.ts', '.js' ],
	}
};
