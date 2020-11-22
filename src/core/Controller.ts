import * as THREE from 'three';
import { Pointer } from '../utils/Pointer';
import { BaseLayer, LayerInfo, LayerSize } from './BaseLayer';

import { Lethargy } from 'lethargy';
import toPx from 'to-px';

export declare interface ControllerParam {
    silent?: boolean;
}

export class Controller extends THREE.EventDispatcher {

	private layers: BaseLayer[] = [];
    public pointer: Pointer;
    public clock: THREE.Clock;

    constructor( parameter?: ControllerParam ) {

    	super();

    	if ( ! ( parameter && parameter.silent ) ) {

    		console.log( "%c- ore-three " + require( "../../package.json" ).version + " -", 'padding: 5px 10px ;background-color: black; color: white;font-size:11px' );

    	}

    	this.pointer = new Pointer();
    	this.pointer.addEventListener( 'update', this.touchEvent.bind( this ) );
    	this.pointer.addEventListener( 'onwheel', this.onWheel.bind( this ) );

    	this.clock = new THREE.Clock();

    	window.addEventListener( 'orientationchange', this.onOrientationDevice.bind( this ) );
    	window.addEventListener( 'resize', this.onWindowResize.bind( this ) );

    	this.onWindowResize();

    	this.tick();

    }

    protected tick() {

    	let deltaTime = this.clock.getDelta();

    	this.pointer.update();

    	for ( let i = 0; i < this.layers.length; i ++ ) {

    		this.layers[ i ].tick( deltaTime );

    	}

    	requestAnimationFrame( this.tick.bind( this ) );

    }

    public getLayer( layerName: string ) {

    	for ( let i = 0; i < this.layers.length; i ++ ) {

    		if ( this.layers[ i ].info.name == layerName ) return this.layers[ i ];

    	}

    	return null;

    }

    public addLayer( layer: BaseLayer, layerInfo: LayerInfo ) {

    	while ( this.getLayer( layerInfo.name ) ) {

    		layerInfo.name += '_';

    	}

    	layer.onBind( layerInfo );
    	this.layers.push( layer );

    }

    public removeLayer( layerNmae: string ) {

    	for ( let i = this.layers.length; i >= 0; i -- ) {

    		let layer = this.layers[ i ];

    		if ( layer.info.name == layerNmae ) {

    			this.layers.splice( i, 1 );

    		}

    	}

    }

    protected onWindowResize() {

    	for ( let i = 0; i < this.layers.length; i ++ ) {

    		let layer = this.layers[ i ];

    		let windowSize = new THREE.Vector2( window.innerWidth, window.innerHeight );
    		let canvasSize = new THREE.Vector2( layer.info.canvas.clientWidth, layer.info.canvas.clientWidth );

    		let portraitWeight = 1.0 - ( ( canvasSize.x / canvasSize.y ) - layer.info.aspect.portraitAspect ) / ( layer.info.aspect.mainAspect - layer.info.aspect.portraitAspect );
    		portraitWeight = Math.min( 1.0, Math.max( 0.0, portraitWeight ) );

    		let wideWeight = 1.0 - ( ( canvasSize.x / canvasSize.y ) - layer.info.aspect.wideAspect ) / ( layer.info.aspect.mainAspect - layer.info.aspect.wideAspect );
    		wideWeight = Math.min( 1.0, Math.max( 0.0, wideWeight ) );

    		let layerSize: LayerSize = {
    			windowSize: windowSize.clone(),
    			canvasSize: canvasSize,
    			canvasPixelSize: canvasSize.clone().multiplyScalar( layer.renderer.getPixelRatio() ),
    			aspectRatio: canvasSize.x / canvasSize.y,
    			portraitWeight: portraitWeight,
    			wideWeight: wideWeight,
    		};

    		this.layers[ i ].onResize( layerSize );

    	}

    }


    public onOrientationDevice() {

    	this.onWindowResize();

    }

    public touchEvent( e: any ) {

    	for ( let i = 0; i < this.layers.length; i ++ ) {

    		this.layers[ i ].touchEvent( e );

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

		for ( let i = 0; i < this.layers.length; i ++ ) {

			this.layers[ i ].onWheel( e, trackpadDelta );

		}

	}

}
