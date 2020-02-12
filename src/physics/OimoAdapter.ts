import * as THREE from 'three';
import * as OIMO from 'oimo';
import { BoxGeometry, Geometry, LineSegments, BoxBufferGeometry, DynamicCopyUsage } from 'three';

export declare interface OimoWorldParam{
	timestep: number;
	iterations: number;
	broadphase: number;
	worldscale: number;
	random: true;
	info: false;
	gravity: THREE.Vector3;
}

export declare interface OimoObjectParam{
    type: string,
    size: number[],
    pos: number[],
    rot: number[],
    move:true,
    density: number,
    friction: number,
    restitution: number,
    belongsTo: number,
    collidesWith: number;
}

declare interface OimoPhysicsObject{
	threeObj: THREE.Object3D,
	body: OIMO.Body,
}

export class OimoAdapter{

	public world: OIMO.World;
	public scene: THREE.Scene;
	public oimoGroup: THREE.Group;

	public objs: OimoPhysicsObject[] = [];
	
	constructor( scene: THREE.Scene, worldParam?: OimoWorldParam ){
		
		this.scene = scene;
		this.oimoGroup = new THREE.Group();
		this.oimoGroup.name = "oimo";
		this.scene.add( this.oimoGroup );
		
		worldParam = worldParam || {} as OimoWorldParam;

		let grav = new THREE.Vector3();

		if( worldParam.gravity ){

			grav.copy( worldParam.gravity );
			
		}else{

			grav.set( 0, -9.8, 0 );

		}
		
		this.world = new OIMO.World({
			timestep: worldParam.timestep || 1 / 60, 
			iterations: worldParam.iterations || 8, 
			broadphase: worldParam.broadphase || 2,
			worldscale: worldParam.worldscale || 1,
			random: worldParam.random != null ? worldParam.random : true,
			info: worldParam.info != null ? worldParam.info : false,
			gravity: [ grav.x, grav.y, grav.z ]
		});
		
	}

	public add( obj: THREE.Object3D, param?: OimoObjectParam ){

		param = param || {} as OimoObjectParam;
		
		this.oimoGroup.add( obj );

		this.createParam( param, obj );
	
		let body = this.world.add({
			type: param.type,
			size: param.size || [ 1, 1, 1 ],
			pos: param.pos || [ 0, 0, 0 ],
			rot: param.rot || [ 0, 0, 0 ],
			move: param.move != null ? param.move : true,
			density: param.density != null ? param.move : 1,
			friction: param.friction != null ? param.friction : 0.2,
			restitution: param.restitution != null ? param.restitution : 0.2,
			belongsTo: param.belongsTo != null ? param.belongsTo : 1,
			collidesWith: param.collidesWith != null ? param.collidesWith : 0xffffffff
		});
		
		this.objs.push( { threeObj: obj, body: body } );

		return body;

	}

	private createParam( param: OimoObjectParam, obj: THREE.Object3D ){

		let scale = obj.scale;
		let geo = ( obj as any ).geometry as THREE.BufferGeometry | Geometry;

		if( geo && param.type == null ){

			let geoType = geo.type;

			if( geoType.indexOf( 'Box' ) !== -1 ){

				let geoParam = ( geo as THREE.BoxBufferGeometry | THREE.BoxGeometry ).parameters;
				geoParam.width = geoParam.width === undefined ? 1 : geoParam.width;
				geoParam.height = geoParam.height === undefined ? 1 : geoParam.height;
				geoParam.depth = geoParam.depth === undefined ? 1 : geoParam.depth;
				
				param.type = 'box';
				param.size = [ geoParam.width * scale.x, geoParam.height * scale.y, geoParam.depth * scale.z ];

			}else if( geoType.indexOf( 'Sphere' ) !== -1 ){

				let geoParam = ( geo as THREE.SphereBufferGeometry | THREE.SphereGeometry ).parameters;
				geoParam.radius = geoParam.radius === undefined ? 1 : geoParam.radius;

				param.type = 'sphere';

				let maxWidth = Math.max( scale.x, Math.max( scale.y, scale.z ) );	
				
				param.size = [ geoParam.radius * maxWidth ];

			}else if( geoType.indexOf( 'Plane' ) !== -1 ){

				let geoParam = ( geo as THREE.PlaneBufferGeometry | THREE.PlaneGeometry ).parameters;
				geoParam.width = geoParam.width === undefined ? 1 : geoParam.width;
				geoParam.height = geoParam.height === undefined ? 1 : geoParam.height;
				
				param.type = 'plane';

			}else if( geoType.indexOf( 'Cylinder' ) !== -1 ){

				let geoParam = ( geo as THREE.CylinderBufferGeometry | THREE.CylinderGeometry ).parameters;
				geoParam.radiusTop = geoParam.radiusTop === undefined ? 1 : geoParam.radiusTop;
				geoParam.radiusBottom = geoParam.radiusBottom === undefined ? 1 : geoParam.radiusBottom;
				geoParam.height = geoParam.height === undefined ? 1 : geoParam.height;

				param.type = 'cylinder';

				let maxRad = Math.max( geoParam.radiusTop, geoParam.radiusBottom );
				let maxWidth = Math.max( scale.x, scale.z );
				
				param.size = [ maxRad * maxWidth, geoParam.height * scale.y ];

			}

			param.pos = [ obj.position.x, obj.position.y, obj.position.z ];
			param.rot = [ obj.rotation.x * THREE.MathUtils.RAD2DEG, obj.rotation.y * THREE.MathUtils.RAD2DEG, obj.rotation.z * THREE.MathUtils.RAD2DEG ];

		}

	}

	public update( deltaTime: number ){

		this.world.step();

		for( let i = 0; i < this.objs.length; i++ ){

			let obj = this.objs[i];

			obj.threeObj.position.copy( obj.body.position as unknown as THREE.Vector3 );
			obj.threeObj.quaternion.copy( obj.body.quaternion as unknown as THREE.Quaternion );
			
		}
		
	}
	
}