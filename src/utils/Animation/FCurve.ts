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

	public value( frame: number ) {

		for ( let i = 0; i < this.frames.length; i ++ ) {

			let keyFrame = this.frames[ i ];

			if ( frame > keyFrame.coordinate.x ) {

				let nextKeyframe = this.frames[ i + 1 ];

				if ( nextKeyframe ) {

					let d = nextKeyframe.coordinate.x - keyFrame.coordinate.x;
					let t = frame - keyFrame.coordinate.x / d;

					return keyFrame.to( nextKeyframe, t );

				} else {

					return keyFrame.coordinate.y;

				}


			}

		}

	}

}
