# ore-three
[three.js]( https://github.com/mrdoob/three.js ) utils.

## Usage

Check ore-three example scenes!!

[examples]( https://github.com/ukonpower/ore-three-ts/tree/master/examples/js )


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
import MainScene from './scenes/MainScene';

class APP {

	constructor() {
		
		this.controller = new ORE.Controller( {

			canvas: document.querySelector( "#canvas" ),
			retina: false,
			alpha: false,

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

export default class MainScene extends ORE.BaseScene {

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

	animate( deltaTime ) {
		
		this.box.rotateY( 0.01 );
		this.renderer.render( this.scene, this.camera );

	}

	onResize( width, height ) {

		super.onResize( width, height );

	}
	
}
```

### Use utility
if you want add GPU fish...

```javascript
this.fish = new ORE.Fish( this.renderer,1000,10 );
this.scene.add( this.fish );
```

and update fish

```javascript
animate( deltaTime ) {
    
    if( this.fish ) {
    
        this.fish.update(  this.time  );
    
    }
    
}
```


