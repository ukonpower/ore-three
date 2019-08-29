import * as THREE from 'three';
import { Cursor } from '../core/Cursor';
import { GlobalProperties } from '../core/Controller';

export declare interface ResizeArgs{
    aspectRatio: number,
    pixelRatio: number,
    windowSize: THREE.Vector2,
    windowPixelSize: THREE.Vector2
}

export class BaseScene {

    public gProps: GlobalProperties;
    
    public name: string

    public scene: THREE.Scene;
    public camera: THREE.PerspectiveCamera;
    
    public time: number = 0;

    constructor() {
        
        this.name = "";

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 50, innerWidth / innerHeight, 0.1, 1000 );
    
    }

    public tick( deltaTime: number ) {
    
        this.time += deltaTime;
    
        this.animate( deltaTime );
    
    }

    public animate( deltaTime: number ) { }

    public onBind( gProps: GlobalProperties ) { 

        this.gProps = gProps;

    }

    public onUnbind() {

        this.removeChildrens( this.scene );
        
    }

    private removeChildrens( object: THREE.Object3D ){

        const length = object.children.length;

        for(let i = length - 1; i >= 0; i-- ){

            this.removeChildrens(object.children[i]);

            let geo: THREE.Geometry | THREE.BufferGeometry;
            let mat: THREE.Material;            
            
            if( (object.children[i] as THREE.Mesh).isMesh ){

                geo = (object.children[i] as THREE.Mesh).geometry;
                mat = ((object.children[i] as THREE.Mesh).material as THREE.Material);
                
            }

            object.remove( (object.children[i] ) );

            if( geo ){ 
                geo.dispose();
            }

            if( mat ){ 
                mat.dispose();
            }

        }

    }

    public onResize( args: ResizeArgs ) {
    
        this.camera.aspect = args.aspectRatio
        this.camera.updateProjectionMatrix();
    
    }

    public onTouchStart( cursor: Cursor, event: MouseEvent ) { }

    public onTouchMove( cursor: Cursor, event: MouseEvent ) { }

    public onTouchEnd( cursor: Cursor, event: MouseEvent ) { }

    public onHover( cursor: Cursor ) { }

    public onWheel( event: WheelEvent ) { }

}