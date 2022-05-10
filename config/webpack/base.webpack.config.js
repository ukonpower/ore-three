const path = require( 'path' );

module.exports = {
	mode: 'development',
	entry: {
		'': './src/index.ts',
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
				options: {
					configFile: '../../../tsconfig.json'
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
	},
	externals: {
		'three': {
			commonjs: 'three',
			commonjs2: 'three',
			amd: 'three',
			root: 'THREE'
		}
	},
	cache: {
		type: 'filesystem',
		buildDependencies: {
			config: [ __filename ]
		}
	},
	optimization: {
		innerGraph: true
	}
};
