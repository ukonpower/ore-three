import * as THREE from 'three';
import * as ORE from '@ore-three-ts';

export class FilterScene extends ORE.BaseScene {

	private bloomFilter: ORE.BloomFilter;

	private obj: THREE.Mesh;

	private filterType: string = "";

	constructor() {

		super();

	}

	public onBind( gProps: ORE.GlobalProperties ) {

		super.onBind( gProps );

		this.camera.position.set( 0, 1.5, 6 );
		this.camera.lookAt( 0, 0, 0 );

		let light = new THREE.DirectionalLight();
		light.position.set( 1, 10, 1 );
		this.scene.add( light );

		let aLight = new THREE.AmbientLight();
		aLight.intensity = 0.2;
		this.scene.add( aLight );

		this.obj = new THREE.Mesh( new THREE.DodecahedronBufferGeometry(), new THREE.MeshStandardMaterial( {
			color: new THREE.Color( '#FFF' )
		} ) );
		this.scene.add( this.obj );

		this.bloomFilter = new ORE.BloomFilter( this.renderer, 0.5 );

		this.filterType = ( document.querySelector( '#selector' ) as HTMLInputElement ).value;
		document.querySelector( '#selector' ).addEventListener( 'input', ( e ) => {

			this.filterType = ( e.target as HTMLInputElement ).value;

		} );

	}

	public animate( deltaTime: number ) {

		this.obj.rotateY( 1.0 * deltaTime );

		switch ( this.filterType ) {

			case 'BloomFilter':
				this.bloomFilter.render( this.scene, this.camera );
				break;

		}

	}

	public onResize( args: ORE.ResizeArgs ) {

		super.onResize( args );

		this.bloomFilter.resize();

	}

}
