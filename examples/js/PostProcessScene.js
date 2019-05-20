import * as ORE from '../../src/';
import * as THREE from 'three';
import pp1 from './glsl/pp1.fs';
import pp2 from './glsl/pp2.fs';

export default class PostProcessScene extends ORE.BaseScene {

	constructor(renderer) {

		super(renderer);
		this.name = "PostProcessScene";
		this.renderer.debug.checkShaderErrors = true;
		this.init();
	}

	init() {
		this.camera.position.set(0, 1.5, 3);
		this.camera.lookAt(0, 0, 0);

		var boxGeo = new THREE.SphereGeometry(0.8, 30, 20);
		// var boxGeo = new THREE.BoxGeometry(1,1,1);
		var boXMat = new THREE.MeshStandardMaterial({
			color:new THREE.Color(0xffffff),
			roughness: 0.2
		});
		boXMat.flatShading = true;
		
		this.box = new THREE.Mesh(boxGeo, boXMat);
		this.scene.add(this.box);

		this.light = new THREE.PointLight();
		this.light.intensity = 1.5;
		this.light.position.y = 5;
		this.light.position.x = 3;
		this.scene.add(this.light);

		this.aLight = new THREE.AmbientLight();
		this.aLight.intensity = 0.5;
		this.scene.add(this.aLight);

		this.bloom = new ORE.BloomFilter(this.renderer);
	}

	animate() {
		this.box.rotateY(0.01);
		this.box.rotateX(0.01);
		this.bloom.render(this.scene,this.camera);
	}

	onResize(width, height) {
		super.onResize(width, height);
	}

	onTouchStart(e) {}

	onTouchMove(e) {}

	onTouchEnd(e) {}

	onWheel(e) {}
}