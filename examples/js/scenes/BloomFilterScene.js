import * as ORE from '../../../src/';
import * as THREE from 'three';

export default class BloomFilterScene extends ORE.BaseScene {

	constructor() {

		super();

		this.name = "BloomFilterScene";

	}

	onBind( gProps ) {

		super.onBind( gProps );

		this.renderer = this.gProps.renderer;

		this.camera.position.set(0, 1.5, 3);
		this.camera.lookAt(0, 0, 0);

		var geo = new THREE.SphereGeometry(0.8, 10, 10);
		var mat = new THREE.MeshStandardMaterial({
			color:new THREE.Color(0xFFFFFF),
			roughness: 0.2
		});
		
		mat.flatShading = true;
		
		this.box = new THREE.Mesh(geo, mat);
		this.scene.add(this.box);

		this.light = new THREE.PointLight();
		this.light.intensity = 1.5;
		this.light.position.y = 5;
		this.light.position.x = 3;
		this.scene.add(this.light);

		this.aLight = new THREE.AmbientLight();
		this.aLight.intensity = 0.5;
		this.scene.add(this.aLight);

		this.bloom = new ORE.BloomFilter(this.renderer, 0.1);
		this.bloom.threshold = 0.0;
		this.bloom.brightness = 0.9;
		this.bloom.blurRange = 20.0;
		
	}

	animate( deltaTime ) {
		
		this.box.rotateY(0.01);
		this.box.rotateX(0.01);
		this.bloom.render(this.scene,this.camera);

	}

	onResize(width, height) {
		
		this.bloom.resize( width, height );
		super.onResize(width, height);

	}
	
}