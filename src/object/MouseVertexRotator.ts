import * as THREE from 'three';

export class MouseVertexRotator {
	
	public target: THREE.Object3D;
	public scrollVel: THREE.Vector2;
	public rotate: THREE.Quaternion;
	public rotMat: THREE.Matrix4;

	private uniform: any;

	constructor( target: THREE.Object3D,uniform: any ) {

		this.target = target;
		this.rotate = new THREE.Quaternion();
		this.rotMat = new THREE.Matrix4();
		this.scrollVel = new THREE.Vector2( 0,0 );
		
		this.uniform = uniform;

		this.uniform.rotVec = {
	
			value: this.scrollVel
	
		}

		this.uniform.rotation = {
	
			value: null
	
		}
	
	}

	update() {

		this.scrollVel.multiplyScalar( 0.96 );
		
		let axis = new THREE.Vector3( this.scrollVel.y, this.scrollVel.x, 0.0 ).normalize();
		
		let q = new THREE.Quaternion().setFromAxisAngle( axis, this.scrollVel.length() );
		q.multiply( this.rotate );
		
		this.rotate.copy( q );

		this.uniform.rotation.value = this.rotMat.compose( new THREE.Vector3(),this.rotate,this.target.scale );
		
	}

	addVelocity( scrollDelta: THREE.Vector2 ) {

		this.scrollVel.addVectors( this.scrollVel, scrollDelta.multiplyScalar( 0.001 ) );

	}

}