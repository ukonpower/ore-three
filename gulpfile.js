const info = require('./info');
const gulp = require( 'gulp' );
const minimist = require( 'minimist' );
const webpackStream = require( 'webpack-stream' );
const webpack = require( 'webpack' );
const browserSync = require( 'browser-sync' );
const autoprefixer = require( 'gulp-autoprefixer' );
const plumber = require( 'gulp-plumber' );
const sass = require( 'gulp-sass' );
const cssmin = require( 'gulp-cssmin' );
const del = require( 'del' );
const fs = require( 'fs' );
const typedoc = require( 'gulp-typedoc' );

const options = minimist( process.argv.slice( 2 ), {
	default: {
		dev: 'untitle',
		P: false,
	}
});


/*-------------------
	Production
--------------------*/

const exDir = './examples/';
const docsExDir = './docs/examples/';

function buildPackages( cb ){

	//min build
	let confMin = require( './webpack/build-min.config' );

	webpackStream( confMin, webpack )
		.pipe( gulp.dest( './build/' ) );

	//module build
	let confModule = require( './webpack/build-module.config' );
	
	webpackStream( confModule, webpack )
		.pipe( gulp.dest( './build/' ) );

	//typedoc
	gulp.src( './src' )
		.pipe( typedoc({
			module: "umd",
			target: "es6",
			out: "./docs/documentation",
			mode: "file",
			name: info.packageName,
			moduleResolution: "node"
		}));

	cb();

}

function buildExamples( cb ){

	fs.readdir( exDir, ( err, files ) => {

		if ( err ) throw err;

		let conf = require( './webpack/build-example.config' );
		conf.mode = 'production';

		for ( let i = 0; i < files.length; i++ ) {

			//set webpack entry files
			conf.entry[files[i]] = exDir + files[i] + '/src/ts/main.ts';     

			//sass
			gulp.src( exDir + files[i] + "/src/scss/style.scss" )
				.pipe( plumber() )
				.pipe( autoprefixer() )
				.pipe( sass() )
				.pipe( cssmin() )
				.pipe( gulp.dest( docsExDir + files[i] + "/css/" ) )

			//copy files
			gulp.src( exDir + files[i] + '/src/html/**/*' ).pipe( gulp.dest( docsExDir + files[i] + '/' ) );
			gulp.src( exDir + files[i] + '/src/assets/**/*' ).pipe( gulp.dest( docsExDir + files[i] + '/assets/' ) );
			
		}
		
		conf.output.filename = '[name]/js/main.js';

		//webpack
		webpackStream( conf, webpack )
			.pipe( gulp.dest( docsExDir ) )
			.on( 'end', cb )

	});

}

function cleanBuildFiles( cb ){

	del([
		'./docs/examples/',
		'./docs/documentation/',
		'./types/'
	],{

		force: true,

	}).then( paths => {

		cb();

	});

}

/*-------------------
	Development
--------------------*/

let srcDir = '';
let distDir = '';

function copyDevFiles( cb ){

	gulp.src( srcDir + '/html/**/*' ).pipe( gulp.dest( distDir ) );
	gulp.src( srcDir + '/assets/**/*' ).pipe( gulp.dest( distDir + '/assets/' ) );

	browserSync.reload();
	
	cb();

}

function cleanDevFiles( cb ){

	del([
		distDir,
	],{

		force: true,

	}).then( ( paths ) => {

		cb();

	});

}

function webpackDev(){

	let conf = require( './webpack/build-example.config' );
	conf.entry.main = srcDir + '/ts/main.ts';
	conf.mode = options.P ? 'production' : 'development';

	return webpackStream( conf, webpack )
		.pipe( gulp.dest( distDir + "/js/" ) )
		.on( 'end', browserSync.reload )

}

function sassDev(){

	return gulp.src( srcDir + "/scss/style.scss" )
		.pipe( plumber() )
		.pipe( autoprefixer() )
		.pipe( sass() )
		.pipe( cssmin() )
		.pipe( gulp.dest( distDir + "/css/" ) )
		.pipe( browserSync.stream() )

}

function brSync(){

	browserSync.init({
		server: {
			baseDir: distDir,
			index: "index.html",
		},
	});

}

function watch(){

	gulp.watch( './src/**/*', gulp.series( webpackDev ) );
	gulp.watch( srcDir + '/ts/**/*', gulp.series( webpackDev ) );
	gulp.watch( srcDir + '/scss/*.scss', gulp.series( sassDev ) );
	gulp.watch( srcDir + '/html/**/*', gulp.series( copyDevFiles ) );

	console.log(srcDir + '/html/**/*');
	
}

function setDevLibraryPath( cb ){
	
	srcDir = './examples/' + options.dev + '/src';
	distDir = './examples/' + options.dev + '/public';

	cb();
}

function setDevDocumentsPath( cb ){

	srcDir = './docs_src';
	distDir = './docs';

	cb();

}

let develop = gulp.series( 
	copyDevFiles,
	gulp.parallel( webpackDev, sassDev ),
	gulp.parallel( brSync, watch ),
);

exports.default = gulp.series( setDevLibraryPath, cleanDevFiles, develop );
exports.docs = gulp.series( setDevDocumentsPath, develop );
exports.build = gulp.series( cleanBuildFiles, buildPackages, buildExamples, setDevDocumentsPath, develop );
