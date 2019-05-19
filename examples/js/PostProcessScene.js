import * as ORE from '../../src/';
import * as THREE from 'three';
import pp1 from './glsl/pp1.fs'
import pp2 from './glsl/pp2.fs'
import pp3 from './glsl/pp3.fs'

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
		var boxGeo = new THREE.BoxGeometry(1,1,1);
		var boXMat = new THREE.MeshStandardMaterial({
			color:new THREE.Color(0xFF00FF),
			roughness: 0.2
		});
		// boXMat.flatShading = true;
		this.box = new THREE.Mesh(boxGeo, boXMat);
		this.scene.add(this.box);

		this.light = new THREE.PointLight();
		this.light.intensity = 2.0;
		this.light.position.y = 5;
		this.light.position.x = 3;
		this.scene.add(this.light);

		this.aLight = new THREE.AmbientLight();
		this.aLight.intensity = 0.5;
		this.scene.add(this.aLight);

		this.gaussVar = {
			value: 1000
		}
		this.sceneTex = {
			value: null
		}

		let pp1Param = [{
			fragmentShader: pp1,
			uniforms: {
				threshold: {
					value: 0.7
				}
			}
		}]

		let pp2Param = [{
				fragmentShader: pp2,
				uniforms: {
					v: {
						value: true,
					},
					gaussVar: this.gaussVar
				}
			},
			{
				fragmentShader: pp2,
				uniforms: {
					v: {
						value: false,
					},
					gaussVar: this.gaussVar
				}
			},
			{
				fragmentShader: pp3,
				uniforms: {
					sceneTex: this.sceneTex
				}
			}
		]

		this.pp1 = new ORE.PostProcessing(this.renderer, pp1Param);
		this.pp2 = new ORE.PostProcessing(this.renderer, pp2Param);

		this.sceneRenderTarget = this.pp1.createRenderTarget();
	}

	animate() {
		this.box.rotateY(0.01);
		this.box.rotateX(0.01);

		this.renderer.setRenderTarget(this.sceneRenderTarget);
		this.renderer.render(this.scene, this.camera);


		this.pp1.render(this.sceneRenderTarget.texture, true);
		let pp1result = this.pp1.getResultTexture();

		this.sceneTex.value = this.sceneRenderTarget.texture;
		this.pp2.render(pp1result);
	}

	onResize(width, height) {
		super.onResize(width, height);
	}

	onTouchStart(e) {}

	onTouchMove(e) {}

	onTouchEnd(e) {}

	onWheel(e) {}
}