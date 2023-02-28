# Ore Three
[three.js]( https://github.com/mrdoob/three.js ) utils.

![](./screenshot/ore-three.png)

[Documentation](https://ore-three.ukon.dev/documentation)
[Examples]( https://ore-three.ukon.dev/examples/ )


### install
You can get the library from [npm]( https://www.npmjs.com/package/ore-three ).

```bash
$ npm install ore-three
```

##### Import

```typescript
import * as ORE from 'ore-three';
```

### Create Controller

```typescript
import * as ORE from 'ore-three';

import { MainScene } from './MainScene';

export class APP {

	private controller: ORE.Controller;
	private scene: MainScene;

	constructor() {

		this.controller = new ORE.Controller();

		this.scene = new MainScene( {
			name: 'Main',
			canvas: document.querySelector( '#canvas' ) as HTMLCanvasElement,
		} );

		this.controller.addLayer( this.scene );

	}

}

window.addEventListener( 'load', () => {

	let app = new APP();

} );
```

### Create Scene

```typescript
import * as THREE from 'three';
import * as ORE from '@ore-three';

export class MainScene extends ORE.BaseLayer {

	private box: THREE.Mesh;

	constructor( param: ORE.LayerParam ) {

		super( param );

		/*-------------------------------
			Scene
		-------------------------------*/

		this.camera.position.set( 0, 1.5, 4 );
		this.camera.lookAt( 0, 0, 0 );

		this.box = new THREE.Mesh( 
			new THREE.BoxGeometry(),
			new THREE.MeshNormalMaterial()
		);

		this.scene.add( this.box );

	}

	public animate( deltaTime: number ) {

		if ( this.box ) {

			this.box.rotateY( 1.0 * deltaTime );

		}

		if ( this.renderer ) {

			this.renderer.render( this.scene, this.camera );

		}

	}

	public onResize() {

		super.onResize();

	}

	public onTouchStart( args: ORE.TouchEventArgs ) {
	}

	public onTouchMove( args: ORE.TouchEventArgs ) {
	}

	public onTouchEnd( args: ORE.TouchEventArgs ) {
	}

	public onHover( args: ORE.TouchEventArgs ) {
	}

	public onWheel( event: WheelEvent, trackpadDelta: number ) {
	}

}
```