import * as THREE from 'three';
import * as ORE from 'ore-three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

declare interface TextureParam {
	mapping?: THREE.Mapping
	wrapS?: THREE.Wrapping
	wrapT?: THREE.Wrapping
	magFilter?: THREE.TextureFilter
	minFilter?: THREE.TextureFilter
	format?: THREE.PixelFormat
	type?: THREE.TextureDataType
	anisotropy?: number
	encoding?: THREE.TextureEncoding
}

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

	public onMustAssetsLoaded: ( () => void )| null = null;

	public gltfScene?: THREE.Group;
	public textures: ORE.Uniforms = {};

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

		loader.load( basePath + 'scene/ore-three.glb', ( gltf ) => {

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

				this.applyParam( tex, info.param );

				this.textures[ info.name ].value = tex;

			} );

		}

	}

	private applyParam( tex: THREE.Texture, param?: TextureParam ) {

		if ( param ) {

			tex.mapping = param.mapping || THREE.Texture.DEFAULT_MAPPING;
			tex.wrapS = param.wrapS || THREE.ClampToEdgeWrapping;
			tex.wrapT = param.wrapT || THREE.ClampToEdgeWrapping;
			tex.magFilter = param.magFilter || THREE.LinearFilter;
			tex.minFilter = param.minFilter || THREE.LinearFilter;
			tex.format = param.format || THREE.RGBAFormat;
			tex.type = param.type || THREE.UnsignedByteType;
			tex.anisotropy = param.anisotropy || 1;
			tex.encoding = param.encoding || THREE.LinearEncoding;

		}

	}

}
