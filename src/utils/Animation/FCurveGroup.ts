import * as THREE from 'three';
import EventEmitter from "wolfy87-eventemitter";
import { FCurve, FCurveAxis } from "./FCurve";

export type FCurveGroupType = 'scalar' | 'vec2' | 'vec3' | 'vec4'

export class FCurveGroup extends EventEmitter {

	public name: string = "";
	public curve: {[axis in FCurveAxis]: FCurve | null};
	public type: FCurveGroupType = "scalar";

	constructor( name?: string, x?: FCurve, y?: FCurve, z?: FCurve, w?: FCurve ) {

		super();

		this.curve = {
			x: x || null,
			y: y || null,
			z: z || null,
			w: w || null,
		};

		this.calcType();

	}

	public setFCurve( curve: FCurve, axis: FCurveAxis ) {

		this.curve[ axis ] = curve;

		this.calcType();

	}

	public calcType() {

		if ( this.curve.w ) {

			this.type = "vec4";

		} else if ( this.curve.z ) {

			this.type = "vec3";

		} else if ( this.curve.y ) {

			this.type = "vec2";

		} else if ( this.curve.x ) {

			this.type = "scalar";

		}

	}

	public createInitValue() {

		if ( this.type == 'vec2' ) {

			return new THREE.Vector2();

		} else if ( this.type == 'vec3' ) {

			return new THREE.Vector3();


		} else if ( this.type == 'vec4' ) {

			return new THREE.Vector4();

		}

		return 0;

	}

}
