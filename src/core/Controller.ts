import * as THREE from 'three';
import { Cursor } from './Cursor';
import * as ORE from '../scene/BaseScene';

const VERSION = require(  "../../package.json"  ).version;

export declare interface ControllerParam extends THREE.WebGLRendererParameters{
    retina?: boolean;
    silent?: boolean;
}

export declare interface GlobalProperties{    
    renderer: THREE.WebGLRenderer;
    cursor: Cursor;
}

export class Controller {

    public currentScene: ORE.BaseScene;

    public renderer: THREE.WebGLRenderer;
    public cursor: Cursor;
    public clock: THREE.Clock;

    public gProps: GlobalProperties;

    constructor(  parameter: ControllerParam  ) {

        if( !parameter.silent ){

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
            cursor: this.cursor
        }

        window.addEventListener( 'orientationchange', this.onOrientationDevice.bind( this ) );
        window.addEventListener( 'resize', this.onWindowResize.bind( this ) );

        this.onWindowResize();

        this.tick();

    }

    private tick() {

        let deltatime = this.clock.getDelta();
        
        this.cursor.update();
        
        if( this.currentScene ){
        
            this.currentScene.tick( deltatime );
        
        }
        
        requestAnimationFrame( this.tick.bind( this ) );

    }
    
    public bindScene( scene: ORE.BaseScene ){

        this.currentScene = scene;

        this.currentScene.onBind( this.gProps );

        this.onWindowResize();

    }

    public unbindScene(){

        if( this.currentScene ){
            
            this.currentScene.onUnbind();
            this.currentScene = null;

            this.renderer.renderLists.dispose();

        }

    }

    private onWindowResize() {
        
        let windowSize = new THREE.Vector2( window.innerWidth, window.innerHeight )
        
        this.renderer.setSize( windowSize.x, windowSize.y );
               
        if( this.currentScene ){
        
            this.currentScene.onResize({
                aspectRatio: windowSize.x / windowSize.y,
                pixelRatio: this.renderer.getPixelRatio(),
                windowSize: windowSize,
                windowPixelSize: windowSize.clone().multiplyScalar( this.renderer.getPixelRatio() )
            });
        
        }
    }

    
    private onOrientationDevice() {
    
        this.onWindowResize();
    
    }

    public onTouchStart( e: MouseEvent ) { 

        if( this.currentScene ){

            this.currentScene.onTouchStart( this.cursor, e );

        }
        
    }

    public onTouchMove( e: MouseEvent ) {

        if( this.currentScene ){

            this.currentScene.onTouchMove( this.cursor, e );

        }

    }

    public onTouchEnd( e: MouseEvent ) { 

        if( this.currentScene ){

            this.currentScene.onTouchEnd( this.cursor, e );

        }

    }

    public onHover( ) { 

        if( this.currentScene ){

            this.currentScene.onHover( this.cursor );

        }

    }

    public onWheel( e: WheelEvent ) { 

        if( this.currentScene ){

            this.currentScene.onWheel( e );

        }

    }

}