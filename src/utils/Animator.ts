import { Easings, EasingSet } from "./Easings";
import { LerpFunc, Lerps } from "./Lerps";
import { Uniforms } from "./Uniforms";

declare interface AnimatorVariable<T>{
	time: number;
	duration?: number;
	value: T;
	startValue: T;
	goalValue: T;
	onAnimationFinished?: Function;
	lerpFunc: LerpFunc<T>;
	easing: EasingSet;
}

export declare interface AnimatorValiableParams<T> {
	name: string;
	initValue: T;
	easing?: EasingSet;
	customLerpFunc?: LerpFunc<T>;
}

export class Animator {

	protected variables: { [ key: string ]: AnimatorVariable<any> };
	protected _isAnimating: boolean = false;
	protected animatingCount: number = 0;
	protected dispatchEvents: Function[] = [];

	constructor() {

		this.variables = {};

	}

	public get isAnimating() {

		return this._isAnimating;

	}

	public add<T>( params: AnimatorValiableParams<T> ) {

		let lerpFunc = params.customLerpFunc || Lerps.getLerpFunc( params.initValue );

		let variable = {
			time: - 1,
			value: params.initValue,
			startValue: params.initValue,
			goalValue: null,
			easing: params.easing || { func: Easings.sigmoid, args: 6 },
			lerpFunc: lerpFunc,
		};

		this.variables[ params.name ] = variable;

		return variable;

	}

	public setEasing( name: string, easing: EasingSet ) {

		let variable = this.variables[ name ];

		if ( variable ) {

			variable.easing = easing;

		} else {

			console.warn( '"' + name + '"' + ' is not exist' );

		}

	}

	public animate<T>( name: string, goalValue: T, duration: number = 1, callback?: Function, easing?: EasingSet ) {

		let variable = this.variables[ name ];

		if ( variable ) {

			if ( duration <= 0 ) {

				this.setValue( name, goalValue );

				variable.time = 1.0;
				variable.onAnimationFinished = callback;

				return;

			}

			if ( variable.time == - 1 ) {

				this._isAnimating = true;
				this.animatingCount ++;

			}

			variable.time = 0;
			variable.duration = duration;
			variable.startValue = variable.value;
			variable.goalValue = goalValue;
			variable.onAnimationFinished = callback;

			if ( easing ) {

				this.setEasing( name, easing );

			}

		} else {

			console.warn( '"' + name + '"' + ' is not exist' );

		}

	}

	public cancelAnimate( name: string ) {

		let variable = this.variables[ name ];

		if ( variable ) {

			variable.time = 1.0;
			variable.onAnimationFinished = null;

		} else {

			console.warn( '"' + name + '"' + ' is not exist' );

		}

	}

	public setValue<T>( name: string, value: T ) {

		if ( this.variables[ name ] ) {

			this.variables[ name ].value = value;
			this.cancelAnimate( name );

		} else {

			console.warn( '"' + name + '"' + ' is not exist' );

			return null;

		}

	}

	public get<T>( name: string ): T {

		if ( this.variables[ name ] ) {

			return this.variables[ name ].value;

		} else {

			console.warn( '"' + name + '"' + ' is not exist' );

			return null;

		}

	}

	public getVariableObject<T>( name: string ): AnimatorVariable<T> {

		if ( this.variables[ name ] ) {

			return this.variables[ name ];

		} else {

			console.warn( '"' + name + '"' + ' is not exist' );

			return null;

		}

	}

	public applyToUniforms( uniforms: Uniforms ) {

		let keys = Object.keys( this.variables );

		for ( let i = 0; i < keys.length; i ++ ) {

			uniforms[ keys[ i ] ] = this.getVariableObject( keys[ i ] );

		}

	}

	public update( deltaTime?: number ) {

		if ( this.animatingCount == 0 ) {

			this._isAnimating = false;

		}

		let keys = Object.keys( this.variables );

		for ( let i = 0; i < keys.length; i ++ ) {

			let variable = this.variables[ keys[ i ] ];

			if ( variable.time == 1.0 ) {

				this.animatingCount --;
				variable.time = - 1;

				if ( variable.onAnimationFinished ) {

					this.dispatchEvents.push( variable.onAnimationFinished );

				}

			}

			if ( variable.time >= 0.0 && variable.time < 1.0 ) {

				variable.time += ( deltaTime || 0.016 ) / variable.duration;

				if ( variable.duration == 0 || variable.time >= 1.0 ) {

					variable.time = 1.0;

				}

				let t = variable.time;

				if ( variable.easing ) {

					t = variable.easing.func( t, variable.easing.args );

				}

				variable.value = variable.lerpFunc( variable.startValue, variable.goalValue, t );

				if ( variable.time == 1.0 ) {

					variable.value = variable.goalValue;

				}

			}

		}

		while ( this.dispatchEvents.length != 0 ) {

			this.dispatchEvents.pop()();

		}

	}

}
