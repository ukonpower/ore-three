const path = require( 'path' );
const CopyPlugin = require( "copy-webpack-plugin" );

const exList = [
	"Animator",
	"BlenderConnector",
	"Controller",
	"GPUComputationController",
	"Pointer",
	"PostProcessing",
];

module.exports = {
	mode: 'development',
	watchOptions: {
		aggregateTimeout: 100,
		poll: 500
	},
	entry: {
		...( () => {

			const exEntryList = {};

			exList.map( ( exName ) => {

				exEntryList[ exName ] = "./src/examples/" + exName + "/ts/main.ts";

			} );

			return exEntryList;

		} )()
	},
	output: {
		path: path.resolve( __dirname, "./docs/" ),
		filename: "./examples/[name]/js/main.js"
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
		alias: {
			"@ore-three": path.resolve( __dirname, '/packages/ore-three/src' ),
		}
	},
	plugins: [
		new CopyPlugin( {
			patterns: [
			  { from: "source", to: "dest" },
			  { from: "other", to: "public" },
			],
		} ),
	],
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
