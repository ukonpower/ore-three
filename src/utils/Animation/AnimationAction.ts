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

	public getCurves( curveName: string ): FCurve[] {


		if ( this.curves[ curveName ] ) {

			return [ this.curves[ curveName ] ];

		} else {

			let curves = [];

			curves.push( this.curves[ curveName + '_x' ] );
			curves.push( this.curves[ curveName + '_y' ] );
			curves.push( this.curves[ curveName + '_z' ] );
			curves.push( this.curves[ curveName + '_w' ] );

			for ( let i = 0; i < curves.length; i ++ ) {

				if ( curves[ i ] != undefined ) {

					return curves;

				}

			}

		}

		return [];

	}

}
