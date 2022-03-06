import EventEmitter from 'wolfy87-eventemitter';
import { FCurve } from './FCurve';

export class AnimationAction extends EventEmitter {

	public name: string;
	public curves: { [name:string]: FCurve } = {};

	constructor( name?: string ) {

		super();

		this.name = name || '';

	}

	public addCurve( name: string, curve: FCurve ) {

		this.curves[ name ] = curve;

	}

	public removeCurve( name: string ) {

		delete this.curves[ name ];

	}

	public getValue( frame: number ) {

		let keys = Object.keys( this.curves );

		let value = {};

		keys.forEach( key => {

			let curve = this.curves[ key ];

			let v = curve.getValue( frame );


		} );

	}

	public getCurve( curveName: string ): FCurve | null {

		return this.curves[ curveName ] || null;

	}

}
