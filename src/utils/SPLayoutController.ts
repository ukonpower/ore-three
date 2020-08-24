import * as THREE from 'three';

export declare interface Transform {
	position?: THREE.Vector3;
	rotation?: THREE.Quaternion;
	scale?: number;
}

export class SPLayoutController {

	protected obj: THREE.Object3D;
	protected baseTransform: Transform;
	protected baseScale: THREE.Vector3;
	protected spTransform: Transform;

	constructor( object: THREE.Object3D, spTransform: Transform, isAbsolutePosition?: boolean ) {

		this.obj = object;

		this.baseTransform = {
			position: this.obj.position.clone(),
			rotation: this.obj.quaternion.clone(),
		};
		this.baseScale = this.obj.scale.clone();

		this.spTransform = spTransform;

		if ( ! isAbsolutePosition ) {

			this.spTransform.position && this.spTransform.position.add( this.obj.position );
			this.spTransform.rotation && this.spTransform.rotation.multiply( this.obj.quaternion );

		}

	}

	public updateTransform( spWeight: number ) {

		if ( this.spTransform.position ) {

			this.obj.position.copy( this.baseTransform.position.clone().lerp( this.spTransform.position, spWeight ) );

		}

		if ( this.spTransform.rotation ) {

			this.obj.quaternion.copy( this.baseTransform.rotation.clone().slerp( this.spTransform.rotation, spWeight ) );

		}

		if ( this.spTransform.scale ) {

			this.obj.scale.copy( this.baseScale.clone().multiplyScalar( this.spTransform.scale * ( spWeight ) + 1.0 - spWeight ) );

		}

	}

}
