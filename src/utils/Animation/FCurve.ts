import EventEmitter from 'wolfy87-eventemitter';
import { FCurveKeyFrame } from './FCurveKeyFrame';

export class FCurve extends EventEmitter {

	public frames: FCurveKeyFrame[] = [];

	constructor( frames?: FCurveKeyFrame[] ) {

		super();

		this.set( frames );

	}

	public set( frames?: FCurveKeyFrame[] ) {

		this.frames = frames || [];

	}

	public addKeyFrame( keyframe: FCurveKeyFrame ) {

		let index = 0;

		for ( let i = 0; i < this.frames.length; i ++ ) {

			let frame = this.frames[ i ];

			if ( frame.coordinate.x < keyframe.coordinate.x ) {

				index ++;

			} else {

				break;

			}

		}

		this.frames.splice( index, 0, keyframe );

	}

	public getValue( frame: number ) {

		for ( let i = 0; i < this.frames.length; i ++ ) {

			let keyframe = this.frames[ i ];

			if ( frame < keyframe.coordinate.x ) {

				let beforeKeyframe = this.frames[ i - 1 ];

				if ( beforeKeyframe ) {

					let d = beforeKeyframe.coordinate.x - keyframe.coordinate.x;
					let t = ( frame - keyframe.coordinate.x ) / d;

					return keyframe.to( beforeKeyframe, t );

				} else {

					return keyframe.coordinate.y;

				}

			}

		}

		if ( this.frames.length > 0 ) {

			return this.frames[ this.frames.length - 1 ].coordinate.y;

		}

		return 0;


	}

}
