import * as THREE from 'three';

export class MouseRotator {

	public target: THREE.Object3D;
	public scrollVel: THREE.Vector2;

	constructor( objs: THREE.Object3D ) {

		this.target = objs;

		this.scrollVel = new THREE.Vector2();

	}

	update() {

		this.scrollVel.multiplyScalar( 0.96 );

		let axis = new THREE.Vector3( this.scrollVel.y, this.scrollVel.x, 0.0 ).normalize();

		let q = new THREE.Quaternion().setFromAxisAngle( axis, this.scrollVel.length() );
		q.multiply( this.target.quaternion );

		this.target.quaternion.copy( q );

	}

	addVelocity( scrollDelta: THREE.Vector2 ) {

		this.scrollVel.addVectors( this.scrollVel, scrollDelta.multiplyScalar( 0.001 ) );

	}

}
