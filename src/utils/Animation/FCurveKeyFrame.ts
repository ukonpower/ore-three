import * as THREE from 'three';
import EventEmitter from 'wolfy87-eventemitter';

export type FCurveInterpolation = "BEZIER" | "LINEAR";

export class FCurveKeyFrame extends EventEmitter {

	public name: string | '' = '';
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

	public value( nextFrame: FCurveKeyFrame, t: number ) {

	}

}
