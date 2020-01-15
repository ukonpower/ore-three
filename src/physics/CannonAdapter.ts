import * as THREE from 'three';
import * as CANNON from 'cannon';
import { BoxGeometry, Geometry, LineSegments, BoxBufferGeometry } from 'three';

export declare interface CannonWorldParam{
	gravity: THREE.Vector3,
	iterations: number;
}

declare interface CannonPhysicsObjects{
	threeObj: THREE.Object3D,
	body: CANNON.Body,
}

export class CannonAdapter{

	public world: CANNON.World;
	public scene: THREE.Scene;
	public cannonGroup: THREE.Group;

	public objs: CannonPhysicsObjects[] = [];
	
	constructor( scene: THREE.Scene, worldParam?: CannonWorldParam ){
		
		this.scene = scene;
		this.cannonGroup = new THREE.Group();
		this.cannonGroup.name = "cannon";
		this.scene.add( this.cannonGroup );
		
		worldParam = worldParam || {} as CannonWorldParam;

		this.world = new CANNON.World();

		this.world.gravity.copy( worldParam.gravity as unknown as CANNON.Vec3  || new CANNON.Vec3( 0, -9.82, 0 ) );

		this.world.broadphase = new CANNON.NaiveBroadphase();
		this.world.iterations = worldParam.iterations != undefined ? worldParam.iterations : 10;
		
	}

	public add( obj: THREE.Object3D, param?: CANNON.IBodyOptions ){

		param = param || {};
		
		this.cannonGroup.add( obj );

		if( !param.shape ){
			
			let shape = this.createShape( obj );
			param.shape = shape;

		}

		let body = new CANNON.Body( param );
		body.position.copy( obj.position as unknown as CANNON.Vec3 );
		body.quaternion.copy( obj.quaternion as unknown as CANNON.Quaternion );
		this.world.addBody( body );
		
		this.objs.push( { threeObj: obj, body: body } );


		return body;

	}

	private createShape( obj: THREE.Object3D ){

		let scale = obj.scale;
		let geo = ( obj as any ).geometry as THREE.BufferGeometry | Geometry;

		let shape: CANNON.Shape;

		if( geo ){

			let type = geo.type;

			if( type.indexOf( 'Box' ) !== -1 ){

				let geoParam = ( geo as THREE.BoxBufferGeometry | THREE.BoxGeometry ).parameters;

				geoParam.width = geoParam.width === undefined ? 1 : geoParam.width;
				geoParam.height = geoParam.height === undefined ? 1 : geoParam.height;
				geoParam.depth = geoParam.depth === undefined ? 1 : geoParam.depth;
				
				shape = new CANNON.Box( new CANNON.Vec3( ( geoParam.width ) / 2.0 * scale.x, ( geoParam.height ) / 2 * scale.y, ( geoParam.depth ) / 2 * scale.z ) );

			}else if( type.indexOf( 'Sphere' ) !== -1 ){
				
				let geoParam = ( geo as THREE.SphereBufferGeometry | THREE.SphereGeometry ).parameters;
				geoParam.radius = geoParam.radius === undefined ? 1 : geoParam.radius;
				
				shape = new CANNON.Sphere( geoParam.radius * ( Math.max( scale.x, Math.max( scale.y, scale.z ) ) ) );
				
			}else if( type.indexOf( 'Plane' ) !== -1 ){
				
				shape = new CANNON.Plane();
				
			}else if( type.indexOf( 'Cylinder' ) !== -1 ){
				
				let geoParam = ( geo as THREE.CylinderBufferGeometry | THREE.CylinderGeometry ).parameters;
				geoParam.radiusTop = geoParam.radiusTop === undefined ? 1 : geoParam.radiusTop;
				geoParam.radiusBottom = geoParam.radiusBottom === undefined ? 1 : geoParam.radiusBottom;
				geoParam.height = geoParam.height === undefined ? 1 : geoParam.height;

				let maxWidth = Math.max( scale.x, scale.z );
				shape = new CANNON.Cylinder( geoParam.radiusTop * maxWidth, geoParam.radiusBottom * maxWidth, geoParam.height * scale.y, geoParam.radialSegments );

			}else{

				shape = new CANNON.Sphere( 1 );
				
			}

		}

		return shape;
		
	}

	public update( deltaTime: number ){

		this.world.step( deltaTime );

		for( let i = 0; i < this.objs.length; i++ ){

			let obj = this.objs[i];

			obj.threeObj.position.copy( obj.body.position as unknown as THREE.Vector3 );
			obj.threeObj.quaternion.copy( obj.body.quaternion as unknown as THREE.Quaternion );
			
		}
		
	}
	
}