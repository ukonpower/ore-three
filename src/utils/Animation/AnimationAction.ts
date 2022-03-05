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

}
