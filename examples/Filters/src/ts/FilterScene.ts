import * as THREE from 'three';
import * as ORE from '@ore-three-ts';

export class FilterScene extends ORE.BaseLayer {

	private filters: { [ key: string ] : any} = {};

	private obj: THREE.Mesh;

	private filterType: string = "";

	constructor() {

		super();

	}

	public onBind( gProps: ORE.LayerInfo ) {

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

		/*------------------------
			Create Filters
		------------------------*/

		this.filters.BloomFilter = new ORE.BloomFilter( this.renderer );
		this.filters.SMAAFilter = new ORE.SMAAFilter( this.renderer );

		/*------------------------
			Init Selectors
		------------------------*/

		let keys = Object.keys( this.filters );

		for ( let i = 0; i < keys.length; i ++ ) {

			let option = document.createElement( 'option' );
			option.value = keys[ i ];
			option.text = keys[ i ];
			document.querySelector( '#selector' ).appendChild( option );

		}

		document.querySelector( '#selector' ).addEventListener( 'input', ( e ) => {

			this.filterType = ( e.target as HTMLInputElement ).value;

		} );

		this.filterType = ( document.querySelector( '#selector' ) as HTMLInputElement ).value;


	}

	public animate( deltaTime: number ) {

		this.obj.rotateY( 1.0 * deltaTime );

		this.filters[ this.filterType ].render( this.scene, this.camera );

	}

	public onResize( args: ORE.LayerSize ) {

		super.onResize( args );

		let keys = Object.keys( this.filters );

		for ( let i = 0; i < keys.length; i ++ ) {

			this.filters[ keys[ i ] ].resize( args.windowPixelSize );

		}

	}

}
