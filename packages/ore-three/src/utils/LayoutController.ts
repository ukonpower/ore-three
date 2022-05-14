import * as THREE from 'three';

export declare interface Transform {
	position?: THREE.Vector3;
	rotation?: THREE.Quaternion;
	scale?: number;
}

export declare interface BaseTransform {
	position: THREE.Vector3;
	rotation: THREE.Quaternion;
	scale: THREE.Vector3
}

export class LayoutController {

	protected obj: THREE.Object3D;
	protected baseTransform: BaseTransform;
	protected transform: Transform;

	constructor( object: THREE.Object3D, transform: Transform, isAbsolutePosition?: boolean ) {

		this.obj = object;

		this.baseTransform = {
			position: this.obj.position.clone(),
			rotation: this.obj.quaternion.clone(),
			scale: this.obj.scale.clone()
		};

		this.transform = transform;

		if ( ! isAbsolutePosition ) {

			this.transform.position && this.transform.position.add( this.obj.position );
			this.transform.rotation && this.transform.rotation.multiply( this.obj.quaternion );

		}

	}

	public updateTransform( weight: number ) {

		if ( this.transform.position ) {

			this.obj.position.copy( this.baseTransform.position.clone().lerp( this.transform.position, weight ) );

		}

		if ( this.transform.rotation ) {

			this.obj.quaternion.copy( this.baseTransform.rotation.clone().slerp( this.transform.rotation, weight ) );

		}

		if ( this.transform.scale ) {

			this.obj.scale.copy( this.baseTransform.scale.clone().multiplyScalar( this.transform.scale * ( weight ) + 1.0 - weight ) );

		}

	}

}
