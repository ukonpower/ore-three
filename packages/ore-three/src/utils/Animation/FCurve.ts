import EventEmitter from 'wolfy87-eventemitter';
import { FCurveKeyFrame } from './FCurveKeyFrame';

export type FCurveAxis = 'x' | 'y' | 'z' | 'w' | 'scalar'

export class FCurve extends EventEmitter {

	public keyframes: FCurveKeyFrame[] = [];

	private cache: { frame: number, value: number } = { frame: NaN, value: NaN };

	public frameStart: number;
	public frameEnd: number;
	public frameDuration: number;

	constructor( frames?: FCurveKeyFrame[] ) {

		super();
		
		this.frameStart = 0;
		this.frameEnd = 0;
		this.frameDuration = 0;
		
		this.set( frames );

	}

	public set( frames?: FCurveKeyFrame[] ) {

		if ( frames ) {

			this.keyframes.length = 0;

			frames.forEach( keyframe => {

				this.addKeyFrame( keyframe );

			} );

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

		// set frame info
		
		this.frameStart = this.keyframes[0].coordinate.x
		this.frameEnd = this.keyframes[this.keyframes.length - 1].coordinate.x

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
