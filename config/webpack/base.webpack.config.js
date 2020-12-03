const path = require( 'path' );

module.exports = {
	mode: 'development',
	devtool: 'hidden-source-map',
	entry: {
		'main': './src/index.ts',
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
				options: {
					configFile: 'config/typescript/base.tsconfig.json'
				}
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
							basedir: './src/shader/modules'
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
