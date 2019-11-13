import { Easings } from "./Easings";

export declare interface AnimatorEasing{
	func: Function;
	variables?: number[];
}

declare interface variable{
	x: number;
	duration: number;
	value: number;
	base: number;
	distance: number;
	onMoved?: Function;
	easing: AnimatorEasing;
}

export class Animator{

	private variables: { [key: string]: variable };
	private _isAnimating: boolean = false;
	private animatingCount: number = 0;

	private dispatchEvents: Function[] = [];

	constructor(){

		this.variables = {};

	}

	public get isAnimating(){

		return this._isAnimating;

	}

	public addVariable( name: string, initValue?: number, easing?: AnimatorEasing ){

		let eas: AnimatorEasing;

		if( easing ){

			eas = {
				func: easing.func,
				variables: easing.variables || []
			}

		}else{

			eas = {
				func: Easings.sigmoid,
				variables: [4]
			}

		}

		this.variables[name] = {
			x: 1,
			duration: 1,
			value: initValue ? initValue : 0,
			base: 0,		
			distance: 0,
			easing: eas
		}

	}

	public setEasing( name: string, easing: AnimatorEasing ){

		let variable = this.variables[name];

		if( variable ){

			variable.easing = easing;

		}else{

			console.warn( "variable doesn't exist : " + name );
			
		}

	}

	public animate( name: string, goalValue: number, duration?: number, callback?: Function ){

		let variable = this.variables[name];

		if( variable ){

			if( variable.x >= 1.0 ){

				this._isAnimating = true;
				this.animatingCount++;
				
			}

			variable.x = 0;
			variable.duration = ( duration != null ) ? duration : 1;
			variable.base = variable.value;
			variable.distance = goalValue - variable.base;
			variable.onMoved = callback;

		}else{

			console.warn( "variable doesn't exist : " + name );
			
		}

	}

	public getValue( name: string ): number{

		if( this.variables[name] ){

			return this.variables[name].value;

		}else{

			console.warn( "variable doesn't exist:" + name );

			return null;

		}
		
	}

	public update( deltaTime?: number ){

		let keys = Object.keys( this.variables );

		while( this.dispatchEvents.length != 0 ){

			this.dispatchEvents.pop()();
			
		}
		
		for( let i = 0; i < keys.length; i++ ){

			let variable = this.variables[keys[i]];

			if( variable.x < 1.0 ){

				if( variable.duration != 0 ){
					
					variable.x += ( deltaTime || 0.016 ) / variable.duration;
					
				}else{
					
					variable.x = 1.0;
					
				}

				let w = variable.easing.func( variable.x, variable.easing.variables );

				variable.value = variable.base + variable.distance * w;

				if( variable.x >= 1.0 ){

					variable.x = 1.0;

					variable.value = variable.base + variable.distance;

					this.animatingCount--;

					if( this.animatingCount == 0 ){

						this._isAnimating = false;

					}

					if( variable.onMoved ){
						
						this.dispatchEvents.push( variable.onMoved );

					}

				}

			}

		}

	}

}