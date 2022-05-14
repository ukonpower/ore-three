// gulp
const gulp = require( 'gulp' );
const gulpIf = require( 'gulp-if' );

// utils
const fs = require( 'fs' );
const browserSync = require( 'browser-sync' );
const plumber = require( 'gulp-plumber' );
const del = require( 'del' );
const typedoc = require( 'gulp-typedoc' );
const eslint = require( 'gulp-eslint' );

// ts
const webpackStream = require( 'webpack-stream' );
const webpack = require( 'webpack' );
const autoprefixer = require( 'gulp-autoprefixer' );

// sass
const sass = require( 'gulp-sass' )( require( 'sass' ) );
const minimist = require( 'minimist' );
const cssmin = require( 'gulp-cssmin' );

// log
const fancyLog = require( 'fancy-log' );
const supportsColor = require( 'supports-color' );

const options = minimist( process.argv.slice( 2 ), {
	default: {
		ex: 'Controller',
		P: false,
	}
} );

/*-------------------
	Production
--------------------*/

const exDir = './src/examples/';
const docsExDir = './docs/examples/';

function isFixed( file ) {

	return file.eslint != null && file.eslint.fixed;

}

async function lint( cb ) {

	let paths = [ './src/examples', './src/docs' ];
	let promiseArray = [];

	for ( let i = 0; i < paths.length; i ++ ) {

		let promise = new Promise( resolve => {

			gulp.src( paths[ i ] + '/**/*.ts' )
				.pipe( eslint( { useEslintrc: true, fix: true } ) )
				.pipe( eslint.format() )
				.pipe( gulpIf( isFixed, gulp.dest( paths[ i ] ) ) )
				.on( 'end', () => {

					resolve();

				} )
				.pipe( eslint.failAfterError() );

		} );

		promiseArray.push( promise );

	}

	await Promise.all( promiseArray ).then( () => {

		cb();

	} );

}

function buildTypeDoc( cb ) {

	//typedoc
	gulp.src( './packages/ore-three/src' )
		.pipe( typedoc( {
			out: "./docs/documentation",
			name: "ore-three"
		} ) )
		.on( 'end', cb );

}

function buildExamples( cb ) {

	fs.readdir( exDir, ( err, files ) => {

		if ( err ) throw err;

		const conf = require( './webpack.config.js' );
		conf.mode = 'production';

		for ( let i = 0; i < files.length; i ++ ) {

			let exName = files[ i ];

			if ( exName.charAt( 0 ) == '.' ) continue;

			//set webpack entry files
			conf.entry[ exName ] = exDir + exName + '/ts/main.ts';

			//sass
			gulp.src( exDir + exName + "/scss/style.scss" )
				.pipe( plumber() )
				.pipe( sass() )
				.pipe( autoprefixer() )
				.pipe( cssmin() )
				.pipe( gulp.dest( docsExDir + exName + "/css/" ) );

			//copy files
			gulp.src( exDir + exName + '/html/**/*' ).pipe( gulp.dest( docsExDir + exName + '/' ) );
			gulp.src( exDir + exName + '/assets/**/*' ).pipe( gulp.dest( docsExDir + exName + '/assets/' ) );

		}

		conf.output.filename = '[name]/js/main.js';

		//webpack
		webpackStream( conf, webpack )
			.on( 'error', function ( e ) {

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

function webpackDev( cb ) {

	const conf = require( './webpack.config.js' );
	conf.entry = {};
	conf.entry.main = srcDir + '/ts/main.ts';
	conf.mode = options.P ? 'production' : 'development';
	conf.output = {};
	conf.output.filename = 'main.js';
	conf.watch = true;

	webpackStream( conf, webpack, ( err, stats ) => {

		if ( err ) {

			console.log( err );
			return;

		}

		stats = stats || {};

		var statusLog = stats.toString( {
			colors: supportsColor.stdout.hasBasic,
			hash: false,
			timings: false,
			chunks: false,
			chunkModules: false,
			modules: false,
			children: true,
			version: true,
			cached: false,
			cachedAssets: false,
			reasons: false,
			source: false,
			errorDetails: false
		} );

		if ( statusLog ) {

			fancyLog( statusLog );

		}

		browserSync.reload();

	} )
		.on( 'error', function () {

			this.emit( 'end' );

		} )
		.pipe( gulp.dest( distDir + '/js/' ) );

	cb();

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

	gulp.watch( srcDir + '/scss/*.scss', gulp.series( sassDev ) );
	gulp.watch( srcDir + '/html/**/*', gulp.series( copyDevFiles ) );
	gulp.watch( srcDir + '/assets/**/*', gulp.series( copyDevFiles ) );

}

function setDevLibraryPath( cb ) {

	srcDir = './src/examples/' + options.ex + '/src';
	distDir = './docs/examples/' + options.ex + '/public';

	cb();

}

function setDevDocumentsPath( cb ) {

	srcDir = './src/docs';
	distDir = './docs/';

	cb();

}

const develop = gulp.series(
	copyDevFiles,
	gulp.parallel( webpackDev, sassDev ),
	gulp.parallel( brSync, watch )
);

exports.lint = gulp.series( lint );

exports.default = gulp.series(
	setDevDocumentsPath,
	develop
);

exports.dev = gulp.series(
	setDevLibraryPath,
	cleanDevFiles,
	develop
);

exports.build = gulp.series(
	cleanBuildFiles,
	lint,
	buildTypeDoc,
	buildExamples,
);

