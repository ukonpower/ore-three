import * as THREE from 'three';
import EventEmitter from 'wolfy87-eventemitter';

export type FCurveInterpolation = "BEZIER" | "LINEAR";

export class FCurveKeyFrame extends EventEmitter {

	public coordinate: THREE.Vec2 = { x: 0, y: 0 };
	public handleLeft: THREE.Vec2 | null = null;
	public handleRight: THREE.Vec2 | null = null;
	public interpolation: FCurveInterpolation = 'BEZIER';

	constructor( coordinate: THREE.Vec2, handleLeft?: THREE.Vec2, handleRight?: THREE.Vec2, interpolation?: FCurveInterpolation ) {

		super();

		this.set( coordinate, handleLeft, handleRight, interpolation );

	}

	private set( coordinate: THREE.Vec2, handleLeft?: THREE.Vec2, handleRight?: THREE.Vec2, interpolation?: FCurveInterpolation ) {

		this.coordinate = coordinate;
		this.handleLeft = handleLeft || null;
		this.handleRight = handleRight || null;
		this.interpolation = interpolation || 'BEZIER';

	}

	public to( nextFrame: FCurveKeyFrame, t: number ) {

		if ( this.interpolation == "BEZIER" ) {

			let d = ( nextFrame.coordinate.y - this.coordinate.y );

			return this.coordinate.y + d * t;


		} else {

			let d = ( nextFrame.coordinate.y - this.coordinate.y );

			return this.coordinate.y + d * t;

		}

	}

}
