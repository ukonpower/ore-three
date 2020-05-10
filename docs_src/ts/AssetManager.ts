import * as THREE from 'three';
import * as ORE from '@ore-three-ts';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export declare interface SliderInfo {
	texture?: THREE.Texture;
	texPath: string;
	action: string;
	option: string;
	sortNum: number;
}

declare interface TextureInfo {
	path: string;
	name: string;
	param?: {
		wrapT?: THREE.Wrapping,
		wrapS?: THREE.Wrapping,
	}
}

export class AssetManager {

	public mustLoadingManager: THREE.LoadingManager;
	public subLoadingManager: THREE.LoadingManager;

	public mustAssetsLoaded: boolean = false;
	public subAssetsLoaded: boolean = false;

	public onMustAssetsLoaded: Function;

	public gltfScene: THREE.Group;
	public textures: ORE.Uniforms = {};

	public animator: ORE.Animator;

	constructor( param: { onMustAssetLoaded?: Function, onSubAssetsLoaded?: Function } ) {

		this.mustLoadingManager = new THREE.LoadingManager(
			() => {

				this.mustAssetsLoaded = true;

				if ( param.onMustAssetLoaded ) {

					param.onMustAssetLoaded();

				}

				if ( this.onMustAssetsLoaded ) {

					this.onMustAssetsLoaded();

				}

			}
		);

		this.subLoadingManager = new THREE.LoadingManager(
			() => {

				this.subAssetsLoaded = true;

				if ( param.onSubAssetsLoaded ) {

					param.onSubAssetsLoaded();

				}

			}
		);

		this.load();

	}

	public get isLoaded() {

		return this.mustAssetsLoaded;

	}

	private load() {

		let basePath = './assets/';

		let loader = new GLTFLoader( this.mustLoadingManager );
		loader.crossOrigin = 'use-credentials';

		loader.load( basePath + 'scene/ore-three-ts.glb', ( gltf ) => {

			this.gltfScene = gltf.scene;

		} );

		let mustTexPath: TextureInfo[] = [
			// { path: basePath + '/img/blueBoard.png', name: 'Foo' },
		];

		this.loadTex( mustTexPath, this.mustLoadingManager );

		let subTexInfos: TextureInfo[] = [
			// { path: basePath + '/img/blueBoard.png', name: 'Foo' },
		];

		this.loadTex( subTexInfos, this.subLoadingManager );

	}

	private loadTex( infos: TextureInfo[], manager: THREE.LoadingManager ) {

		for ( let i = 0; i < infos.length; i ++ ) {

			let info = infos[ i ];

			this.textures[ info.name ] = { value: null };

			let loader = new THREE.TextureLoader( manager );
			loader.crossOrigin = 'use-credentials';
			loader.load( info.path, ( tex ) => {

				if ( info.param ) {

					let keys = Object.keys( info.param );

					for ( let i = 0; i < keys.length; i ++ ) {

						tex[ keys[ i ] ] = info.param[ keys[ i ] ];

					}

				}

				this.textures[ info.name ].value = tex;

			} );

		}

	}

}
