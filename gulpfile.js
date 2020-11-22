const info = require( './info' );
const gulp = require( 'gulp' );
const gulpIf = require( 'gulp-if' );
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
const eslint = require( 'gulp-eslint' );
const typedoc = require( 'gulp-typedoc' );
const ts = require( 'gulp-typescript' );
const options = minimist( process.argv.slice( 2 ), {
	default: {
		dev: 'untitle',
		P: false,
	}
} );


/*-------------------
	Production
--------------------*/

const exDir = './examples/';
const docsExDir = './docs/examples/';

function isFixed( file ) {

	return file.eslint != null && file.eslint.fixed;

}

function esLint( cb ) {

	let paths = [ './src/', './examples/' ];

	for ( let i = 0; i < paths.length; i ++ ) {

		gulp.src( paths[ i ] + '**/*.ts' )
			.pipe( eslint( { useEslintrc: true, fix: true } ) ) // .eslintrc を参照
			.pipe( eslint.format() )
			.pipe( gulpIf( isFixed, gulp.dest( paths[ i ] ) ) )
			.pipe( eslint.failAfterError() );

	}

	cb();

}

function buildPackages( cb ) {

	//eslint
	gulp.series( esLint );

	//develop build
	const confModule = require( './config/webpack/umd.webpack.config' );
	webpackStream( confModule, webpack )
		.pipe( gulp.dest( './build/' ) );

	//production build
	const confMin = require( './config/webpack/umd-min.webpack.config' );
	webpackStream( confMin, webpack )
		.pipe( gulp.dest( './build/' ) );

	//typedoc
	gulp.src( './src' )
		.pipe( typedoc( {
			module: "umd",
			target: "es6",
			out: "./docs/documentation",
			mode: "file",
			name: info.packageName,
			moduleResolution: "node"
		} ) );

	var tsProjectDts = ts.createProject( './config/typescript/base.tsconfig.json' );

	//types
	var tsResult = gulp.src( './src/**/*.ts' )
		.pipe( tsProjectDts() );
	tsResult.dts.pipe( gulp.dest( './types' ) );

	cb();

}

function buildExamples( cb ) {

	fs.readdir( exDir, ( err, files ) => {

		if ( err ) throw err;

		const conf = require( './webpack/build-example.webpack.config.js' );
		conf.mode = 'production';

		for ( let i = 0; i < files.length; i ++ ) {

			//set webpack entry files
			conf.entry[ files[ i ] ] = exDir + files[ i ] + '/src/ts/main.ts';

			//sass
			gulp.src( exDir + files[ i ] + "/src/scss/style.scss" )
				.pipe( plumber() )
				.pipe( sass() )
				.pipe( autoprefixer() )
				.pipe( cssmin() )
				.pipe( gulp.dest( docsExDir + files[ i ] + "/css/" ) );

			//copy files
			gulp.src( exDir + files[ i ] + '/src/html/**/*' ).pipe( gulp.dest( docsExDir + files[ i ] + '/' ) );
			gulp.src( exDir + files[ i ] + '/src/assets/**/*' ).pipe( gulp.dest( docsExDir + files[ i ] + '/assets/' ) );

		}

		conf.output.filename = '[name]/js/main.js';

		//webpack
		webpackStream( conf, webpack )
			.on( 'error', ( e ) => {

				this.emit( 'end' );

			} )
			.pipe( gulp.dest( docsExDir ) )

			.on( 'end', cb );

	} );

}

function cleanBuildFiles( cb ) {

	del( [
		'./docs/examples/',
		'./docs/documentation/',
		'./types/'
	], {

		force: true,

	} ).then( paths => {

		cb();

	} );

}

/*-------------------
	Development
--------------------*/

let srcDir = '';
let distDir = '';

function copyDevFiles( cb ) {

	gulp.src( srcDir + '/html/**/*' ).pipe( gulp.dest( distDir ) );
	gulp.src( srcDir + '/assets/**/*' ).pipe( gulp.dest( distDir + '/assets/' ) );

	browserSync.reload();

	cb();

}

function cleanDevFiles( cb ) {

	del( [
		distDir,
	], {

		force: true,

	} ).then( ( paths ) => {

		cb();

	} );

}

function webpackDev() {

	const conf = require( './config/webpack/build-example.webpack.config.js' );
	conf.entry = {};
	conf.entry.main = srcDir + '/ts/main.ts';
	conf.mode = options.P ? 'production' : 'development';

	return webpackStream( conf, webpack )
		.on( 'error', function ( e ) {

			this.emit( 'end' );

		} )
		.pipe( gulp.dest( distDir + "/js/" ) )
		.on( 'end', browserSync.reload );

}

function sassDev() {

	return gulp.src( srcDir + "/scss/style.scss" )
		.pipe( plumber() )
		.pipe( sass() )
		.pipe( autoprefixer() )
		.pipe( cssmin() )
		.pipe( gulp.dest( distDir + "/css/" ) )
		.pipe( browserSync.stream() );

}

function brSync() {

	browserSync.init( {
		server: {
			baseDir: distDir,
			index: "index.html",
		},
		notify: false,
		ghostMode: false
	} );

}

function watch() {

	gulp.watch( './src/**/*', gulp.series( webpackDev ) );
	gulp.watch( srcDir + '/ts/**/*', gulp.series( webpackDev ) );
	gulp.watch( srcDir + '/scss/*.scss', gulp.series( sassDev ) );
	gulp.watch( srcDir + '/html/**/*', gulp.series( copyDevFiles ) );
	gulp.watch( srcDir + '/assets/**/*', gulp.series( copyDevFiles ) );

}

function setDevLibraryPath( cb ) {

	srcDir = './examples/' + options.dev + '/src';
	distDir = './examples/' + options.dev + '/public';

	cb();

}

function setDevDocumentsPath( cb ) {

	srcDir = './docs_src';
	distDir = './docs';

	cb();

}

const develop = gulp.series(
	copyDevFiles,
	gulp.parallel( webpackDev, sassDev ),
	gulp.parallel( brSync, watch )
);

exports.default = gulp.series( setDevLibraryPath, cleanDevFiles, develop );
exports.lint = gulp.series( esLint );
exports.docs = gulp.series( setDevDocumentsPath, develop );
exports.build = gulp.series( cleanBuildFiles, buildPackages, buildExamples, setDevDocumentsPath, develop );

