const path = require( 'path' );

module.exports = {
	resolve: {
		modules: [ 'node_modules' ],
		extensions: [ '.ts', '.js', '.fs', '.vs', '.glsl' ],
		alias: {
			"@ore-three-ts": path.resolve( __dirname, '../src/' ),
			"@shaders": path.resolve( __dirname, '../src/shaders/shader-modules' )
		}
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
				options: {
					configFile: 'webpack/tsconfig/dev.json'
				}
			},
			{
				test: /\.(glsl|vs|fs)$/,
				use: [
					{
						loader: 'shader-loader',
						options: {
							glsl: {
								chunkPath: 'src/shader/modules/'
							}
						}
					},
					{
						loader: 'glslify-loader'
					}
				]
			}
		]
	}
};
