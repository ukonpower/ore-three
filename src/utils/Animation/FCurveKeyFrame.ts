import * as THREE from 'three';
import EventEmitter from 'wolfy87-eventemitter';
import { EasingFunc, Easings } from '../Easings';

export type FCurveInterpolation = "BEZIER" | "LINEAR";

export class FCurveKeyFrame extends EventEmitter {

	public coordinate: THREE.Vec2 = { x: 0, y: 0 };
	public handleLeft: THREE.Vec2 = { x: 0, y: 0 };
	public handleRight: THREE.Vec2 = { x: 0, y: 0 };
	public interpolation: FCurveInterpolation = 'BEZIER';

	private easing: EasingFunc | null = null;
	private nextFrame: FCurveKeyFrame | null = null;

	constructor( coordinate: THREE.Vec2, handleLeft?: THREE.Vec2, handleRight?: THREE.Vec2, interpolation?: FCurveInterpolation ) {

		super();

		this.set( coordinate, handleLeft, handleRight, interpolation );

	}

	public set( coordinate: THREE.Vec2, handleLeft?: THREE.Vec2, handleRight?: THREE.Vec2, interpolation?: FCurveInterpolation ) {

		this.coordinate = coordinate;
		this.handleLeft = handleLeft || coordinate;
		this.handleRight = handleRight || coordinate;
		this.interpolation = interpolation || 'BEZIER';

	}

	private getEasing( interpolation: FCurveInterpolation, nextFrame: FCurveKeyFrame ) {

		if ( interpolation == 'BEZIER' ) {

			return Easings.bezier( this.coordinate, this.handleRight, nextFrame.handleLeft, nextFrame.coordinate );

		} else {

			return ( t: number ) => {

				let d = ( nextFrame.coordinate.y - this.coordinate.y );
				t /= ( nextFrame.coordinate.x - this.coordinate.x );

				return this.coordinate.y + t * d;

			};

		}

	}

	public to( nextFrame: FCurveKeyFrame, t: number ) {

		if ( this.nextFrame == null || this.nextFrame.coordinate.x != nextFrame.coordinate.x || this.nextFrame.coordinate.y != nextFrame.coordinate.y ) {

			this.easing = this.getEasing( this.interpolation, nextFrame );
			this.nextFrame = nextFrame;

		}

		if ( this.easing ) {

			return this.easing( t );

		} else {

			return 0;

		}

	}

}
