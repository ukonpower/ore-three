import * as THREE from 'three';
import { Cursor } from '../utils/Cursor';
import { BaseScene } from '../core/BaseScene';

import { Lethargy } from 'lethargy';
import toPx from 'to-px';

const VERSION = require( "../../package.json" ).version;

export declare interface ControllerParam extends THREE.WebGLRendererParameters{
    retina?: boolean;
    silent?: boolean;
}

export declare interface ResizeArgs{
	aspectRatio: number,
	pixelRatio: number,
	windowSize: THREE.Vector2,
	windowPixelSize: THREE.Vector2
}

export declare interface GlobalProperties{
    renderer: THREE.WebGLRenderer;
    cursor: Cursor;
    resizeArgs: ResizeArgs;
}

export class Controller {

    public currentScene: BaseScene;

    public renderer: THREE.WebGLRenderer;
    public cursor: Cursor;
    public clock: THREE.Clock;

    public gProps: GlobalProperties;

    constructor( parameter: ControllerParam ) {

    	if ( ! parameter.silent ) {

    		console.log( "%c- ore-three " + VERSION + " -", 'padding: 5px 10px ;background-color: black; color: white;font-size:11px' );

    	}

    	this.renderer = new THREE.WebGLRenderer( parameter );
    	this.renderer.debug.checkShaderErrors = true;
    	this.renderer.setSize( window.innerWidth, window.innerHeight );
    	this.renderer.setPixelRatio( parameter.retina ? window.devicePixelRatio : 1 );

    	this.cursor = new Cursor();
    	this.cursor.onTouchStart = this.onTouchStart.bind( this );
    	this.cursor.onTouchMove = this.onTouchMove.bind( this );
    	this.cursor.onTouchEnd = this.onTouchEnd.bind( this );
    	this.cursor.onHover = this.onHover.bind( this );
    	this.cursor.onWheel = this.onWheel.bind( this );

    	this.clock = new THREE.Clock();

    	this.gProps = {
    		renderer: this.renderer,
    		cursor: this.cursor,
    		resizeArgs: null
    	};

    	window.addEventListener( 'orientationchange', this.onOrientationDevice.bind( this ) );
    	window.addEventListener( 'resize', this.onWindowResize.bind( this ) );

    	this.onWindowResize();

    	this.tick();

    }

    protected tick() {

    	let deltatime = this.clock.getDelta();

    	this.cursor.update();

    	if ( this.currentScene ) {

    		this.currentScene.tick( deltatime );

    	}

    	requestAnimationFrame( this.tick.bind( this ) );

    }

    public bindScene( scene: BaseScene ) {

    	this.currentScene = scene;

    	this.currentScene.onBind( this.gProps );

    	this.onWindowResize();

    }

    public unbindScene() {

    	if ( this.currentScene ) {

    		this.currentScene.onUnbind();
    		this.currentScene = null;

    		this.renderer.renderLists.dispose();

    	}

    }

    protected onWindowResize() {

    	let windowSize = new THREE.Vector2( window.innerWidth, window.innerHeight );

    	let resizeArgs: ResizeArgs = {
    		aspectRatio: windowSize.x / windowSize.y,
    		pixelRatio: this.renderer.getPixelRatio(),
    		windowSize: windowSize.clone(),
    		windowPixelSize: windowSize.clone().multiplyScalar( this.renderer.getPixelRatio() )
    	};

    	this.gProps.resizeArgs = resizeArgs;

    	if ( this.currentScene ) {

    		this.currentScene.onResize( resizeArgs );

    	}

    }


    public onOrientationDevice() {

    	this.onWindowResize();

    }

    public onTouchStart( e: MouseEvent ) {

    	if ( this.currentScene ) {

    		this.currentScene.onTouchStart( this.cursor, e );

    	}

    }

    public onTouchMove( e: MouseEvent ) {

    	if ( this.currentScene ) {

    		this.currentScene.onTouchMove( this.cursor, e );

    	}

    }

    public onTouchEnd( e: MouseEvent ) {

    	if ( this.currentScene ) {

    		this.currentScene.onTouchEnd( this.cursor, e );

    	}

    }

    public onHover( ) {

    	if ( this.currentScene ) {

    		this.currentScene.onHover( this.cursor );

    	}

    }

    protected trackpadMemDelta = 0;
	protected trackpadMax: boolean = false;
	protected lethargy = new Lethargy( 7, 0, 0.05 );

	public onWheel( e: WheelEvent ) {

		let delta = e.deltaY;
		let trackpadDelta = 0;

		switch ( e.deltaMode ) {

			case e.DOM_DELTA_LINE:
				delta *= toPx( 'ex', window ) * 2.5;
				break;

			case e.DOM_DELTA_PAGE:
				delta *= window.innerHeight;
				break;

		}

		if ( this.lethargy.check( e ) ) {

			trackpadDelta = delta;

		} else {

			let d = delta - this.trackpadMemDelta;

			if ( Math.abs( d ) > 50 ) {

				this.trackpadMemDelta = d;
				trackpadDelta = delta;

				this.trackpadMax = true;

			} else if ( d == 0 ) {

				if ( this.trackpadMax ) {

					trackpadDelta = delta;

				}

			} else if ( d < 0 ) {

				this.trackpadMax = false;

			}

			this.trackpadMemDelta = ( delta );

		}

		if ( this.currentScene ) {

			this.currentScene.onWheel( e, trackpadDelta );

		}

	}

}
