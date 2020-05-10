# Ore Three
[three.js]( https://github.com/mrdoob/three.js ) utils.

[Documentation](https:ore-three-ts.ukon.dev/documentation)
[Examples]( https://ore-three-ts.ukon.dev/examples/ )


### install
You can get the library from [npm]( https://www.npmjs.com/package/ore-three-ts ).

```bash
$ npm install ore-three-ts
```

##### Import

```javascript
import * as ORE from 'ore-three-ts';
```

### Create Controller

```javascript
import * as ORE from 'ore-three-ts';
import { MainScene } from './scenes/MainScene';

class APP {

	constructor() {
		
		this.controller = new ORE.Controller( {

			canvas: document.querySelector( "#canvas" ),
			retina: true,
			alpha: true,

		} );

		this.controller.bindScene( new MainScene() );

	}

}

window.addEventListener( 'load', ()=>{

	let app = new APP();

} );
```

### Create Scene

```javascript
import * as ORE from 'ore-three-ts';
import * as THREE from 'three';

export class MainScene extends ORE.BaseScene {

	constructor() {
		
		super();

		this.name = "MainScene";

	}

	onBind( gProps ) {

		super.onBind( gProps );

		this.renderer = this.gProps.renderer;

		this.camera.position.set( 0, 1.5, 3 );
		this.camera.lookAt( 0, 0, 0 );

		var boxGeo = new THREE.BoxGeometry( 1, 1, 1 );
		var boXMat = new THREE.MeshNormalMaterial();
		this.box = new THREE.Mesh( boxGeo, boXMat );
		this.scene.add( this.box );

		this.light = new THREE.DirectionalLight();
		this.light.position.y = 10;
		this.scene.add( this.light );		

	}

	//Animation Loop!!

	animate( deltaTime ) {
		
		this.box.rotateY( 0.01 );
		this.renderer.render( this.scene, this.camera );

	}

	//You can use any events!!

	onResize( args ) {

		super.onResize( args );

	}
	
	public onTouchStart( cursor: Cursor, event: MouseEvent ) {}

	public onTouchMove( cursor: Cursor, event: MouseEvent ) { }

	public onTouchEnd( cursor: Cursor, event: MouseEvent ) { }

	public onHover( cursor: Cursor ) { }

	public onWheel( event: WheelEvent, trackpadDelta: number ) { }

}
```