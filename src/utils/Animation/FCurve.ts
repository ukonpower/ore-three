import EventEmitter from 'wolfy87-eventemitter';
import { FCurveKeyFrame } from './FCurveKeyFrame';

export type FCurveAxis = 'x' | 'y' | 'z' | 'w' | 'scaler'
export type FCurveGroup = {[key in FCurveAxis]?: FCurve}

export class FCurve extends EventEmitter {

	public keyframes: FCurveKeyFrame[] = [];
	public axis: FCurveAxis = 'scaler';

	private cache: { frame: number, value: number } = { frame: NaN, value: NaN };

	constructor( frames?: FCurveKeyFrame[], axis?: FCurveAxis ) {

		super();

		this.set( frames, axis );

	}

	public set( frames?: FCurveKeyFrame[], axis?: FCurveAxis ) {

		if ( frames ) {

			this.keyframes.length = 0;

			frames.forEach( keyframe => {

				this.addKeyFrame( keyframe );

			} );

		}

		if ( axis ) {

			this.axis = axis;

		}

	}

	public addKeyFrame( keyframe: FCurveKeyFrame ) {

		let index = 0;

		for ( let i = 0; i < this.keyframes.length; i ++ ) {

			let frame = this.keyframes[ i ];

			if ( frame.coordinate.x < keyframe.coordinate.x ) {

				index ++;

			} else {

				break;

			}

		}

		this.keyframes.splice( index, 0, keyframe );

	}

	public getValue( frame: number ) {

		if ( frame == this.cache.frame ) {

			return this.cache.value;

		}

		let value: number | null = null;

		for ( let i = 0; i < this.keyframes.length; i ++ ) {

			let keyframe = this.keyframes[ i ];

			if ( frame <= keyframe.coordinate.x ) {

				let beforeKeyFrame = this.keyframes[ i - 1 ];

				if ( beforeKeyFrame ) {

					value = beforeKeyFrame.to( keyframe, frame );

				} else {

					value = keyframe.coordinate.y;

				}

				break;

			}

		}

		if ( value === null && this.keyframes.length > 0 ) {

			value = this.keyframes[ this.keyframes.length - 1 ].coordinate.y;

		}

		if ( value !== null ) {

			this.cache = {
				frame: frame,
				value: value
			};

			return value;

		}

		return 0;

	}

}
